"use client";
import EmblaCarousel from "@/app/Emlba/EmblaCarousel";
import EmblaCarouselReverse from "@/app/Emlba/EmblaCarouselReverse";
import { useSpaceBySlug } from "@/app/queries/spaces";
import { useGetLikedTestimonials } from "@/app/queries/testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { EmblaOptionsType } from "embla-carousel";
import { List } from "lucide-react";
import Link from "next/link";

const WolComponent = ({ slug }: { slug: string }) => {
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

  if (error) {
    return <p>Something went wrong while fetching data...</p>;
  }

  if (space?.disabled) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p>Space is disabled</p>
      </div>
    );
  }

  const OPTIONS: EmblaOptionsType = { loop: true };

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
        ) : testimonials.length === 4 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10 px-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex flex-col items-center text-center border border-border rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
              >
                {/* Avatar */}
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    src={testimonial.imageUrl || ""}
                    alt={testimonial.responseName || ""}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {testimonial.responseName[0].toUpperCase() || "User"}
                  </AvatarFallback>
                </Avatar>

                {/* Name */}
                <h3 className="text-lg font-semibold mb-1">
                  {testimonial.responseName}
                </h3>

                {/* Message */}
                <p className="text-sm leading-relaxed text-foreground/80 max-w-xs">
                  {testimonial.responseMessage}
                </p>
              </div>
            ))}
          </section>
        ) : testimonials.length === 4 ? (
          <section className="flex items-center justify-center py-10">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex flex-col items-center justify-center"
              >
                <p className="text-xl font-medium mb-3">
                  {testimonial.responseName}
                </p>
                <p className="text-base font-normal mb-3">
                  {testimonial.responseMessage}
                </p>
                <img
                  className="text-sm font-light mb-3"
                  src={testimonial.imageUrl}
                  alt={testimonial.responseName}
                />
              </div>
            ))}
          </section>
        ) : (
          <section>
            <EmblaCarousel testimonials={testimonials} options={OPTIONS} />
            <EmblaCarouselReverse
              testimonials={testimonials}
              options={OPTIONS}
            />
            <EmblaCarousel testimonials={testimonials} options={OPTIONS} />
          </section>
        )}
      </section>
    </main>
  );
};

export default WolComponent;
