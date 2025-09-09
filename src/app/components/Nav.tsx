'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./themetoggler";

const Nav = () => {
  return (
    <main className="flex justify-between items-center px-18 py-4 border-amber-400 border-2">
      <img src="/logo" alt="tis is logo" />
      <div className="flex gap-2 items-center juc">
        <Button variant="link">Wall of Love</Button>
        <Button variant="link">Features</Button>
        <Link href="/signup">
          <Button>Signin/Signup</Button>
        </Link>
        <ThemeToggle />
      </div>
    </main>
  );
};

export default Nav;
