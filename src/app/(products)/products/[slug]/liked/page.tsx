import { getQueryClient } from "@/app/components/GetQueryClient";
import LikedPanel from "./likedPanel";
import { useGetLikedTestimonials } from "@/app/queries/testimonials";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["liked", slug],
    queryFn: async () => useGetLikedTestimonials(slug),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LikedPanel slug={slug} />
      </HydrationBoundary>
    </>
  );
};

export default Page;
