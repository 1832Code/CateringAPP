"use client";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export function TextGenerateEffectDemo({
  words,
  style,
  className,
}: {
  words: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <TextGenerateEffect words={words} style={style} className={className} />
  );
}
