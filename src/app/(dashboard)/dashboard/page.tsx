import DashboardPanel from "./DashboardPanel";
import { getSpaces } from "@/server/spaces";
import { getQueryClient } from "@/app/components/GetQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["spaces"],
    queryFn: getSpaces,
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
