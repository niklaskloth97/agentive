import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (    
        <footer className="bg-gray-800 px-8 z-50">
            <div className="container max-w-7xl mx-auto py-4">
                <div className="lg:flex">
                    <div className="w-full lg:w-1/4 ">
                        <h3 className="text-2xl font-semibold text-white">About Us</h3>
                        <p className="mt-2 text-gray-400">AGENTIVE - A platform for multilingual education</p>
                    </div>
                    <div className="w-full lg:w-1/4">
                        <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
                        <Link className="mt-2 text-gray-400" href="mailto:agentive@uni-muenster.de">Mail: agentive@wi.uni-muenster.de</Link>
                            
                    </div>
                    <div className="w-full lg:w-1/4">
                        <h3 className="text-2xl font-semibold text-white">Legal aspects</h3>
                            <Link className="mt-2 text-gray-400" href="/impress">Impress</Link>
                    </div>
                    <div>
                        <Image src="/images/eu-footer.svg" alt="Funded by the Erasmus+ Programm of the European Union" width={200} height={100} className="rounded-lg mb-4" />
                    </div>
                    
                </div>
            </div>
        </footer>
    );

}
