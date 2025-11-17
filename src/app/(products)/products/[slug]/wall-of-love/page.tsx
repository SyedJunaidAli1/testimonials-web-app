import WolContent from "./WolContent";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <>
      <WolContent slug={slug} />
    </>
  );
};

export default Page;
