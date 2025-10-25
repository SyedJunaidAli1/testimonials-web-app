"use server";
import { db } from "@/db/drizzle";
import { sentEmails } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Resend } from "resend";

export async function sendEmailToUser({
    testimonialId,
    recipientEmail,
    subject,
    content,
}: {
    testimonialId: string;
    recipientEmail: string;
    subject: string;
    content: string;
}) {
    if (!testimonialId || !recipientEmail || !subject || !content) {
        throw new Error("Missing required fields");
    }
    const resend = new Resend()

    await resend.emails.send({
        from: "Your App <noreply@todothat.space>",
        to: recipientEmail,
        subject,
        html: `<p>${content}</p>`,
    });

    await db.insert(sentEmails).values({
        testimonialId,
        recipientEmail,
        subject,
        content,
    });

    return { success: true };
}


export async function getSentEmailsForTestimonial(testimonialId: string) {
  return await db
    .select()
    .from(sentEmails)
    .where(eq(sentEmails.testimonialId, testimonialId))
    .orderBy(desc(sentEmails.sentAt));
}
