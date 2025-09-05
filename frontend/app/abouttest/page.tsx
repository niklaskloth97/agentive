import Image from 'next/image'

export default function AboutPage() {
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
            About AGENTIVE
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <p className="mt-4 text-xl">
                Stimulating Multilingual Learning in Early Childhood Education
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="py-6 px-4 md:px-20 max-w-7xl mx-auto">
            {/* Header + First Paragraph (Centered) */}
            <div className="text-center mb-4">
                <h2 className="text-3xl md:text-4xl font-cherry text-figmaGreen mb-4">
                Our Vision: Promoting Multilingualism in ECE
                </h2>
                <p className="text-justify text-gray-700 max-w-4xl mx-auto text-base md:text-lg leading-relaxed">
                Languages play an important role in children&apos;s everyday lives in Europe; many speak
                several languages at home while also encountering further languages at school. Many European
                countries have introduced elements of multilingual education in Early Childhood Education
                (ECE). One such approach is translanguaging, a rich and child-friendly method of
                multilingualism, through which children can learn from their full language repertoires
                irrespective of language input and learning conditions. When children see their languages
                reflected in educational resources, feel understood and heard, and have access to books and
                stories in languages they understand and care about, teachers appear more at ease and
                confident to foster language learning as they lack multilingual resources.
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
            AGENTIVE seeks to bridge this gap by providing multilingual evidence-based resources that
            support literacy development in multiple languages and are easily adapted to various cultural
            and linguistic contexts. Professionals and parents can download our eight pedagogical sets
            (i.e., stories and follow-up activities) on our digital platform. AGENTIVE also offers
            seminars for student teachers and professional development courses for teachers to develop the
            digital and pedagogical competences required to use our materials effectively. Our
            school-university-business synergy will see to the wide dissemination of the findings.
            </div>
        </div>
    </section>

    {/* Erasmus+ Initiative */}
    <section className="px-4 md:px-16 py-6 text-center relative">
        <h2 className="text-3xl md:text-4xl font-cherry text-figmaGreen mb-2">
            An EU-Funded Erasmus+ Initiative Across Sectors
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
            The AGENTIVE project is a groundbreaking initiative funded by the Erasmus+ programme of the European Union. Uniting universities and organizations from six countries, this pan-European partnership endorses the EU's commitment to linguistic diversity, inclusion and digital transformation in education.
            Led by Prof. Dr. Claudine Kirsch, AGENTIVE brings together the University of Luxembourg, the University of Münster (Germany), the Free University of Bozen (Italy), the University of Teacher Education of the Grisons (Switzerland), the University of Primorska (Slovenia), and Web2Learn (Greece). 
            In regions like Luxembourg, Switzerland, Tyrol and Primorska, multiple languages are spoken side by side and children may learn two societal languages from an early age through daily interactions or language learning in preschool. Additionally, migration patterns across Europe have increased the language diversity in societies and classrooms. Programmes for language awareness and early English thrive. AGENTIVE addresses these realities. 
            Our synergies between academia and schools enable us to develop innovative pedagogies and evidence-based and sustainable multilingual learning materials that benefit teachers, children, and parents.
            </p>
        </div>
    </section>

    {/* Innovation and Impact */}
        <section className="px-4 md:px-16 py-12 bg-figmaGreen text-white text-center">
        <h2 className="text-2xl font-cherry text-white">Innovation and Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Card 1 */}
    <div className="p-6 flex flex-col">
      <div className="min-h-[60px] flex flex-col items-center justify-start mb-4">
        <h3 className="text-lg font-bold text-center leading-snug">
          Digital resources for multilingual literacy
        </h3>
        <div className="w-40 h-0.5 bg-white mt-2"></div>
      </div>
      <p className="text-sm text-justify">
        The project provides open access digital materials that promote multilingual storytelling,
        language learning and literacy skills, addressing a key gap in early childhood education.
      </p>
    </div>

    {/* Card 2 */}
    <div className="p-6 flex flex-col">
      <div className="min-h-[60px] flex flex-col items-center justify-start mb-4">
        <h3 className="text-lg font-bold text-center leading-snug">
          Equipping educators 
        </h3>
        <div className="w-40 h-0.5 bg-white mt-2"></div>
      </div>
      <p className="text-sm text-justify">
        By equipping pre-service and in-service teachers with science-based tools and
        evidence-informed digital competences, AGENTIVE empowers professionals to support
        multilingual teaching effectively.
      </p>
    </div>

    {/* Card 3 */}
    <div className="p-6 flex flex-col">
      <div className="min-h-[60px] flex flex-col items-center justify-start mb-4">
        <h3 className="text-lg font-bold text-center leading-snug">
          Cross-Sector collaboration
        </h3>
        <div className="w-40 h-0.5 bg-white mt-2"></div>
      </div>
      <p className="text-sm text-justify">
        The synergy between academia and business enhances the development of child-driven
        educational content and fosters sustainable partnerships.
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
                Objectives of the Project
                </h2>
                <p className="text-gray-700 text-base md:text-lg">
                AGENTIVE is guided by two key objectives.
                </p>
                </div>
                {/* Bullet points */}
                <ul className="space-y-6 text-gray-800 text-justify text-base md:text-lg list-none">
                    <li className="flex items-start">
                    <div className="mt-1 mr-3 w-3 h-3 rounded-full bg-[#00B389] flex-shrink-0" />
                    <p>
                    Enhance digital transformation of schools and universities through innovative pedagogies and open education
                    resources that teachers and parents can integrate directly into their practices. By creating open-access,
                    innovative pedagogical tools, the project supports the digital readiness of schools and universities. Training
                    programs for pre- and in-service ECE teachers are integral to this goal.
                    </p>
                    </li>
                    <li className="flex items-start">
                    <div className="mt-1 mr-3 w-3 h-3 rounded-full bg-[#00B389] flex-shrink-0" />
                    <p>
                    Leverage open, multilingual and cross-sectoral ECE through university-school-business synergies: AGENTIVE fosters
                    partnerships between schools, universities, and businesses to innovate multilingual education. These
                    collaborations ensure that our pedagogical approaches and materials are appropriate, inclusive and
                    forward-thinking.
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
            <h2 className="text-3xl md:text-4xl font-cherry text-figmaGreen">A Model for the Future</h2>
            <Image src="/boy.png" alt="Left character" width={40} height={40} />
        </div>
        <div className="text-justify text-gray-700 space-y-2 max-w-4xl mx-auto">
            <p>
            By building on the expertise of its partners and leveraging the multilingual realities of Europe, AGENTIVE aims to set a
            benchmark for early childhood multilingual education. The project's outcomes will contribute to more inclusive and innovative
            learning environments across Europe.
            </p>
            <p>
            For more information about the AGENTIVE resources and upcoming events, please explore our platform. Together, we can inspire the
            next generation to embrace the power of multilingualism!
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