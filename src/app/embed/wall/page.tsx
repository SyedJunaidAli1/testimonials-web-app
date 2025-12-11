import EmblaCarouselVerticle from "@/app/Emlba/EmblaCarouselVerticle";
import EmblaCarouselVerticleReverse from "@/app/Emlba/EmblaCarouselVerticleReverse";
import { getSpaceBySlug } from "@/server/spaces";
import { getLikedTestimonials } from "@/server/testimonials";
import { EmblaOptionsType } from "embla-carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WallofLoveEmbeds - YourAppName",
  description:
    "YourAppName helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};

export default async function WallEmbed(props: {
  searchParams: Promise<{ spaceId: string; slug: string }>;
}) {
  const { slug } = await props.searchParams;

  const space = await getSpaceBySlug(slug);

  const testimonials = await getLikedTestimonials(slug);

  if (space.disabled) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-lg">🚫 This space is currently disabled</p>
      </div>
    );
  }

  const OPTIONS: EmblaOptionsType = { loop: true };
  return (
    <div className="flex p-2">
      <EmblaCarouselVerticle testimonials={testimonials} options={OPTIONS} />
      <div className="hidden md:flex w-full">
        <EmblaCarouselVerticleReverse
          testimonials={testimonials}
          options={OPTIONS}
        />
      </div>
    </div>
  );
}
