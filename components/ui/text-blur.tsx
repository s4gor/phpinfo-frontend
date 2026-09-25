"use client";

import { cn } from "@/lib/utils";

interface TextBlurProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}

const TextBlur = ({ text, className }: TextBlurProps) => {
  return <h1 className={cn(className)}>{text}</h1>;
};

export default TextBlur;
