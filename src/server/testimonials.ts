"use server"
import { db } from "@/db/drizzle"
import { spaces, testimonials } from "@/db/schema"
import { revalidatePath } from "next/cache"
import cloudinary from "./cloudinary"
import { and, eq } from "drizzle-orm"

export async function createTestimonial(formData: FormData) {
    try {
        const image = formData.get("photo") as File | null;

        let imageUrl: string | null = null;

        // ✅ Upload image to Cloudinary if present
        if (image) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResponse = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "testimonials" }, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    })
                    .end(buffer);
            });

            imageUrl = uploadResponse.secure_url;
        }

        // ✅ Insert testimonial into DB
        await db.insert(testimonials).values({
            spaceId: formData.get("spaceId") as string,
            responseMessage: formData.get("message") as string,
            responseStars: Number(formData.get("stars")),
            responseName: formData.get("name") as string,
            responseEmail: formData.get("email") as string,
            responseAddress: formData.get("address") as string,
            responseTitle: formData.get("title") as string,
            responseSocialLink: formData.get("socialLink") as string,
            isApproved: formData.get("isApproved") === "true",
            imageUrl: imageUrl, // ✅ stored image URL
        });

        revalidatePath("/dashboard"); // optional
        return { success: true };
    } catch (error) {
        console.error("❌ Failed to create testimonial:", error);
        throw new Error("Failed to create testimonial");
    }
}

export async function getLikedTestimonials(slug: string) {
    // Step 1: find the space by slug
    const space = await db
        .select({ id: spaces.id })
        .from(spaces)
        .where(eq(spaces.slug, slug))
        .limit(1);

    if (!space.length) {
        throw new Error("Space not found");
    }

    // Step 2: fetch testimonials for that space
    const spaceId = space[0].id;

    return await db
        .select()
        .from(testimonials)
        .where(and(eq(testimonials.spaceId, spaceId), eq(testimonials.Liked, true)));
}

export async function getTestimonials(slug: string) {
    // Step 1: find the space by slug
    const space = await db
        .select({ id: spaces.id })
        .from(spaces)
        .where(eq(spaces.slug, slug))
        .limit(1);

    if (!space.length) {
        throw new Error("Space not found");
    }

    // Step 2: fetch testimonials for that space
    const spaceId = space[0].id;

    return await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.spaceId, spaceId));
}

export async function likeTestimonials(id: string, Liked: boolean) {
    try {
        await db
            .update(testimonials)
            .set({ Liked })
            .where(eq(testimonials.id, id))
        return { success: true }
    } catch (error) {
        console.error("Failed to toggle like", error)
        return { success: false, error: 'Database update failed' }
    }
}