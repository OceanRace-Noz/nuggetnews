
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailSignupFormProps {
  className?: string;
}

export const EmailSignupForm: React.FC<EmailSignupFormProps> = ({
  className
}) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValid(true);
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
        description: "Wir melden uns bald bei dir.",
      });
      
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
    <form 
      onSubmit={handleSubmit} 
      className={`flex items-center gap-2 w-full max-w-[500px] border shadow-[0px_0px_12px_0px_rgba(234,174,51,0.55)] bg-[rgba(29,29,29,0.5)] px-3 sm:px-5 py-[5px] rounded-[50px] border-solid border-[#C7881F] ${className}`}
      aria-label="Email signup form"
    >
      <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder="Gib deine E-Mail ein"
        className={`bg-transparent text-[rgba(169,169,169,1)] text-base sm:text-xl font-fredoka font-normal outline-none flex-1 min-w-0 ${!isValid ? "border-b border-red-500" : ""}`}
        aria-label="Email input"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        aria-label="Submit email"
        className="flex items-center cursor-pointer bg-[#09202F] hover:bg-[#0c2e43] transition-colors px-3 sm:px-5 py-[12px] sm:py-[15px] rounded-[50px] disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        <span className="text-[rgba(242,239,239,1)] text-sm sm:text-xl font-fredoka font-medium mr-2">
          Los geht's!
        </span>
        <svg width="20" height="16" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6">
          <path d="M13.3333 4.32043L20 9.8621M20 9.8621L13.3333 15.4038M20 9.8621L4 9.8621" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {!isValid && (
        <p className="absolute -bottom-6 left-6 text-red-500 text-xs sm:text-sm">
          Bitte gib eine gültige E-Mail-Adresse ein.
        </p>
      )}
    </form>
  );
};
