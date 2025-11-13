"use client";
import { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarouselVerticleReverse: React.FC<PropType> = ({
  slides,
  options,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", ...options }, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      speed: 1, // base speed
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
    <div className="mx-auto w-full [--slide-height:16rem] [--slide-spacing:1rem] [--slide-size:60%] sm:[--slide-size:50%] md:[--slide-size:40%] lg:[--slide-size:25%] xl:[--slide-size:20%]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-col h-screen touch-pan-y touch-pinch-zoom [margin-left:calc(var(--slide-spacing)*-0.28)]">
          {slides.map((index) => (
            <div
              className="[transform:translate3d(0,0,0)] flex-[0_0_var(--slide-size)] min-w-0 [padding-left:var(--slide-spacing)] border-2 rounded-lg m-2"
              key={index}
            >
              <div className="shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] rounded-[1.8rem] flex items-center justify-center h-[var(--slide-height)] select-none">
                <span>{index}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarouselVerticleReverse;
