type MimonousIconProps = {
  className?: string;
  size?: "sm" | "md";
};

export default function MimonousIcon({ className = "", size = "md" }: MimonousIconProps) {
  const box = size === "sm" ? "h-10 w-10" : "h-14 w-14";
  const icon = size === "sm" ? "h-6 w-6" : "h-7 w-7";

  return (
    <span
      className={`flex ${box} items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm ${className}`}
      aria-hidden="true">
      <svg
        className={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="8" height="32" rx="2" fill="#7C3AED" />
        <rect x="28" y="4" width="8" height="32" rx="2" fill="#7C3AED" />
        <path d="M4 4L20 20L36 4H28L20 12L12 4H4Z" fill="#A78BFA" />
        <path
          d="M12 4L20 12L28 4"
          fill="none"
          stroke="#5B21B6"
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>
    </span>
  );
}
