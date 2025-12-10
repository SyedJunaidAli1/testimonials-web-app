import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {};
const page = () => {
  return (
    <>
      <section className="min-h-[75vh] w-full mx-auto max-w-[700px] mt-12 px-4 sm:px-6 py-16">
        <main className="flex flex-col items-start justify-center gap-8">
          <header className="w-full">
            <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
            <p className="mt-2 text-sm">
              Your privacy matters. This page explains what data we collect, how
              we use it, and how we keep everything safe.
            </p>
          </header>

          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-medium">1. What Data We Collect</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              We only collect information needed to make the app function. This
              includes:
            </p>
            <ul className="mt-2 list-disc ml-6 text-[15px] font-medium leading-relaxed">
              <li>Your account details (email, name if provided)</li>
              <li>Spaces you create and their settings</li>
              <li>Testimonials submitted by you or your users</li>
              <li>
                Basic analytics (app usage, error logs — no personal
                identifiers)
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-medium">2. How We Use Your Data</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              We use your information strictly to operate the features you
              request — nothing else. This includes:
            </p>
            <ul className="mt-2 list-disc ml-6 text-[15px] font-medium leading-relaxed">
              <li>Displaying your testimonials and spaces</li>
              <li>Generating embed widgets and shareable pages</li>
              <li>Improving performance and reliability of the app</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-medium">3. What We Do NOT Do</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              We do <strong>not</strong> sell, rent, share, or trade your data
              with any third party. We do not use your testimonials or private
              information for advertising or profiling.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-medium">4. Data Ownership</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Everything you create — your account, spaces, testimonial content
              — is yours. You may edit or delete your data at any time. When you
              delete something, it is permanently removed from our database
              unless needed for security or abuse prevention.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-medium">5. How We Protect Your Data</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              We use industry-standard security practices including encrypted
              database storage and secure API access. Only you can manage your
              content. We continually monitor for unauthorized access and
              vulnerabilities.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-lg font-medium">6. Third-Party Services</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              We may use trusted third-party tools (e.g., email delivery,
              analytics). These tools never receive your personal data unless
              required for a feature you explicitly use.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-lg font-medium">7. User-Generated Content</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Testimonials submitted by your users may contain names, messages,
              or images. You are responsible for how this content is used or
              displayed. You may delete any testimonial at any time.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-lg font-medium">8. Cookies & Local Storage</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              This app uses minimal cookies or local-storage only to keep you
              logged in and improve performance. No tracking or advertising
              cookies are used.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-lg font-medium">9. Changes to This Policy</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              Updates may occur as new features are added. Significant changes
              will be announced, and you may review this page anytime.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-lg font-medium">10. Contact</h2>
            <p className="mt-2 text-[15px] font-medium leading-relaxed">
              If you have questions about your privacy or how your data is
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

          <div className="w-full h-[1px] bg-neutral-50/15" />

          <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
            <p className="text-sm font-medium italic text-muted-foreground">
              Updated: december 2025
            </p>
            <div className="text-sm text-muted-foreground">
              <span>Your trust • Your data • Your control</span>
            </div>
          </footer>
        </main>
      </section>
    </>
  );
};

export default page;
