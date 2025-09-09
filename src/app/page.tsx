import { Button } from "@/components/ui/button";
import Link from "next/link";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <>
      <div>
        <Nav />
        <main className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-4xl text-center w-160 text-primary font-semibold leading-12">
            Collect testimonials in minutes & use them to show your customer
            trust
          </h1>
          <p className="text-sm text-center w-120 mt-6 leading-6">
            Turn website visitors into customers with testimonials Get
            testimonials by sharing a simple link & display them seamlessly on
            your website
          </p>
          <div className="flex flex-col items-center justify-center mt-10">
            <Link href="/dashboard">
              <Button>Get Started for Free</Button>
            </Link>
            <p className="text-sm opacity-90 mt-2">
              It's 100% free to start. No credit card required!
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
