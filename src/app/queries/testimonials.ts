"use client";
import {
  getLikedTestimonials,
  getTestimonialsCount,
} from "@/server/testimonials";
import { useQuery } from "@tanstack/react-query";

export const useTestimonialCount = () => {
  return useQuery({
    queryKey: ["testimonialCount"],
    queryFn: getTestimonialsCount,
  });
};

export const useGetLikedTestimonials = (slug: string) => {
  return useQuery({
    queryKey: ["testimonials", slug],
    queryFn: async () => await getLikedTestimonials(slug),
  });
};
