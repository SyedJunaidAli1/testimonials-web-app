import { GithubSolid } from "@/app/icons/githhub-solid-icon";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - YourAppName",
  description:
    "YourAppName helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};
const Page = () => {
  return (
    <>
      <section className="min-h-[75vh] w-full mx-auto max-w-[700px] mt-12 px-4 sm:px-6 py-16">
        <main className="flex flex-col items-start justify-center gap-8">
          <header className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold">
              About Wall of Love
            </h1>
            <p className="mt-2 text-sm">
              An open-source testimonial engine that helps creators, startups,
              and teams collect, manage, and showcase authentic social proof —
              anywhere.
            </p>
          </header>

          <div>
            <h2 className="text-lg font-medium">What this app does</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Wall of Love makes it effortless to gather feedback and turn it
              into polished testimonial sections, shareable pages, and
              embeddable widgets. Whether you're building a landing page, SaaS,
              portfolio, or shop — you can collect testimonials, approve them,
              and display them beautifully.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">Design & Principles</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Clean UI, fast performance, and zero-complexity setup. The goal is
              to keep everything intuitive: no clutter, no dashboards full of
              noise — just the tools you need to gather trust and display it
              with confidence.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">Open Source & Roadmap</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              The entire project is open source and actively maintained.
              Features like advanced layouts, analytics, custom themes, and more
              are being built based on community suggestions. Contributions,
              ideas, and pull requests are always welcome.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <div>
              <h2 className="text-lg font-medium">Contact</h2>
              <p className="mt-2 text-[15px] font-medium leading-relaxed">
                For support, collaboration, or questions, email{" "}
                <Link
                  href="mailto:syedjunaidali790@gmail.com"
                  className="text-primary hover:underline"
                >
                  syedjunaidali790@gmail.com
                </Link>
                . You can also reach the maintainer on GitHub:
              </p>
            </div>

            <p className="pt-3 pr-2">
              <Link
                href="https://github.com/SyedJunaidAli1"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-medium"
              >
                <GithubSolid fontSize={32} />
              </Link>
            </p>
          </div>

          <div className="w-full h-[1px] bg-neutral-50/15" />

          <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
            <p className="text-sm font-medium italic text-muted-foreground">
              v0.70
            </p>
            <div className="text-sm text-muted-foreground">
              <span>Collect • Approve • Showcase • Build trust</span>
            </div>
          </footer>
        </main>
      </section>
    </>
  );
};

export default Page;
