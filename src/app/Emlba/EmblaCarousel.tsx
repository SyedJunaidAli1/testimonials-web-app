'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import ReactDOM from 'react-dom/client'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import "../embla.css"
import "../base.css"
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      speed: 2 // base speed
    })
  ])
  const [isHovered, setIsHovered] = useState(false)

  // Adjust speed dynamically when hovered
  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    const node = emblaApi?.rootNode()

    if (!node) return

    const handleMouseEnter = () => {
      setIsHovered(true)
      autoScroll.options.speed = 0.5 // slow speed on hover
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      autoScroll.options.speed = 2 // normal speed
    }

    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
