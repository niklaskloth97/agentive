"use client";

import { TranslateButtons } from "@/components/translateButtons";
import { useWebsiteLanguage } from "@/contexts/WebsiteLanguageContext";

export default function Home() {
  const { websiteLanguage } = useWebsiteLanguage();

  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="text-3xl mb-6 font-bold">
        <TranslateButtons 
          translationKey="welcome-agentive" 
          currentLanguage={websiteLanguage} 
        />
      </h1>
      
      <h1 className="text-xl mb-2 font-semibold">
        <TranslateButtons 
          translationKey="boosting-diversity" 
          currentLanguage={websiteLanguage} 
        />
      </h1>
      
      <p className="text-gray-600 mb-4 dark:text-white">
        <TranslateButtons 
          translationKey="welcome-intro" 
          currentLanguage={websiteLanguage} 
        />
      </p>
      
      <div className="flex flex-col md:flex-row gap-8"></div>
      
      <h2 className="text-m mb-2 font-semibold">
        <TranslateButtons 
          translationKey="what-can-expect" 
          currentLanguage={websiteLanguage} 
        />
      </h2>
      
      <p className="text-gray-600 mb-2 dark:text-white">
        <TranslateButtons 
          translationKey="what-expect-content" 
          currentLanguage={websiteLanguage} 
        />
      </p>
      
      <h2 className="text-m mb-2 font-semibold">
        <TranslateButtons 
          translationKey="curious-team" 
          currentLanguage={websiteLanguage} 
        />
      </h2>
      
      <p className="text-gray-600 mb-4 dark:text-white">
        <TranslateButtons 
          translationKey="team-description" 
          currentLanguage={websiteLanguage} 
        />
        {" "}
        <TranslateButtons 
          translationKey="visit-about" 
          currentLanguage={websiteLanguage} 
        />
        {" "}
        <a href="/about" className="text-blue-600 hover:underline dark:text-blue-400">
          <TranslateButtons 
            translationKey="about-us" 
            currentLanguage={websiteLanguage} 
          />
        </a> page.
      </p>
      
      <p className="text-gray-600 mb-4 dark:text-white">
        <TranslateButtons 
          translationKey="passionate-team" 
          currentLanguage={websiteLanguage} 
        />
        {" "}
        <TranslateButtons 
          translationKey="check-out-team" 
          currentLanguage={websiteLanguage} 
        />
        {" "}
        <a href="/team" className="text-blue-600 hover:underline dark:text-blue-400">
          <TranslateButtons 
            translationKey="team" 
            currentLanguage={websiteLanguage} 
          />
        </a> page.
      </p>
      
      <h2 className="text-m mb-2 font-semibold">
        <TranslateButtons 
          translationKey="follow-journey" 
          currentLanguage={websiteLanguage} 
        />
      </h2>
      
      <p className="text-gray-600 mb-4 dark:text-white">
        <TranslateButtons 
          translationKey="journey-content" 
          currentLanguage={websiteLanguage} 
        />
      </p>
      
      <p className="text-gray-600 mb-2 dark:text-white">
        <TranslateButtons 
          translationKey="thanks-joining" 
          currentLanguage={websiteLanguage} 
        />
      </p>
    </div>
  );
}