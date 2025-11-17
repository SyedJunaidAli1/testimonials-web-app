import {
  deleteSpaces,
  duplicateSpace,
  getSentEmailsForSpace,
  getSpaceBySlug,
  getSpaces,
} from "@/server/spaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSpaces = () => {
  return useQuery({
    queryKey: ["spaces"],
    queryFn: async () => {
      return await getSpaces();
    },
  });
};

export const useDeleteSpace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteSpaces(id),
    onSuccess: () => {
      toast.success("Space deleted");
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete space");
    },
  });
};

export const useCopySpace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (spaceId: string) => await duplicateSpace(spaceId),
    onSuccess: () => {
      toast.success("Space duplicated successfully");
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to duplicate space");
    },
  });
};

export const useSpaceBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["spaces", slug],
    queryFn: async () => await getSpaceBySlug(slug),
  });
};

export const useSentEmails = (slug: string) => {
  return useQuery({
    queryKey: ["sentEmails", slug],
    queryFn: async () => await getSentEmailsForSpace(slug),
  });
};
