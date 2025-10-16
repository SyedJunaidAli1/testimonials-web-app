"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getSpaceBySlug } from "@/server/spaces";
import { getTestimonials } from "@/server/testimonials";
import { useQuery } from "@tanstack/react-query";
import {
  MessageSquareText,
  Pen,
  MessageCircleHeart,
  Inbox,
  Heart,
  Code,
  BookImage,
  ArrowBigRight,
} from "lucide-react";
import Image from "next/image";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useQuery({
    queryKey: ["testimonials", slug],
    queryFn: async () => await getTestimonials(slug),
  });

  const {
    data: space,
    isLoading: spaceLoading,
    error: spaceError,
  } = useQuery({
    queryKey: ["spaces", slug],
    queryFn: async () => await getSpaceBySlug(slug),
  });

  if (testimonialsLoading || spaceLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  if (testimonialsError || spaceError) {
    return <p>Something went wrong while fetching data...</p>;
  }

  return (
    <main >

 
      {/* === Main content === */}
      <section className="flex-1 p-8">
        <header className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex gap-3 items-center">
            <MessageSquareText className="text-primary" />
            <div>
              <p className="font-medium">Text credits</p>
              <span className="text-primary">58</span>
            </div>
          </div>
        </header>

        {/* Testimonials */}
        {!testimonials || testimonials.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No testimonials found.
          </p>
        ) : (
          <div className="max-w-3xl mx-auto grid gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-card"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar>
                    <AvatarImage src={t.imageUrl} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-semibold">{t.responseName}</p>
                    {t.responseStars && (
                      <div className="text-yellow-500 text-sm">
                        {"⭐".repeat(t.responseStars)}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm">{t.responseTitle}</p>
                <p className="mt-2 text-muted-foreground">
                  {t.responseMessage}
                </p>

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
        )}
      </section>
    </main>
  );
}
