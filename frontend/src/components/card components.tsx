import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardDemoProps extends React.ComponentProps<typeof Card> {
	description: string;
	link?: string; //optional
	title: string;
}

export function CardDemo({
	className,
	description,
	link,
	title,
	...props
}: CardDemoProps) {
	return (
		<Card className={className} {...props}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{description}</p>
				{link && (
					<a href={link} className="mt-2 underline">
						Learn More
					</a>
				)}
			</CardContent>
		</Card>
	);
}
