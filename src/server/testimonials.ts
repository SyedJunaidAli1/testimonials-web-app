"use server"

import { db } from "@/db/drizzle"
import { testimonials } from "@/db/schema"


interface createTestimonialInput {
    spaceId: string,
    message: string,
    stars?: number,
    name?: string
    address?: string,
    email?: string,
    title?: string,
    socialLink?: string,
    isApproved: boolean
}

export const createTestimonial = async (input: createTestimonialInput) => {
    try {
        const [newTestimonial] = await db
            .insert(testimonials)
            .values({
                spaceId: input.spaceId,
                responseMessage: input.message,
                responseStars: input.stars,
                responseName: input.name,
                responseEmail: input.email,
                responseAddress: input.address,
                responseTitle: input.title,
                responseSocialLink: input.socialLink,
                isApproved: input.isApproved ?? false,
            })
            .returning()

        return newTestimonial

    } catch (err) {
        console.error(err)
        throw new Error("Failed to create testimonial")
    }
}