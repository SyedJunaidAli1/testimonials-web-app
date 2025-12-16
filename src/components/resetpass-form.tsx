"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/server/users";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function ResetPassForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="text-center text-red-500">
        No token provided. Please request a password reset.
      </div>
    );
  }

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newpassword") as string;
    const password = formData.get("confirmpassword") as string;

    if (newPassword !== password) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword(password, token);
      toast.success("Password Changed Successfully");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Please Enter you new Password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">New Password</Label>
                  <Input
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    placeholder="New Password"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Confirm Password</Label>
                  <Input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm password"
                    required
                  />
                </div>
                {/* 🔴 Show error here */}
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Reseting Password..." : "Reset Password"}
                </Button>
              </div>
              <div className="text-center text-sm">
                have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
}
