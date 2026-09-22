import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Footer() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-auto flex w-full flex-col items-center justify-between gap-4 border-t bg-background p-6 text-sm text-muted-foreground md:flex-row md:px-12">

      <motion.div variants={itemVariants}>
        <span className="text-zinc-600">phpinfo() WP - a product by </span>
        <Link
          href="https://exeebit.com"
          rel="noopener noreferrer"
          target="_blank">
          <span className="text-zinc-800 underline underline-offset-2 transition-all duration-200 ease-linear hover:text-violet-700">
            Exeebit
          </span>
        </Link>
        <span className="text-zinc-600"> &middot; built by </span>
        <Link
          href="https://s4gor.exeebit.com"
          rel="noopener noreferrer"
          target="_blank">
          <span className="text-zinc-800 underline underline-offset-2 transition-all duration-200 ease-linear hover:text-violet-700">
            @s4gor
          </span>
        </Link>
        <span className="text-zinc-400"> &middot; &copy; {new Date().getFullYear()}</span>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-zinc-600">
        <Link
          href="/docs"
          className="transition-colors hover:text-violet-700 font-medium">
          Docs
        </Link>
        <Link
          href="/changelog"
          className="transition-colors hover:text-violet-700">
          Changelog
        </Link>
        <Link
          href="/impressum"
          className="transition-colors hover:text-violet-700">
          Impressum
        </Link>
        <Link
          href="/privacy"
          className="transition-colors hover:text-violet-700">
          Privacy
        </Link>
        <Link
          href="/terms"
          className="transition-colors hover:text-violet-700">
          Terms
        </Link>
        <Link
          href="/refund"
          className="transition-colors hover:text-violet-700">
          Refund
        </Link>
        <Link
          href="https://wordpress.org/plugins//"
          rel="noopener noreferrer"
          target="_blank"
          className="transition-colors hover:text-violet-700">
          Free plugin
        </Link>
        <Link
          href="https://wordpress.org/support/plugin//"
          rel="noopener noreferrer"
          target="_blank"
          className="transition-colors hover:text-violet-700">
          Support
        </Link>
        <Link
          href="mailto:support@exeebit.com"
          className="transition-colors hover:text-violet-700">
          Contact
        </Link>
      </motion.div>
    </motion.div>
  );
}
