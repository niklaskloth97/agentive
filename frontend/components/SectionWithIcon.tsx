"use client";

import { motion } from "framer-motion";
import { cn } from '@/lib/utils';
import React, {ReactNode} from 'react';

interface SectionWithIconProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const SectionWithIcon: React.FC<SectionWithIconProps> = ({ icon, title, description, className }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={cn("text-center bg-blue-50 p-8 rounded-2xl shadow-md my-8", className)}>
      <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-3">
        {icon} {title}
      </h2>
      <p className="text-lg max-w-4xl mx-auto">{description}</p>
    </motion.div>
  );
};

export default SectionWithIcon;
