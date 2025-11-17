import RequestComponent from "./RequestComponent";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <>
      <RequestComponent slug={slug} />
    </>
  );
};

export default Page;
