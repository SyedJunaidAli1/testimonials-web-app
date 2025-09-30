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
    <main className="flex flex-col items-center h-screen w-full justify-center">
      <Image src={space.spaceLogo} width={50} height={50} alt="space logo" />
      <h1 className="text-5xl font-bold">{space.spacename}</h1>
      <p>{space.customMessage}</p>
      <section className="flex flex-col gap-2 mb-18">
        <p className="text-xl text-left font-semibold">QUESTIONS</p>
        <ul>
          <li>{space.question1}</li>
          <li>{space.question2}</li>
          <li>{space.question3}</li>
          <li>{space.question4}</li>
          <li>{space.question5}</li>
        </ul>
      </section>
      <Button className="w-64">
        <Pen />
        Send in text
      </Button>
    </main>
  );
}
