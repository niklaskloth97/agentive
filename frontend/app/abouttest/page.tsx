"use client";

import Image from 'next/image'
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext'
import { TranslateButtons } from '@/components/translateButtons'

export default function AboutPage() {
  const { websiteLanguage } = useWebsiteLanguage();

  return (    
  <div className="container mx-auto px-8">

    <main className="w-full overflow-hidden">

        {/* Hero Banner */}
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-start mt- justify-start isolate">
          <Image
            src="/back1-1.jpg"
            alt="Hero background"
            fill
            className="object-cover z-0"
          />
          <div className="text-left mt-28 px-4 md:px-16 text-white drop-shadow-lg relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold">
              <TranslateButtons translationKey="about-agentive" currentLanguage={websiteLanguage} />
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <p className="mt-4 text-xl">
                <TranslateButtons translationKey="stimulating-multilingual-learning" currentLanguage={websiteLanguage} />
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="py-6 px-4 md:px-20 max-w-7xl mx-auto">
            {/* Header + First Paragraph (Centered) */}
            <div className="text-center mb-4">
                <h2 className="text-3xl md:text-4xl font-cherry text-figmaGreen mb-4">
                  <TranslateButtons translationKey="promoting-multilingualism-ece" currentLanguage={websiteLanguage} />
                </h2>
                <p className="text-justify text-gray-700 max-w-4xl mx-auto text-base md:text-lg leading-relaxed">
                  <TranslateButtons translationKey="multilingual-intro-text" currentLanguage={websiteLanguage} />
                </p>
            </div>

            {/* Image + Second Paragraph */}
            <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Image with wave border */}
                <div className="lg:w-1/2">
                    <div className="mask-wave bg-yellow-400 w-[420px] h-[420px] p-2 mx-auto lg:mx-0">
                        <div className="mask-wave w-full h-full relative">
                        <Image
                            src="/13. Story 5-BOBBA IN THE LIBRARY-cover.jpeg"
                            alt="bobba with children"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                        </div>
                    </div>
                </div>

            {/* Paragraph */}
            <div className="lg:w-1/2 text-gray-700 text-base md:text-lg leading-relaxed">
              <TranslateButtons translationKey="agentive-bridge-gap" currentLanguage={websiteLanguage} />
            </div>
        </div>
    </section>

    {/* Erasmus+ Initiative */}
    <section className="px-4 md:px-16 py-6 text-center relative">
        <h2 className="text-3xl md:text-4xl font-cherry text-figmaGreen mb-2">
          <TranslateButtons translationKey="erasmus-initiative-sectors" currentLanguage={websiteLanguage} />
        </h2>

        <Image
            src="/boy.png" 
            alt="Flying girl"
            width={60}
            height={60}
            className="absolute right-20 top-0"
        />

        <div className="max-w-4xl mx-auto mt-6">
            <p className="text-justify text-gray-700 text-base md:text-lg leading-relaxed">
              <TranslateButtons translationKey="erasmus-description" currentLanguage={websiteLanguage} />
            </p>
        </div>
    </section>

    {/* Innovation and Impact */}
        <section className="px-4 md:px-16 py-12 bg-figmaGreen text-white text-center">
        <h2 className="text-2xl font-cherry text-white">
          <TranslateButtons translationKey="innovation-and-impact" currentLanguage={websiteLanguage} />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Card 1 */}
    <div className="p-6 flex flex-col">
      <div className="min-h-[60px] flex flex-col items-center justify-start mb-4">
        <h3 className="text-lg font-bold text-center leading-snug">
          <TranslateButtons translationKey="digital-resources-multilingual" currentLanguage={websiteLanguage} />
        </h3>
        <div className="w-40 h-0.5 bg-white mt-2"></div>
      </div>
      <p className="text-sm text-justify">
        <TranslateButtons translationKey="digital-resources-description" currentLanguage={websiteLanguage} />
      </p>
    </div>

    {/* Card 2 */}
    <div className="p-6 flex flex-col">
      <div className="min-h-[60px] flex flex-col items-center justify-start mb-4">
        <h3 className="text-lg font-bold text-center leading-snug">
          <TranslateButtons translationKey="equipping-educators" currentLanguage={websiteLanguage} />
        </h3>
        <div className="w-40 h-0.5 bg-white mt-2"></div>
      </div>
      <p className="text-sm text-justify">
        <TranslateButtons translationKey="equipping-educators-description" currentLanguage={websiteLanguage} />
      </p>
    </div>

    {/* Card 3 */}
    <div className="p-6 flex flex-col">
      <div className="min-h-[60px] flex flex-col items-center justify-start mb-4">
        <h3 className="text-lg font-bold text-center leading-snug">
          <TranslateButtons translationKey="cross-sector-collaboration" currentLanguage={websiteLanguage} />
        </h3>
        <div className="w-40 h-0.5 bg-white mt-2"></div>
      </div>
      <p className="text-sm text-justify">
        <TranslateButtons translationKey="cross-sector-collaboration-description" currentLanguage={websiteLanguage} />
      </p>
    </div>
    </div>      
    </section>


    {/* Pedagogical Strategies List */}
    <section className="px-4 md:px-16 my-16">
         {/* Section Title and Subtitle */}

        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <div className="text-left mb-4 ">
                <h2 className="text-2xl md:text-3xl font-cherry text-figmaGreen mb-2">
                  <TranslateButtons translationKey="objectives-project" currentLanguage={websiteLanguage} />
                </h2>
                <p className="text-gray-700 text-base md:text-lg">
                  <TranslateButtons translationKey="agentive-guided-objectives" currentLanguage={websiteLanguage} />
                </p>
                </div>
                {/* Bullet points */}
                <ul className="space-y-6 text-gray-800 text-justify text-base md:text-lg list-none">
                    <li className="flex items-start">
                    <div className="mt-1 mr-3 w-3 h-3 rounded-full bg-[#00B389] flex-shrink-0" />
                    <p>
                      <TranslateButtons translationKey="enhance-digital-transformation-full" currentLanguage={websiteLanguage} />
                    </p>
                    </li>
                    <li className="flex items-start">
                    <div className="mt-1 mr-3 w-3 h-3 rounded-full bg-[#00B389] flex-shrink-0" />
                    <p>
                      <TranslateButtons translationKey="leverage-synergies-full" currentLanguage={websiteLanguage} />
                    </p>
                    </li>
                </ul>        
            </div>
            <div>
            {/* Image */}
            {/* Image with wave border */}
            <div className="lg:w-1/2">
                <div className="mask-wave bg-yellow-400 w-[420px] h-[420px] p-2 mx-auto lg:mx-0">
                    <div className="mask-wave w-full h-full relative">
                    <Image
                        src="/22. Story 8-BOBBA GOES HOME-cover.jpeg"
                        alt="Sky with children"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>
            </div>
            </div>
            </div>
    </section>

    {/* Closing: A Model for the Future */}
    <section className="px-4 md:px-16 text-center my-12">
        <div className="flex justify-center items-center gap-2 mb-4">
            <h2 className="text-3xl md:text-4xl font-cherry text-figmaGreen">
              <TranslateButtons translationKey="model-for-future" currentLanguage={websiteLanguage} />
            </h2>
            <Image src="/boy.png" alt="Left character" width={40} height={40} />
        </div>
        <div className="text-justify text-gray-700 space-y-2 max-w-4xl mx-auto">
            <p>
              <TranslateButtons translationKey="model-future-description" currentLanguage={websiteLanguage} />
            </p>
        </div>
    </section>

    {/* Footer (simple placeholder) */}
    <footer className="py-12 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} AGENTIVE. All rights reserved.</p>
        <Image
            src="/LOGO.jpeg"
            alt="Agentive Logo"
            width={120}
            height={60}
            className="mx-auto mt-4"
        />
    </footer>
    </main>
    </div>
  );
}