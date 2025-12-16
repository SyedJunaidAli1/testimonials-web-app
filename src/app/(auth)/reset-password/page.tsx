import { GalleryVerticalEnd } from "lucide-react";
import { ResetPassForm } from "@/components/resetpass-form";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Password - Testimonia",
  description:
    "Testimonia helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Testimonial
        </Link>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Spinner className="size-8 text-primary" />
            </div>
          }
        >
          <ResetPassForm />
        </Suspense>
      </div>
    </div>
  );
}
