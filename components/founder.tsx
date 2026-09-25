export default function Founder() {
  return (
    <div
      className="flex w-full max-w-3xl flex-col items-center gap-2 pt-16 md:pt-24">
      <div
        className="flex flex-col items-center gap-6 rounded-xl border border-zinc-200 bg-white p-8 shadow-xs text-center sm:flex-row sm:text-left">
        <div className="flex-shrink-0">
          <img
            src="/founder.jpg"
            alt="Emran Hossain Sagor - founder, phpinfo() WP"
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
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-zinc-900">
            Built by someone who needed it.
          </h3>
          <p className="text-base leading-relaxed text-zinc-700">
            Hi, I&apos;m Emran Hossain Sagor. I built phpinfo() WP because every WordPress
            audit I did for clients meant cobbling together four plugins and
            a screenshot doc. This is the tool I wanted.
          </p>
          <p className="text-sm text-zinc-600">
            - Emran Hossain Sagor, Exeebit
          </p>
          <p className="text-sm text-zinc-500">
            If you have a question before buying, just{" "}
            <a
              href="mailto:support@exeebit.com"
              className="text-violet-700 hover:underline">
              email me
            </a>{" "}
            - I read everything.
          </p>
        </div>
      </div>
    </div>
  );
}
