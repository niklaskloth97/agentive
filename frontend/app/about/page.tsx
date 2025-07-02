"use client";


import VisionCard from "@/components/VisionCard";
import { FaGlobeEurope, FaBookOpen, FaHandshake } from "react-icons/fa";
import SectionWithIcon from "@/components/SectionWithIcon";

import FlexSection from "@/components/FlexSection";


const visionItems = [
  { title: "Empowering Multilingual Growth", color: "text-primary", description: "AGENTIVE aims to equip children with the tools to navigate and thrive in multilingual environments." },
  { title: "Bridging Language Education Gaps", color: "text-accent", description: "Current research highlights the cognitive, social, and academic benefits of multilingualism, particularly when introduced early in life." },
  { title: "Innovative Learning & Collaboration", color: "text-ring", description: "Using innovative pedagogical sets, a digital platform, and professional training to foster collaboration." }
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
        description="The AGENTIVE project is a groundbreaking initiative funded by the Erasmus+ programme of the European Union. It is a collaborative endeavour that unites universities and organizations from Luxembourg, Greece, Germany, Switzerland, Slovenia, and Italy to develop innovative multilingual educational resources for early childhood education (ECE) and to develop school-university and business synergies. This pan-European partnership emphasizes the EU’s commitment to fostering multilingualism and digital transformation in education. "
        
        imageSrc="/images/eu-footer.svg"
        imageAlt="EU Initiative"
        imagePosition="left"
      />
      
      {/* Three-column layout for SectionWithIcon components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="flex flex-col h-full">
          <SectionWithIcon 
            className="h-full"
            icon={<FaHandshake className="h-20 w-20" />}
            title="Collaboration Across Sectors" 
            description="Led by Prof. Dr. Claudine Kirsch at the University of Luxembourg, AGENTIVE brings together the University of Münster, the Free University of Bolzano, the University of Teacher Education of the Grisons (PHGR), the University of Primorska and Web2Learn. This consortium fosters synergies between academia and schools to create innovative multilingual education material. The collaboration is designed to ensure sustainable and impactful results that benefit teachers, students, parents and society as a whole. " 
            color="purple"
          />
        </div>
        
        <div className="flex flex-col h-full">
          <SectionWithIcon 
            className="h-full text-violet-700 bg-violet-50"
            icon={<FaGlobeEurope className="h-20 w-20 " />} 
            title="Addressing a multilingual Europe" 
            description="In regions like Luxembourg, Switzerland, Tyrol and Primorska, multiple languages are spoken side by side and children may learn two societal languages from an early age through daily interactions or language learning in preschool. Additionally, migration patterns across Europe have increased the language diversity in societies and classrooms. Programmes for language awareness and early English thrive. AGENTIVE addresses these realities by developing inclusive and accessible, multilingual learning materials that are adaptable to different cultural and linguistic contexts. " 
            
          />
        </div>
        
        <div className="flex flex-col h-full">
          <SectionWithIcon 
            className="h-full bg-slate-200 text-slate-700"
            icon={<FaBookOpen className="w-20 h-20" />} 
            title="Open Access to Resources" 
            description="One of AGENTIVE’s core principles is openness. All educational materials developed through the project will be freely accessible, ensuring that teachers, schools, and parents can integrate them directly into their practice. The digital resources are designed to be flexible and modular, enabling educators to tailor them to the needs of their pupils, the curricular constraints and the specificities of the countries." 
          />
        </div>
      </div>

      {/* Objective Section */}

      <div className="mt-6">
          <VisionCard 
          className=""
          title="Objectives" 
          items={objectives} 
        />
      </div>

      <div className="mt-6">
      
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

