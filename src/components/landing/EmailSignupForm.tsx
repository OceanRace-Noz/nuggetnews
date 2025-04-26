
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
      const { error } = await supabase
        .from('nugget-wartelist-emails')
        .insert([{ email }]);

      if (error) throw error;

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
      className={`flex items-center gap-2.5 border shadow-[0px_0px_12px_0px_rgba(234,174,51,0.55)] bg-[rgba(29,29,29,0.5)] px-5 py-[5px] rounded-[50px] border-solid border-[#C7881F] ${className}`}
      aria-label="Email signup form"
    >
      <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder="Gib deine E-Mail ein"
        className={`bg-transparent text-[rgba(169,169,169,1)] text-xl font-fredoka font-normal outline-none flex-1 min-w-0 ${!isValid ? "border-b border-red-500" : ""}`}
        aria-label="Email input"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        aria-label="Submit email"
        className="flex items-center cursor-pointer bg-[#09202F] hover:bg-[#0c2e43] transition-colors px-5 py-[15px] rounded-[50px] disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        <span className="text-[rgba(242,239,239,1)] text-xl font-fredoka font-medium mr-2">
          Los geht's!
        </span>
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3333 4.32043L20 9.8621M20 9.8621L13.3333 15.4038M20 9.8621L4 9.8621" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {!isValid && (
        <p className="absolute -bottom-6 left-6 text-red-500 text-sm">
          Bitte gib eine gültige E-Mail-Adresse ein.
        </p>
      )}
    </form>
  );
};
