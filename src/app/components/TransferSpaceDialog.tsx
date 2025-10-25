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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { transferSpaceAction } from "@/server/spaces";
import { FolderSync } from "lucide-react";
import { Label } from "@/components/ui/label";

export function TransferSpaceDialog({
  spaceId,
  userId,
}: {
  spaceId: string;
  userId: string;
}) {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleTransfer = () => {
    startTransition(async () => {
      const res = await transferSpaceAction({
        spaceId,
        targetEmail: email,
        userId,
      });

      if (res.success) {
        toast.success(res.message || "Space transferred successfully!");
        setEmail("");
      } else {
        toast.error(res.message || "Failed to transfer space.");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center justify-center">
          <FolderSync size={20} className="text-primary" />
          <span>Transfer space to other account</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Space</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to transfer to another account? This action
            cannot be undone.
          </p>
        </DialogHeader>

        <Label>Email</Label>
        <Input
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <DialogFooter className="mt-4">
          <Button onClick={handleTransfer} disabled={isPending || !email}>
            {isPending ? "Transferring..." : "Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
