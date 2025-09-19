"use client";

import VisionCard from "@/components/VisionCard";
import { FaGlobeEurope, FaBookOpen, FaHandshake } from "react-icons/fa";
import SectionWithIcon from "@/components/SectionWithIcon";
import FlexSection from "@/components/FlexSection";
import { TranslateButtons } from "@/components/translateButtons";
import { useWebsiteLanguage } from "@/contexts/WebsiteLanguageContext";

export default function About() {
  const { websiteLanguage } = useWebsiteLanguage();

  const visionItems = [
    { 
      title: (
        <TranslateButtons
          translationKey="empowering-multilingual-growth"
          currentLanguage={websiteLanguage}
        />
      ), 
      color: "text-primary", 
      description: (
        <TranslateButtons
          translationKey="empowering-multilingual-growth-desc"
          currentLanguage={websiteLanguage}
        />
      )
    },
    { 
      title: (
        <TranslateButtons
          translationKey="bridging-language-gaps"
          currentLanguage={websiteLanguage}
        />
      ), 
      color: "text-accent", 
      description: (
        <TranslateButtons
          translationKey="bridging-language-gaps-desc"
          currentLanguage={websiteLanguage}
        />
      )
    },
    { 
      title: (
        <TranslateButtons
          translationKey="innovative-learning-collaboration"
          currentLanguage={websiteLanguage}
        />
      ), 
      color: "text-ring", 
      description: (
        <TranslateButtons
          translationKey="innovative-learning-collaboration-desc"
          currentLanguage={websiteLanguage}
        />
      )
    }
  ];

  const objectives = [
    {
      title: (
        <TranslateButtons
          translationKey="enhance-digital-transformation"
          currentLanguage={websiteLanguage}
        />
      ), 
      color: "text-primary", 
      description: (
        <TranslateButtons
          translationKey="enhance-digital-transformation-desc"
          currentLanguage={websiteLanguage}
        />
      )
    },
    {
      title: (
        <TranslateButtons
          translationKey="leverage-synergies"
          currentLanguage={websiteLanguage}
        />
      ), 
      color: "text-ring", 
      description: (
        <TranslateButtons
          translationKey="leverage-synergies-desc"
          currentLanguage={websiteLanguage}
        />
      )
    }
  ];

  const innovationAndImpact = [
    {
      title: (
        <TranslateButtons
          translationKey="digital-resources-literacy"
          currentLanguage={websiteLanguage}
        />
      ), 
      color: "text-primary", 
      description: (
        <TranslateButtons
          translationKey="digital-resources-literacy-desc"
          currentLanguage={websiteLanguage}
        />
      )
    },
    {
      title: (
        <TranslateButtons
          translationKey="equipping-educators"
          currentLanguage={websiteLanguage}
        />
      ), 
      color: "text-primary", 
      description: (
        <TranslateButtons
          translationKey="equipping-educators-desc"
          currentLanguage={websiteLanguage}
        />
      )
    },
    {
      title: (
        <TranslateButtons
          translationKey="cross-sector-collaboration"
          currentLanguage={websiteLanguage}
        />
      ), 
      color: "text-primary", 
      description: (
        <TranslateButtons
          translationKey="cross-sector-collaboration-desc"
          currentLanguage={websiteLanguage}
        />
      )
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <VisionCard 
        title={
          <TranslateButtons
            translationKey="our-vision"
            currentLanguage={websiteLanguage}
          />
        }
        items={visionItems} 
      />

      {/* EU Initiative - Now using the generic FlexSection component */}
      <FlexSection
        title={
          <TranslateButtons
            translationKey="eu-funded-initiative"
            currentLanguage={websiteLanguage}
          />
        }
        description={
          <TranslateButtons
            translationKey="eu-initiative-desc"
            currentLanguage={websiteLanguage}
          />
        }
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
            title={
              <TranslateButtons
                translationKey="collaboration-across-sectors"
                currentLanguage={websiteLanguage}
              />
            }
            description={
              <TranslateButtons
                translationKey="collaboration-sectors-desc"
                currentLanguage={websiteLanguage}
              />
            }
            color="purple"
          />
        </div>
        
        <div className="flex flex-col h-full">
          <SectionWithIcon 
            className="h-full text-violet-700 bg-violet-50"
            icon={<FaGlobeEurope className="h-20 w-20 " />} 
            title={
              <TranslateButtons
                translationKey="addressing-multilingual-europe"
                currentLanguage={websiteLanguage}
              />
            }
            description={
              <TranslateButtons
                translationKey="addressing-multilingual-europe-desc"
                currentLanguage={websiteLanguage}
              />
            }
          />
        </div>
        
        <div className="flex flex-col h-full">
          <SectionWithIcon 
            className="h-full bg-slate-200 text-slate-700"
            icon={<FaBookOpen className="w-20 h-20" />} 
            title={
              <TranslateButtons
                translationKey="open-access-resources"
                currentLanguage={websiteLanguage}
              />
            }
            description={
              <TranslateButtons
                translationKey="open-access-resources-desc"
                currentLanguage={websiteLanguage}
              />
            }
          />
        </div>
      </div>

      {/* Objective Section */}
      <div className="mt-6">
        <VisionCard 
          className=""
          title={
            <TranslateButtons
              translationKey="objectives"
              currentLanguage={websiteLanguage}
            />
          }
          items={objectives} 
        />
      </div>

      <div className="mt-6">
        <VisionCard 
          title={
            <TranslateButtons
              translationKey="innovation-impact"
              currentLanguage={websiteLanguage}
            />
          }
          items={innovationAndImpact} 
        />
      </div>
    </div>
  );
}