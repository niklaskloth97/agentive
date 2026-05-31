import React from 'react';
import { FileText, ChevronDown, Quote, Calendar, MapPin } from 'lucide-react';

export default function PublicationsAndActivities() {

  const publications = [
    {
      authors: "Asgari, M., Dording, C., Morys, N., Ortler, Y. N., Pirih, A., C. Kirsch",
      year: "2025",
      title: "Promoting multilingualism: beliefs, pedagogical and practical skills and practices. AGENTIVE Survey and interview guides.",
      publisher: "University of Luxembourg",
      link: "#"
    },
    {
      authors: "Kirsch, C.",
      year: "2026 (Accepted)",
      title: "Analogue and digital literacy practices to promote multilingual literacies in preschool in Luxembourg.",
      publisher: "Educational Research for Policy and Practice",
      link: "#"
    }
  ];

  const conferences = [
    { title: "Early Literacy in German as a Foreign Language", date: "12.–13.05.2025", location: "Luxemburg", event: "Multilingual Childhood Conference", speaker: "Asgari, M." },
    { title: "Language Separation in a Multilingual Society", date: "17.10.2025", location: "South Tyrol", event: "Interdisciplinary Workshop on Multilingual Education", speaker: "Asgari, M." },
    { title: "Designing Open Access Platforms for Multilingual Language Awareness", date: "2026", location: "TBD", event: "DESRIST 2026", speaker: "Burger, M., Kloth, K. & vom Brocke, C." },
    { title: "Digital Storytelling in Preschools", date: "18-21.08.2026", location: "Tampere, Finland", event: "ECER", speaker: "Kirsch, C." }
  ];

  return (
    <div className="container mx-auto py-12 px-8 max-w-5xl bg-gray-50">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-[#1a365d] mb-10 border-l-8 border-[#1a365d] pl-6">
        Publications and Activities
      </h1>

      {/* Expert Voices Section */}
      <section className="mb-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-[#1a365d] mb-4 flex items-center">
              <Quote className="mr-2 text-blue-500" /> Expert Voices
            </h2>
            <img
              src="/images/ResearchImages/ExpertVoices.jpg"
              alt="Expert Voices Illustration"
              className="rounded-lg shadow-inner mb-4 w-full h-48 object-cover bg-gray-200"
            />
            <p className="font-bold text-[#1a365d]">Prof. Svetlana Jakimovska</p>
            <p className="text-sm text-gray-500 italic">Professor of Philology, University Goce Delcev, Stip, North Macedonia</p>
          </div>
          <div className="md:w-2/3 text-gray-700 leading-relaxed space-y-4">
            <p className="italic">"The website is well structured, yet still playful... The use of Esperanto is an excellent idea..."</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Relevance for Macedonia</h4>
              <p className="text-sm">Teachers in Macedonia show strong interest in these materials, particularly in multilingual environments involving Macedonian, Albanian, and Turkish backgrounds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-[#1a365d]">Publications</h2>
            <div className="h-px flex-grow bg-gray-200"></div>
        </div>
        {/* Adjusted Height: h-48 (~12rem/192px) for a taller presence */}
        <img
          src="/images/ResearchImages/Publications.jpg"
          alt="Publications Header"
          className="w-full h-48 object-cover rounded-xl mb-6 shadow-sm"
        />
        <div className="space-y-4">
          {publications.map((pub, i) => (
            <div key={i} className="bg-white p-6 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-500 mb-1">{pub.authors} ({pub.year})</p>
              <h3 className="font-bold text-lg text-[#1a365d] mb-2">{pub.title}</h3>
              <p className="text-sm font-medium italic">{pub.publisher}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conferences Section */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-[#1a365d]">Conferences & Workshops</h2>
            <div className="h-px flex-grow bg-gray-200"></div>
        </div>
        {/* Adjusted Height: h-56 (~14rem/224px) to balance the grid below */}
        <img
          src="/images/ResearchImages/Conferences.jpg"
          alt="Conferences Illustration"
          className="w-full h-56 object-cover rounded-xl mb-8 shadow-sm"
        />
        <div className="grid grid-cols-1 gap-6">
          {conferences.map((conf, i) => (
            <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-lg border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                <Calendar size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1a365d]">{conf.title}</h4>
                <p className="text-sm text-gray-600">{conf.speaker} — {conf.event}</p>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <MapPin size={12} className="mr-1" /> {conf.location} | {conf.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}