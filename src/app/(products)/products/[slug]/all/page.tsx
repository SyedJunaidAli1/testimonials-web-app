import { getQueryClient } from "@/app/components/GetQueryClient";
import AllPanel from "./AllPanel";
import { useGetTestimonials } from "@/app/queries/testimonials";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["testimonials", slug],
    queryFn: async () => useGetTestimonials(slug),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllPanel slug={slug} />
      </HydrationBoundary>
    </>
  );
};

export default Page;
