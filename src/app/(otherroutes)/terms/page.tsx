import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use - Testimonia",
  description:
    "Testimonia helps creators and businesses collect testimonials, manage social proof, and embed beautiful widgets on any website. Simple, fast, and privacy-friendly.",
};
const page = () => {
  return (
    <>
      <section className="min-h-[75vh] w-full mx-auto max-w-[700px] mt-12 px-4 sm:px-6 py-16">
        <main className="flex flex-col items-start justify-center gap-8">
          <header className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold">Terms of Use</h1>
            <p className="mt-2 text-sm">
              By using this app, you agree to the terms below. These terms exist
              to keep Testimonia fair, safe, and enjoyable for everyone.
            </p>
          </header>

          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-medium">1. Using the Service</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Testimonia allows you to collect, manage, and display
              testimonials and social proof. You agree to use the app only for
              legal, ethical, and respectful purposes. Do not upload harmful,
              abusive, illegal, or malicious content.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-medium">2. Your Data & Privacy</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Your data belongs to you. We do not sell, rent, or share your
              information with third parties — ever. The testimonials, spaces,
              and content you create are stored securely, and used only to
              provide the features you request (such as displaying embeds,
              generating widgets, or showing your Wall of Love page).
            </p>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              You may delete your data at any time. Once removed, we do not keep
              backups of your content unless required for security or abuse
              prevention.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-medium">
              3. Testimonials Submitted by Users
            </h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              If you allow users to submit testimonials, you are responsible for
              how those testimonials are used or displayed. We do not review or
              verify user-submitted content and are not responsible for what
              your users write.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-medium">4. Availability & Updates</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              This app is actively maintained, but downtime or updates may
              occur. Features may change or be removed over time as the project
              evolves. Wherever possible, we aim to maintain backward
              compatibility.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-medium">5. Open Source Contribution</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Testimonia is open source. By contributing code, ideas, or
              fixes, you agree that your contributions may be used in the
              project under the repository’s license.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-lg font-medium">6. Termination</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              We reserve the right to disable or remove content that violates
              these terms, including illegal or abusive content. You may stop
              using the app at any time and remove your data.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-lg font-medium">7. Contact</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              If you have questions about these terms or how your data is
              handled, contact us at{" "}
              <Link
                href="mailto:syedjunaidali790@gmail.com"
                className="text-primary hover:underline"
              >
                syedjunaidali790@gmail.com
              </Link>
              .
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-neutral-50/15" />

          {/* Footer */}
          <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
            <p className="text-sm font-medium italic text-muted-foreground">
              Updated: 2025
            </p>
            <div className="text-sm text-muted-foreground">
              <span>Built for creators • Powered by trust</span>
            </div>
          </footer>
        </main>
      </section>
    </>
  );
};

export default page;
