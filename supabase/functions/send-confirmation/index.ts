
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
  id: string; // We now need the ID to generate a verification link
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, id }: EmailRequest = await req.json();
    
    if (!email || typeof email !== "string" || !id) {
      return new Response(
        JSON.stringify({ error: "Email and ID are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Sending confirmation email to: ${email} with id: ${id}`);

    // For development - always send to the account owner's email
    // In production with a verified domain, you can send to any email
    const developmentMode = true; // Set to false when you have a verified domain
    const toEmail = developmentMode ? "nuggetnews.de@gmail.com" : email;

    // Get the base URL from the request URL or fallback to a default
    const baseUrl = new URL(req.url).origin || "https://nugget.news";
    
    // Create a verification link with the user's ID as a parameter
    const verificationLink = `${baseUrl}/verify?id=${id}`;
    
    console.log(`Generated verification link: ${verificationLink}`);
    
    const { data, error } = await resend.emails.send({
      from: "Nugget <onboarding@resend.dev>",
      to: [toEmail],
      subject: "Bitte bestätige deine Anmeldung zur Nugget Warteliste!",
      html: `
        <div style="font-family: 'Fredoka', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0C0C36; font-size: 24px;">Bestätige deine Email-Adresse</h1>
          <p style="color: #333; font-size: 16px; margin: 20px 0;">
            Vielen Dank für dein Interesse an Nugget - dem kompakten News-Format für deinen Alltag.
          </p>
          <p style="color: #333; font-size: 16px; margin: 20px 0;">
            Um deine Anmeldung zur Warteliste zu bestätigen, klicke bitte auf den folgenden Link:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #E7AB31; color: #0C0C36; font-weight: 500; font-size: 16px; text-decoration: none; padding: 12px 25px; border-radius: 50px; display: inline-block;">Email bestätigen</a>
          </div>
          <p style="color: #333; font-size: 16px; margin: 20px 0;">
            Wenn du dich nicht bei Nugget angemeldet hast, kannst du diese E-Mail ignorieren.
          </p>
          <p style="color: #333; font-size: 16px; margin: 20px 0;">
            Falls der Button nicht funktioniert, kopiere diesen Link in deinen Browser: <br>
            <a href="${verificationLink}" style="color: #E7AB31; word-break: break-all;">${verificationLink}</a>
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
        actualRecipient: toEmail,
        verificationLink // Include the link in the response for testing
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
