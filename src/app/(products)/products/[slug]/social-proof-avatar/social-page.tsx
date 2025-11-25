"use client";
import { EditTrustedMessageDialog } from "@/app/components/EditTrustedMessageDialog";
import SocialProofEmbedDialog from "@/app/components/SocialProofEmbedDialog";
import { useSpaceBySlug } from "@/app/queries/spaces";
import { useGetLikedTestimonials } from "@/app/queries/testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { MessageSquareText } from "lucide-react";

const SocialPage = ({ slug }: { slug: string }) => {
  const {
    data: testimonials,
    isLoading,
    error,
  } = useGetLikedTestimonials(slug);
  const { data: space } = useSpaceBySlug(slug);

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

      <div className="flex flex-col items-center justify-between gap-2">
        {/* TRUSTED MESSAGE */}
        <p className="text-lg font-semibold mt-4">
          {space?.trustedMessage || "100% trusted by users and customers"}
        </p>

        {/* AVATAR STRIP */}
        <div className="flex justify-between  -space-x-3">
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
        <div className="flex gap-2 items-center justify-center mt-4">
          <SocialProofEmbedDialog spaceId={space?.id || "no space available"} />
          <EditTrustedMessageDialog
            spaceId={space?.id}
            initialValue={space?.trustedMessage}
            slug={space?.slug}
          />
        </div>
      </div>
    </section>
  );
};

export default SocialPage;
