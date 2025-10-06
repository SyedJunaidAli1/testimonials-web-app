'use server'
import { db } from "@/db/drizzle"
import { spaces } from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq, and, } from "drizzle-orm";
import cloudinary from "./cloudinary"

export const createSpaces = async (formData: FormData) => {
    const requestheaders = await headers();
    const session = await auth.api.getSession({ headers: requestheaders });

    if (!session?.user?.id) {
        throw new Error("unauthorized");
    }

    // Get text inputs
    const spacename = formData.get("spacename") as string;
    if (!spacename?.trim()) throw new Error("Space name is required");

    const customMessage = formData.get("customMessage") as string;
    const headerTitle = formData.get("headerTitle") as string;
    const customBtnColor = formData.get("customBtnColor") as string;
    const isShared = formData.get("isShared") === "true";
    const question1 = formData.get("question1") as string;
    const question2 = formData.get("question2") as string;
    const question3 = formData.get("question3") as string;
    const question4 = formData.get("question4") as string;
    const question5 = formData.get("question5") as string;
    const collectName = formData.get("collectName") === "true";
    const collectEmail = formData.get("collectEmail") === "true";
    const collectSocialLink = formData.get("collectSocialLink") === "true";
    const collectAddress = formData.get("collectAddress") === "true";
    const collectStar = formData.get("collectStar") === "true";
    const collectTitle = formData.get("collectTitle") === "true";
    const theme = formData.get("theme") as string;

    // Get file
    let logoUrl = "";
    const file = formData.get("spaceLogo") as File | null;

    if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const upload = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "spaces" }, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                })
                .end(buffer);
        });

        logoUrl = upload.secure_url;
    }

    await db.insert(spaces).values({
        userId: session.user.id,
        spacename,
        customMessage,
        headerTitle,
        customBtnColor,
        isShared,
        spaceLogo: logoUrl,
        question1,
        question2,
        question3,
        question4,
        question5,
        collectName,
        collectEmail,
        collectSocialLink,
        collectAddress,
        collectStar,
        collectTitle,
        theme,
    });
};

export const getSpaces = async () => {
    const requestheaders = await headers()
    const session = await auth.api.getSession({ headers: requestheaders })
    if (!session?.user.id) {
        throw new Error("Unauthorized")
    }

    const allSpaces = await db
        .select()
        .from(spaces)
        .where(eq(spaces.userId, session.user.id))

    return allSpaces
}

export const deleteSpaces = async (id: string) => {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });

    if (!session?.user.id) {
        throw new Error("Unauthorized");
    }

    const space = await db
        .select()
        .from(spaces)
        .where(and(eq(spaces.id, id), eq(spaces.userId, session.user.id)))
        .limit(1)

    if (!space.length) {
        throw new Error("space not found or not owned by user")
    }

    await db
        .delete(spaces)
        .where(and(eq(spaces.id, id), eq(spaces.userId, session.user.id)))

    return { success: true };
};

export const duplicateSpace = async (spaceId: string) => {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });

    if (!session?.user.id) {
        throw new Error("Unauthorized");
    }

    const space = await db.query.spaces.findFirst({
        where: (s, { eq }) => eq(s.id, spaceId)
    })

    if (!space) {
        throw new Error("Space not found")
    }

    const { id, createdAt, updatedAt, ...rest } = space;

    const newSpace = await db
        .insert(spaces)
        .values({
            ...rest,
            spacename: `${space.spacename}`
        }).returning()

    return newSpace[0]

}

export const getSpaceById = async (spaceId: string) => {
    if (!spaceId) throw new Error("Missing space id")

    const [Space] = await db
        .select()
        .from(spaces)
        .where(eq(spaces.id, spaceId))

    return Space || null
}