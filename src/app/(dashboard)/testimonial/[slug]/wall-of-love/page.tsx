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
import { InfiniteSlider } from "../../../../../../components/motion-primitives/infinite-slider";

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
          <div className="flex flex-col gap-10">
            <InfiniteSlider speedOnHover={25} speed={75} gap={24}>
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
            border rounded shadow-sm
            bg-card hover:shadow-md
            transition-all duration-200
            p-4 flex flex-col items-center
            hover:-translate-y-1
            max-w-64
          "
                  >
                    {/* Header Section */}
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={t.imageUrl || ""}
                          alt={t.responseName}
                        />
                        <AvatarFallback>
                          {t.responseName?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <h3 className="font-semibold text-lg">
                          {t.responseName || "Anonymous"}
                        </h3>
                      </div>
                    </div>

                    {/* Message */}
                    <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                      {t.responseMessage || "No message provided."}
                    </p>
                  </div>
                ))}
              </section>
            </InfiniteSlider>
            <InfiniteSlider speedOnHover={25} speed={75} gap={24} reverse>
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
            border rounded shadow-sm
            bg-card hover:shadow-md
            transition-all duration-200
            p-4 flex flex-col items-center
            hover:-translate-y-1
            max-w-64
          "
                  >
                    {/* Header Section */}
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={t.imageUrl || ""}
                          alt={t.responseName}
                        />
                        <AvatarFallback>
                          {t.responseName?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <h3 className="font-semibold text-lg">
                          {t.responseName || "Anonymous"}
                        </h3>
                      </div>
                    </div>

                    {/* Message */}
                    <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                      {t.responseMessage || "No message provided."}
                    </p>
                  </div>
                ))}
              </section>
            </InfiniteSlider>
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
