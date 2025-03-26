"use client";

import { ReactNode } from "react";

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
}

export default function VisionCard({
  title,
  items,
  className = "",
  cardClassName = "",
}: VisionCardProps) {
  return (
    <div className={`bg-gray-100 p-10 rounded-xl shadow-lg ${className}`}>
      <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`p-6 bg-white rounded-2xl shadow-md text-center transition-all duration-200 hover:shadow-lg ${cardClassName}`}
          >
            {item.icon && <div className="flex justify-center mb-3">{item.icon}</div>}
            <h3 className={`text-xl font-bold ${item.color}`}>{item.title}</h3>
            <p className="mt-2 text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}