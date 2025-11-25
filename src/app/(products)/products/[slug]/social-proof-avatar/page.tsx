import { useGetLikedTestimonials } from "@/app/queries/testimonials";
import SocialPage from "./social-page";
import { getQueryClient } from "@/app/components/GetQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["socialProof", slug],
    queryFn: async () => useGetLikedTestimonials(slug),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SocialPage slug={slug} />
      </HydrationBoundary>
    </>
  );
};

export default Page;
