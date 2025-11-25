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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateTrustedMessage } from "@/server/spaces";
import { useQueryClient } from "@tanstack/react-query";

export function EditTrustedMessageDialog({
  spaceId,
  initialValue,
  slug,
}: {
  spaceId: string;
  initialValue: string;
  slug: string;
}) {
  const [msg, setMsg] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateTrustedMessage(spaceId, msg);
        queryClient.invalidateQueries({
               queryKey: ["spaces", slug],   // same key you use in useSpaceBySlug
             });
        toast.success("Message updated!");
      } catch (err: any) {
        toast.error("Failed to update");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Trusted Message</DialogTitle>
        </DialogHeader>

        <Textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows={4}
        />

        <DialogFooter>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
