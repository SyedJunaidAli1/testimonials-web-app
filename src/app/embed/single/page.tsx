import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { getTestimonialById } from "@/server/testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SingleTestimonialEmbed - Testimonia",
  description:
    "Testimonia helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};

export default async function SingleTestimonialEmbed(props: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await props.searchParams;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    return (
      <div className="p-6 text-center text-gray-500">
        Testimonial not found.
      </div>
    );
  }

  if (testimonial.disabled) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-lg">🚫 This space is currently disabled</p>
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="px-2 py-6 rounded-lg shadow-md max-w-md mx-auto w-full">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Avatar
            key={testimonial.id}
            className="ring-2 ring-background h-12 w-12 border border-border shadow-sm object-cover"
          >
            <AvatarImage
              src={testimonial.imageUrl || ""}
              alt={testimonial.responseName || ""}
            />
            <AvatarFallback>
              {testimonial.responseName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{testimonial.responseName}</h2>
            {testimonial.responseTitle && (
              <p className="text-sm">{testimonial.responseTitle}</p>
            )}
          </div>
          {testimonial.responseMessage && (
            <p className="text-sm max-w-sm leading-relaxed">
              {testimonial.responseMessage}
            </p>
          )}
          {testimonial.responseStars && (
            <div className="flex flex-col items-center gap-3">
              <Rating defaultValue={testimonial.responseStars} readOnly>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton className="text-yellow-500" key={index} />
                ))}
              </Rating>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
