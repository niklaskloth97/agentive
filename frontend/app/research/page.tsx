import React from 'react';
import { FileText, ChevronDown, Quote, Calendar, MapPin, User, Users } from 'lucide-react';

export default function PublicationsAndActivities() {

  const publications = [
    {
      type: "Publication",
      authors: "Kirsch, C.",
      year: "2026",
      title: "Analogue and digital literacy practices to promote multilingual literacies in preschool in Luxembourg.",
      publisher: "Educational Research for Policy and Practice",
      link: "https://doi.org/10.1007/s10671-026-09424-2",
      doi: "10.1007/s10671-026-09424-2"
    }
  ];

  const materials = [
    {
      type: "Material",
      authors: "Asgari, M., Dording, C., Morys, N., Ortler, Y. N., Pirih, A., C. Kirsch",
      year: "2026",
      title: "Promoting multilingualism: beliefs, pedagogical and practical skills and practices. AGENTIVE Survey and interview guides.",
      publisher: "Esch-Belval: University of Luxembourg",
      link: "https://hdl.handle.net/10993/68261"
    },
    {
      type: "Material",
      authors: "Kirsch, C., Morys, N., Quintus, A., Letsch, J. with Asgari, M., Nickel, S., Bratož, S., Pirih, A. and vom Brocke, C.",
      year: "2024",
      title: "Theoretical framework, pedagogical approach and development of project methodology. AGENTIVE Erasmus+.",
      publisher: "University of Luxembourg",
      link: "#"
    }
  ];

  const conferences = [
    {
      title: "Early Literacy in German as a Foreign Language: Multilingual Interaction Strategies during Dialogic Reading",
      speaker: "Asgari, M.",
      event: "Multilingual Childhood Conference",
      location: "Luxemburg",
      date: "12.–13.05.2025"
    },
    {
      title: "Fostering Early Multilingualism through Interactive Reading: Design and Evaluation of an Approach using Multilingual Scripts",
      speaker: "vom Brocke, C.",
      event: "Multilingual Childhood Conference",
      location: "Luxemburg",
      date: "12.–13.05.2025"
    },
    {
      title: "Fostering Children’s Linguistic and Cultural Awareness: Evaluation of a Multilingual Kindergarten Model in Slovenia",
      speaker: "Bratoz, S., Pirih, A., Žefran, M.",
      event: "Multilingual Childhood Conference",
      location: "Luxemburg",
      date: "12.–13.05.2025"
    },
    {
      title: "Language Separation in a Multilingual Society: School Tracks and Classroom Discourse in South Tyrol",
      speaker: "Asgari, M.",
      event: "Interdisciplinary Workshop on Multilingual Education",
      location: "South Tyrol",
      date: "17.10.2025"
    },
    {
      title: "Project AGENTIVE",
      speaker: "Pirih, A.",
      event: "Innovation. Period. — University of Primorska & Center for Development and Knowledge Transfer",
      location: "Koper, Slovenia",
      date: "11.11.2025"
    },
    {
      title: "Communities of Practice: Teacher-Researcher Collaborations",
      speaker: "Asgari, M. & Zanin, R.",
      event: "CARN Conference — Digitalization, Social Justice, and Transforming Societies",
      location: "Klagenfurt, Austria",
      date: "12.–15.11.2025"
    },
    {
      title: "Project AGENTIVE: Vseživljenjsko učenje kot temelj trajnostne družbe",
      speaker: "Pirih, A.",
      event: "University of Primorska, SLODRE, University of Kragujevac & University of Banja Luka",
      location: "Koper, Slovenia",
      date: "21.11.2025"
    },
    {
      title: "Multilingualism as Multiple Monolingualisms: An Analysis of Language-related Ethnocentric Metaphors in Media Discourse",
      speaker: "Asgari, M. & Thorne, S.",
      event: "Conference of the American Association for Applied Linguistics (AAAL)",
      location: "Chicago, USA",
      date: "21.–24.03.2026"
    },
    {
      title: "The AGENTIVE Project: Theoretical and Pedagogical Perspectives",
      speaker: "Kirsch, C.",
      event: "Department of Early Childhood Education and Care, International Hellenic University",
      location: "Thessaloniki, Greece",
      date: "01.04.2026"
    },
    {
      title: "Die Auswirkungen von Überzeugungen von Lehrpersonen zu Mehrsprachigkeit mit digitaler Kompetenz und Technologieakzeptanz auf die Umsetzung mehrsprachiger Aktivitäten im Kindergarten",
      speaker: "Asgari, M.",
      event: "Gesamtsprachliche Bildung im Fokus (voXmi Bundestagung und Vernetzungstreffen)",
      location: "Vienna, Austria",
      date: "24.–25.04.2026"
    },
    {
      title: "Partizipation der Kinder im AGENTIVE Projekt",
      speaker: "Kirsch, C.",
      event: "Welterfahrungen von Kindern in der Kita",
      location: "Universität Tübingen, Germany",
      date: "11.05.2026"
    },
    {
      title: "Unlocking Agency: Conditions for Implementing Learning Materials",
      speaker: "Kirsch, C.",
      event: "Multilingualism in superdiverse schools",
      location: "Goldsmiths College, University of London, UK",
      date: "02.06.2026"
    },
    {
      title: "Language education in ECE in Luxembourg: multiple languages, aims and approaches",
      speaker: "Kirsch, C.",
      event: "ELLRA Conference — Exploring Multilingualism and Diversity in Formal Early Language Learning Contexts",
      location: "Barcelona, Spain",
      date: "03.–05.06.2026"
    },
    {
      title: "Education students’ attitudes and beliefs towards multilingualism in the school environment",
      speaker: "Pirih, A., Bratoz, M., Rutar, S., Umer, M.",
      event: "ELLRA Conference — Exploring Multilingualism and Diversity in Formal Early Language Learning Contexts",
      location: "Barcelona, Spain",
      date: "03.–05.06.2026"
    },
    {
      title: "Designing Open Access Platforms for Multilingual Language Awareness in Early Childhood Education",
      speaker: "Burger, M., Kloth, K. & vom Brocke, C.",
      event: "International Conference on Design Science Research in Information Systems and Technology (DESRIST)",
      location: "Münster, Germany",
      date: "08.–10.06.2026"
    },
    {
      title: "Mediating Early Literacy in Multilingual Contexts: A Sociomaterial Perspective on Digital Tools and Teacher Practices",
      speaker: "Asgari, M.",
      event: "ARLE / IFTE 2026 — Barcelona 2026 “The Unbounded Journey”",
      location: "Barcelona, Spain",
      date: "25.–27.06.2026"
    },
    {
      title: "Evaluating the scalability of an open educational resource set through a design perspective",
      speaker: "Skowron, A., Oikonomou, S., Zourou, K.",
      event: "EDULEARN26 Conference",
      location: "Forthcoming / Accepted",
      date: "July 2026"
    },
    {
      title: "Digital Storytelling to promote Multilingual Competence in Preschools in Luxembourg",
      speaker: "Kirsch, C.",
      event: "ECER",
      location: "Tampere, Finland",
      date: "18.–21.08.2026"
    },
    {
      title: "Supporting Educator Agency in Multilingual Preschool Settings: A Qualitative Study",
      speaker: "Pirih, A., Bratož, S., Rutar, S., & Umer, M.",
      event: "ECER",
      location: "Tampere, Finland",
      date: "18.–21.08.2026"
    },
    {
      title: "Teachers’, students’, and parents’ perspectives on the multilingual AGENTIVE materials",
      speaker: "Kirsch, C., Morys, N., Letsch, J., Dording, C., Quintus, A.",
      event: "Expert meeting — Tonga schools: Bridging the communication between plurilingual families and schools",
      location: "Lille, France",
      date: "22.09.2026"
    }
  ];

  return (
    <div className="container mx-auto py-12 px-8 max-w-5xl bg-gray-50">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-[#1a365d] mb-10 border-l-8 border-[#1a365d] pl-6">
        Publications and Activities
      </h1>

      {/* Expert Voices Header Image */}
      <img
        src="/images/ResearchImages/ExpertVoices.jpg"
        alt="Expert Voices"
        className="w-full h-48 object-cover rounded-xl mb-8 shadow-sm"
      />

      {/* Voices of Experts Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#1a365d] mb-8 flex items-center">
          <User className="mr-2 text-blue-600" /> Voices of Experts
        </h2>

        <div className="space-y-10">
          {/* Expert 1: Svetlana Jakimovska */}
          <div className="flex flex-col md:flex-row gap-6 border-b pb-8 border-gray-100">
            <div className="md:w-1/3">
              <p className="font-bold text-[#1a365d] text-base">Prof. Svetlana Jakimovska</p>
              <p className="text-xs text-gray-500 italic mt-1">
                Professor of Philology, University Goce Delcev, Stip, North Macedonia
              </p>
            </div>
            <div className="md:w-2/3 text-sm text-gray-700 space-y-3 bg-gray-50 p-4 rounded-lg flex-1 border-l-4 border-purple-500">
              <p className="italic">"Teachers and pre-service teachers in Macedonia are likely to show strong interest in this type of intercultural project, as it offers practical, classroom-ready materials that support early language learning and cultural awareness. This is particularly relevant in the local context, where many kindergartens include children from different nationalities, such as Macedonian, Albanian, and Turkish backgrounds, creating naturally multilingual and multicultural environments. In addition, there are also institutions and programs with English- or French-speaking components, which further increases the need for materials that support intercultural and language-sensitive pedagogy."</p>
              <p className="italic">"Intercultural education for children aged 4–6 plays a key role in developing early cultural awareness because at this stage, exposure to different languages fosters curiosity and openness, allowing children to perceive linguistic diversity as natural and enriching. This is particularly significant because early childhood is a period of high phonetic openness, when children are still highly receptive to new sounds before full perceptual narrowing occurs. From a translation studies perspective, this is also relevant, as adult translators may sometimes unconsciously privilege dominant cultures in their choices; early sensitivity to cultural and linguistic diversity can help counterbalance such tendencies by fostering more inclusive and attentive attitudes from a young age. The use of Esperanto is an excellent idea, as it combines elements that children will recognize with new elements they will be encouraged to explore and understand."</p>
            </div>
          </div>

          {/* Expert 2: Isaak Papadopoulos */}
          <div className="flex flex-col md:flex-row gap-6 border-b pb-8 border-gray-100">
            <div className="md:w-1/3">
              <p className="font-bold text-[#1a365d] text-base">Prof. Isaak Papadopoulos</p>
              <p className="text-xs text-gray-500 italic mt-1">
                Assistant Professor, Dept. of Early Childhood Education and Care, International Hellenic University, Greece
              </p>
            </div>
            <div className="md:w-2/3 text-sm italic text-gray-700 bg-gray-50 p-4 rounded-lg flex-1 border-l-4 border-blue-500">
              "The AGENTIVE project offers a highly valuable and timely contribution to early childhood education by addressing the need for high-quality multilingual resources. The combination of well-designed stories in multiple languages and a rich set of activities effectively supports the development of plurilingual competence, early literacy, and intercultural understanding in meaningful and engaging ways."
            </div>
          </div>

          {/* Expert 3: Marina Mattheoudakis */}
          <div className="flex flex-col md:flex-row gap-6 border-b pb-8 border-gray-100">
            <div className="md:w-1/3">
              <p className="font-bold text-[#1a365d] text-base">Prof. Marina Mattheoudakis</p>
              <p className="text-xs text-gray-500 italic mt-1">
                Professor, Dept. of Theoretical and Applied Linguistics, Aristotle University of Thessaloniki, Greece
              </p>
            </div>
            <div className="md:w-2/3 text-sm text-gray-700 space-y-2 bg-gray-50 p-4 rounded-lg flex-1 border-l-4 border-indigo-500">
              <p className="italic">"The AGENTIVE project stands out as an inspiring and forward-thinking EU-funded Erasmus+ initiative that truly empowers Early Childhood Educators and caregivers. What makes it especially impressive is its strong evidence-based foundation, ensuring that its tools are not only innovative but also pedagogically sound. It goes beyond simple language teaching by actively promoting linguistic diversity and plurilingualism, which is both timely and impactful. It is an exceptionally valuable resource for teachers of young learners, offering meaningful support for professional development while also fostering rich collaboration between educators and university researchers. Ι particularly liked the way it connects early literacy with long-term academic success, while at the same time embracing the cultural and social dimensions of multilingualism. The variety of activities—stories, songs, and discussions—adds a dynamic and engaging dimension, making the materials feel immediately usable and highly relevant for real classroom contexts. Overall, the project combines theory and practice in a way that is both accessible and exciting, making it a powerful tool for modern early language education."</p>
            </div>
          </div>

          {/* Expert 4: Silvia Melo-Pfeifer */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <p className="font-bold text-[#1a365d] text-base">Prof. Silvia Melo-Pfeifer</p>
              <p className="text-xs text-gray-500 italic mt-1">
                Professor in Romance Language Education, University of Hamburg, Germany
              </p>
            </div>
            <div className="md:w-2/3 text-sm italic text-gray-700 bg-gray-50 p-4 rounded-lg flex-1 border-l-4 border-teal-500">
              "Un projet cohérent, qui s'appuie sur des recherches en matière de développement linguistique, cognitif et affectif chez l'enfant, et qui (re)crée un univers imaginaire plurilingue et multimodal pour les tout-petits ! Les enfants, les éducateurs et les familles vont tous vouloir rencontrer Bobba."
            </div>
          </div>
        </div>
      </section>

      {/* Voices of Users Section */}
      <section className="mb-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#1a365d] mb-6 flex items-center">
          <Users className="mr-2 text-teal-600" /> Voices of AGENTIVE Users
        </h2>

        <div className="space-y-6">
          {/* Luxembourg */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="font-bold text-gray-800 border-b pb-1 mb-3 text-sm uppercase tracking-wide text-blue-700">Luxembourg: The voice of BScE students</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs italic text-gray-600">
              <p className="bg-white p-3 rounded shadow-xs md:col-span-2">"I like the materials as they can be used in many languages and promote both language awareness and intercultural awareness. I particularly like that materials are flexible and that they can be adapted with ease to children’s language competences. They can be used in Years 1, 2 and in reception courses. I find the visual elements particularly helpful. When children do not master the language yet, they can nevertheless understand and participate in class. This promotes active participation and supports communication between children."</p>
              <p className="bg-white p-3 rounded shadow-xs">"I like the fact that as a teacher you get an idea of how to promote multilingualism, even if you may not implement the tasks as they are presented on the website one-to-one; you can still be inspired by them."</p>
              <p className="bg-white p-3 rounded shadow-xs">"I like that you can choose whether to have the story read to you or read it yourself."</p>
              <p className="bg-white p-3 rounded shadow-xs">"I like the wide range of languages."</p>
              <p className="bg-white p-3 rounded shadow-xs">"I particularly liked the ideas and the framework as well as the content of the stories. The suggestions for the various activities."</p>
              <p className="bg-white p-3 rounded shadow-xs md:col-span-2">"The website is well-organised. Everything can be downloaded in case there is not internet."</p>
            </div>
          </div>

          {/* Slovenia */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="font-bold text-gray-800 border-b pb-1 mb-3 text-sm uppercase tracking-wide text-teal-700">Slovenia: The voice of pre-service teachers</h3>
            <div className="space-y-3 text-xs text-gray-600">
              <p className="italic bg-white p-3 rounded shadow-xs">"The materials and activities support the development of language skills, foster an understanding of different cultures, and encourage a positive attitude toward learning foreign languages. The combination of storytelling, movement, play, and creative art activities enables holistic learning."</p>
              <p className="italic bg-white p-3 rounded shadow-xs">"I see the main strengths of the materials and activities in their age-appropriateness, their encouragement of active participation, and their support for language development, comprehension, and critical thinking. The materials were engaging and appealing to the children, while the activities enabled the inclusion of children with different abilities."</p>
              <p className="italic bg-white p-3 rounded shadow-xs">"The children responded very positively to the materials and showed great interest throughout the activities. They were especially engaged by listening to the same story in different languages. They thoroughly enjoyed the movement-based activities and expressing words through gestures. I was surprised by how quickly the children began to use foreign-language words spontaneously during play. For example, during free play, one child used the word “sleep” together with the sleeping gesture, and then independently added the Slovenian word “spati”. This shows that the children were already transferring newly acquired knowledge into spontaneous communication."</p>
              <p className="italic bg-white p-3 rounded shadow-xs">"The children participated actively by answering questions, completing parts of the story, and commenting on the events shown in the illustrations. They often suggested what might happen next and connected the story to their own experiences. For instance, when looking at a picture of the characters preparing for their evening routine, one child said: “I brush my teeth in the evening too, and then I go to sleep, just like Olivia.” This demonstrated both an understanding of the story and the ability to relate it to their own daily life."</p>
              <p className="italic bg-white p-3 rounded shadow-xs">"The materials are excellent!"</p>
            </div>
          </div>

          {/* Greece */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="font-bold text-gray-800 border-b pb-1 mb-3 text-sm uppercase tracking-wide text-indigo-700">Greece: BA and PhD students (ECEC Dept, International Hellenic University)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600">
              <div className="bg-white p-3 rounded shadow-xs">
                <span className="font-bold text-gray-700 block mb-1">Chrysi Chrysouli, BA student:</span>
                <span className="italic">"The AGENTIVE project stands out as a meaningful and practical resource for supporting multilingualism in early childhood education. As a student researching this field, I found the combination of multilingual stories and interactive activities particularly valuable in promoting language awareness, inclusion, and early literacy in a way that is engaging for young children."</span>
              </div>
              <div className="bg-white p-3 rounded shadow-xs">
                <span className="font-bold text-gray-700 block mb-1">Maria Karvouniari, BA student:</span>
                <span className="italic">"The AGENTIVE stories offer a refreshing and contemporary representation of the child, portraying children as active participants in meaningful, culturally diverse contexts. From the perspective of my research on children’s representation in tales, I found the narratives particularly valuable for their inclusivity, authenticity, and their ability to engage young learners while supporting multilingual and early literacy development."</span>
              </div>
              <div className="bg-white p-3 rounded shadow-xs">
                <span className="font-bold text-gray-700 block mb-1">Matina Keppesidou, BA student:</span>
                <span className="italic">"The AGENTIVE project provides rich opportunities to support emerging writing in early childhood through its engaging stories and thoughtfully designed activities. From the perspective of my research, I found the materials particularly valuable in fostering children’s early literacy skills, encouraging expression, and creating meaningful contexts where writing can develop alongside oral language in multilingual settings."</span>
              </div>
              <div className="bg-white p-3 rounded shadow-xs">
                <span className="font-bold text-gray-700 block mb-1">Kiki Karapanagiotidou, BA student:</span>
                <span className="italic">"The AGENTIVE project offers a rich and engaging environment for supporting vocabulary development in early childhood education. Through its multilingual stories and interactive activities, children are exposed to meaningful language in context, which is essential for deepening word knowledge and promoting language growth across different languages."</span>
              </div>
              <div className="bg-white p-3 rounded shadow-xs">
                <span className="font-bold text-gray-700 block mb-1">Dimitra Dalampira, BA student:</span>
                <span className="italic">"The AGENTIVE project offers rich opportunities to explore language use in meaningful contexts, particularly through the interactive and dialogic nature of its stories. From the perspective of my research on speech acts, I found the materials especially valuable in encouraging children to actively use language for communication, express intentions, and engage in authentic dialogue within multilingual settings."</span>
              </div>
              <div className="bg-white p-3 rounded shadow-xs">
                <span className="font-bold text-gray-700 block mb-1">Maria-Eleni Bourogianni, PhD student:</span>
                <span className="italic">"The AGENTIVE project offers a well-grounded pedagogical approach to supporting emerging literacy within a multilingual framework. From a research perspective, I found the integration of dialogic reading and structured activities particularly valuable, as it fosters children’s active engagement, language awareness, and the development of early literacy skills in meaningful and inclusive learning environments."</span>
              </div>
            </div>
          </div>

          {/* Parents */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="font-bold text-gray-800 border-b pb-1 mb-3 text-sm uppercase tracking-wide text-purple-700">Parents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs italic text-gray-600">
              <p className="bg-white p-3 rounded shadow-xs">"I especially liked the printed pages and the shapes (of the characters) which could be positioned by choice of the child (Luxembourg)"</p>
              <p className="bg-white p-3 rounded shadow-xs">"I especially liked discovering a new source I could use with my kids to develop language through storytelling. Also, great to have these 'blank spaces' that leave space for each one of us to add our own experience and culture. Thank you! (Luxembourg)"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications & Materials Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-[#1a365d]">Publications & Materials</h2>
            <div className="h-px flex-grow bg-gray-200"></div>
        </div>

        <img
          src="/images/ResearchImages/Publications.jpg"
          alt="Publications Header"
          className="w-full h-48 object-cover rounded-xl mb-8 shadow-sm"
        />

        {/* Sub-Section: Publications */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#1a365d] mb-4 pl-1 border-b pb-2 border-gray-200">Publications</h3>
          <div className="space-y-4">
            {publications.map((pub, i) => (
              <div key={i} className="bg-white p-6 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500 mb-1">{pub.authors} ({pub.year})</p>
                <h4 className="font-bold text-lg text-[#1a365d] mb-2">{pub.title}</h4>
                <p className="text-sm font-medium italic text-gray-600">{pub.publisher}</p>
                {pub.doi && (
                  <p className="text-xs text-blue-600 mt-2">
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      DOI: {pub.doi}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Section: Materials */}
        <div>
          <h3 className="text-xl font-bold text-[#1a365d] mb-4 pl-1 border-b pb-2 border-gray-200">Materials</h3>
          <div className="space-y-4">
            {materials.map((mat, i) => (
              <div key={i} className="bg-white p-6 border-l-4 border-teal-500 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500 mb-1">{mat.authors} ({mat.year})</p>
                <h4 className="font-bold text-lg text-[#1a365d] mb-2">{mat.title}</h4>
                <p className="text-sm font-medium italic text-gray-600">{mat.publisher}</p>
                {mat.link && mat.link !== "#" && (
                  <p className="text-xs text-teal-600 mt-2 truncate">
                    <a href={mat.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {mat.link}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conferences Section */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-[#1a365d]">Conferences & Workshops</h2>
            <div className="h-px flex-grow bg-gray-200"></div>
        </div>
        <img
          src="/images/ResearchImages/Conferences.jpg"
          alt="Conferences Illustration"
          className="w-full h-56 object-cover rounded-xl mb-8 shadow-sm"
        />
        <div className="grid grid-cols-1 gap-6">
          {conferences.map((conf, i) => (
            <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-lg border border-gray-100 shadow-xs">
              <div className="bg-blue-100 p-3 rounded-full text-blue-700 shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#1a365d] leading-snug">{conf.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{conf.speaker} — <span className="italic">{conf.event}</span></p>
                <div className="flex items-center text-xs text-gray-400 mt-2">
                  <MapPin size={12} className="mr-1" /> {conf.location} <span className="mx-2">|</span> {conf.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}