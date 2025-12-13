"use client";
import { useState } from "react";
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
  Menu,
  X,
  MessageCircleHeart,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TransferSpaceDialog } from "./TransferSpaceDialog";
import { useSpaceBySlug } from "../queries/spaces";
import WallEmbedDialog from "./WallEmbedDialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);

  const {
    data: space,
    isLoading: spaceLoading,
    error: spaceError,
  } = useSpaceBySlug(slug);

  // Close sidebar on navigation
  const close = () => setOpen(false);

  if (spaceLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  if (spaceError) return <p>Something went wrong...</p>;

  return (
    <div className="relative">
      {/* MOBILE TOGGLE BUTTON */}
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="lg:hidden fixed top-4 left-4 z-40 p-2"
      >
        <Menu size={22} />
      </Button>

      {/* OVERLAY FOR MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={close}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full lg:h-screen w-64
          bg-background border-r border-border py-6 px-4 z-40
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* CLOSE BUTTON (Mobile Only) */}
        <Button
          onClick={close}
          variant="outline"
          className="lg:hidden absolute top-4 right-4"
        >
          <X size={22} />
        </Button>

        {/* Space Info */}
        <div className="flex flex-col items-center text-center gap-2 mt-10 lg:mt-0">
          <Avatar className="w-26 h-26 border shadow bg-background shrink-0">
            <AvatarImage src={space?.spaceLogo || ""} alt="space logo" />
            <AvatarFallback>
              {space?.spacename?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-lg font-semibold">{space?.spacename || ""}</p>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex flex-col gap-3">
          {/* Inbox */}
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-xl">
                Inbox
              </AccordionTrigger>
              <AccordionContent>
                <ul className="py-2 space-y-2 font-medium text-md">
                  <Link href={`/products/${slug}/all`} onClick={close}>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2">
                      <Inbox size={20} className="text-primary" /> All
                    </li>
                  </Link>

                  <Link href={`/products/${slug}/liked`} onClick={close}>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2">
                      <MessageCircleHeart size={20} className="text-primary" />
                      Liked
                    </li>
                  </Link>

                  <Link href={`/products/${slug}/emails`} onClick={close}>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2">
                      <Mail size={20} className="text-primary" /> Sent email
                    </li>
                  </Link>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Embed */}
          <Accordion type="multiple">
            <AccordionItem value="item-embed">
              <AccordionTrigger className="font-semibold text-xl">
                Embed Widgets
              </AccordionTrigger>
              <AccordionContent>
                <ul className="py-2 space-y-2 font-medium text-md">
                  <li
                    onClick={close}
                    className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2"
                  >
                    <WallEmbedDialog slug={space?.slug || ""} />
                  </li>

                  <Link
                    href={`/products/${slug}/social-proof-avatar`}
                    onClick={close}
                  >
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2">
                      <CircleUserRound size={20} className="text-primary" />
                      Social Proof Avatar
                    </li>
                  </Link>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Pages */}
          <Accordion type="multiple">
            <AccordionItem value="item-pages">
              <AccordionTrigger className="font-semibold text-xl">
                Pages
              </AccordionTrigger>
              <AccordionContent>
                <ul className="py-2 space-y-2 font-medium text-md">
                  <Link
                    href={`/products/${slug}/request-testimonials`}
                    onClick={close}
                  >
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2">
                      <ArrowBigRight size={20} className="text-primary" />
                      Request testimonials
                    </li>
                  </Link>

                  <Link href={`/products/${slug}/wall-of-love`} onClick={close}>
                    <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2">
                      <Heart size={20} className="text-primary" />
                      Wall of Love
                    </li>
                  </Link>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Settings */}
          <Accordion type="multiple">
            <AccordionItem value="item-settings">
              <AccordionTrigger className="font-semibold text-xl">
                Space settings
              </AccordionTrigger>
              <AccordionContent>
                <ul className="py-2 space-y-2 font-medium text-md">
                  <li className="flex gap-2 items-center hover:bg-muted rounded-md px-3 py-2">
                    <TransferSpaceDialog
                      spaceId={space.id}
                      userId={space.userId}
                    />
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
