"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, ExternalLink, Heart } from "lucide-react";

type WallEmbedDialogProps = {
  slug: string;
};

export default function WallEmbedDialog({ slug }: WallEmbedDialogProps) {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [width, setWidth] = useState<string>("100%");
  const [height, setHeight] = useState<string>("400px");
  const [copied, setCopied] = useState(false);

  // ensure baseUrl is available on client
  useEffect(() => {
    setBaseUrl(process.env.NEXT_PUBLIC_SELF_URL || window.location.origin);
  }, []);

  const embedUrl = useMemo(
    () => `${baseUrl}/embed/wall?slug=${slug}`,
    [baseUrl, slug],
  );

  const iframeCode = useMemo(
    () =>
      `<iframe src="${embedUrl}" width="${width}" height="${height}" scrolling="auto" style="border:none;border-radius:8px;overflow:hidden" loading="lazy"></iframe>`,
    [embedUrl, width, height],
  );

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`✅ Embed code copied`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleOpenPreview = () => {
    window.open(embedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 items-center justify-center">
        <Heart size={20} className="text-primary" />
        <span className="text-sm sm:text-base">Wall of Love</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2x lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Share Wall of Love</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Customize size, preview live, and copy the embed code.
          </p>
        </DialogHeader>

        {/* Controls */}
        <div className="mt-4">
          {/* Inputs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">Width</label>
              <Input
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100% or 600px"
              />
            </div>

            <div className="flex-1 sm:max-w-30">
              <label className="text-xs text-muted-foreground">Height</label>
              <Input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="400px"
              />
            </div>

            <div className="flex-1 sm:max-w-40">
              <label className="text-xs text-muted-foreground">Presets</label>
              <Select
                onValueChange={(v) => {
                  if (v === "small") {
                    setWidth("100%");
                    setHeight("300px");
                  }
                  if (v === "medium") {
                    setWidth("100%");
                    setHeight("400px");
                  }
                  if (v === "large") {
                    setWidth("100%");
                    setHeight("600px");
                  }
                }}
              >
                <SelectTrigger className="max-h-10 w-full">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <div className="flex items-center justify-between my-2">
              <p className="text-sm font-medium">Live preview</p>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleCopy(iframeCode)}
                >
                  <Copy size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleOpenPreview}
                >
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden w-full">
              <iframe
                src={embedUrl}
                title="Wall of Love preview"
                className="w-full"
                style={{
                  height,
                  border: "none",
                  borderRadius: 8,
                }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Embed Code */}
          <div>
            <p className="text-sm font-medium mb-1">Iframe embed code</p>
            <div className="relative">
              <Textarea
                readOnly
                value={iframeCode}
                className="font-mono text-xs resize-none h-28 pr-20"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(iframeCode)}
              >
                {copied ? "Copied!" : <Copy size={14} />}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="text-sm text-muted-foreground flex flex-col w-full items-center">
            <span>Embed URL:</span>
            <span className="font-mono">{embedUrl}</span>{" "}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
