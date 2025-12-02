"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import Nav from "@/app/components/Nav";

const Landing = () => {
  return (
    <>
      <main className="min-h-screen bg-background">
        <Nav />
        <section className="relative overflow-hidden py-20 sm:py-32">
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

          <div className="bg-muted/30 pt-20"></div>
        </section>
      </main>
    </>
  );
};

export default Landing;
