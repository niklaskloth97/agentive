"use client";

import { ReactNode } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface VisionItem {
	title: string;
	color: string;
	description: string;
	icon?: ReactNode;
}

interface VisionCardProps {
	title: string;
	items: VisionItem[];
	className?: string;
	cardClassName?: string;
	itemsPerPage?: number;
}

export default function VisionCard({
	title,
	items,
	className = "",
	cardClassName = "",
	itemsPerPage = 6,
}: VisionCardProps) {
	// Split items into pages
	const pages: VisionItem[][] = [];
	for (let i = 0; i < items.length; i += itemsPerPage) {
		pages.push(items.slice(i, i + itemsPerPage));
	}

	return (
		<>
			{pages.map((pageItems, pageIndex) => {
				// Determine grid layout based on item count
				const itemCount = pageItems.length;
				let gridClass = "";
				let centerLastItems = false;

				if (itemCount % 3 === 0) {
					// If divisible by 3, use 3 columns
					gridClass = "grid-cols-1 sm:grid-cols-3";
				} else if (itemCount % 2 === 0) {
					// If divisible by 2 (but not by 3), use 2 columns
					gridClass = "grid-cols-1 sm:grid-cols-2";
				} else {
					// For other cases, use 3 columns and center the last item
					gridClass = "grid-cols-1 sm:grid-cols-3";
					centerLastItems = true;
				}

				return (
					<Card
						key={pageIndex}
						className={cn("p-6 bg-popover mb-8", className)}
					>
						{pageIndex === 0 && (
							<h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
						)}
						{pageIndex > 0 && (
							<h2 className="text-3xl font-bold text-center mb-6">
								{title} (Continued)
							</h2>
						)}

						<div className={cn("grid gap-6", gridClass)}>
							{pageItems.map((item, index) => {
								// Handle special positioning for last items in odd-count layouts
								let itemClass = "";
								if (
									centerLastItems &&
									index === itemCount - 1 &&
									itemCount % 3 === 1
								) {
									itemClass = "sm:col-start-2 sm:col-span-1";
								}

								return (
									<div
										key={index}
										className={cn(
											"p-6 bg-white rounded-2xl shadow-md text-center transition-all duration-200 hover:shadow-lg",
											itemClass,
											cardClassName
										)}
									>
										{item.icon && (
											<div className="flex justify-center mb-3">
												{item.icon}
											</div>
										)}
										<h3 className={cn("text-xl font-bold", item.color)}>
											{item.title}
										</h3>
										<p className="mt-2">{item.description}</p>
									</div>
								);
							})}
						</div>
					</Card>
				);
			})}
		</>
	);
}
