
import React from "react";

interface EmailInputProps {
  email: string;
  isValid: boolean;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailInput: React.FC<EmailInputProps> = ({ 
  email, 
  isValid, 
  isSubmitting, 
  onChange 
}) => {
  return (
    <>
      <input
        type="text"
        value={email}
        onChange={onChange}
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
    </>
  );
};
