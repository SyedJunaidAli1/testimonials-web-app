import { getTestimonials } from "@/server/testimonials";
import { useQuery } from "@tanstack/react-query";

export default async function WallEmbed({
  searchParams,
}: {
  searchParams: { spaceId: string };
}) {
  const slug = searchParams.slug;

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials", slug],
    queryFn: async () => await ,
  });

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-xl font-bold mb-4">Wall of Love ❤️</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="border rounded-lg p-4 shadow-sm">
            <p>{t.responseMessage}</p>
            <p className="text-sm mt-2 font-semibold">— {t.responseName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
