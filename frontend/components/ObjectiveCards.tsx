"use client";

import Image from "next/image";

interface ObjectiveProps {
  imageSrc: string;
  title: string;
  description: string;
}

const ObjectiveCard: React.FC<ObjectiveProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-2xl shadow-md">
      <Image src={imageSrc} alt={title} width={80} height={80} className="rounded-full mb-4" />
      <h3 className="text-xl font-bold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default function Objectives() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Objectives of the Project</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ObjectiveCard 
          imageSrc="/digital-transformation.png" 
          title="Enhance digital transformation of schools and universities through open access early language learning resources and state-of-the-art pedagogies and training:" 
          description="By creating open-access, state-of-the-art pedagogical tools, the project supports the digital readiness of schools and universities. Training programs for pre- and in-service ECE teachers are integral to this goal."
        />
        <ObjectiveCard 
          imageSrc="/digital-transformation.png" 
          title="Leverage open, multilingual and cross-sectoral ECE through university-school-business synergies:" 
          description="AGENTIVE fosters partnerships between schools, universities, and businesses to innovate multilingual education. These collaborations ensure the materials and approaches developed are practical, effective, and forward-thinking."
        />
      </div>
    </section>
  );
}
