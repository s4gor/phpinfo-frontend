import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function ClearSiteFooter() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-auto flex w-full flex-col items-center justify-between gap-4 border-t bg-background p-6 text-sm text-muted-foreground md:flex-row md:px-12">
      <motion.div variants={itemVariants}>
        <span className="text-zinc-600">ClearSite - a product by </span>
        <Link href="https://exeebit.com" rel="noopener noreferrer" target="_blank">
          <span className="text-zinc-800 underline underline-offset-2 transition-all duration-200 ease-linear hover:text-blue-700">
            Exeebit
          </span>
        </Link>
        <span className="text-zinc-400"> &middot; &copy; {new Date().getFullYear()}</span>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-5 text-zinc-600">
        <Link href="/impressum" className="hover:text-blue-700">
          Impressum
        </Link>
        <Link href="/clearsite/privacy" className="hover:text-blue-700">
          Privacy Policy
        </Link>
        <Link href="/clearsite/terms" className="hover:text-blue-700">
          Terms
        </Link>
        <Link href="/support" className="hover:text-blue-700">
          Support
        </Link>
      </motion.div>
    </motion.div>
  );
}
