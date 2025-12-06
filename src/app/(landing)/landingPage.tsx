"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import Nav from "@/app/components/Nav";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";

const Landing = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SELF_URL;
  const embedUrl = `${baseUrl}/embed/wall?slug=test`;
  const embedCode = `<iframe src="${embedUrl}" width="100%" height="400px" scrolling="auto" style="border:none;border-radius:8px;overflow:hidden" loading="lazy"></iframe>`;
  return (
    <>
      <main className="min-h-screen bg-background">
        <Nav />
        <section className="relative overflow-hidden py-20 sm:py-32">
          {/*HeroVideoDialog section*/}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <motion.h1
                className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Collect testimonials in minutes & use them to show your customer{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  trust
                </span>
              </motion.h1>
              <motion.p
                className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Turn website visitors into customers with testimonials Get
                testimonials by sharing a simple link & display them seamlessly
                on your website
              </motion.p>
              <motion.div
                className="flex flex-col items-center justify-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link href="/dashboard">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button size="lg">
                      Get Started for Free
                      <ArrowRight />
                    </Button>
                  </motion.div>
                </Link>
                <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto ">
                  It's 100% free to start. No credit card required!
                </p>
              </motion.div>
            </div>
          </div>
          <motion.div
            className="relative flex justify-center max-w-6xl mx-auto mt-16 mb-12 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.89 }}
          >
            <motion.div
              className="flex justify-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.89 }}
            >
              <HeroVideoDialog
                videoSrc="/mvp.jpg"
                thumbnailSrc="/mvp.jpg"
                thumbnailAlt="Product demo video"
                className="max-w-6xl block dark:hidden"
              />
              <HeroVideoDialog
                videoSrc="/mvp.jpg"
                thumbnailSrc="/mvp.jpg"
                thumbnailAlt="Product demo video"
                className="max-w-6xl hidden dark:block"
              />
            </motion.div>
            <BorderBeam
              duration={15}
              size={300}
              className="absolute top-0 left-0 h-full"
            />
          </motion.div>

          {/*Wall of love*/}
          <section className="bg-muted/30 pt-20 mb-20">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Wall of{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  love
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {`A glimpse of what’s possible with just a few clicks.`}
              </p>
            </motion.div>
            <motion.div
              className="mt-12 px-10"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                scale: 1.02,
                y: -8,
                transition: {
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              whileTap={{
                scale: 0.98,
                transition: {
                  duration: 0.1,
                },
              }}
            >
              <iframe
                src={embedUrl}
                width="100%"
                height="600px"
                scrolling="auto"
                style={{
                  border: "2px solid",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
                loading="lazy"
              ></iframe>
            </motion.div>
          </section>

          {/*Sample section*/}
          <section className="py-10 bg-muted/60 mb-20 max-w-3xl mx-auto rounded-lg relative">
            <motion.div
              className="px-4 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg leading-8">Try our sample embed code</h3>
              <p className="leading-8 pb-2">
                Embed the wall of love to your website in few seconds.
              </p>
              <Textarea
                readOnly
                value={embedCode}
                className="border rounded-md px-4 py-3 w-full font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigator.clipboard
                      .writeText(embedCode)
                      .then(() => {
                        toast.success("Copied to clipboard");
                      })
                      .catch(() => {
                        toast.error("Failed to copy");
                      });
                  }}
                >
                  <Copy /> Copy this code
                </Button>
                <Link href={embedUrl}>
                  <Button className="mt-4" type="button">
                    Live Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
            <BorderBeam
              duration={10}
              size={120}
              className="absolute top-0 left-0 h-full"
            />
          </section>

          {/*Features*/}
          <section className="bg-muted/30 py-16 mb-20 ">
            <motion.div
              className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-center tracking-tight mb-10">
                Collect and display testimonials in one effortless workflow
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* TEXT SECTION */}
                <div className="max-w-xl space-y-4">
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Quick to set up
                  </p>

                  <p className="text-4xl font-bold tracking-tight leading-tight">
                    Your all-in-one dashboard
                  </p>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    Create a dedicated dashboard for your business. Easily share
                    the page link anywhere — email, websites, social platforms.
                    The entire setup takes less than two minutes.
                  </p>

                  <div className="pt-2">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Manage spaces & testimonials effortlessly</li>
                      <li>• Approve or reject entries instantly</li>
                      <li>• Generate embed widgets with one click</li>
                      <li>• Track activity and Download testimonials</li>
                    </ul>
                  </div>
                </div>

                {/* IMAGE */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: -50, scale: 0.9 }}
                  animate={{ opacity: 1, y: -0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    scale: 1.06,
                    y: 16,
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: {
                      duration: 0.1,
                    },
                  }}
                >
                  <Image
                    src="/dashboard.png"
                    alt="dashboard"
                    width={800}
                    height={800}
                    className="rounded-xl border shadow-xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          </section>

          <section className="bg-muted/60 py-16 mb-20"></section>
        </section>
      </main>
    </>
  );
};

export default Landing;
