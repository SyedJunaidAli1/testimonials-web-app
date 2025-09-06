'use server'
import { auth } from '@/lib/auth'

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const res = await auth.api.signUpEmail({
            body: { name, email, password }
        })
        return { res }
    } catch (error) {
        console.error("Signup user creation failed:", error);
        throw new Error("Failed to Sign up")
    }
}


export const signin = async (email: string, password: string) => {
    try {
        const res = await auth.api.signInEmail({
            body: { email, password }
        })
        return { res }
    } catch (error) {
        console.error("Signin user failed:", error);
        throw new Error("Failed to Sign in")
    }
}

export const forgotPassword = async (email: string) => {
    try {
        const res = await auth.api.requestPasswordReset({
            body: { email }
        });

    } catch (error: any) {
        console.error(error)
        throw new Error
    }
}