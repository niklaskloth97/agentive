import { Link } from "lucide-react";
import Image from "next/image";

export default function HomeTestPage() {
  return (
    <div className="container mx-auto py-8 px-8">

    <div className="w-full overflow-hidden">

      {/* Hero Section */}      
      <section className="relative w-full h-[70vh] md:h-[80vh] flex items-start justify-start isolate">
        <Image
          src="/back1-1.jpg"
          alt="Hero background"
          fill
          className="object-cover z-0"
        />
        <div className="text-left px-4 md:px-8 my-72 text-white drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to AGENTIVE</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <p className="mt-4 text-xl">
            Boosting linguistic diversity in early childhood education through synergies
          </p>
          </div>
        </div>
      </section>

      <section className="py-2 mt-8 px-4 md:px-16 text-center text-justifys">
        <p className="max-w-3xl mx-auto text-gray-700 text-justify">
          Welcome to the AGENTIVE platform! As part of an EU-funded Erasmus+ initiative,
          we are creating innovative tools to promote language leaming in Early Childhood Education (ECE). 
          Our goal is to provide free evidence-based resources for language and literacy development in ECE,
          create professional development materials for teachers and stimulate school-university-business synergies.
        </p>
      </section>

      {/* What Can You Expect Section */}
      <section className="px-4 md:px-16">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/bobba.jpg"
            alt="Logo"
            width={150}
            height={150}
            className="object-contain"
          />
          <h2 className="text-3xl font-cherry text-figmaGreen">What Can You Expect?</h2>
        </div>

        <p className="mt-2 max-w-3xl mx-auto text-gray-700 text-justify">
          AGENTIVE creates resources that celebrate linguistic diversity, 
          enabling teachers to design inclusive learning opportunities in order to help children 
          develop multilingual competences. Our materials are openly available, 
          meaning teachers and parents are free to adapt and share these.
        </p>
      </section>


      {/* What is Agentive Section */}
      <section className="px-4 md:px-16 flex flex-col lg:flex-row items-center gap-10 isolate">
        <div className="lg:w-1/2" >
          {/* Yellow border layer */}
          <div className="mask-wave bg-yellow-400 w-[420px] h-[420px] p-2 mx-auto lg:mx-0 relative z-0">
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
          <h2 className="text-3xl font-cherry text-figmaGreen">Curious About the Team Behind AGENTIVE?</h2>
          <p className="py-4 text-gray-700 text-justify mb-6">
           AGENTIVE involves universities and organizations from Luxembourg, Switzerland, Greece, Slovenia, 
           Germany and Italy. Together, were leveraging expertise across academia, schools, and businesses 
           to drive innovation in multilingual education. Visit &quot;The Team&quot; page.
           Our team is made up of passionate researchers, teachers and developers working together 
           to make a multilingual education accessible to everyone.
          </p>

          <div className="flex text-center divide-x divide-white bg-figmaGreen text-white rounded-xl shadow-md mt-4 mb-4 w-full max-w-4xl mx-auto overflow-hidden">

            <div className="w-1/3 flex flex-col items-center justify-center px-4 py-6">
              <p className="text-lg font-bold">6</p>
              <p className="text-sm font-semibold">partners</p>
            </div>

            <div className="w-1/3 flex flex-col items-center justify-center px-4 py-6">
              <p className="text-lg font-bold">8</p>
              <p className="text-sm font-semibold">stories</p>
            </div>

            <div className="w-1/3 flex flex-col items-center justify-center px-4 py-6">
              <p className="text-lg font-bold">100</p>
              <p className="text-sm font-semibold">activities</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 px-4 md:px-16 flex flex-col lg:flex-row items-center isolate">
        {/* Left Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl font-cherry text-figmaGreen mb-4">Follow Our Journey</h2>
          <p className="text-gray-700 text-justify">
            AGENTIVE began on 1st October 2024. Since then, we have designed 8 pedagogical sets of materials
            comprising stories in multiple languages and activities which are launched from Summer 2025.
            Whether you’re a teacher, a parent, or simply curious about the world of multilingual education, 
            there’s something here for you.
            Thanks for joining us on this journey—together, we’re shaping the future of early childhood multilingual education!
          </p>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 ">
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
      </section>


     </div>
    </div>
  );
}
