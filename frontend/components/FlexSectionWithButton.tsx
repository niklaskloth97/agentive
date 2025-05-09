"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface FlexLinkSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition: "left" | "right";
  buttonText: string;
  buttonLink: string;
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
}

export default function FlexLinkSection({
  title,
  description,
  imageSrc,
  imageAlt,
  imageWidth = 600,
  imageHeight = 400,
  imagePosition,
  buttonText,
  buttonLink,
  variant = "default",
  className,
}: FlexLinkSectionProps) {
    const variantStyles = {
        default: {
          container: "bg-white p-6",
          title: "text-lg font-semibold text-foreground",
          description: "text-gray-600",
          button: "text-blue-600 hover:text-blue-800",
        },
        primary: {
          container: "bg-primary/5 rounded-xl p-6",
          title: "text-xl font-bold text-primary",
          description: "text-gray-700",
          button: "text-primary hover:text-primary/80",
        },
        secondary: {
          container: "bg-secondary/5 rounded-xl p-6",
          title: "text-xl font-bold text-secondary",
          description: "text-gray-700",
          button: "text-secondary hover:text-secondary/80",
        },
        accent: {
          container: "bg-accent/5 rounded-xl p-6",
          title: "text-xl font-bold text-accent",
          description: "text-gray-700",
          button: "text-accent hover:text-accent/80",
        },
      };

  const styles = variantStyles[variant];

  return (
    <section
      className={cn(
        "flex flex-col md:flex-row items-center gap-8 md:gap-12 my-12",
        styles.container,
        className
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "md:w-1/2",
          imagePosition === "left" ? "order-first" : "order-last md:order-last"
        )}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="rounded-lg shadow-md object-contain mx-auto"
        />
      </div>

      {/* Text */}
      <div className="md:w-1/2 p-2">
        <h2 className={cn("mb-4", styles.title)}>{title}</h2>
        <p className={cn("mb-6", styles.description)}>{description}</p>
        <a href={buttonLink} className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">{buttonText}</a>
      </div>
    </section>
  );
}
