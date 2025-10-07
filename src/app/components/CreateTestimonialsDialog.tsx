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
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Trash, Upload } from "lucide-react";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createTestimonial } from "@/server/testimonials";
import { toast } from "sonner";

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
  const [stars, setStars] = useState<number | null>(3);
  const [approved, setApproved] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // ✅ append the image file
    if (imageFile) {
      formData.append("photo", imageFile);
    }
    formData.append("spaceId", spaceId);
    formData.append("isApproved", approved.toString());

    try {
      await createTestimonial(formData);
      toast.success("✅ Testimonial submitted!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // ✅ now defined
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

        <form onSubmit={handleSubmit} className="space-y-4 px-2 py-4">
          {spaceLogo && (
            <div>
              <Avatar>
                <AvatarImage src={spaceLogo} alt="spacelogo" />
                <AvatarFallback>sl</AvatarFallback>
              </Avatar>
            </div>
          )}
          {[question1, question2, question3, question4, question5].some(
            Boolean
          ) && (
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
            <div className="flex flex-col items-start gap-2">
              <Label>Rating</Label>
              <Rating defaultValue={3} onValueChange={setStars}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton key={index} className="text-yellow-500" />
                ))}
              </Rating>
              <input type="hidden" name="stars" value={stars ?? ""} />
            </div>
          )}

          <div>
            <Label>Message</Label>
            <Textarea
              name="message"
              placeholder="Type your message here."
              required
            />
          </div>

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
              <Input type="url" name="socialLink" />
            </div>
          )}

          {/* image upload  */}
          <div className="flex flex-col gap-3">
            <Label>Upload Your Photo</Label>
            {imagePreview ? (
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={imagePreview}
                      alt="preview"
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-1" /> Change
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleRemoveImage}
                  >
                    <Trash className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-1" /> Upload Photo
              </Button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="isApproved"
              checked={approved}
              onCheckedChange={(val) => setApproved(!!val)}
              defaultChecked
            />
            <div className="grid gap-2">
              <Label htmlFor="isApproved">Approved</Label>
              <p className="text-muted-foreground text-sm">
                By clicking this checkbox, you agree to use this testimonial
                across social channels and other marketing efforts
              </p>
            </div>
          </div>

          <Button
            type="submit"
            variant="outline"
            className="w-full"
            disabled={loading}
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
