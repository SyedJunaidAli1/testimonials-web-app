import { Metadata } from "next";
import WolContent from "./WolContent";

export const metadata: Metadata = {
  title: "Request Wall of Love - Yourappname",
  description:
    "YourAppName helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <>
      <WolContent slug={slug} />
    </>
  );
};

export default Page;
