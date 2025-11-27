import {
  deleteTestimonials,
  getLikedTestimonials,
  getTestimonials,
  getTestimonialsCount,
  likeTestimonials,
} from "@/server/testimonials";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useDeleteTestimonial = (slug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteTestimonials(id),
    onSuccess: () => {
      toast.success("Testimonial deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials", slug] });
    },
    onError: (err) => {
      toast.error("Testimonial delete failed");
      console.error(err.message);
    },
  });
};

export const useLikeMutaion = (slug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, Liked }: { id: string; Liked: boolean }) =>
      await likeTestimonials(id, Liked),
    onMutate: async ({ id, Liked }) => {
      await queryClient.cancelQueries(["testimonials", slug]);

      const previousData = queryClient.getQueryData(["testimonials", slug]);

      queryClient.setQueryData(["testimonials", slug], (oldData: any) =>
        oldData.map((t: any) => (t.id === id ? { ...t, Liked } : t)),
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["testimonials", slug], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials", slug] });
    },
  });
};

export const useGetTestimonials = (slug: string) => {
  return useQuery({
    queryKey: ["testimonials", slug],
    queryFn: async () => await getTestimonials(slug),
  });
}

