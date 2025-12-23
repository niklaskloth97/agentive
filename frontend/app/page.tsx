"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Book } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { TranslateButtons } from "@/components/translateButtons";
import { useWebsiteLanguage } from "@/contexts/WebsiteLanguageContext";

export default function HomeTestPage() {
  const { websiteLanguage } = useWebsiteLanguage();

  return (
    <div className="container mx-auto px-8">
      <div className="w-full overflow-hidden">

        {/* Hero Section */}            
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-start mt- justify-start isolate">
          <Image
            src="/back1-1.jpg"
            alt="Hero background"
            fill
            className="object-cover z-0"
          />
          <div className="text-left mt-28 px-4 md:px-16 text-white drop-shadow-lg relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold">
              <TranslateButtons 
                translationKey="welcome-agentive" 
                currentLanguage={websiteLanguage} 
              />
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <p className="mt-4 text-xl">
                <TranslateButtons 
                  translationKey="boosting-diversity" 
                  currentLanguage={websiteLanguage} 
                />
              </p>
            </div>
          </div>
        </section>

        {/* Welcome Text Section */}
        <section className="py-8 px-4 md:px-16">
          <p className="text-gray-700 text-justify">
            <TranslateButtons 
              translationKey="welcome-intro" 
              currentLanguage={websiteLanguage} 
            />
          </p>
        </section>

        {/* What Can You Expect Section */}
        <section className="px-4 md:px-16">
          <div className="flex items-center justify-center gap-4 mb-6">
           
            <h2 className="text-3xl font-cherry text-figmaGreen">
              <TranslateButtons 
                translationKey="what-can-expect" 
                currentLanguage={websiteLanguage} 
              />
            </h2>

             <Image
              src="/bobba.jpg"
              alt="Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          <p className="text-gray-700 text-justify">
            <TranslateButtons 
              translationKey="what-expect-content" 
              currentLanguage={websiteLanguage} 
            />
          </p>
        </section>


        {/* Resources and User Guide Section */}
        <section className="md:px-16 py-12">
          <h2 className="text-3xl font-cherry text-figmaGreen text-center ">
            <TranslateButtons 
              translationKey="get-started" 
              currentLanguage={websiteLanguage} 
            />
          </h2>
          
          {/* Multilingual Resources with Arrow */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mx-auto mb-2">
            {/* Left Text Content */}
            <div className="text-center lg:text-right flex flex-col items-center lg:items-end flex-1 gap-6">
              <div className="flex items-center gap-4 flex-col lg:flex-row">
                <h3 className="text-2xl font-semibold text-figmaGreen">
                  <TranslateButtons 
                    translationKey="learning-material-title" 
                    currentLanguage={websiteLanguage} 
                  />
                </h3>
                <div className="flex flex-col items-center ">
                  <div className="hidden lg:block text-4xl">→</div>
                  <div className="lg:hidden text-3xl">↓</div>
                </div>
              </div>
            </div>

            {/* Right Wave Image */}
            <div className="flex justify-center lg:justify-start flex-1">
              <Link href="/dashboard">
                <div className="mask-wave bg-yellow-400 w-[300px] h-[300px] md:w-[350px] md:h-[350px] p-2 relative z-0 hover:shadow-lg transition cursor-pointer">
                  <div className="mask-wave w-full h-full relative">
                    <Image
                      src="/to-the-stories.png"
                      alt="Multilingual Resources"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* User Guide Card - Green */}
          <div className="flex justify-start w-full">
            <Link href="/learning-material/user-guide.pdf">
              <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-figmaGreen text-white hover:shadow-lg transition cursor-pointer">
                <div className="text-6xl mb-4"><Book/></div>
                <h3 className="text-xl font-semibold text-center">
                  <TranslateButtons 
                    translationKey="user-guide" 
                    currentLanguage={websiteLanguage} 
                  />
                </h3>
              </div>
            </Link>
          </div>


        </section>

        {/* What is Agentive Section */}
        <section className="px-4 md:px-16 flex flex-col lg:flex-row items-center ">
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            {/* Yellow border layer */}
            <div className="mask-wave bg-yellow-400 w-[420px] h-[420px] p-2 relative z-0">
              {/* Actual image layer */}
              <div className="mask-wave w-full h-full relative">
                <Image
                  src="/back2.jpeg"
                  alt="Children"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-[100%_100%] scale-220"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-cherry text-figmaGreen mb-4">
              <TranslateButtons 
                translationKey="curious-team" 
                currentLanguage={websiteLanguage} 
              />
            </h2>
            <p className="text-gray-700 text-justify mb-6">
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
              <TranslateButtons 
                translationKey="passionate-team" 
                currentLanguage={websiteLanguage} 
              />
            </p>

            <div className="flex text-center divide-x divide-white bg-figmaGreen text-white rounded-xl shadow-md w-full overflow-hidden">
              <div className="w-1/3 flex flex-col items-center justify-center px-4 py-6">
                <p className="text-lg font-bold">6</p>
                <p className="text-sm font-semibold">
                  <TranslateButtons 
                    translationKey="partners" 
                    currentLanguage={websiteLanguage} 
                  />
                </p>
              </div>
          

              <div className="w-1/3 flex flex-col items-center justify-center px-4 py-6">
                <p className="text-lg font-bold">8</p>
                <p className="text-sm font-semibold">
                  <TranslateButtons 
                    translationKey="stories" 
                    currentLanguage={websiteLanguage} 
                  />
                </p>
              </div>

              <div className="w-1/3 flex flex-col items-center justify-center px-4 py-6">
                <p className="text-lg font-bold">100</p>
                <p className="text-sm font-semibold">
                  <TranslateButtons 
                    translationKey="activities" 
                    currentLanguage={websiteLanguage} 
                  />
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Follow Our Journey Section */}
        <section className="px-4 md:px-16 flex flex-col lg:flex-row items-center gap-10">
         
          {/* Left Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            {/* Yellow border mask frame */}
                      <div className="mask-wave bg-yellow-400 w-[420px] h-[420px] p-2 mx-auto lg:mx-0 relative z-0">

              {/* Actual image layer */}
              <div className="mask-wave w-full h-full relative">
                <Image
                  src="/back1.jpg" 
                  alt="Follow Our Journey"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-[80%_100%] scale-110"
                />
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-cherry text-figmaGreen mb-4">
              <TranslateButtons 
                translationKey="follow-journey" 
                currentLanguage={websiteLanguage} 
              />
            </h2>
            <p className="text-gray-700 text-justify">
              <TranslateButtons 
                translationKey="journey-content" 
                currentLanguage={websiteLanguage} 
              />
              {" "}
              <TranslateButtons 
                translationKey="thanks-joining" 
                currentLanguage={websiteLanguage} 
              />
            </p>
          </div>

          
        </section>

      </div>
    </div>
  );
}
