"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Pen } from "lucide-react";

interface CreateTestimonialsProps {
  spaceId: string;
  customBtnColor: string;
  spaceLogo: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  customMessage: string;
  collectName: boolean;
  collectEmail: boolean;
  collectTitle: boolean;
  collectStar: boolean;
  collectAddress: boolean;
  collectSocialLink: boolean;
}

export default function CreateTestimonialsDialog({
  spaceId,
  customBtnColor,
  spaceLogo,
  customMessage,
  collectEmail,
  collectName,
  collectStar,
  collectTitle,
  collectAddress,
  collectSocialLink,
  question1,
  question2,
  question3,
  question4,
  question5,
}: CreateTestimonialsProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    try {
      // server action will go here
      console.log({ spaceId, name, message });
      // await createTestimonial({ spaceId, name, message });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-64" style={{ background: customBtnColor }}>
          <Pen /> Submit Testimonial
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write text testimonial to</DialogTitle>
          <DialogDescription>
            Share your feedback for this space
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {spaceLogo && (
            <div>
              <img src={spaceLogo} width={45} height={45} alt="space logo" />
            </div>
          )}

          {(question1 || []).length > 0 && (
            <div>
              <Label>Questions</Label>
              <ul className="list-disc ml-6">
                {[question1, question2, question3, question4, question5]
                  .filter(Boolean)
                  .map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
              </ul>
            </div>
          )}

          {collectStar && (
            <div>
              <Label>Rating (stars)</Label>
              <Input type="number" min="1" max="5" name="stars" required />
            </div>
          )}
          {customMessage && (
            <div>
              <Label>Message</Label>
              <Textarea
                name="message"
                placeholder="Type your message here."
                required
              />
            </div>
          )}

          {collectName && (
            <div>
              <Label>Your Name</Label>
              <Input type="text" name="name" required />
            </div>
          )}

          {collectAddress && (
            <div>
              <Label>Address</Label>
              <Input type="text" name="address" />
            </div>
          )}

          {collectEmail && (
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" />
            </div>
          )}

          {collectTitle && (
            <div>
              <Label>Title</Label>
              <Input type="text" name="title" />
            </div>
          )}

          {collectSocialLink && (
            <div>
              <Label>Social Link</Label>
              <Input type="url" name="social" />
            </div>
          )}

          {/* Your message textarea */}
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
