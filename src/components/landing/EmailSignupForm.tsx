import React, { useState } from "react";
interface EmailSignupFormProps {
  className?: string;
}
export const EmailSignupForm: React.FC<EmailSignupFormProps> = ({
  className
}) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValid(true);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsValid(false);
      return;
    }

    // Here you would typically send the email to your backend
    console.log("Submitting email:", email);

    // Reset form after successful submission
    setEmail("");
    alert("Danke für deine Anmeldung! Wir melden uns bald bei dir.");
  };
  return <form onSubmit={handleSubmit} className={`flex items-center gap-2.5 border shadow-[0px_0px_12px_0px_rgba(234,174,51,0.55)] bg-[rgba(29,29,29,0.5)] px-5 py-[5px] rounded-[50px] border-solid border-[#C7881F] ${className}`} aria-label="Email signup form">
      <input type="text" value={email} onChange={handleEmailChange} placeholder="Gib deine E-Mail ein" className={`bg-transparent text-[rgba(169,169,169,1)] text-xl font-normal outline-none ${!isValid ? "border-b border-red-500" : ""}`} aria-label="Email input" />
      <button type="submit" aria-label="Submit email" className="flex items-right cursor-pointer bg-[#09202F] px-[10px] py-[15px] rounded-[50px] hover:bg-[#0c2e43] transition-colors">
        <div className="flex items-center">
          <span className="text-[rgba(242,239,239,1)] text-xl font-medium mr-2">
            Los geht's!
          </span>
          <div>
            <div dangerouslySetInnerHTML={{
            __html: '<svg id="I209:1515;209:1335" layer-name="arrow-right" width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon" style="width: 24px; height: 19px"> <path d="M13.3333 4.32043L20 9.8621M20 9.8621L13.3333 15.4038M20 9.8621L4 9.8621" stroke="#A9A9A9" stroke-linecap="round" stroke-linejoin="round"></path> </svg>'
          }} />
          </div>
        </div>
      </button>
      {!isValid && <p className="absolute -bottom-6 left-6 text-red-500 text-sm">
          Bitte gib eine gültige E-Mail-Adresse ein.
        </p>}
    </form>;
};
