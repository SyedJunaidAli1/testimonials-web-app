"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { sendEmailToUser } from "@/server/sentEmails";
import { ArrowBigRight, Loader2, Mail } from "lucide-react";

type SendTextDialogProps = {
  testimonialId: string;
  recipientEmail: string;
  user: string;
};

export function SendTextDialog({
  testimonialId,
  recipientEmail,
  user,
}: SendTextDialogProps) {
  const [subject, setSubject] = useState(`Thank you, ${user}`);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!subject || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await sendEmailToUser({
        testimonialId,
        recipientEmail,
        subject,
        content,
      });
      if (res.success) {
        toast.success("Message sent successfully!");
        setContent("");
      } else {
        toast.error("Failed to send message");
      }
    } catch (err) {
      toast.error("Something went wrong while sending");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-4">
          <ArrowBigRight />
          Message {user}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Send Message to {user}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Write a personalized message that will be sent to{" "}
            <span className="font-medium text-foreground">
              {recipientEmail}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Hi ${user},\n\nThank you for your testimonial...`}
              rows={6}
              className="resize-none focus-visible:ring-primary"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSend}
            disabled={loading}
            className="w-full font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-4 h-4" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
