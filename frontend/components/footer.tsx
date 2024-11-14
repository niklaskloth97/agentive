import React from 'react';

export default function Footer() {
    return (    
        <footer className="bg-gray-800 px-4">
            <div className="container max-w-7xl mx-auto py-4">
                <div className="lg:flex">
                    <div className="w-full lg:w-1/4 ">
                        <h3 className="text-2xl font-semibold text-white">About Us</h3>
                        <p className="mt-2 text-gray-400">AGENTIVE - A platform for multilingual education.</p>
                    </div>
                    <div className="w-full lg:w-1/4">
                        <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
                    </div>
                </div>
            </div>
        </footer>
    );

}
