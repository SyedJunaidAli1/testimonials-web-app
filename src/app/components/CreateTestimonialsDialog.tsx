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
  collectName: string;
  collectEmail: string;
  collectTitle: string;
}

export default function CreateTestimonialsDialog({
  spaceId,
  customBtnColor,
  spaceLogo,
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

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-left gap-4 pace-y-4 mt-4"
        >
          <div>
            <img src={spaceLogo} width={45} height={45} alt="space logo" />
          </div>

          <div>
            <ul className="list-disc ml-6">
              <li></li>
            </ul>
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your testimonial..."
              required
            />
          </div>

          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
