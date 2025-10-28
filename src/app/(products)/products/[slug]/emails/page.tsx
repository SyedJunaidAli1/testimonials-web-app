"use client";
import { Spinner } from "@/components/ui/spinner";
import { getSentEmailsForTestimonial } from "@/server/sentEmails";
import { getTestimonials } from "@/server/testimonials";
import { useQuery } from "@tanstack/react-query";
import { Inbox, Mails } from "lucide-react";
import { use } from "react";

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  const { data: testimonial } = useQuery({
    queryKey: ["testimonial", slug],
    queryFn: async () => await getTestimonials(slug),
  });

  const testimonialId = testimonial?.[0]?.id;

  const {
    data: sentEmails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sentEmails", testimonialId],
    queryFn: async () => await getSentEmailsForTestimonial(testimonialId),
    enabled: !!testimonialId,
  });

  const emailCount = sentEmails?.length ?? 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong while fetching data...</p>;
  }

  return (
    <main>
      {/* === Main content === */}
      <section className="flex-1 p-8">
        <header className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex gap-3 items-center">
            <Mails className="text-primary" />
            <div>
              <p className="font-medium">Emails Sent</p>
              <span className="text-primary">{emailCount}</span>
            </div>
          </div>
        </header>
      </section>

      <div>
        {!sentEmails || sentEmails.length === 0 ? (
          <section className="flex flex-col items-center justify-center px-2 py-6">
            <Inbox size={50} className="" />
            <p className="text-gray-500 mt-6">No emails found</p>
          </section>
        ) : (
          <div className="max-w-3xl mx-auto grid gap-6">
            {sentEmails.map((e) => (
              <div
                key={e.id}
                className="border border-border bg-card/60 backdrop-blur-md rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <h3 className="font-semibold text-lg">{e.subject}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  To: {e.recipientEmail}
                </p>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {e.content}
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Sent on {new Date(e.sentAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
