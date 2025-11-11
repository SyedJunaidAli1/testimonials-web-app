"use client";
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
import {
  deleteTestimonials,
  getLikedTestimonials,
  likeTestimonials,
} from "@/server/testimonials";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  Clipboard,
  Download,
  Gift,
  Heart,
  Inbox,
  MessageSquareText,
  Share2,
  TrashIcon,
} from "lucide-react";
import { use } from "react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import { SendTextDialog } from "@/app/components/SendEmailDialog";
import { DuplicateTestimonialDialog } from "@/app/components/DuplicateToOtherSpace";
import { GetLinkForTestimonial } from "@/app/components/GetLinkForTestimonial";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useQuery({
    queryKey: ["testimonials", slug],
    queryFn: async () => await getLikedTestimonials(slug),
  });

  const queryClient = useQueryClient();

  const testiCount = testimonials?.length ?? 0;

  const likeMutation = useMutation({
    mutationFn: async ({ id, Liked }: { id: string; Liked: boolean }) =>
      await likeTestimonials(id, Liked),
    onMutate: async ({ id, Liked }) => {
      await queryClient.cancelQueries(["testimonials", slug]);

      const previousData = queryClient.getQueryData(["testimonials", slug]);

      queryClient.setQueryData(["testimonials", slug], (oldData: any) =>
        oldData.map((t: any) => (t.id === id ? { ...t, Liked } : t)),
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["testimonials", slug], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials", slug] });
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: async ({ id }: { id: string }) => await deleteTestimonials(id),
    onSuccess: () => {
      toast.success("Testimonial deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials", slug] });
    },
    onError: (err) => {
      toast.error("Testimonial delete failed");
      console.error(err.message);
    },
  });

  const downloadSingleTestimonialPDF = (t: any) => {
    const doc = new jsPDF();

    let startY = 20;
    doc.setFontSize(14);
    doc.text(`Reviewer name: ${t.responseName}`, 15, startY);

    if (t.responseEmail)
      doc.text(`Reviewer email: ${t.responseEmail}`, 15, startY + 28);

    if (t.responseStars) {
      doc.text(`Rating: ${t.responseStars} / 5`, 15, startY + 7);
    }

    doc.text(`Text testimonial: ${t.responseMessage}`, 15, startY + 21);
    doc.text(`Title: ${t.responseTitle}`, 15, startY + 14);

    if (t.responseAddress)
      doc.text(`Address: ${t.responseAddress}`, 15, startY + 35);
    if (t.responseSocialLink)
      doc.text(`Social: ${t.responseSocialLink}`, 15, startY + 42);

    doc.save(`${t.responseName || "testimonial"}.pdf`);
  };

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
    <section className="flex-1 p-8">
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
          <p className="text-gray-500 mt-6">No Liked testimonials found</p>
        </section>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="border border-border bg-card/60 backdrop-blur-md rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={t.imageUrl} />
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
                      likeMutation.mutate({ id: t.id, Liked: !t.Liked })
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
                  <Button variant="secondary" size="sm">
                    <Gift className="w-4 h-4 mr-2" />
                    Incentivize
                  </Button>
                  <GetLinkForTestimonial testimonialId={t.id} />
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
                  <DropdownMenuContent align="end" className="[--radius:1rem]">
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
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <SendTextDialog
                          testimonialId={t.id}
                          recipientEmail={t.responseEmail}
                          user={t.responseName}
                        />
                      </DropdownMenuItem>

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
                        onClick={() => deleteMutation({ id: t.id })}
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
  );
};

export default Page;
