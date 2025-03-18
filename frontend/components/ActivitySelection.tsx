"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Vocabulary Boost",
    href: "/docs/primitives/alert-dialog",
    description:
      "Reenforce vocabulary with fun activities.",
  },
  {
    title: "Language Awareness",
    href: "/docs/primitives/hover-card",
    description:
      "Learn about different languages deal with speaking letters.",
  },
  {
    title: "Intercultural Awareness",
    href: "/docs/primitives/hover-card",
    description:
      "Learn about how different cultures perceive the world. This activity is meant to teach an open mindset.",
  }, {
    title: "Early Literacy",
    href: "/docs/primitives/hover-card",
    description:
      "Encourage early literacy skills.",
  },
]

export function ActivitySelection() {
  return (
    <ul className="flex flex-col w-full gap-3">
      {components.map((component) => (
        <ListItem
          key={component.title}
          title={component.title}
          href={component.href}
        >
          {component.description}
        </ListItem>
      ))}
    </ul>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-semibold leading-none">{title}</div>
        <p className="text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  )
})
ListItem.displayName = "ListItem"
