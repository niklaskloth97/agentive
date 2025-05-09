"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  height?: number;
  overlayBrightness?: string; // Tailwind value like 'brightness-75'
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  height = 400,
  overlayBrightness = "brightness-75",
  className,
}: HeroSectionProps) {
  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      <Image
        src={backgroundImage}
        alt={title}
        layout="fill"
        objectFit="cover"
        className={overlayBrightness}
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl font-bold drop-shadow-lg">{title}</h1>
        <p className="text-2xl mt-2 drop-shadow-md">{subtitle}</p>
      </div>
    </div>
  );
}
