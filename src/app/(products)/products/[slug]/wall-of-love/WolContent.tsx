"use client";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const WolContent = ({ slug }: { slug: string }) => {
  const wallOfLove = `http://localhost:3000/testimonial/${slug}/wall-of-love`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(wallOfLove);
    toast.success("Link is copied to clipboard");
  };

  return (
    <section>
      <h2 className="font-bold text-3xl leading-12">Wall of Love</h2>
      <p className="font-medium text-gray-400 mb-4">
        View and share your Wall of Love
      </p>

      <div className="bg-muted border border-border px-4 py-6 rounded-md flex flex-col gap-3">
        <span className="font-medium">On our hosted page</span>
        <p className="text-gray-500 break-all">{wallOfLove}</p>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="size-4 mr-2" />
            Copy link
          </Button>

          <Button variant="default" asChild>
            <Link href={wallOfLove} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4 mr-2" />
              View page
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WolContent;
