import { getSpaceById } from "@/server/spaces";
import { testimonialData } from "@/server/testimonials";
import Image from "next/image";

export default async function SocialEmbed(props: {
  searchParams: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await props.searchParams;
  
  const space = await getSpaceById(spaceId);

  const testimonials = await testimonialData(spaceId);

  return (
    <div className="p-4 w-full h-full flex flex-col items-center">
      <p className="text-lg font-semibold">{space.trustedMessage}</p>

      <div className="flex -space-x-3 mt-4">
        {testimonials.slice(0, 12).map((t) => (
          <div
            key={t.id}
            className="w-12 h-12 rounded-full border-2 overflow-hidden"
          >
            {/* image */}
            <Image
              src={t.imageUrl}
              alt={t.responseName}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
