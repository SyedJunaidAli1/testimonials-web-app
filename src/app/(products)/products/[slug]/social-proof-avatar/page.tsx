import SocialPage from "./social-page";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <>
      <SocialPage slug={slug} />
    </>
  );
};

export default Page;
