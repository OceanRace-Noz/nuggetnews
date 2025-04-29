
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: EmailRequest = await req.json();
    
    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Sending confirmation email to: ${email}`);

    // For development - always send to the account owner's email
    // In production with a verified domain, you can send to any email
    const developmentMode = true; // Set to false when you have a verified domain
    const toEmail = developmentMode ? "nuggetnews.de@gmail.com" : email;

    const { data, error } = await resend.emails.send({
      from: "Nugget <onboarding@resend.dev>",
      to: [toEmail],
      subject: "Willkommen auf der Nugget Warteliste!",
      html: `
        <div style="font-family: 'Fredoka', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0C0C36; font-size: 24px;">Deine Anmeldung war erfolgreich!</h1>
          <p style="color: #333; font-size: 16px; margin: 20px 0;">
            Vielen Dank für dein Interesse an Nugget - dem kompakten News-Format für deinen Alltag.
          </p>
          <p style="color: #333; font-size: 16px; margin: 20px 0;">
            Wir werden dich bald mit weiteren Informationen kontaktieren.
          </p>
          <div style="background: linear-gradient(45deg, #E7AB31, #0C0C36); height: 4px; margin: 30px 0;"></div>
          <p style="color: #666; font-size: 14px;">
            Du erhältst diese Email, weil du dich auf 
            <a href="https://nugget.news" style="color: #E7AB31; text-decoration: none;">nugget.news</a> 
            angemeldet hast.
          </p>
          <div style="color: #999; font-size: 12px; margin-top: 20px;">
            ${developmentMode ? `Original recipient: ${email}` : ''}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Email sent successfully:", data);
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Confirmation email sent",
        developmentMode,
        actualRecipient: toEmail
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
