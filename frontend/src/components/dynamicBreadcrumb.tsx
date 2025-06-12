import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface DynamicBreadcrumbProps {
	items: BreadcrumbItem[];
}

export function DynamicBreadcrumb({ items }: DynamicBreadcrumbProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList className="flex items-center space-x-2">
				{items.map((item, index) => (
					<div key={`breadcrumb-group-${index}`} className="flex items-center">
						<BreadcrumbItem className="hidden md:flex md:items-center">
							{index === items.length - 1 ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={item.href || "#"}>
									{item.label}
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < items.length - 1 && (
							<span className="mx-2 hidden md:flex">
								<BreadcrumbSeparator />
							</span>
						)}
					</div>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
