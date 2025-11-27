import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { getTestimonialById } from "@/server/testimonials";
import Image from "next/image";

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

  // if (space.disabled) {
  //   return (
  //     <div className="flex items-center justify-center h-screen w-screen">
  //       <p>Space is disabled</p>
  //     </div>
  //   );
  // }

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="px-2 py-6 rounded-lg shadow-md max-w-md mx-auto w-full">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Image
            src={testimonial.imageUrl || "/placeholder-avatar.png"}
            alt={testimonial.responseName || "Anonymous"}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
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
