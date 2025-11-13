import EmblaCarouselVerticle from "@/app/Emlba/EmblaCarouselVerticle";
import EmblaCarouselVerticleReverse from "@/app/Emlba/EmblaCarouselVerticleReverse";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { testimonialData } from "@/server/testimonials";
import { EmblaOptionsType } from "embla-carousel";

export default async function WallEmbed(props: {
  searchParams: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await props.searchParams;

  const testimonials = await testimonialData(spaceId);
  const SLIDE =[1,2,3,4,5,6,7,8,9,10];
  const OPTIONS: EmblaOptionsType = { loop: true };

  return (
    <div className="flex p-2">
      <EmblaCarouselVerticle testimonials={testimonials} options={OPTIONS} />
      <EmblaCarouselVerticleReverse slides={SLIDE} options={OPTIONS} />
      {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {testimonials?.map((t: any) => (
          <div
            key={t.id}
            className="flex flex-col gap-2 items-center justify-center text-center border rounded-lg p-4 shadow-sm hover:border-amber-200 transition-all duration-200"
          >
            <section className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={t.imageUrl}
                  alt={t.responseName}
                ></AvatarImage>
              </Avatar>
              <span className="text-sm font-semibold">{t.responseName}</span>
            </section>
            <p>{t.responseMessage}</p>
          </div>
        ))}
      </div>*/}
    </div>
  );
}
