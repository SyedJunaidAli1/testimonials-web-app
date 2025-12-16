import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: "noreply@todothat.space",
        to: user.email,
        subject: "Reset your Testimonia password",
        html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 32px;">
                <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">

                  <h2 style="margin: 0 0 12px; color: #111827;">
                    Reset your password
                  </h2>

                  <p style="margin: 0 0 16px; color: #374151; font-size: 14px;">
                    Hi ${user.name || "there"},
                  </p>

                  <p style="margin: 0 0 20px; color: #374151; font-size: 14px; line-height: 1.5;">
                    We received a request to reset your Testimonia account password.
                    Click the button below to set a new password.
                  </p>

                  <a href="${url}"
                     style="
                       display: inline-block;
                       background-color: #1447e6;
                       color: #ffffff;
                       padding: 12px 20px;
                       border-radius: 8px;
                       text-decoration: none;
                       font-weight: 600;
                       font-size: 14px;
                     ">
                    Reset password
                  </a>

                  <p style="margin: 20px 0 0; color: #6b7280; font-size: 13px;">
                    This link will expire soon for security reasons.
                    If you didn’t request this, you can safely ignore this email.
                  </p>

                  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

                  <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                    Testimonia • Secure task & testimonial management
                  </p>
                </div>
              </div>
            `,
        text: `
        Reset your Testimonia password

        Hi ${user.name || "there"},

        We received a request to reset your Testimonia account password.

        Open the link below to set a new password:
        ${url}

        This link will expire soon. If you didn’t request a password reset, you can safely ignore this email.

        — Testimonia
            `,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  plugins: [nextCookies()],
});
