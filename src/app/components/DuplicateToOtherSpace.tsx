"use client";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getSpaces } from "@/server/spaces"; // ✅ your server action
import { duplicateTestimonialToOtherSpace } from "@/server/testimonials"; // ✅ server action for duplicating

export function DuplicateTestimonialDialog({
  testimonialId,
}: {
  testimonialId: string;
}) {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // ✅ Fetch user's spaces from your server action
  const { data: spaces = [], isLoading } = useQuery({
    queryKey: ["spaces"],
    queryFn: async () => await getSpaces(),
  });

  const handleDuplicate = () => {
    if (!selectedSpaceId) {
      toast.error("Please select a space first");
      return;
    }

    startTransition(async () => {
      const res = await duplicateTestimonialToOtherSpace({
        testimonialId,
        targetSpaceId: selectedSpaceId,
      });

      if (res.success) {
        toast.success("✅ Testimonial duplicated successfully!");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-4">
          <Copy size={16} />
          <span> Duplicate to other space</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Duplicate Testimonial</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select the space where you want to duplicate this testimonial.
          </p>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : spaces.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            You don't have any other spaces yet.
          </p>
        ) : (
          <Select onValueChange={setSelectedSpaceId}>
            <SelectTrigger className=" w-full">
              <SelectValue placeholder="Select a space" />
            </SelectTrigger>
            <SelectContent>
              {spaces.map((s: any) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.spacename}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <DialogFooter className="mt-4">
          <Button
            onClick={handleDuplicate}
            disabled={!selectedSpaceId || isPending}
          >
            {isPending ? "Duplicating..." : "Duplicate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
