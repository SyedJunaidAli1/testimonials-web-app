"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getSpaceBySlug } from "@/server/spaces";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowBigRight,
  BookImage,
  Code,
  Heart,
  Inbox,
  MessageCircleHeart,
  MessageSquareText,
  Pen,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const Sidebar = () => {
  const { slug } = useParams();

  const {
    data: space,
    isLoading: spaceLoading,
    error: spaceError,
  } = useQuery({
    queryKey: ["spaces", slug],
    queryFn: async () => await getSpaceBySlug(slug as string),
  });

  if (spaceLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  if (spaceError) {
    return <p>Something went wrong while fetching data...</p>;
  }

  return (
    <div>
      <main className="flex min-h-screen">
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
                        <MessageCircleHeart
                          size={20}
                          className="text-primary"
                        />
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
                        <ArrowBigRight size={20} className="text-primary" />
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
                        <MessageCircleHeart
                          size={20}
                          className="text-primary"
                        />
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
      </main>
    </div>
  );
};

export default Sidebar;
