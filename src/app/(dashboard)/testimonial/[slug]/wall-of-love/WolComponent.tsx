"use client";
import EmblaCarousel from "@/app/Emlba/EmblaCarousel";
import EmblaCarouselReverse from "@/app/Emlba/EmblaCarouselReverse";
import { useSpaceBySlug } from "@/app/queries/spaces";
import { useGetLikedTestimonials } from "@/app/queries/testimonials";
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
