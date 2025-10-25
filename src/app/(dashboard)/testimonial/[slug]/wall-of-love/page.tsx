"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Spinner } from "@/components/ui/spinner";
import { getSpaceBySlug } from "@/server/spaces";
import { getLikedTestimonials } from "@/server/testimonials";
import { useQuery } from "@tanstack/react-query";
import { LinkIcon, List, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["testimonials", slug],
    queryFn: async () => await getLikedTestimonials(slug),
  });

  const { data: space } = useQuery({
    queryKey: ["space", slug],
    queryFn: async () => await getSpaceBySlug(slug),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong while fetching data...</p>;
  }

  return (
    <main>
      <section className="flex flex-col items-center justify-center gap-4 px-2 py-8">
        <h2 className="text-6xl font-bold text-center">
          Wall of love for {space?.spacename}
        </h2>
        <div className="flex flex-col items-center justify-center">
          <Link href={`/testimonial/${slug}`}>
            <Button>Submit your testimonial</Button>
          </Link>
          <Link href={`/dashboard`}>
            <Button variant="link">Build you own wall? it's free 👉</Button>
          </Link>
        </div>
      </section>

      <section className="p-6">
        {!testimonials || testimonials.length === 0 ? (
          <section className="flex flex-col items-center justify-center px-2 py-10 text-center">
            <p className="text-xl font-medium mb-3">
              No testimonials added to the wall
            </p>
            <List size={60} className="text-muted-foreground" />
          </section>
        ) : (
          <section
            className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        gap-6
        
      "
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="
            border rounded-xl shadow-sm 
            bg-card hover:shadow-md 
            transition-all duration-200 
            p-5 flex flex-col justify-between
            hover:-translate-y-1
          "
              >
                {/* Header Section */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={t.imageUrl || ""} alt={t.responseName} />
                    <AvatarFallback>
                      {t.responseName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <h3 className="font-semibold text-lg">
                      {t.responseName || "Anonymous"}
                    </h3>
                    {t.responseTitle && (
                      <p className="text-sm text-muted-foreground">
                        {t.responseTitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                  {t.responseMessage || "No message provided."}
                </p>

                {/* Contact Info */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  {t.responseEmail && (
                    <div className="flex items-center gap-2">
                      <Mail size={15} /> <span>{t.responseEmail}</span>
                    </div>
                  )}
                  {t.responseAddress && (
                    <div className="flex items-center gap-2">
                      <MapPin size={15} /> <span>{t.responseAddress}</span>
                    </div>
                  )}
                  {t.responseSocialLink && (
                    <div className="flex items-center gap-2">
                      <LinkIcon size={15} />
                      <Link
                        href={t.responseSocialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-primary"
                      >
                        {t.responseSocialLink}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  {t.responseStars && (
                    <div className="flex flex-col items-center gap-3">
                      <Rating defaultValue={t.responseStars} readOnly>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <RatingButton
                            className="text-yellow-500"
                            key={index}
                          />
                        ))}
                      </Rating>
                    </div>
                  )}
                  <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </section>
    </main>
  );
};

export default page;
