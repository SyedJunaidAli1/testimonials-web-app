import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - Testimonia",
  description:
    "Testimonia helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};

const page = () => {
  return (
    <>
      <section className="min-h-[75vh] w-full mx-auto max-w-[700px] mt-12 px-4 sm:px-6 py-16">
        <main className="flex flex-col items-start justify-center gap-8">
          <header className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold">Contact Us</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We’re here to help. Whether you have a question, found a bug, or
              simply want to share feedback — feel free to reach out.
            </p>
          </header>

          {/* Support Section */}
          <div>
            <h2 className="text-lg font-medium">Support & General Questions</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              For help using the app or managing your testimonials, send us an
              email anytime at{" "}
              <a
                href="mailto:syedjunaidali790@gmail.com"
                className="text-primary hover:underline"
              >
                syedjunaidali790@gmail.com
              </a>
              . We usually respond within 24 hours.
            </p>
          </div>

          {/* Bug Reports */}
          <div>
            <h2 className="text-lg font-medium">Report a Bug</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Since this is an open-source project, bug reports are extremely
              helpful. If you notice an issue, please open a ticket on GitHub
              with steps to reproduce it.
            </p>

            <p className="mt-3">
              <a
                href="https://github.com/SyedJunaidAli1"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Visit GitHub Repository →
              </a>
            </p>
          </div>

          {/* Feature Requests */}
          <div>
            <h2 className="text-lg font-medium">Feature Requests</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Have an idea that could make the experience better? We’d love to
              hear it. Send us your suggestion or open a discussion on GitHub.
            </p>
          </div>

          {/* Business Inquiries */}
          <div>
            <h2 className="text-lg font-medium">Business & Partnership</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              For collaboration, integration, or partnership inquiries, reach
              out via email. We're open to working with creators, startups, and
              businesses looking to build trust through testimonials.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-medium">Connect with the Creator</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Stay updated on upcoming features and improvements.
            </p>

            <div className="mt-3 space-y-1">
              <Link
                href="https://github.com/SyedJunaidAli1"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline block"
              >
                GitHub Profile →
              </Link>

              <Link
                href="mailto:syedjunaidali790@gmail.com"
                className="text-primary hover:underline block"
              >
                Email the Developer →
              </Link>
            </div>
          </div>

          <div className="w-full h-[1px] bg-neutral-50/15 mt-8" />

          <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
            <p className="text-sm font-medium italic text-muted-foreground">
              v0.70
            </p>
            <div className="text-sm text-muted-foreground">
              <span>
                Built to help you collect, manage, and showcase testimonials
              </span>
            </div>
          </footer>
        </main>
      </section>
    </>
  );
};

export default page;
