import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { ACTIVITY_GROUPS_META } from "@/data";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const breadcrumbItems = [
 { label: "Multilingual Resources", href: "/dashboard/" },
    { label: "Activities" }
];

export default async function Page() {
	return (
		<DashboardLayout breadcrumbItems={breadcrumbItems}>
			<div>
				<h1>Activities</h1>
			</div>

			<div className="flex md:pt-12 flex-wrap gap-4 h-full items-center justify-center">
				{Object.entries(ACTIVITY_GROUPS_META).map(([key, meta]) => (
					<Link href={`/dashboard/activities/${key}`} key={key}>
						<button
							style={
								{
									"--group-primary": meta.colors.primary,
									"--group-secondary": meta.colors.secondary,
									"--group-color": meta.colors.text,
									"--group-focus": meta.colors.focus,
								} as React.CSSProperties
							}
							className="aspect-square flex-grow p-4 h-52 md:h-64 rounded-xl bg-[--group-secondary] hover:bg-[--group-primary] flex flex-col items-center justify-center shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[--group-focus]"
							aria-label="Listen to story"
						>
							<meta.icon
								className="size-28 md:size-36 text-[--group-color]"
								strokeWidth={1.5}
							/>
							<span className="text-lg font-semibold text-[--group-color] mt-3">
								{meta.label}
							</span>
						</button>
					</Link>
				))}
			</div>
								<Button
				  className="mt-4 self-end text-sm px-4 py-2 h-auto"
				  asChild
				>
				  <a href={`/dashboard/activities/guide.pdf`} download>
				  <Download />
					Download Guide
				  </a>
				</Button>
		</DashboardLayout>
	);
}
