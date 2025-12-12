"use client";
import { DuplicateTestimonialDialog } from "@/app/components/DuplicateToOtherSpace";
import { SendTextDialog } from "@/app/components/SendEmailDialog";
import { SingleEmbedDialog } from "@/app/components/SingleEmbedDialog";
import {
  useDeleteTestimonial,
  useGetTestimonials,
  useLikeMutaion,
} from "@/app/queries/testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Spinner } from "@/components/ui/spinner";
import { downloadSingleTestimonialPDF } from "@/lib/utilities/pdffnc";
import {
  ChevronDownIcon,
  Clipboard,
  Download,
  Heart,
  Inbox,
  MessageSquareText,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";

const AllPanel = ({ slug }: { slug: string }) => {
  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useGetTestimonials(slug);
  const { mutate: deleteMutation } = useDeleteTestimonial(slug);
  const { mutate: likeMutation } = useLikeMutaion(slug);

  const testiCount = testimonials?.length ?? 0;

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
      <section className="flex-1 py-8">
        <header className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex gap-3 items-center">
            <MessageSquareText className="text-primary" />
            <div>
              <p className="font-medium">Text credits</p>
              <span className="text-primary">{testiCount}</span>
            </div>
          </div>
        </header>

        {/* Testimonials */}
        {!testimonials || testimonials.length === 0 ? (
          <section className="flex flex-col items-center justify-center px-2 py-6">
            <Inbox size={50} className="" />
            <p className="text-gray-500 mt-6">No testimonials found</p>
          </section>
        ) : (
          <div className="max-w-full mx-auto grid gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="border border-border bg-card/60 backdrop-blur-md rounded-xl px-3 py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={t.imageUrl || ""} />
                    <AvatarFallback>
                      {t.responseName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-semibold text-lg">{t.responseName}</p>
                    {t.responseStars && (
                      <div className="flex flex-col items-center gap-3">
                        <Rating defaultValue={t.responseStars} readOnly>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <RatingButton
                              className="text-yellow-500"
                              key={index}
                            />
                          ))}
                        </Rating>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title & Message */}
                <div className="space-y-2 mb-4">
                  <p className="font-medium text-base">{t.responseTitle}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t.responseMessage}
                  </p>
                </div>

                {/* Contact & Links */}
                <div className="text-sm text-muted-foreground space-y-1 mb-5">
                  {t.responseEmail && <p>📧 {t.responseEmail}</p>}
                  {t.responseAddress && <p>📍 {t.responseAddress}</p>}
                  {t.responseSocialLink && (
                    <a
                      href={t.responseSocialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline inline-block mt-1"
                    >
                      🔗 {t.responseSocialLink}
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 justify-between border-t pt-4">
                  <div className="flex gap-2 flex-wrap items-center">
                    {/* ❤️ Like button */}
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        likeMutation({ id: t.id, Liked: !t.Liked })
                      }
                    >
                      <Heart
                        className={
                          t.Liked
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }
                      />
                      {t.Liked ? "Liked" : "Like"}
                    </Button>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <SingleEmbedDialog testimonialId={t.id} />

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => downloadSingleTestimonialPDF(t)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="[--radius:1rem]"
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={async () => {
                            const Text = t.responseMessage ?? "";

                            if (!Text) {
                              toast.error("No text to copy");
                            }
                            navigator.clipboard.writeText(Text);

                            toast.success("✅ Text Copied to Clipboard");
                          }}
                        >
                          <Clipboard className="mr-2 h-4 w-4" /> Copy text
                        </DropdownMenuItem>
                        {t.responseEmail && (
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <SendTextDialog
                              testimonialId={t.id}
                              recipientEmail={t.responseEmail || ""}
                              user={t.responseName || ""}
                            />
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <DuplicateTestimonialDialog testimonialId={t.id} />
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => deleteMutation(t.id)}
                        >
                          <TrashIcon className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AllPanel;
