"use client";

import TextBlur from "./ui/text-blur";
import { Play } from "lucide-react";

// Drop in one of:
//   NEXT_PUBLIC_DEMO_LOOM_URL = https://www.loom.com/embed/<id>
//   /public/demo.mp4         (a 30s screen recording)
// If neither is present, we render an inviting "coming" placeholder.
const LOOM_URL = process.env.NEXT_PUBLIC_DEMO_LOOM_URL;

export default function DemoVideo() {
  return (
    <div
      id="demo"
      className="flex w-full max-w-4xl flex-col gap-2 pt-16 md:pt-24">
      <div>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl"
          text="Watch a 30-second tour."
        />
      </div>
      <div>
        <TextBlur
          className="mx-auto max-w-[34rem] text-center text-base text-zinc-700 sm:text-lg"
          text="Install → Run Audit → Export PDF. From zero to a deliverable client report."
          duration={0.8}
        />
      </div>

      <div
        className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs">
        <div className="relative aspect-video w-full">
          {LOOM_URL ? (
            <iframe
              src={LOOM_URL}
              title="phpinfo() WP demo"
              allow="fullscreen; clipboard-write"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <VideoFallback />
          )}
        </div>
      </div>
    </div>
  );
}

function VideoFallback() {
  return (
    <div className="group relative h-full w-full">
      <video
        src="/demo.mov"
        poster="/screenshots/dashboard.png"
        controls
        playsInline
        preload="metadata"
        className="h-full w-full bg-black"
        onError={(e) => {
          (e.currentTarget as HTMLVideoElement).style.display = "none";
        }}
      />
    </div>
  );
}
