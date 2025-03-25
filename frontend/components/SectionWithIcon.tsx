"use client";

import { motion } from "framer-motion";

interface SectionWithIconProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SectionWithIcon: React.FC<SectionWithIconProps> = ({ icon, title, description }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="text-center bg-blue-50 p-8 rounded-2xl shadow-md my-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-3">
        {icon} {title}
      </h2>
      <p className="text-lg max-w-4xl mx-auto">{description}</p>
    </motion.div>
  );
};

export default SectionWithIcon;
