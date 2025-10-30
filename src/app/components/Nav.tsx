"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./themetoggler";

const Nav = () => {
  return (
    <main className="max-w-4xl mx-auto px-4">
      <section className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 border rounded-lg">
        {/* Logo */}
        <img src="/logo" alt="this is logo" className="" />

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <Button variant="link">Wall of Love</Button>
          <Button variant="link">Features</Button>
          <ThemeToggle />
          <Link href="/signup">
            <Button variant="outline">Signup</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Nav;
