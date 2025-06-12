"use client";

import { useState, ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleCardProps {
	title: string;
	children: ReactNode;
	className?: string;
	defaultOpen?: boolean;
	headerClassName?: string;
	contentClassName?: string;
}

export default function CollapsibleCard({
	title,
	children,
	className = "",
	defaultOpen = false,
	headerClassName = "",
	contentClassName = "",
}: CollapsibleCardProps) {
	const [isVisible, setIsVisible] = useState(defaultOpen);

	return (
		<Card className={cn("w-full overflow-hidden card shadow ", className)}>
			<CardHeader
				onClick={() => setIsVisible(!isVisible)}
				className={cn(
					"flex flex-row items-center justify-between cursor-pointer transition-colors py-2 px-3",
					headerClassName
				)}
			>
				<h3 className="font-semibold">{title}</h3>
				<div className="rounded-full hover:bg-muted">
					{isVisible ? (
						<ChevronUp className="h-4 w-4" />
					) : (
						<ChevronDown className="h-4 w-4" />
					)}
				</div>
			</CardHeader>

			{isVisible && (
				<CardContent
					className={cn(
						"py-2 px-3 animate-in slide-in-from-top-1 duration-150 text-sm",
						contentClassName
					)}
				>
					{children}
				</CardContent>
			)}
		</Card>
	);
}
