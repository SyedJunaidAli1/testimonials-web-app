"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { getTestimonials } from "@/server/testimonials";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  Download,
  Inbox,
  MessageSquareText,
  Share2,
  ShareIcon,
  Trash,
  TrashIcon,
  UserRoundXIcon,
} from "lucide-react";

import { use } from "react";

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useQuery({
    queryKey: ["testimonials", slug],
    queryFn: async () => await getTestimonials(slug),
  });

  if (testimonialsLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  }

  if (testimonialsError) {
    return <p>Something went wrong while fetching data...</p>;
  }

  return (
    <main>
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
          <section className="flex flex-col items-center justify-center px-2 py-6">
            <Inbox size={50} className="" />
            <p className="text-gray-500 mt-6">No testimonials found yet</p>
          </section>
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
                  <p className="text-blue-500 text-sm mt-2 inline-block">
                    {t.responseSocialLink}
                  </p>
                )}

                <ButtonGroup>
                  <Button variant="outline">
                    <Share2 />
                    share
                  </Button>
                  <ButtonGroupSeparator />
                  <Button variant="outline">
                    <Download />
                    Download
                  </Button>
                  <ButtonGroupSeparator />
                  <Button variant="outline">
                    <Trash />
                    Delete
                  </Button>
                  <ButtonGroupSeparator />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="!pl-2">
                        <ChevronDownIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="[--radius:1rem]"
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          copy text to clipboard
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckIcon />
                          Mark as Read
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangleIcon />
                          Report Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserRoundXIcon />
                          Block User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShareIcon />
                          Share Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CopyIcon />
                          Copy Conversation
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive">
                          <TrashIcon />
                          Delete Conversation
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ButtonGroup>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
