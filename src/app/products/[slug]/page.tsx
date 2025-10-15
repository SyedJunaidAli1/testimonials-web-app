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
  Settings,
  Star,
  LayoutDashboard,
  MessageCircleHeart,
  Inbox,
  Heart,
  Code,
  BookImage,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <main className="flex min-h-screen">
      {/* === Sidebar === */}
      <aside className="w-64 border-r border-border p-5 flex flex-col justify-between">
        <div>
          {/* Space Info */}
          <div className="flex flex-col items-center text-center gap-2">
            <Image
              src={space?.spaceLogo}
              width={70}
              height={70}
              alt="space logo"
              className="rounded-full object-cover"
            />
            <p className="text-lg font-semibold">{space?.spacename}</p>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex flex-col gap-3">
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-xl">
                  Inbox
                </AccordionTrigger>
                <AccordionContent>
                  <ul className=" py-2 space-y-2 font-medium text-lg">
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <Inbox size={20} className="text-primary" />
                      All
                    </li>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <MessageSquareText size={20} className="text-primary" />
                      Text
                    </li>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <MessageCircleHeart size={20} className="text-primary" />
                      Liked
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-xl">
                  Embed Widgets
                </AccordionTrigger>
                <AccordionContent>
                  <ul className=" py-2 space-y-2 font-medium text-lg">
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <Heart size={20} className="text-primary" />
                      Wall of Love
                    </li>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <Code size={20} className="text-primary" />
                      Single testimonial
                    </li>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <BookImage size={20} className="text-primary" />
                      Profile Photo Only
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-xl">
                  Pages
                </AccordionTrigger>
                <AccordionContent>
                  <ul className=" py-2 space-y-2 font-medium text-lg">
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <ArrowRight size={20} className="text-primary" />
                      Request testimonials
                    </li>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <Heart size={20} className="text-primary" />
                      Wall of Love
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-xl">
                  Space settings
                </AccordionTrigger>
                <AccordionContent>
                  <ul className=" py-2 space-y-2 font-medium text-lg">
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <Inbox size={20} className="text-primary" />
                      All
                    </li>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <MessageSquareText size={20} className="text-primary" />
                      Text
                    </li>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                      <MessageCircleHeart size={20} className="text-primary" />
                      Liked
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
        </div>

        <Button variant="outline">
          <Pen className="mr-2 size-4" /> Get Widget
        </Button>
      </aside>

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
