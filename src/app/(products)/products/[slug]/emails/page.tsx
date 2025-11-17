import { getQueryClient } from "@/app/components/GetQueryClient";
import EmailContainer from "./EmailContainer";
import { useSentEmails } from "@/app/queries/spaces";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["sentEmails", slug],
    queryFn: async () => useSentEmails(slug),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EmailContainer slug={slug} />
      </HydrationBoundary>
    </>
  );
};

export default page;
