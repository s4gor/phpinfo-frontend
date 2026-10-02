"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import TextBlur from "./ui/text-blur";
import { Star, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatarBg: string;
  avatarInitials: string;
  tierTag: string;
  rating: number;
  highlight: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Rivers",
    role: "Full-Stack WP Developer",
    company: "Apex Digital",
    avatarBg: "bg-emerald-600 text-white",
    avatarInitials: "AR",
    tierTag: "Pro License",
    rating: 5,
    highlight: "Instantly showed us what was bottlenecking PHP.",
    content:
      "Installed the plugin and ran the server health audit in under a minute. The Config Grader pinpointed our exact memory limits and timeout thresholds right before our client's busy season.",
  },
  {
    name: "Marcus Vance",
    role: "Lead WP Engineer",
    company: "Vance Interactive",
    avatarBg: "bg-indigo-600 text-white",
    avatarInitials: "MV",
    tierTag: "Unlimited License",
    rating: 5,
    highlight: "Helps troubleshoot compatibility issues in seconds.",
    content:
      "Clean and straight to the point. Gives me an instant look at OPcache, active PHP modules, and database query buffers across multiple client staging sites without digging through server control panels.",
  },
  {
    name: "Dave Miller",
    role: "Agency Director",
    company: "Northline Studio",
    avatarBg: "bg-blue-600 text-white",
    avatarInitials: "DM",
    tierTag: "Agency License",
    rating: 5,
    highlight: "The PDF audit reports stopped clients questioning our retainers.",
    content:
      "We manage 35+ client sites on VPS. Every month we attach the white-label PDF audit to the maintenance invoice. Clients see the green health score and PHP memory breakdown. It completely stopped the 'why are we paying monthly maintenance?' emails.",
  },
  {
    name: "Bastian Lindner",
    role: "WooCommerce Dev",
    company: "Kite & Code",
    avatarBg: "bg-amber-600 text-white",
    avatarInitials: "BL",
    tierTag: "Unlimited License",
    rating: 5,
    highlight: "Found why our checkout was throwing 504 timeouts.",
    content:
      "A client's store was randomly timing out during checkout spikes. Hosting support blamed WooCommerce, WooCommerce logs blamed the server. Ran phpinfo() WP and saw max_execution_time was stuck at 30s and OPcache was 98% full. Adjusted it in 2 minutes, problem solved.",
  },
  {
    name: "Sarah Jenkins",
    role: "Freelance Site Builder",
    company: "SJ Creative",
    avatarBg: "bg-rose-600 text-white",
    avatarInitials: "SJ",
    tierTag: "Pro License",
    rating: 5,
    highlight: "No more fear when upgrading PHP versions.",
    content:
      "Upgrading client sites from PHP 8.1 to 8.3 used to give me anxiety because you never know which old plugin will throw a fatal error. The compatibility pre-flight flagged two deprecated functions in an old slider plugin before I touched the live server.",
  },
  {
    name: "Marco De Luca",
    role: "Hosting & Ops Consultant",
    company: "StackPilot Ops",
    avatarBg: "bg-teal-600 text-white",
    avatarInitials: "MD",
    tierTag: "Agency License",
    rating: 5,
    highlight: "Finally stopped creating disposable info.php files.",
    content:
      "Used to FTP a phpinfo.php file into root whenever I needed to check OPcache or MySQL socket paths, and constantly worried about leaving it exposed. Having this securely inside wp-admin with admin-only capability check is just common sense.",
  },
];

// We duplicate the list into 3 sets so laptop trackpad gestures can scroll smoothly in both directions
const carouselItems = [...testimonials, ...testimonials, ...testimonials];
const BASE_INDEX = testimonials.length; // middle set starts at index 6

