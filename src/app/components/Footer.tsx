"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Mail, FileText, Info, LucideIcon } from "lucide-react"; // Import LucideIcon type

// --- 1. Type Definitions ---

/** Interface for the Link props */
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

// --- Variant Definitions (No Change) ---
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

// --- CSS Class Definitions (No Change) ---
const linkHoverClasses =
  "group relative flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out font-medium";

const underlineClasses =
  "pointer-events-none absolute left-0 bottom-0 h-[3px] w-full origin-left scale-x-0 bg-primary/80 transition-transform duration-300 group-hover:scale-x-100 rounded-full";

// --- 2. Type-Safe Icon Helper ---
/** Helper function to map path to a Lucide Icon component */
const getLinkIcon = (path: string): LucideIcon | null => {
  switch (path) {
    case "/about":
      return Info;
    case "/terms":
      return FileText;
    case "/privacy":
      return FileText;
    case "/contact":
      return Mail;
    default:
      return null;
  }
};

// --- 3. Type-Safe Link Component ---
const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  const IconComponent = getLinkIcon(href);
  return (
    <motion.div variants={itemVariants}>
      <Link href={href} className={linkHoverClasses}>
        {/* Render the icon if it exists */}
        {IconComponent && <IconComponent className="h-4 w-4" />}
        {children}
        <span className={underlineClasses} />
      </Link>
    </motion.div>
  );
};

export default function Footer() {
  return (
    <footer className="border-t-2">
      <motion.div
        className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 sm:px-8 lg:px-10 md:flex-row md:items-start md:justify-between"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Left: Brand / About */}
        <motion.div variants={itemVariants} className="space-y-3 max-w-sm">
          <p className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-primary dark:text-white">
            <Heart className="w-5 h-5 fill-primary text-primary" />
            Testimonia
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-normal">
            Collect testimonials, showcase social proof, and embed them anywhere
            — all from a single, simple dashboard.
          </p>
        </motion.div>

        {/* Center: Links Group */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-20">
          {/* Company Links */}
          <motion.nav variants={itemVariants} className="flex flex-col gap-3">
            <p className="font-semibold text-sm mb-1 text-gray-800 dark:text-gray-200">
              Company
            </p>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </motion.nav>

          {/* Legal Links */}
          <motion.nav variants={itemVariants} className="flex flex-col gap-3">
            <p className="font-semibold text-sm mb-1 text-gray-800 dark:text-gray-200">
              Legal
            </p>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
          </motion.nav>
        </div>

        {/* Right: Small meta */}
        <motion.div
          variants={itemVariants}
          className="md:self-end text-sm text-gray-500 dark:text-gray-400 space-y-2 md:text-right"
        >
          <p>© {new Date().getFullYear()} Testimonia. All rights reserved.</p>
          <p className="max-w-xs md:ml-auto">
            Built with care for founders, creators, and teams who love feedback.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
