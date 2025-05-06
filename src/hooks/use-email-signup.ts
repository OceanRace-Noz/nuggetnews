
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useEmailSignup = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  const sendConfirmationEmail = async (email: string, id: string) => {
    try {
      console.log("Sending confirmation email to:", email, "with id:", id);
      const { data, error } = await supabase.functions.invoke('send-confirmation', {
        body: { email, id }
      });
      
      if (error) {
        console.error("Error sending confirmation email:", error);
        toast({
          variant: "destructive",
          title: "Fehler beim Senden der Bestätigungs-E-Mail",
          description: "Bitte versuche es später noch einmal.",
        });
        return false;
      } else {
        console.log("Confirmation email response:", data);
        return true;
      }
    } catch (error) {
      console.error("Failed to invoke send-confirmation function:", error);
      toast({
        variant: "destructive",
        title: "Fehler beim Senden der Bestätigungs-E-Mail",
        description: "Bitte versuche es später noch einmal.",
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsValid(false);
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Attempting to save email:", email);
      
      // Check if the connection is working
      const { data: connectionTest, error: connectionError } = await supabase.from('nugget_wartelist_emails').select('count').limit(1);
      
      if (connectionError) {
        console.error("Connection test failed:", connectionError);
        throw connectionError;
      }
      
      console.log("Connection test successful:", connectionTest);
      
      // Check if email already exists
      const { data: existingEmails, error: existingError } = await supabase
        .from('nugget_wartelist_emails')
        .select('id, is_confirmed')
        .eq('email', email);
      
      if (existingError) {
        console.error("Error checking existing email:", existingError);
        throw existingError;
      }
      
      if (existingEmails && existingEmails.length > 0) {
        const existingEmail = existingEmails[0];
        
        if (existingEmail.is_confirmed) {
          toast({
            title: "Du bist bereits angemeldet!",
            description: "Deine E-Mail-Adresse ist bereits bestätigt.",
          });
          setEmail("");
          setIsSubmitting(false);
          return;
        } else {
          // Resend confirmation for existing unconfirmed email
          console.log("Email exists but not confirmed, resending confirmation:", existingEmail);
          const emailSent = await sendConfirmationEmail(email, existingEmail.id);
          
          if (emailSent) {
            toast({
              title: "Fast geschafft!",
              description: "Bitte bestätige deine E-Mail-Adresse, um die Anmeldung abzuschließen. Wir haben dir erneut eine Bestätigungs-E-Mail gesendet.",
            });
            setEmail("");
          }
          
          setIsSubmitting(false);
          return;
        }
      }
      
      // Try to insert the email
      const { data, error } = await supabase
        .from('nugget_wartelist_emails')
        .insert([{ 
          email, 
          is_confirmed: false, // Default to false until they click the verification link
        }])
        .select();

      if (error) {
        console.error("Insertion error details:", error);
        throw error;
      }

      console.log("Email saved successfully:", data);
      
      // Send confirmation email with the record ID
      if (data && data[0] && data[0].id) {
        const emailSent = await sendConfirmationEmail(email, data[0].id);
        
        if (emailSent) {
          // Show waiting for confirmation message
          toast({
            title: "Fast geschafft!",
            description: "Bitte bestätige deine E-Mail-Adresse, um die Anmeldung abzuschließen.",
          });
          setEmail("");
        }
      } else {
        console.error("No ID returned from insertion");
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Deine Anmeldung konnte nicht abgeschlossen werden. Bitte versuche es später erneut.",
        });
      }
    } catch (error) {
      console.error('Error saving email:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Entschuldigung, etwas ist schief gelaufen. Bitte versuche es später erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    isValid,
    isSubmitting,
    handleEmailChange,
    handleSubmit,
  };
};