export default function Testimonials() {
  const [activeRound, setActiveRound] = useState(0); // 0 to 5
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to a specific card smoothly
  const scrollToCard = useCallback((virtualIndex: number, smooth = true) => {
    const container = containerRef.current;
    const targetCard = cardRefs.current[virtualIndex];
    if (!container || !targetCard) return;

    isProgrammaticScrollRef.current = true;
    const targetLeft = targetCard.offsetLeft - container.offsetLeft;

    container.scrollTo({
      left: targetLeft,
      behavior: smooth ? "smooth" : "auto",
    });

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 450);
  }, []);

  // Initialize position to the middle set on mount
  useEffect(() => {
    scrollToCard(BASE_INDEX, false);
  }, [scrollToCard]);

  // Handle native gesture scroll (laptop trackpad / touch swipe)
  const handleScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    // Find which card is closest to the left edge
    let closestIndex = BASE_INDEX;
    let minDiff = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardLeft = card.offsetLeft - container.offsetLeft;
      const diff = Math.abs(cardLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    const normalizedRound = closestIndex % testimonials.length;
    setActiveRound(normalizedRound);

    // Seamless loop reset when scrolling too far left or right
    if (closestIndex < testimonials.length / 2) {
      const resetIndex = closestIndex + testimonials.length;
      scrollToCard(resetIndex, false);
    } else if (closestIndex >= testimonials.length * 2.5) {
      const resetIndex = closestIndex - testimonials.length;
      scrollToCard(resetIndex, false);
    }
  }, [scrollToCard]);

  // Go to a specific round (0-5)
  const goToRound = useCallback(
    (targetRound: number) => {
      const normalized = ((targetRound % testimonials.length) + testimonials.length) % testimonials.length;
      setActiveRound(normalized);
      scrollToCard(BASE_INDEX + normalized, true);
    },
    [scrollToCard]
  );

  // Auto-scroll every 5 seconds (shifts 1 card left, next enters from right)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveRound((current) => {
        const nextRound = (current + 1) % testimonials.length;
        scrollToCard(BASE_INDEX + nextRound, true);
        return nextRound;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, scrollToCard]);

  return (
    <div
      id="testimonials"
      className="scroll-mt-24 sm:scroll-mt-32 flex w-full max-w-6xl flex-col gap-2 pt-16 md:pt-24">
      {/* Anchor alias so #reviews also works */}
      <span id="reviews" className="sr-only" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center px-4">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/80 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-800 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-violet-600" />
          <span>Real Experiences from 3,000+ WordPress Developers &amp; Site Owners</span>
        </div>

        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl"
          text="Trusted by pros who manage real sites."
        />

        <TextBlur
          className="mt-1.5 mx-auto max-w-xl text-center text-base text-zinc-600"
          text="Here is why business owners, agency founders, and freelancers rely on phpinfo() WP every day."
          duration={0.8}
        />

        {/* Rating Summary Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-700">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-bold text-zinc-900">4.9 / 5</span>
          <span className="text-zinc-400">•</span>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> User &amp; Developer Feedback
          </span>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative mt-8 w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}>
        {/* Navigation Arrow Left */}
        <button
          onClick={() => goToRound(activeRound - 1)}
          aria-label="Previous review"
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-md backdrop-blur-sm transition-all hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700 hover:scale-105 active:scale-95">
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={() => goToRound(activeRound + 1)}
          aria-label="Next review"
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-md backdrop-blur-sm transition-all hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700 hover:scale-105 active:scale-95">
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Gesture & Scrollable Track */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          tabIndex={0}
          className="flex w-full gap-4 md:gap-5 overflow-x-auto scroll-smooth py-3 px-1 scrollbar-none no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-2xl cursor-grab active:cursor-grabbing">
          {carouselItems.map((t, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="snap-start shrink-0 w-[86vw] sm:w-[360px] md:w-[calc((100%-2.5rem)/3)] flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-md select-none">
              <div>
                {/* Stars, Quote Icon & Tag */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
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
                  &ldquo;{t.content}&rdquo;
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

        {/* Carousel Indicators (Centered) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((_, index) => {
            const isActive = activeRound === index;
            return (
              <button
                key={index}
                onClick={() => goToRound(index)}
                aria-label={`Go to review round ${index + 1} of 6`}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer ${
                  isActive
                    ? "w-7 bg-violet-600 shadow-sm"
                    : "w-2.5 bg-zinc-200 hover:bg-zinc-300"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
