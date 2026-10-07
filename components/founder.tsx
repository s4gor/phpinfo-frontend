export default function Founder() {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-2 pt-16 md:pt-24">
      <div className="flex flex-col items-center gap-6 rounded-xl border border-zinc-200 bg-white p-8 shadow-xs text-center sm:flex-row sm:items-center sm:text-left dark:border-zinc-800 dark:bg-zinc-900 w-full">
        {/* Author Avatar Column with Green Dot & Community Badges */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="relative">
            <img
              src="/founder.jpg"
              alt="Emran Hossain Sagor - Founder & Lead Developer, phpinfo() WP"
              width={112}
              height={112}
              className="h-28 w-28 rounded-full border-2 border-violet-400/40 object-cover"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.src =
                  "data:image/svg+xml;utf8," +
                  encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112"><rect width="112" height="112" rx="56" fill="#18181b"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui,-apple-system,Segoe UI,sans-serif" font-size="36" fill="#a78bfa">E</text></svg>`
                  );
              }}
            />
          </div>

          {/* User handle and badge */}
          <div className="flex flex-col items-center gap-1.5 pt-0.5">
            <span className="inline-flex items-center rounded-md bg-[#0073aa]/10 px-2.5 py-1 text-xs font-medium text-[#0073aa] dark:bg-[#0073aa]/20 dark:text-[#72aee6] border border-[#0073aa]/20 dark:border-[#0073aa]/30">
              Founder &amp; Lead Developer
            </span>
          </div>
        </div>

        {/* Note Content */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Built so you never have to guess.
          </h3>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Finding server issues on WordPress used to mean juggling multiple plugins, messy logs, and guesswork. We built phpinfo() WP to put every answer in one clean dashboard.
          </p>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Over 3,000 WordPress sites rely on it every day.
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Questions before buying?{" "}
            <a
              href="mailto:support@phpinfowp.com"
              className="font-medium text-violet-700 dark:text-violet-400 hover:underline">
              Email us
            </a>
            . We reply quickly with real technical answers.
          </p>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            - Emran Hossain Sagor
          </p>
        </div>
      </div>
    </div>
  );
}
