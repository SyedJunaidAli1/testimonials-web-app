"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Spinner } from "@/components/ui/spinner";
import {
  ArrowBigRight,
  CircleUserRound,
  Heart,
  Inbox,
  Mail,
  MessageCircleHeart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TransferSpaceDialog } from "./TransferSpaceDialog";
import { useSpaceBySlug } from "../queries/spaces";
import WallEmbedDialog from "./WallEmbedDialog";

const Sidebar = () => {
  const { slug } = useParams();

  const {
    data: space,
    isLoading: spaceLoading,
    error: spaceError,
  } = useSpaceBySlug(slug);

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
        <aside className="w-64 border-r border-border py-6 px-4">
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
                    <ul className=" py-2 space-y-2 font-medium text-md">
                      <Link href={`/products/${slug}/all`}>
                        <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                          <Inbox size={20} className="text-primary" />
                          All
                        </li>
                      </Link>
                      <Link href={`/products/${slug}/liked`}>
                        <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                          <MessageCircleHeart
                            size={20}
                            className="text-primary"
                          />
                          Liked
                        </li>
                      </Link>
                      <Link href={`/products/${slug}/emails`}>
                        <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                          <Mail size={20} className="text-primary" />
                          Sent email
                        </li>
                      </Link>
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
                    <ul className=" py-2 space-y-2 font-medium text-md">
                      <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                        <WallEmbedDialog slug={space?.slug || ""} />
                      </li>

                      <Link href={`/products/${slug}/social-proof-avatar`}>
                        <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                          <CircleUserRound size={20} className="text-primary" />
                          Social Proof Avatar
                        </li>
                      </Link>
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
                    <ul className=" py-2 space-y-2 font-medium text-md">
                      <Link href={`/products/${slug}/request-testimonials`}>
                        <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                          <ArrowBigRight size={20} className="text-primary" />
                          Request testimonials
                        </li>
                      </Link>
                      <Link href={`/products/${slug}/wall-of-love`}>
                        <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                          <Heart size={20} className="text-primary" />
                          Wall of Love
                        </li>
                      </Link>
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
                    <ul className="py-2 space-y-2 font-medium text-md">
                      <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2 cursor-pointer transition-colors">
                        <TransferSpaceDialog
                          spaceId={space?.id}
                          userId={space?.userId}
                        />
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </nav>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Sidebar;
