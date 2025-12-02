"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./themetoggler";
import { Dock, DockIcon } from "@/components/ui/dock";
import { GithubSolid } from "../icons/githhub-solid-icon";
import Image from "next/image";

const Nav = () => {
  return (
    <main className="max-w-4xl mx-auto px-4">
      <section className="flex flex-wrap items-center justify-between py-2 px-3 border rounded-xl mt-4">
        {/* Logo */}
        <Image
          src="/image-holder.png"
          alt="this is logo"
          width={20}
          height={20}
        />

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <Dock>
            <DockIcon>
              <GithubSolid fontSize={30} />
            </DockIcon>
          </Dock>
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
