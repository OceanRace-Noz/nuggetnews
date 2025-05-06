
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEmailSignup } from "@/hooks/use-email-signup";
import { EmailInput } from "./EmailInput";
import { SubmitButton } from "./SubmitButton";

interface EmailSignupFormProps {
  className?: string;
}

export const EmailSignupForm: React.FC<EmailSignupFormProps> = ({ className }) => {
  const isMobile = useIsMobile();
  const {
    email,
    isValid,
    isSubmitting,
    handleEmailChange,
    handleSubmit
  } = useEmailSignup();

  return (
    <div className="px-6 w-full">
      <form 
        onSubmit={handleSubmit} 
        className={`flex flex-row items-center justify-between gap-2 border bg-[rgba(29,29,29,0.5)] p-2 rounded-[50px] border-solid border-[#C7881F] w-full max-w-[600px] mx-auto shadow-[0px_0px_12px_0px_rgba(234,174,51,0.7)] hover:shadow-[0px_0px_12px_2px_rgba(234,174,51,1)] transition-shadow ${className}`}
        aria-label="Email signup form"
      >
        <EmailInput 
          email={email}
          isValid={isValid}
          isSubmitting={isSubmitting}
          onChange={handleEmailChange}
        />
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default EmailSignupForm;
