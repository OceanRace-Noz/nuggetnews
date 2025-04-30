
import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailSignupFormProps {
  className?: string;
}

export const EmailSignupForm: React.FC<EmailSignupFormProps> = ({ className }) => {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  const sendConfirmationEmail = async (email: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-confirmation', {
        body: { email }
      });
      
      if (error) {
        console.error("Error sending confirmation email:", error);
        // We don't want to show an error to the user if the confirmation email fails
        // as they are already signed up successfully
      } else {
        console.log("Confirmation email sent:", data);
      }
    } catch (error) {
      console.error("Failed to invoke send-confirmation function:", error);
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
      
      // Try to insert the email
      const { data, error } = await supabase
        .from('nugget_wartelist_emails')
        .insert([{ email }])
        .select();

      if (error) {
        console.error("Insertion error details:", error);
        throw error;
      }

      console.log("Email saved successfully:", data);

      toast({
        title: "Erfolgreich angemeldet!",
        description: "Wir melden uns, sobald Nugget verfügbar ist.",
      });
      
      // Send confirmation email
      await sendConfirmationEmail(email);
      
      setEmail("");
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
        <button
          type="submit"
          aria-label="Submit email"
          className={`flex items-center justify-center cursor-pointer bg-[#0C0C36] hover:bg-[#0C0C36]/80 transition-colors px-5 py-2.5 rounded-[50px] whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shrink-0`}
          disabled={isSubmitting}
        >
          <span className="text-[#F1F0FB] text-base font-fredoka font-normal mr-2">
            Los geht's!
          </span>
          <svg width="16" height="16" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3333 4.32043L20 9.8621M20 9.8621L13.3333 15.4038M20 9.8621L4 9.8621" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {!isValid && (
          <p className="absolute -bottom-6 left-6 text-xs text-red-500">
            Bitte gib eine gültige E-Mail-Adresse ein.
          </p>
        )}
      </form>
    </div>
  );
};

export default EmailSignupForm;
