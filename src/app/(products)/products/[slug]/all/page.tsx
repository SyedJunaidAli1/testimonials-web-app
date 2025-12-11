import { getQueryClient } from "@/app/components/GetQueryClient";
import AllPanel from "./AllPanel";
import { useGetTestimonials } from "@/app/queries/testimonials";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All - Yourappname",
  description:
    "YourAppName helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};

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
