"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function SocialProofEmbedDialog({
  slug,
}: {
  slug: string;
}) {
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("120px");
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(process.env.NEXT_PUBLIC_SELF_URL || window.location.origin);
  }, []);

  const embedUrl = `${baseUrl}/embed/social?slug=${slug}`;

  const iframeCode = `<iframe src="${embedUrl}" width="${width}" height="${height}" style="border:none;border-radius:12px;overflow:hidden;"></iframe>`;

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Code />
          Get Embed
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Embed Social Proof Widget</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Customize and copy your embed code.
          </p>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs">Width</label>
              <Input value={width} onChange={(e) => setWidth(e.target.value)} />
            </div>
            <div className="w-32">
              <label className="text-xs">Height</label>
              <Input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="border rounded-md overflow-hidden">
            <iframe
              src={embedUrl}
              style={{
                width,
                height,
                border: "none",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            />
          </div>

          {/* iFrame Embed */}
          <div>
            <p className="text-sm font-medium mb-1">iFrame Embed</p>
            <Textarea
              readOnly
              value={iframeCode}
              className="font-mono text-xs h-28"
            />
            <Button onClick={() => copy(iframeCode)} className="mt-2" size="sm">
              <Copy size={14} /> Copy
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => window.open(embedUrl, "_blank")}
          >
            <ExternalLink size={14} /> Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
