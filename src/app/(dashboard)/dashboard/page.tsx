import DashboardPanel from "./DashboardPanel";
import { getSpaces } from "@/server/spaces";
import { getQueryClient } from "@/app/components/GetQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - YourAppName",
  description:
    "YourAppName helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["spaces"],
    queryFn: () => getSpaces(),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DashboardPanel />
      </HydrationBoundary>
    </>
  );
};

export default Page;
