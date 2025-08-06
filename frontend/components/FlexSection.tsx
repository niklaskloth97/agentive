"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FlexSectionProps {
  title: ReactNode; // Changed from string to ReactNode
  description: ReactNode; // Changed from string to ReactNode
  expandedDescription?: ReactNode; // Changed from string to ReactNode
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition: "left" | "right";
  variant?: "default" | "primary" | "secondary" | "accent";
  showExpandToggle?: boolean;
  buttonText?: {
    expand: string;
    collapse: string;
  };
  className?: string;
}

export default function FlexSection({
  title,
  description,
  expandedDescription,
  imageSrc,
  imageAlt,
  imageWidth = 500,
  imageHeight = 300,
  imagePosition,
  variant = "default",
  showExpandToggle = true,
  buttonText = { expand: "Read More", collapse: "Read Less" },
  className,
}: FlexSectionProps) {
  const [expanded, setExpanded] = useState(false);

  // Define variant styles
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
    <div 
      className={cn(
        "flex flex-col md:flex-row items-center gap-8 md:gap-12 my-12", 
        styles.container,
        className
      )}
    >
      {/* Image container - conditionally position based on imagePosition prop */}
      <div className={cn(
        "md:w-1/2",
        imagePosition === "left" ? "order-first" : "order-last md:order-last"
      )}>
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          width={imageWidth} 
          height={imageHeight} 
          className="object-contain mx-auto" 
        />
      </div>

      {/* Text container */}
      <div className="md:w-1/2">
        <h2 className={cn("mb-4", styles.title)}>{title}</h2>

        <div className={cn("text-justify mb-4", styles.description)}>
          <div>{description}</div>
          
          {expanded && expandedDescription && (
            <>
              <br />
              <div>{expandedDescription}</div>
            </>
          )}
        </div>

        {showExpandToggle && expandedDescription && (
          <Button 
            variant="link" 
            className={styles.button}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? buttonText.collapse : buttonText.expand}
          </Button>
        )}
      </div>
    </div>
  );
}