
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/landing/Header";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [countdown, setCountdown] = useState(5);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!id) {
        console.error("Verification error: No ID provided in the URL");
        setVerificationStatus('error');
        setErrorMessage("Missing ID parameter in the verification link");
        return;
      }

      console.log("Starting verification with ID:", id);

      try {
        // Check if the email exists first
        const { data: emailCheck, error: checkError } = await supabase
          .from('nugget_wartelist_emails')
          .select('*')
          .eq('id', id)
          .single();
        
        if (checkError || !emailCheck) {
          console.error("Email record not found:", checkError);
          setVerificationStatus('error');
          setErrorMessage("Email record not found. The verification link may be invalid or expired.");
          return;
        }
        
        console.log("Found email record:", emailCheck);
        
        // If already confirmed, just show success
        if (emailCheck.is_confirmed) {
          console.log("Email was already confirmed");
          setVerificationStatus('success');
          startRedirectCountdown();
          return;
        }

        // Update the email record to mark it as confirmed
        const { data, error } = await supabase
          .from('nugget_wartelist_emails')
          .update({ is_confirmed: true })
          .eq('id', id)
          .select();

        if (error || !data || data.length === 0) {
          console.error("Verification update error:", error);
          setVerificationStatus('error');
          setErrorMessage(error ? `Error: ${error.message}` : "Failed to update confirmation status");
        } else {
          console.log("Email successfully confirmed:", data);
          setVerificationStatus('success');
          startRedirectCountdown();
        }
      } catch (error) {
        console.error("Error during verification:", error);
        setVerificationStatus('error');
        setErrorMessage("An unexpected error occurred during verification");
      }
    };

    verifyEmail();
  }, [id, navigate]);
  
  const startRedirectCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  };

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-start mx-auto">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom,#E7AB31_0%,#0C0C36_100%)] -z-10" />
      <Header />

      <div className="flex flex-col items-center justify-center gap-6 mt-20 px-6 w-full max-w-[600px] mx-auto text-center">
        {verificationStatus === 'verifying' && (
          <>
            <div className="w-16 h-16 border-4 border-t-[#E7AB31] border-r-[#E7AB31] border-b-[#E7AB31] border-l-transparent rounded-full animate-spin"></div>
            <h1 className="text-[36px] md:text-[48px] text-white font-fredoka font-medium leading-[1.4]">
              Bestätige deine Email...
            </h1>
            <p className="text-[20px] md:text-[24px] text-[#F1F0FB] font-fredoka font-normal leading-[1.5]">
              Wir überprüfen deine E-Mail-Adresse. Bitte warte einen Moment.
            </p>
          </>
        )}

        {verificationStatus === 'success' && (
          <>
            <div className="w-16 h-16 bg-[#E7AB31] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0C0C36" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h1 className="text-[36px] md:text-[48px] text-white font-fredoka font-medium leading-[1.4]">
              Anmeldung erfolgreich!
            </h1>
            <p className="text-[20px] md:text-[24px] text-[#F1F0FB] font-fredoka font-normal leading-[1.5]">
              Vielen Dank für die Bestätigung deiner Email-Adresse. Du bist jetzt auf der Nugget Warteliste.
            </p>
            <p className="text-[16px] text-[#C8C8C9] font-fredoka mt-4">
              Du wirst in {countdown} Sekunden zur Startseite weitergeleitet.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="mt-6 bg-[#0C0C36] hover:bg-[#0C0C36]/80 text-white px-8 py-3 rounded-[50px] font-fredoka transition-colors"
            >
              Zur Startseite
            </button>
          </>
        )}

        {verificationStatus === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h1 className="text-[36px] md:text-[48px] text-white font-fredoka font-medium leading-[1.4]">
              Bestätigung fehlgeschlagen
            </h1>
            <p className="text-[20px] md:text-[24px] text-[#F1F0FB] font-fredoka font-normal leading-[1.5]">
              Es gab einen Fehler bei der Bestätigung deiner Email-Adresse. {errorMessage || "Der Link ist möglicherweise abgelaufen oder ungültig."}
            </p>
            <p className="text-[16px] text-[#C8C8C9] font-fredoka mt-4">
              Fehler-ID: {id || 'nicht verfügbar'}
            </p>
            <button 
              onClick={() => navigate('/')}
              className="mt-6 bg-[#0C0C36] hover:bg-[#0C0C36]/80 text-white px-8 py-3 rounded-[50px] font-fredoka transition-colors"
            >
              Zurück zur Startseite
            </button>
          </>
        )}
      </div>
    </main>
  );
}
