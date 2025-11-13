import EmblaCarouselVerticle from "@/app/Emlba/EmblaCarouselVerticle";
import EmblaCarouselVerticleReverse from "@/app/Emlba/EmblaCarouselVerticleReverse";
import { testimonialData } from "@/server/testimonials";
import { EmblaOptionsType } from "embla-carousel";

export default async function WallEmbed(props: {
  searchParams: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await props.searchParams;

  const testimonials = await testimonialData(spaceId);

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
