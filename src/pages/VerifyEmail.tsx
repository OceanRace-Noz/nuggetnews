
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

  useEffect(() => {
    const verifyEmail = async () => {
      if (!id) {
        setVerificationStatus('error');
        return;
      }

      try {
        // Update the email record to mark it as confirmed
        // Use type assertion to fix the TypeScript error
        const { data, error } = await supabase
          .from('nugget_wartelist_emails')
          .update({ is_confirmed: true } as any)
          .eq('id', id)
          .select();

        if (error || !data || data.length === 0) {
          console.error("Verification error:", error);
          setVerificationStatus('error');
        } else {
          setVerificationStatus('success');
          
          // Start countdown to redirect
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
        }
      } catch (error) {
        console.error("Error during verification:", error);
        setVerificationStatus('error');
      }
    };

    verifyEmail();
  }, [id, navigate]);

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
              Es gab einen Fehler bei der Bestätigung deiner Email-Adresse. Der Link ist möglicherweise abgelaufen oder ungültig.
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
