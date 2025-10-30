import { Button } from "@/components/ui/button";
import Link from "next/link";
import Nav from "./components/Nav";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";

export default function Home() {
  return (
    <>
      <main>
        <Nav />
        <section className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-4xl text-center w-160 font-semibold leading-12">
            Collect testimonials in minutes & use them to show your customer{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              trust
            </span>
          </h1>
          <p className="text-sm text-center w-120 mt-6 leading-6">
            Turn website visitors into customers with testimonials Get
            testimonials by sharing a simple link & display them seamlessly on
            your website
          </p>
          <div className="flex flex-col items-center justify-center mt-10">
            <Link href="/dashboard">
              <Button className="transition-transform duration-250 ease-in hover:scale-110">
                Get Started for Free
                <ArrowRight />
              </Button>
            </Link>
            <p className="text-sm opacity-90 mt-2">
              It's 100% free to start. No credit card required!
            </p>
          </div>

          <div className="relative flex justify-center max-w-6xl mx-auto mt-16 mb-12 rounded-lg overflow-hidden">
            <Image src="/mvp.jpg" width={800} height={800} alt="mvp" />
            <BorderBeam duration={8} size={100} className="absolute top-0 left-0 h-full"  />
          </div>
        </section>
      </main>
    </>
  );
}
