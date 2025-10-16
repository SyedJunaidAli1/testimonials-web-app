import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  redirect(`/products/${slug}/all`);
}
