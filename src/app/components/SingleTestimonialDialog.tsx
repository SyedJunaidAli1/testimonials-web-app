import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SingleTestimonialDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="flex gap-2 items-center justify-center">
          <Code size={20} className="text-primary" />
          Single testimonial
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Embed a single testimonial
            </DialogTitle>
            <DialogDescription>
              Aside from Wall of Love, you have the option to easily embed a
              video or text testimonial to your website. Read our instructions
              here.
            </DialogDescription>
          </DialogHeader>
          <Link href={`/help`}>
            <Card className="hover:border-primary">
              <CardContent className="flex justify-center">
                <Image
                  src="/image-holder.png"
                  alt="testimonial-demo"
                  width={250}
                  height={250}
                />
              </CardContent>
              <CardFooter>
                <p className="w-full text-center">Single text Testimonial</p>
              </CardFooter>
            </Card>
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SingleTestimonialDialog;
