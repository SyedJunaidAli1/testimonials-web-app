import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSpaceBySlug } from "@/server/spaces";
import { getLikedTestimonials } from "@/server/testimonials";

export default async function SocialEmbed(props: {
  searchParams: Promise<{ slug: string }>;
}) {
  const { slug } = await props.searchParams;

  const space = await getSpaceBySlug(slug);

  const testimonials = await getLikedTestimonials(slug);

  if (space.disabled) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-lg">🚫 This space is currently disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full h-full flex flex-col items-center">
      <p className="text-lg font-semibold">{space.trustedMessage}</p>

      <div className="flex -space-x-3 mt-4">
        {testimonials.slice(0, 12).map((t) => (
          <div
            key={t.id}
            className="w-12 h-12 rounded-full border-2 overflow-hidden"
          >
            <Avatar
              key={t.id}
              className="ring-2 ring-background h-12 w-12 border border-border shadow-sm"
            >
              <AvatarImage src={t.imageUrl || ""} alt={t.responseName || ""} />
              <AvatarFallback>
                {t.responseName?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
}
