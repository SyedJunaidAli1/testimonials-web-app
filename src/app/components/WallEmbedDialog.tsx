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
  spaceId: string;
};

export default function WallEmbedDialog({ spaceId }: WallEmbedDialogProps) {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [width, setWidth] = useState<string>("100%");
  const [height, setHeight] = useState<string>("400px");
  const [copied, setCopied] = useState(false);

  // ensure baseUrl is available on client
  useEffect(() => {
    setBaseUrl(process.env.NEXT_PUBLIC_SELF_URL || window.location.origin);
  }, []);

  const embedUrl = useMemo(
    () => `${baseUrl}/embed/wall?spaceId=${spaceId}`,
    [baseUrl, spaceId],
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
      <DialogTrigger className="flex gap-2 items-center justify-center ">
        <Heart size={20} className="text-primary" />
        Wall of Love
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Wall of Love</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Copy embed code or preview the widget. Customize width and height
            before copying.
          </p>
        </DialogHeader>

        {/* Controls */}
        <div className="mt-4 grid gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">Width</label>
              <Input
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="100% or 600px"
              />
            </div>
            <div className="w-32">
              <label className="text-xs text-muted-foreground">Height</label>
              <Input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="400px"
              />
            </div>

            <div className="w-40">
              <label className="text-xs text-muted-foreground">
                Quick sizes
              </label>
              <Select
                onValueChange={(v) => {
                  if (v === "small") {
                    setWidth("90%");
                    setHeight("300px");
                  } else if (v === "medium") {
                    setWidth("100%");
                    setHeight("400px");
                  } else if (v === "large") {
                    setWidth("100%");
                    setHeight("600px");
                  }
                }}
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Preset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Live preview */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
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

            <div className="border border-border rounded-md overflow-hidden">
              <iframe
                src={embedUrl}
                title="Wall of Love preview"
                style={{
                  width: width,
                  height: height,
                  border: "none",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Embed code */}
          <div className="mt-3">
            <p className="text-sm font-medium mb-1">Iframe embed</p>
            <div className="relative">
              <Textarea
                readOnly
                value={iframeCode}
                className="font-mono text-xs resize-none h-[96px]"
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
          <div className="text-sm text-muted-foreground flex flex-col w-full">
            <span>Embed URL:</span>
            <span className="font-mono mt-1">{embedUrl}</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
