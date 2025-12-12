"use client";
import CreateTestimonialsDialog from "@/app/components/CreateTestimonialsDialog";
import { useSpaceBySlug } from "@/app/queries/spaces";
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect } from "react";

export default function TestimonialPanel({ slug }: { slug: string }) {
  const { data: space, isLoading, error } = useSpaceBySlug(slug);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (space?.theme === "dark") setTheme("dark");
    if (space?.theme === "light") setTheme("light");
  }, [space, setTheme]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  if (error || !space) return <p>Space not found</p>;

  if (space.disabled) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-lg">🚫 This space is currently disabled</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center h-screen w-full ">
      {space.spaceLogo && (
        <Image
          src={space.spaceLogo}
          width={100}
          height={100}
          alt="space logo"
          className="mt-30"
        />
      )}
      <h1
        className="text-5xl font-bold mt-16 text-center leading-14"
        style={{ color: space.customBtnColor }}
      >
        {space.headerTitle}
      </h1>
      <p className=" text-md mt-6">{space.customMessage}</p>
      <section className="flex text-left mt-6 flex-col gap-2 mb-10 px-4 py-2">
        <p className="text-xl font-semibold">QUESTIONS</p>
        <ul className="list-disc ml-6">
          {[
            space.question1,
            space.question2,
            space.question3,
            space.question4,
            space.question5,
          ]
            .filter(Boolean)
            .map((q, i) => (
              <li key={i}>{q}</li>
            ))}
        </ul>
      </section>
      <CreateTestimonialsDialog
        spaceId={space.id}
        customBtnColor={space.customBtnColor}
        spaceLogo={space.spaceLogo}
        question1={space.question1}
        question2={space.question2}
        question3={space.question3}
        question4={space.question4}
        question5={space.question5}
        customMessage={space.customMessage}
        collectName={space.collectName}
        collectEmail={space.collectEmail}
        collectTitle={space.collectTitle}
        collectStar={space.collectStar}
        collectAddress={space.collectAddress}
        collectSocialLink={space.collectSocialLink}
        theme={space.theme}
      />
    </main>
  );
}
