"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"
import VisionCard from "@/components/VisionCard";
import { FaGlobeEurope, FaUsers, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import SectionWithIcon from "@/components/SectionWithIcon"; // Ensure this is a named export in SectionWithIcon.tsx
import Objectives from "@/components/ObjectiveCards"; // Ensure this is a named export in Objectives.tsx
import InnovationImpact from "@/components/Interactions"; // Ensure this is a named export in Interactions.tsx
import ErasmusInitiative from "@/components/ErasmusInitiative"; // Import the component


const visionItems = [
  { title: "Empowering Multilingual Growth", color: "text-blue-600", description: "AGENTIVE equips children with tools to navigate multilingual environments." },
  { title: "Bridging Language Education Gaps", color: "text-green-600", description: "Providing accessible, evidence-based resources for multilingual literacy development." },
  { title: "Innovative Learning & Collaboration", color: "text-purple-600", description: "Using pedagogical sets, a digital platform, and professional training to foster collaboration." }
];

export default function About() {
  return (
    <div className="container mx-auto py-8 px-4">
      <VisionCard 
        title="Our Vision" 
        items={visionItems} 
      />
{/* EU Initiative */}
    <div>
      <ErasmusInitiative />  
    </div>

      {/* Collaboration Across Sectors */}
      <SectionWithIcon icon={<FaUsers />} title="Collaboration Across Sectors" description="Led by Prof. Dr. Claudine Kirsch at the University of Luxembourg, AGENTIVE brings together the University of Münster, the Free University of Bolzano, the University of Teacher Education of the Grisons (PHGR), the University of Primorska and Web2Learn. This consortium fosters synergies between academia and schools to create innovative multilingual education material. The collaboration is designed to ensure sustainable and impactful results that benefit teachers, students, parents and society as a whole." />
      <SectionWithIcon icon={<FaGlobeEurope />} title="Addressing a Multilingual Europe" description="In regions like Luxembourg, Switzerland, Tyrol and Primorska, multiple languages are spoken side by side and children may learn two societal languages from an early age through daily interactions or language learning in preschool. Additionally, migration patterns across Europe have increased the language diversity in societies and classrooms. Programmes for language awareness and early English thrive. AGENTIVE addresses these realities by developing inclusive and accessible, multilingual learning materials that are adaptable to different cultural and linguistic contexts." />
      <SectionWithIcon icon={<FaBookOpen />} title="Open Access to Resources" description="One of AGENTIVE’s core principles is openness. All educational materials developed through the project will be freely accessible, ensuring that teachers, schools, and parents can integrate them directly into their practice. The digital resources are designed to be flexible and modular, enabling educators to tailor them to the needs of their pupils, the curricular constraints and the specificities of the countries." />
        
    {/* Objective Section */}

      <div className="mt-12">
        <Objectives />
      </div>

      <div className = "mt-12">
        <InnovationImpact/>
      </div>

      {/* Call to Action */}
      <section className="text-center bg-blue-700 text-white py-12 rounded-2xl shadow-lg mt-12">
        <h2 className="text-3xl font-extrabold mb-4">Join the Movement</h2>
        <p className="text-lg max-w-3xl mx-auto">By building on the expertise of its partners and leveraging the multilingual realities of Europe, AGENTIVE aims to set a benchmark for early childhood multilingual education. The project’s outcomes will contribute to shaping a more inclusive and innovative educational landscape across Europe. 
            Together, we can inspire the next generation to embrace the power of multilingualism!</p>
        <button className="mt-6 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-100 transition">
          Discover More
        </button>
      </section>
    </div>
  );
}

