
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EmailSignupFormProps {
  className?: string;
}

export const EmailSignupForm: React.FC<EmailSignupFormProps> = ({ className }) => {
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

  return (
    <div className="px-6 w-full">
      <form 
        onSubmit={handleSubmit} 
        className={`flex flex-row items-center justify-between gap-2 border bg-[rgba(29,29,29,0.5)] p-2 rounded-[50px] border-solid border-[#C7881F] w-full max-w-[600px] mx-auto shadow-[0px_0px_12px_0px_rgba(234,174,51,0.7)] hover:shadow-[0px_0px_12px_2px_rgba(234,174,51,1)] transition-shadow ${className}`}
        aria-label="Email signup form"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Gib deine Email ein"
            className={`bg-transparent text-left text-base md:text-base text-[#A9A9A9] focus:text-[#F1F0FB] transition-colors font-fredoka font-normal outline-none flex-1 px-3 min-w-0 truncate ${!isValid ? "border-b border-red-500" : ""}`}
            aria-label="Email input"
            disabled={isSubmitting}
            style={{ WebkitAppearance: "none", backgroundColor: "transparent" }}
          />
          {!isValid && (
            <p className="absolute -bottom-6 left-6 text-xs text-red-500">
              Bitte gib eine gültige E-Mail-Adresse ein.
            </p>
          )}
        </div>
        
        <button
          type="submit"
          aria-label="Submit email"
          className="flex items-center justify-center cursor-pointer bg-[#0C0C36] hover:bg-[#0C0C36]/80 transition-colors px-5 py-2.5 rounded-[50px] whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="text-[#F1F0FB] text-base font-fredoka font-normal">
              Senden...
            </span>
          ) : (
            <>
              <span className="text-[#F1F0FB] text-base font-fredoka font-normal mr-2">
                Los geht's!
              </span>
              <svg width="16" height="16" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 4.32043L20 9.8621M20 9.8621L13.3333 15.4038M20 9.8621L4 9.8621" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EmailSignupForm;
