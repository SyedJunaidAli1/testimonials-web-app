"use client";
import { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

type Testimonial = {
  id: number;
  responseName: string;
  responseMessage: string;
  responseTitle: string;
  imageUrl: string;
  responseStars: number;
};
type PropType = {
  testimonials: Testimonial[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ testimonials, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      speed: 2,
      direction: "backward",
    }),
  ]);
  const [isHovered, setIsHovered] = useState(false);

  // Adjust speed dynamically when hovered
  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const node = emblaApi?.rootNode();

    if (!node) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
      autoScroll.options.speed = 0.5; // slow speed on hover
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      autoScroll.options.speed = 2; // normal speed
    };

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [emblaApi]);

  return (
    <div className="mx-auto [--slide-height:13rem] [--slide-spacing:1rem] [--slide-size:60%] sm:[--slide-size:50%] md:[--slide-size:40%] lg:[--slide-size:25%] xl:[--slide-size:20%]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom [margin-left:calc(var(--slide-spacing)*-1)]">
          {testimonials.map((t) => (
            <div
              className=" [transform:translate3d(0,0,0)] flex-[0_0_var(--slide-size)] min-w-0 [padding-left:var(--slide-spacing)] border-2 rounded-lg m-2"
              key={t.id}
            >
              <div className="shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] rounded-[1.8rem] flex items-center justify-center h-[var(--slide-height)] select-none">
                <section className="px-2 py-4 ">
                  <div className="flex items-center justify-center text-center gap-2 max-w-fit">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={t.imageUrl || ""}
                        alt={t.responseName}
                      />
                      <AvatarFallback>
                        {t.responseName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col ">
                      <h3 className="font-semibold text-lg">
                        {t.responseName || "Anonymous"}
                      </h3>
                      <p>{t.responseTitle}</p>
                      <div className="flex flex-col items-center gap-3">
                        <Rating value={t.responseStars} readOnly>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <RatingButton
                              className="text-yellow-500"
                              key={index}
                            />
                          ))}
                        </Rating>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-center leading-relaxed text-foreground/80 mb-4">
                    {t.responseMessage || "No message provided."}
                  </p>
                </section>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
