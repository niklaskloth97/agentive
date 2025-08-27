"use client";

import Image from 'next/image';
import { TranslateButtons } from "@/components/translateButtons";
import { useWebsiteLanguage } from "@/contexts/WebsiteLanguageContext";

export default function Team() {
  const { websiteLanguage } = useWebsiteLanguage();

  const teamData = [
    { 
      university: (
        <TranslateButtons
          translationKey="university-luxembourg"
          currentLanguage={websiteLanguage}
        />
      ), 
      members: [
        {
          name: 'Claudine Kirsch', 
          role: (
            <TranslateButtons
              translationKey="project-manager"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Claudine_Kirsch.webp' 
        },
        {
          name: 'Nancy Morys', 
          role: (
            <TranslateButtons
              translationKey="language-education"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Nancy_MORYS.webp' 
        },
        {
          name: 'Carole Dording', 
          role: (
            <TranslateButtons
              translationKey="language-education"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Carole_Dording.webp' 
        },
        {
          name: 'Angélique Quintus', 
          role: (
            <TranslateButtons
              translationKey="language-education"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Angelique_Quintus.webp' 
        },
        {
          name: 'Jeanne Letsch', 
          role: (
            <TranslateButtons
              translationKey="language-education"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Jeanne_Letsch.webp' 
        },
      ]
    },
    { 
      university: (
        <TranslateButtons
          translationKey="university-muenster"
          currentLanguage={websiteLanguage}
        />
      ), 
      members: [
        { 
          name: 'Jan vom Brocke', 
          role: (
            <TranslateButtons
              translationKey="platform-innovator"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/jan-vom-brocke.jpg' 
        },
        { 
          name: 'Niklas Kloth', 
          role: (
            <TranslateButtons
              translationKey="platform-development"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/niklas-kloth.webp' 
        },
        { 
          name: 'Mara Burger', 
          role: (
            <TranslateButtons
              translationKey="platform-coordination"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Mara_Burger.webp' 
        },
        { 
          name: 'Helena Kaiser', 
          role: (
            <TranslateButtons
              translationKey="platform-development-assistant"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Helena_Kaiser.webp' 
        },
        { 
          name: 'Alice Fiolka', 
          role: (
            <TranslateButtons
              translationKey="platform-development-assistant"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Alice-Fiolka.jpeg' 
        }
      ]
    },
    { 
      university: (
        <TranslateButtons
          translationKey="university-grisons"
          currentLanguage={websiteLanguage}
        />
      ), 
      members: [
        { 
          name: 'Christina vom Brocke', 
          role: (
            <TranslateButtons
              translationKey="multilingual-education"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/tine-vom-brocke2.webp' 
        },
      ]
    },
    { 
      university: (
        <TranslateButtons
          translationKey="university-bozen"
          currentLanguage={websiteLanguage}
        />
      ), 
      members: [
        { 
          name: 'Marjan Asgari', 
          role: (
            <TranslateButtons
              translationKey="educational-material-design"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Asgari Marjan.webp' 
        },
        { 
          name: 'Yasmine Azza', 
          role: (
            <TranslateButtons
              translationKey="psychological-development-education-material"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Yasmine_Azza.png' 
        },
        { 
          name: 'Sven Nickel', 
          role: (
            <TranslateButtons
              translationKey='early-literacy-education'
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Sven_Nickel.jpeg' 
        },
        { 
          name: 'Renata Zanin', 
          role: (
            <TranslateButtons
              translationKey='early-literacy-education'
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/placeholder.svg' 
        },
      ]
    },
    { 
      university: (
        <TranslateButtons
          translationKey="university-primorska"
          currentLanguage={websiteLanguage}
        />
      ), 
      members: [
        { 
          name: 'Anja Pirih', 
          role: (
            <TranslateButtons
              translationKey="foreign-language-education"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Anja_Pirih.webp' 
        },
        { 
          name: 'Mija Umer', 
          role: (
            <TranslateButtons
              translationKey="educational-design"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Mija_Umer.jpeg' 
        },
        { 
          name: 'Mojca Žefran', 
          role: (
            <TranslateButtons
              translationKey="educational-design"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Mojca_Žefran.png' 
        },
        { 
          name: 'Sonja Rutar', 
          role: (
            <TranslateButtons
              translationKey="preliteracy-language-development"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Sonja_Rutar.webp' 
        },
        { 
          name: 'Silva Bratož', 
          role: (
            <TranslateButtons
              translationKey="plurilingual-competencies"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Silva_Bratož.PNG' 
        },
      ]
    },
    { 
      university: (
        <TranslateButtons
          translationKey="web2learn"
          currentLanguage={websiteLanguage}
        />
      ), 
      members: [
        { 
          name: 'Katerina Zourou', 
          role: (
            <TranslateButtons
              translationKey="open-language-education"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Katerina-Zourou.png'
        }, 
        { 
          name: 'Stefania Oikonomou', 
          role: (
            <TranslateButtons
              translationKey="open-language-education"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Stefania Oikonomou.png'
        }, 
        { 
          name: 'Claire Fragkiadaki', 
          role: (
            <TranslateButtons
              translationKey="open-language-education"
              currentLanguage={websiteLanguage}
            />
          ), 
          image: '/images/people/Claire-Fragkiadaki.png'
        }, 
      ]
    },
  ];

  const partnerUniversities = [
    { 
      name: (
        <TranslateButtons
          translationKey="university-luxembourg"
          currentLanguage={websiteLanguage}
        />
      ), 
      role: (
        <TranslateButtons
          translationKey="project-management-educational-development"
          currentLanguage={websiteLanguage}
        />
      ), 
      image: '/images/universities/university-luxembourg-nobseline - full.svg' 
    },
    { 
      name: (
        <TranslateButtons
          translationKey="university-muenster"
          currentLanguage={websiteLanguage}
        />
      ), 
      role: (
        <TranslateButtons
          translationKey="platform-development"
          currentLanguage={websiteLanguage}
        />
      ), 
      image: '/images/universities/unims.svg' 
    },
    { 
      name: (
        <TranslateButtons
          translationKey="university-grisons"
          currentLanguage={websiteLanguage}
        />
      ), 
      role: (
        <TranslateButtons
          translationKey="educational-material-concept"
          currentLanguage={websiteLanguage}
        />
      ), 
      image: '/images/universities/Logo-phgr.svg' 
    },
    { 
      name: (
        <TranslateButtons
          translationKey="university-bozen"
          currentLanguage={websiteLanguage}
        />
      ), 
      role: (
        <TranslateButtons
          translationKey="educational-material-concept"
          currentLanguage={websiteLanguage}
        />
      ), 
      image: 'images/universities/bozen.svg' 
    },
    { 
      name: (
        <TranslateButtons
          translationKey="university-primorska"
          currentLanguage={websiteLanguage}
        />
      ), 
      role: (
        <TranslateButtons
          translationKey="educational-material-concept"
          currentLanguage={websiteLanguage}
        />
      ), 
      image: '/images/universities/primorska.png' 
    },
    { 
      name: (
        <TranslateButtons
          translationKey="web2learn"
          currentLanguage={websiteLanguage}
        />
      ), 
      role: (
        <TranslateButtons
          translationKey="open-educational-resources"
          currentLanguage={websiteLanguage}
        />
      ), 
      image: '/images/universities/w2l_logo.png' 
    },
  ];

  return (
    <div className="container mx-auto py-8 px-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          <TranslateButtons
            translationKey="team"
            currentLanguage={websiteLanguage}
          />
        </h1>
        <h2 className="text-xl mb-8">
          <TranslateButtons
            translationKey="agentive-made-possible"
            currentLanguage={websiteLanguage}
          />
        </h2>
        {teamData.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{group.university}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {group.members.map((member, memberIndex) => (
                <div key={memberIndex} className="text-center">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={200} 
                    height={200} 
                    className="rounded-full border-4 mx-auto mb-4" 
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
   
        <h1 className="text-3xl font-bold mb-6 py-16">
          <TranslateButtons
            translationKey="partner-universities"
            currentLanguage={websiteLanguage}
          />
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnerUniversities.map((member, index) => (
            <div key={index} className="text-center">
              <div className="h-48 flex items-center justify-center">
                <Image 
                  src={member.image} 
                  alt={typeof member.name === 'string' ? member.name : 'University'} 
                  width={200} 
                  height={200} 
                  className="mx-auto mb-4 object-contain" 
                />
              </div>
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}