
import React from "react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
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
  );
};
