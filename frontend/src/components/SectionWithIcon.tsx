"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface SectionWithIconProps {
	icon?: React.ReactNode;
	title: string;
	description: string;
	color?: string;
	className?: string;
}

interface ColorClasses {
	textcolor: string;
	backgroundcolor: string;
}

function transformColor(color: string = "blue"): ColorClasses {
	// If color is empty or undefined, use blue
	if (!color) {
		color = "blue";
	}

	// List of valid Tailwind colors
	const validColors = [
		"slate",
		"gray",
		"zinc",
		"neutral",
		"stone",
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"cyan",
		"sky",
		"blue",
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
		"rose",
	];

	// Check if color is valid, otherwise use blue
	if (!validColors.includes(color)) {
		color = "blue";
	}
	console.log(`Using color: ${color}`);
	return {
		textcolor: `text-${color}-700`,
		backgroundcolor: `bg-${color}-50`,
	};
}

const SectionWithIcon: React.FC<SectionWithIconProps> = ({
	icon,
	title,
	description,
	color,
	className,
}) => {
	const colors = transformColor(color);

	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className={cn(
				"text-center p-8 rounded-2xl border shadow-md my-8",
				colors.backgroundcolor,
				colors.textcolor,
				className
			)}
		>
			<h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
				{icon} {title}
			</h2>
			<p className="text-lg max-w-4xl mx-auto">{description}</p>
		</motion.div>
	);
};

export default SectionWithIcon;
