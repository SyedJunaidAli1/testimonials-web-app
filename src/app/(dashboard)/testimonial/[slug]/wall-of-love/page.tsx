import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import WolComponent from "./WolComponent";
import { getQueryClient } from "@/app/components/GetQueryClient";
import { useSpaceBySlug } from "@/app/queries/spaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall of Love - YourAppName",
  description:
    "YourAppName helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["spaces", slug],
    queryFn: () => useSpaceBySlug(slug),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WolComponent slug={slug} />
      </HydrationBoundary>
    </>
  );
};

export default page;
