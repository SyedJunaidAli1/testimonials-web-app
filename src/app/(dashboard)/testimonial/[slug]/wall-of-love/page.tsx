import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import WolComponent from "./WolComponent";
import { getQueryClient } from "@/app/components/GetQueryClient";
import { useSpaceBySlug } from "@/app/queries/spaces";

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
