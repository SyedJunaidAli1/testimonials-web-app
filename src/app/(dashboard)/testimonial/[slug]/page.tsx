import { getQueryClient } from "@/app/components/GetQueryClient";
import TestimonialPanel from "./TestimonialPanel";
import { getSpaceBySlug } from "@/server/spaces";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Feedback - YourAppName",
  description:
    "Submit your testimonial and share your honest experience. Your feedback helps businesses build trust and improve their services.",
};

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
