"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "./ui/text-blur";
import { Star, ShieldCheck, Sparkles } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatarBg: string;
  avatarInitials: string;
  tierTag: string;
  rating: number;
  content: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Mark Sinistaj",
    role: "Founder & Site Owner",
    company: "rclawncare.net",
    avatarBg: "bg-emerald-600 text-white",
    avatarInitials: "MS",
    tierTag: "Single Site Pro",
    rating: 5,
    highlight: "Instantly showed us what was slowing down our site.",
    content:
      "Installed the plugin and ran the server health audit in under a minute. The Config Grader pinpointed our exact PHP limits and memory bottlenecks before our busy season.",
  },
  {
    name: "Jeffrey T. Burg",
    role: "Lead Developer",
    company: "idesignwork.nl",
    avatarBg: "bg-indigo-600 text-white",
    avatarInitials: "JB",
    tierTag: "Unlimited License",
    rating: 5,
    highlight: "Helps troubleshoot compatibility issues quickly.",
    content:
      "Perfect for developers, it helps troubleshoot compatibility issues quickly, though access should be limited to admins for security.",
  },
  {
    name: "Suleyman Ali",
    role: "WordPress Freelancer",
    company: "Freelance Developer",
    avatarBg: "bg-purple-600 text-white",
    avatarInitials: "SA",
    tierTag: "Pro License",
    rating: 5,
    highlight: "Awesome Detailed PHP Server Info Plugin!",
    content:
      "Awesome Detailed PHP Server Info Plugin What I Want. Congrats!!!",
  },
];

export default function Testimonials() {
  return (
    <motion.div
      id="testimonials"
      className="flex w-full max-w-6xl flex-col gap-2 pt-16 md:pt-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      
      {/* Section Header */}
      <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/80 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-800 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-violet-600" />
          <span>Proven by 3,000+ WordPress Developers & Site Owners</span>
        </div>

        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl"
          text="Trusted by pros who manage real sites."
        />

        <TextBlur
          className="mt-1.5 mx-auto max-w-xl text-center text-base text-zinc-600"
          text="Here is why business owners, agency founders, and freelancers rely on phpinfo() WP."
          duration={0.8}
        />

        {/* Rating Summary Bar */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-700">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-bold text-zinc-900">4.9 / 5</span>
          <span className="text-zinc-400">•</span>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Verified Customer Feedback
          </span>
        </div>
      </motion.div>

      {/* Static 3-Card Grid */}
      <motion.div variants={itemVariants} className="mt-8 w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-md">
              
              <div>
                {/* Stars & Tag */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="rounded-md border border-violet-200/80 bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                    {t.tierTag}
                  </span>
                </div>

                {/* Highlight Quote */}
                <h4 className="mb-2 text-sm font-bold tracking-tight text-zinc-900 leading-snug">
                  “{t.highlight}”
                </h4>

                {/* Main Content */}
                <p className="text-xs text-zinc-600 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author Meta */}
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-4">
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm ${t.avatarBg}`}>
                  {t.avatarInitials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-xs font-bold text-zinc-900">
                    {t.name}
                  </span>
                  <span className="truncate text-[11px] text-zinc-500">
                    {t.role} · <span className="font-medium text-zinc-700">{t.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
