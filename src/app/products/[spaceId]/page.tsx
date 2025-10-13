"use client";

import { getTestimonials } from "@/server/testimonials";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { PulseLoader } from "react-spinners";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = use(params);

  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["testimonials", spaceId],
    queryFn: async () => await getTestimonials(spaceId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <PulseLoader color="#8e51ff" size={30} />
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No testimonials found.</p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      {testimonials.map((t) => (
        <div
          key={t.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          {t.responseStars && (
            <p className="text-yellow-500 mb-1">
              {"⭐".repeat(t.responseStars)}
            </p>
          )}
          <p className="font-semibold">{t.responseName}</p>
          <p className="text-sm">{t.responseTitle}</p>
          <p className="mt-2">{t.responseMessage}</p>
          {t.responseSocialLink && (
            <a
              href={t.responseSocialLink}
              target="_blank"
              className="text-blue-500 text-sm mt-2 inline-block"
            >
              View Profile
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
