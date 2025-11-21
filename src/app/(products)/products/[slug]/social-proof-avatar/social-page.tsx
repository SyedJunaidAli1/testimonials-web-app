"use client";
import { useGetTestimonials } from "@/app/queries/testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { MessageSquareText } from "lucide-react";

const SocialPage = ({ slug }: { slug: string }) => {
  const { data: testimonials, isLoading, error } = useGetTestimonials(slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  if (error) return <p>Something went wrong while fetching data...</p>;

  return (
    <section className="flex-1 p-8">
      <header className="flex justify-between items-center border-b pb-4 mb-6">
        <div className="flex gap-3 items-center">
          <MessageSquareText className="text-primary" />
          <div>
            <p className="font-medium">Text credits</p>
            <span className="text-primary">{testimonials?.length || 0}</span>
          </div>
        </div>
      </header>

      {/* TRUSTED MESSAGE */}
      <p className="text-lg font-semibold mb-4">
        100% trusted by users and customers
      </p>

      {/* AVATAR STRIP */}
      <div className="flex items-center -space-x-3">
        {testimonials?.slice(0, 12).map((t) => (
          <Avatar
            key={t.id}
            className="ring-2 ring-background h-12 w-12 border border-border shadow-sm"
          >
            <AvatarImage src={t.imageUrl || ""} alt={t.responseName} />
            <AvatarFallback>
              {t.responseName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </section>
  );
};

export default SocialPage;
