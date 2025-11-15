"use client";
import { getTestimonialsCount } from "@/server/testimonials";
import { useQuery } from "@tanstack/react-query";

export const useTestimonialCount = () => {
  return useQuery({
    queryKey: ["testimonialCount"],
    queryFn: getTestimonialsCount,
  });
};
