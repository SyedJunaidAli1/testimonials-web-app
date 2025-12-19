"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "@/app/components/themetoggler";
import { Dock, DockIcon } from "@/components/ui/dock";
import { GithubSolid } from "@/app/icons/githhub-solid-icon";
import Image from "next/image";

const Nav = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 mt-4">
      <section className="flex flex-wrap items-center justify-between py-2 px-3 border rounded-xl">
        {/* Logo */}
        <Image loading="lazy" src="/logo.png" alt="logo" width={50} height={50} />

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 items-center justify-center text-center">
          <div className="relative">
            <Dock direction="middle" className="mt-0">
              <DockIcon>
                <Link href="https://github.com/SyedJunaidAli1/testimonials-web-app">
                  <Button variant="ghost">
                    <GithubSolid className="size-6" />
                  </Button>
                </Link>
              </DockIcon>
              <DockIcon>
                <ThemeToggle />
              </DockIcon>
            </Dock>
          </div>
          <Link href="/signup">
            <Button>Signup</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Nav;
