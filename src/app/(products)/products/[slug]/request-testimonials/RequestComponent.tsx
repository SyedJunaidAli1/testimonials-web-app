"use client";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const RequestComponent = ({ slug }: { slug: string }) => {
  const testimonialLink = `http://localhost:3000/testimonial/${slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(testimonialLink);
    toast.success("Link is copied to clipboard");
  };

  return (
    <section>
      <h2 className="font-bold text-3xl leading-12">Request Testimonials</h2>
      <p className="font-medium text-gray-400 mb-4">
        Share this link with your clients or customers to request testimonials
      </p>

      <div className="bg-muted border border-border px-4 py-6 rounded-md flex flex-col gap-3">
        <span className="font-medium">On our hosted page</span>
        <p className="text-gray-500 break-all">{testimonialLink}</p>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="size-4 mr-2" />
            Copy link
          </Button>

          <Button variant="default" asChild>
            <Link
              href={testimonialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="size-4 mr-2" />
              View page
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RequestComponent;
