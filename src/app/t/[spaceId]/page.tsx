"use client"; // if you want client component behavior

import { Button } from "@/components/ui/button";
import { getSpaceById } from "@/server/spaces";
import { useQuery } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import Image from "next/image";
import { use } from "react"; // only if params is a Promise in this Next.js version
import { PulseLoader } from "react-spinners";

export default function Page({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  // Unwrap the params Promise
  const { spaceId } = use(params);

  const {
    data: space,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["spaces", spaceId],
    queryFn: async () => {
      return await getSpaceById(spaceId);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <PulseLoader color="#8e51ff" size={30} />
      </div>
    );
  }

  if (error || !space) return <p>Space not found</p>;

  return (
    <main
      className={`flex flex-col items-center h-screen w-full ${
        space.theme === "dark"
          ? "bg-black text-secondary-foreground"
          : "bg-white text-secondary"
      }`}
    >
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
        className="text-5xl font-bold mt-16"
        style={{ color: space.customBtnColor }}
      >
        {space.headerTitle}
      </h1>
      <p className=" text-md mt-6">{space.customMessage}</p>
      <section className="flex text-left mt-6 flex-col gap-2 mb-14">
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
      <Button className="w-64" style={{ background: space.customBtnColor }}>
        <Pen />
        Send in text
      </Button>
    </main>
  );
}
