'use server'
import { db } from "@/db/drizzle"
import { spaces } from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

type createSpacesInput = {
    spacename: string;
    description: string;
    isShared: boolean;
    spaceLogo: string;
    headerTitle: string;
    customMessage: string;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    collectName: boolean;
    collectEmail: boolean;
    collectAddress: boolean;
    collectStar: boolean;
    customBtnColor: string;
}

export const createSpaces = async (input: createSpacesInput) => {

    const requestheaders = await headers()
    const session = await auth.api.getSession({ headers: requestheaders })

    if (!session || !session.user || !session.user.id) {
        throw new Error("unauthorized")
    }
    if (!input.spacename?.trim()) {
        throw new Error("Space name is required")
    }
    await db.insert(spaces).values({
        userId: session.user.id,
        ...input,
    })

}  