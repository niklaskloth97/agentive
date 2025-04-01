"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import VisionCard from "@/components/VisionCard";
import { FaGlobeEurope, FaUsers, FaBookOpen, FaChalkboardTeacher, FaPeopleArrows, FaHandshake } from "react-icons/fa";
import SectionWithIcon from "@/components/SectionWithIcon";
import Objectives from "@/components/ObjectiveCards";
import InnovationImpact from "@/components/Interactions";
import FlexSection from "@/components/FlexSection";
import { text } from "stream/consumers";
import { Description } from "@radix-ui/react-dialog";

const visionItems = [
  { title: "Empowering Multilingual Growth", color: "text-primary", description: "AGENTIVE equips children with tools to navigate multilingual environments." },
  { title: "Bridging Language Education Gaps", color: "text-accent", description: "Providing accessible, evidence-based resources for multilingual literacy development." },
  { title: "Innovative Learning & Collaboration", color: "text-ring", description: "Using pedagogical sets, a digital platform, and professional training to foster collaboration." }
];
const objectives = [
  {title: "Enhance digital transformation of schools and universities through open access early language learning resources and state-of-the-art pedagogies and training", 
  color: "text-primary", 
  description: " By creating open-access, state-of-the-art pedagogical tools, the project supports the digital readiness of schools and universities. Training programs for pre- and in-service ECE teachers are integral to this goal."},
  {title: "Leverage open, multilingual and cross-sectoral ECE through university-school-business synergies", color: "text-ring", description: "AGENTIVE fosters partnerships between schools, universities, and businesses to innovate multilingual education. These collaborations ensure the materials and approaches developed are practical, effective, and forward-thinking."}

];

const innovationAndImpact = [
  {title: "Digital Resources for Multilingual Literacy", 
  color: "text-primary", 
  description: "The project provides open, digital materials that promote the learning of languages and literacy, addressing a key gap in early childhood education."},
  {title: "Equipping Educators", 
    color: "text-primary", 
    description: " By equipping pre- and in-service teachers with evidence-based strategies and digital competencies, AGENTIVE empowers educators to implement multilingual teaching effectively"},
  {title: "Cross-Sector Collaboration", 
     color: "text-primary", 
      description: " The synergy between academia and businesses drives the development of innovative educational tools and sustainable partnerships"},
];

export default function About() {
  return (
    <div className="container mx-auto py-8 px-4">
      <VisionCard 
        title="Our Vision" 
        items={visionItems} 
      />

      {/* EU Initiative - Now using the generic FlexSection component */}
      <FlexSection
        title="An EU-Funded Erasmus+ Initiative"
        description="The AGENTIVE project is a initiative funded by the Erasmus+ programme of the European Union. It unites universities and organizations from Luxembourg, Greece, Germany, Switzerland, Slovenia, and Italy to develop innovative multilingual educational resources."
        expandedDescription="This pan-European partnership emphasizes the EU's commitment to fostering multilingualism and digital transformation in education. Aligned with the EU's priorities for education, AGENTIVE promotes linguistic diversity, inclusion, and digital transformation. It embodies the EU's vision of fostering a multilingual society. For this project, we are funded by Europe's Erasmus+ Programme."
        imageSrc="/images/eu-footer.svg"
        imageAlt="EU Initiative"
        imagePosition="left"
      />
      
      {/* Three-column layout for SectionWithIcon components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="flex flex-col h-full">
          <SectionWithIcon 
            className="h-full"
            icon={<FaHandshake className="h-20 w-20" />}
            title="Collaboration Across Sectors" 
            description="Led by Prof. Dr. Claudine Kirsch at the University of Luxembourg, AGENTIVE brings together the University of Münster, the Free University of Bolzano, the University of Teacher Education of the Grisons (PHGR), the University of Primorska and Web2Learn. This consortium fosters synergies between academia and schools to create innovative multilingual education material." 
          />
        </div>
        
        <div className="flex flex-col h-full">
          <SectionWithIcon 
            className="h-full"
            icon={<FaGlobeEurope className="h-20 w-20 " />} 
            title="A multilingual Europe" 
            description="In regions like Luxembourg, Switzerland, Tyrol and Primorska, multiple languages are spoken side by side and children may learn two societal languages from an early age through daily interactions or language learning in preschool. Additionally, migration patterns across Europe have increased the language diversity in societies and classrooms." 
          />
        </div>
        
        <div className="flex flex-col h-full">
          <SectionWithIcon 
            className="h-full"
            icon={<FaBookOpen className="w-20 h-20" />} 
            title="Open Access to Resources" 
            description="One of AGENTIVE's core principles is openness. All educational materials developed through the project will be freely accessible, ensuring that teachers, schools, and parents can integrate them directly into their practice. The digital resources are designed to be flexible and modular, enabling educators to tailor them to specific needs." 
          />
        </div>
      </div>

      {/* Objective Section */}

      <div className="mt-12">
          <VisionCard 
          title="Objectives" 
          items={objectives} 
        />
      </div>

      <div className="mt-12">
      
        <VisionCard 
        title="Innovation and Impact" 
        items={innovationAndImpact} 
      />
      </div>

      {/* Call to Actio
      <section className="text-center bg-blue-700 text-white py-12 rounded-2xl shadow-lg mt-12">
        <h2 className="text-3xl font-extrabold mb-4">Join the Movement</h2>
        <p className="text-lg max-w-3xl mx-auto">By building on the expertise of its partners and leveraging the multilingual realities of Europe, AGENTIVE aims to set a benchmark for early childhood multilingual education. The project's outcomes will contribute to shaping a more inclusive and innovative educational landscape across Europe. 
            Together, we can inspire the next generation to embrace the power of multilingualism!</p>
        <button className="mt-6 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-100 transition">
          Discover More
        </button>
      </section> */}
    </div>
  );
}

