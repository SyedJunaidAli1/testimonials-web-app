"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import Nav from "../components/Nav";

const Landing = () => {
  return (
    <>
      <main>
        <Nav />
        <motion.div></motion.div>
        <section className="flex flex-col items-center justify-center mt-20">
          <motion.h1
            className="text-4xl text-center w-160 font-semibold leading-12"
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
            className="text-sm text-center w-120 mt-6 leading-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Turn website visitors into customers with testimonials Get
            testimonials by sharing a simple link & display them seamlessly on
            your website
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
            <p className="text-sm opacity-90 mt-2">
              It's 100% free to start. No credit card required!
            </p>
          </motion.div>

          <div className="relative flex justify-center max-w-6xl mx-auto mt-16 mb-12 rounded-lg overflow-hidden">
            <Image
              src="/mvp.jpg"
              width={1000}
              height={800}
              alt="mvp"
              className="border-2"
            />
            <BorderBeam
              duration={14}
              size={250}
              className="absolute top-0 left-0 h-full"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Landing;
