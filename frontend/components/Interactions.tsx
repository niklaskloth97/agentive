import Image from "next/image";
import { FaBookOpen, FaChalkboardTeacher, FaUsers } from "react-icons/fa";

export default function InnovationImpact() {
  return (
    <div className="bg-gray-200 py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Innovation and Impact</h2>

      {/* First Row */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b pb-6">
        <Image src="/multilingual.jpg" alt="Multilingual Learning" width={150} height={150} className="rounded-lg shadow-md" />
        <div className="text-right">
          <div className="flex items-center justify-end font-bold">
            <span>Digital Resources for Multilingual Literacy</span>
            <FaBookOpen className="text-blue-500 text-xl ml-2" />
          </div>
          <p className="text-gray-700 mt-2">The project provides open, digital materials that promote the learning of languages and literacy, addressing a key gap in early childhood education.</p>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b py-6">
        <Image src="/teachers.jpg" alt="Equipping Educators" width={150} height={150} className="rounded-lg shadow-md" />
        <div className="text-right">
          <div className="flex items-center justify-end font-bold">
            <span>Equipping Educators</span>
            <FaChalkboardTeacher className="text-green-500 text-xl ml-2" />
          </div>
          <p className="text-gray-700 mt-2">AGENTIVE empowers educators to implement multilingual teaching effectively.</p>
        </div>
      </div>

      {/* Third Row */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-6">
        <Image src="/collaboration.jpg" alt="Cross-Sector Collaboration" width={150} height={150} className="rounded-lg shadow-md" />
        <div className="text-right">
          <div className="flex items-center justify-end font-bold">
            <span>Cross-Sector Collaboration</span>
            <FaUsers className="text-purple-500 text-xl ml-2" />
          </div>
          <p className="text-gray-700 mt-2">The synergy between academia and businesses drives the development of innovative educational tools and sustainable partnerships.</p>
        </div>
      </div>
    </div>
  );
}
