import { getQueryClient } from "@/app/components/GetQueryClient";
import TestimonialPanel from "./TestimonialPanel";
import { getSpaceBySlug } from "@/server/spaces";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["spaces", slug],
    queryFn: () => getSpaceBySlug(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TestimonialPanel slug={slug} />
    </HydrationBoundary>
  );
}
