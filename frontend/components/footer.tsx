"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TranslateButtons } from '@/components/translateButtons';
import { useWebsiteLanguage } from '@/contexts/WebsiteLanguageContext';

export default function Footer() {
    const { websiteLanguage } = useWebsiteLanguage();
    
    return (    
        <footer className="bg-gray-800 px-8 z-50">
            <div className="container max-w-7xl mx-auto py-4">
                <div className="lg:flex">
                    <div className="w-full lg:w-1/4 ">
                        <h3 className="text-2xl font-semibold text-white">
                            <TranslateButtons 
                                translationKey="about-us" 
                                currentLanguage={websiteLanguage} 
                            />
                        </h3>
                        <p className="mt-2 text-gray-400">
                            <TranslateButtons 
                                translationKey="agentive-footer" 
                                currentLanguage={websiteLanguage} 
                            />
                        </p>
                    </div>
                    <div className="w-full lg:w-1/4">
                        <h3 className="text-2xl font-semibold text-white">
                            <TranslateButtons 
                                translationKey="contact-us" 
                                currentLanguage={websiteLanguage} 
                            />
                        </h3>
                        <Link className="mt-2 text-gray-400" href="mailto:agentive@wi.uni-muenster.de">
                            <TranslateButtons 
                                translationKey="mail-contact" 
                                currentLanguage={websiteLanguage} 
                            />
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/4">
                        <h3 className="text-2xl font-semibold text-white">
                            <TranslateButtons 
                                translationKey="legal" 
                                currentLanguage={websiteLanguage} 
                            />
                        </h3>
                        <Link className="mt-2 text-gray-400" href="/impress">
                            <TranslateButtons 
                                translationKey="impress" 
                                currentLanguage={websiteLanguage} 
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <Image 
                            src="/eu-footer.svg" 
                            alt={`${websiteLanguage === 'en' ? 'Funded by the Erasmus+ Programme of the European Union' : 
                                websiteLanguage === 'fr' ? 'Financé par le programme Erasmus+ de l\'Union européenne' :
                                websiteLanguage === 'lux' ? 'Finanzéiert vum Erasmus+ Programm vun der Europäescher Unioun' :
                                websiteLanguage === 'sv' ? 'Financirano iz programa Erasmus+ Evropske unije' :
                                websiteLanguage === 'it' ? 'Finanziato dal Programma Erasmus+ dell\'Unione Europea' :
                                websiteLanguage === 'de' ? 'Gefördert durch das Erasmus+ Programm der Europäischen Union' :
                                websiteLanguage === 'gr' ? 'Χρηματοδοτείται από το Πρόγραμμα Erasmus+ της Ευρωπαϊκής Ένωσης' :
                                'Funded by the Erasmus+ Programme of the European Union'}`}
                            width={200} 
                            height={100} 
                            className="" 
                        />
                        
  {/* Creative Commons License */}
                        <div className="text-gray-400">
                            <div className="text-sm mt-4 flex items-start gap-3">
                                <Image 
                                    src="/by-nc-nd.eu.svg" 
                                    alt="Creative Commons BY-NC-ND 4.0 License" 
                                    width={80} 
                                    height={20} 
                                    className="flex-shrink-0"
                                />
                                <div className="flex flex-col">
                                    <p className="mb-2 text-gray-200">
                                        Images: Katarina Veroutsous, Materials by: The AGENTIVE Team
                                    </p>
                                    <div className="flex items-center">
                                        <span className="mr-2">Licensed under</span>
                                        <Link 
                                            href="https://creativecommons.org/licenses/by-nc-nd/4.0/" 
                                            className="text-blue-400 hover:text-blue-300"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            CC BY-NC-ND 4.0
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}