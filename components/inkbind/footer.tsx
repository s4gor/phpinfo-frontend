import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { INKBIND_APP_STORE_URL, INKBIND_HELP_URL } from "@/lib/inkbind";

export default function InkbindFooter() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-auto flex w-full flex-col items-center justify-between gap-4 border-t bg-background p-6 text-sm text-muted-foreground md:flex-row md:px-12">
      <motion.div variants={itemVariants}>
        <span className="text-zinc-600">Inkbind - a product by </span>
        <Link href="https://exeebit.com" rel="noopener noreferrer" target="_blank">
          <span className="text-zinc-800 underline underline-offset-2 transition-all duration-200 ease-linear hover:text-[#0123D2]">
            Exeebit
          </span>
        </Link>
        <span className="text-zinc-400"> &middot; &copy; {new Date().getFullYear()}</span>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-5 text-zinc-600">
        <Link href="/impressum" className="hover:text-[#0123D2]">
          Impressum
        </Link>
        <Link href={INKBIND_HELP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#0123D2]">
          Help center
        </Link>
        <Link href={INKBIND_APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#0123D2]">
          Shopify App Store
        </Link>
        <Link href="/support" className="hover:text-[#0123D2]">
          Support
        </Link>
      </motion.div>
    </motion.div>
  );
}
