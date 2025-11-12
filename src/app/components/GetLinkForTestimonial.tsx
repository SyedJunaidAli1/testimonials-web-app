"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Share2, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

type GetLinkForTestimonialProps = {
  testimonialId: string;
};

export function GetLinkForTestimonial({
  testimonialId,
}: GetLinkForTestimonialProps) {
  const [copied, setCopied] = useState(false);

  // ✅ Construct the embed URL dynamically
  const baseUrl = process.env.NEXT_PUBLIC_SELF_URL || "http://localhost:3000";
  const embedUrl = `${baseUrl}/embed/single?id=${testimonialId}`;

  // ✅ Full iframe embed code for copying
  const embedCode = `<iframe
  src="${embedUrl}"
  width="100%"
  height="400px"
  scrolling="auto"
  style={{ border: "none", borderRadius: "10px" }}
></iframe>`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("✅ Embed code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("❌ Failed to copy");
    }
  };

  const handleOpen = () => {
    window.open(embedUrl, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <Share2 size={16} /> Share
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Testimonial</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Copy the embed code below or preview the testimonial.
          </p>
        </DialogHeader>

        {/* === Live Preview === */}
        <div className="mt-4 border rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            className="w-full h-[250px] border-none"
            loading="lazy"
          />
        </div>

        {/* === Copyable Embed Code === */}
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Embed code</p>
          <div className="relative">
            <Textarea
              readOnly
              className="font-mono text-xs resize-none h-[120px]"
              value={embedCode}
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => handleCopy(embedCode)}
            >
              {copied ? "Copied!" : <Copy size={14} />}
            </Button>
          </div>
        </div>

        {/* === Footer Buttons === */}
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button onClick={handleOpen}>
            <ExternalLink size={16} className="mr-2" /> Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
