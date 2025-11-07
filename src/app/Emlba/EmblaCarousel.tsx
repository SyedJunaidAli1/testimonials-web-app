"use client";

import { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      speed: 2,
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
    <div className="max-w-3xl mx-auto [--slide-height:19rem] [--slide-spacing:1rem] [--slide-size:45%]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom [margin-left:calc(var(--slide-spacing)*-1)]">
          {slides.map((index) => (
            <div
              className=" [transform:translate3d(0,0,0)] flex-[0_0_var(--slide-size)] min-w-0 [padding-left:var(--slide-spacing)] border-2 rounded-lg m-2"
              key={index}
            >
              <div className="shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] rounded-[1.8rem] text-[4rem] font-semibold flex items-center justify-center h-[var(--slide-height)] select-none">
                <span>{index}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
