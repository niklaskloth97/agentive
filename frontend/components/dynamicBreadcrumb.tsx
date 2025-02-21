import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
      <BreadcrumbList>
        {items.map((item, index) => (
          <>
            <BreadcrumbItem key={`item-${index}`} className="hidden md:flex md:items-center">
              {index === items.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href || '#'}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator key={`separator-${index}`} className="hidden md:flex" />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}