import Image from 'next/image'

export default function About() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">About the Project: AGENTIVE </h1>
      <h2 className="text-xl font-semibold mb-4">Stimulating Multilingual Learning in Early Childhood Education</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* <div className="md:w-1/2">
          <Image src="/placeholder.svg" alt="About AGENTIVE" width={500} height={300} className="rounded-lg mb-4" />
        </div> */}
        <div /*className="md:w-1/2"*/>
          <h2 className="text-m font-semibold mb-4">Our Vision: Promoting Multilingualism in Early Childhood</h2>
          <p className="text-gray-600 mb-4">
          Multiple languages coexist and shape today's societies, AGENTIVE aims to equip children with the tools to navigate and thrive in multilingual environments. Current research highlights the cognitive, social, and academic benefits of multilingualism, particularly when introduced early in life. AGENTIVE seeks to bridge the gap in early childhood language education by providing accessible, evidence-based resources to support multilingual literacy development.
          </p>
          <p className="text-gray-600 mb-4">
          Languages and multilingualism play an important role in children’s everyday lives as many children grow up speaking several languages at home and in their setting of Early Childhood Education (ECE). Language skills beyond the family language(s) count as key qualifications in Europe. The early childhood phase is particularly important for multilingual language learning as children appear to develop skills in additional language(s) effortlessly, provided they have child-friendly and stimulating conditions in ECE.
          </p>
          <p className="text-gray-600 mb-4">
          AGENTIVE aims to promote early language learning through creating eight pedagogical sets as well as a digital platform where professionals and parents can download our educational resources. Furthermore, the team offers professional development training to teachers and student teachers to help them use the materials effectively and develop digital competences. Our school-university-business synergy will contribute to the wide dissemination of the findings.
          </p>
          <h2 className="text-m font-semibold mb-4">An EU-Funded Erasmus+ Initiative</h2>
          <p className="text-gray-600 mb-4">
          The AGENTIVE project is a groundbreaking initiative funded by the Erasmus+ programme of the European Union. It is a collaborative endeavour that unites universities and organizations from Luxembourg, Greece, Germany, Switzerland, Slovenia, and Italy to develop innovative multilingual educational resources for early childhood education (ECE) and to develop school-university and business synergies. This pan-European partnership emphasizes the EU’s commitment to fostering multilingualism and digital transformation in education.
          </p>
          <h2 className="text-m font-semibold mb-4">Collaboration Across Sectors</h2>
          <p className="text-gray-600 mb-4">
          Led by Prof. Dr. Claudine Kirsch at the University of Luxembourg, AGENTIVE brings together the University of Münster, the Free University of Bolzano, the University of Teacher Education of the Grisons (PHGR), the University of Primorska and Web2Learn. This consortium fosters synergies between academia and schools to create innovative multilingual education material. The collaboration is designed to ensure sustainable and impactful results that benefit teachers, students, parents and society as a whole.
          </p>
          <h2 className="text-m font-semibold mb-4">Addressing a Multilingual Europe</h2>
          <p className="text-gray-600 mb-4">
          In regions like Luxembourg, Switzerland, Tyrol and Primorska, multiple languages are spoken side by side and children may learn two societal languages from an early age through daily interactions or language learning in preschool. Additionally, migration patterns across Europe have increased the language diversity in societies and classrooms. Programmes for language awareness and early English thrive. AGENTIVE addresses these realities by developing inclusive and accessible, multilingual learning materials that are adaptable to different cultural and linguistic contexts.
          </p>
          <h2 className="text-m font-semibold mb-4">Open Access to Resources</h2>
          <p className="text-gray-600 mb-4">
          One of AGENTIVE’s core principles is openness. All educational materials developed through the project will be freely accessible, ensuring that teachers, schools, and parents can integrate them directly into their practice. The digital resources are designed to be flexible and modular, enabling educators to tailor them to the needs of their pupils, the curricular constraints and the specificities of the countries. 
          </p>
          <h2 className="text-m font-semibold mb-4">Objectives of the Project</h2>
          <p className='text-gray-600 mb-1'>AGENTIVE is guided by two key objectives:</p>
          <ol className="list-decimal ml-8 text-gray-600 mb-4">
            <li>
            < span className="font-semibold">Enhance digital transformation of schools and universities through open access early language learning resources and state-of-the-art pedagogies and training: </span> By creating open-access, state-of-the-art pedagogical tools, the project supports the digital readiness of schools and universities. Training programs for pre- and in-service ECE teachers are integral to this goal.
            </li>
            <li>
            < span className="font-semibold">Leverage open, multilingual and cross-sectoral ECE through university-school-business synergies:  </span> AGENTIVE fosters partnerships between schools, universities, and businesses to innovate multilingual education. These collaborations ensure the materials and approaches developed are practical, effective, and forward-thinking.
            </li>
          </ol>
          <h2 className="text-m font-semibold mb-4">Innovation and Impact</h2>
          <div className="text-gray-600 mb-4">
            <p className='mb-1'>AGENTIVE’s approach is holistic and multidimensional, offering:</p>
            <ul className="list-disc ml-8">
            <li>
            < span className="font-semibold">Digital Resources for Multilingual Literacy: </span> The project provides open, digital materials that promote the learning of languages and literacy, addressing a key gap in early childhood education.
            </li>
            <li>
            < span className="font-semibold"> Equipping Educators: </span> By equipping pre- and in-service teachers with evidence-based strategies and digital competencies, AGENTIVE empowers educators to implement multilingual teaching effectively.
            </li>
            <li>
            < span className="font-semibold"> Cross-Sector Collaboration:  </span> The synergy between academia and businesses drives the development of innovative educational tools and sustainable partnerships.
            </li>
          </ul>
          </div>
          <h2 className="text-m font-semibold mb-4">Alignment with EU Goals</h2>
          <p className="text-gray-600 mb-4">
              Aligned with the EU’s priorities for education, AGENTIVE promotes linguistic diversity, inclusion, and digital transformation. It embodies the EU’s vision of fostering a multilingual society. For this project, we are funded by Europe’s Erasmus+ Programme.
          </p>
          <h2 className="text-m font-semibold mb-4">A Model for the Future</h2>
          <p className="text-gray-600 mb-4">
          By building on the expertise of its partners and leveraging the multilingual realities of Europe, AGENTIVE aims to set a benchmark for early childhood multilingual education. The project’s outcomes will contribute to shaping a more inclusive and innovative educational landscape across Europe.
          </p>
          <p className="text-gray-600 mb-4">
          For more information about AGENTIVE, our resources, and upcoming events, please explore our platform. Together, we can inspire the next generation to embrace the power of multilingualism!
          </p>
        </div>
      </div>
    </div>
  )
}