import Image from 'next/image'
export default function Team() {
  const teamData = [
    { university: 'University of Luxemburg', members: [
      {name: 'Claudine Kirsch', role: 'Project Manager', image: '/images/people/Claudine_Kirsch.webp' },
      {name: 'Nancy Morys', role: 'Language Education', image: '/images/people/Nancy_MORYS.webp' },
      {name: 'Carole  Dording', role: 'Language Education', image: '/images/people/Carole_Dording.webp' },
    ],},

    { university: 'University of Muenster', members: [
      { name: 'Jan vom Brocke', role: 'Platform Innovator', image: '/images/people/jan-vom-brocke.jpg' },
      { name: 'Niklas Kloth', role: 'Platform Development', image: '/images/people/niklas-kloth.webp' },
      { name: 'Mara Burger', role: 'Platform Coordination', image: '/images/people/Mara_Burger.webp' },
    ],},

    { university: 'University of Teacher Education of Grisons', members: [
      { name: 'Christina vom Brocke', role: 'Multilingual Education', image: '/images/people/tine-vom-brocke2.webp' },
    ],},

    { university: 'University Bozen', members: [
      { name: 'Marjan Asgari', role: 'Educational Material Design', image: '/images/people/Asgari Marjan.webp' },
      { name: 'Yasmine Azza', role: 'Psychological Development of Eudcation Material', image: '/images/people/Yasmine_Azza.png' },
    ]
    },

    { university: 'University of Primorska', members: [
      { name: 'Anja Pirih', role: 'Foreign Language Education', image: '/images/people/Anja_Pirih.webp' },
      { name: 'Mija Umer', role: 'Educational Design', image: '/images/people/Mija_Umer.jpeg' },
      { name: 'Mojca Žefran', role: 'Educational Design', image: '/images/people/Mojca_Žefran.png' },
      { name: 'Sonja Rutar', role: 'Preliteracy Language Development', image: '/images/people/Sonja_Rutar.webp' },
      { name: 'Silva Bratož', role: 'Plurilingual Competencies', image: '/images/people/Silva_Bratož.PNG' },
    ],
    },
    { university: 'Web2Learn', members: [
      { name: 'Katerina Zourou', role: 'Open Language Education', image: '/images/people/Katerina-Zourou.png'},
      { name: 'Konstantia Liouza', role: 'Open Language Education', image: 'placeholder.svg'}, 
      { name: 'Stefania Oikonomou', role: 'Open Language Education', image: '/images/people/Stefania Oikonomou.png'}, 
      { name: 'Claire Fragkiadaki', role: 'Open Language Education', image: '/images/people/Claire-Fragkiadaki.png'}, 
    ],
    },
  ]


  const partnerUniversities = [
    { name: 'Univeristy of Luxembourg', role: 'Project Mangement & Educational Development', image: '/images/universities/university-luxembourg-nobseline - full.svg' },
    { name: 'Univeristy of Muenster', role: 'Platform Development', image: '/images/universities/unims.svg' },
    { name: 'University of Teacher Education of Grisons ', role: 'Educational Material & Concept', image: '/images/universities/Logo-phgr.svg' },
    { name: 'University Bozen', role: 'Educational Material & Concept', image: 'images/universities/bozen.svg' },
    { name: 'University of Primorska ', role: 'Educational Material & Concept', image: '/images/universities/primorska.png' },
    { name: 'Web2Learn', role: 'Open Educational Resources', image: '/images/universities/w2l_logo.png' },
  ]

  return (
      <div className="container py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">The Team</h1>
        <h2 className="text-xl mb-8">The AGENTIVE project is made possible by:</h2>
          {teamData.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">{group.university}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {group.members.map((member, memberIndex) => (
                <div key={memberIndex} className="text-center">
              <Image src={member.image} alt={member.name} width={200} height={200} className="rounded-full border-4 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
        </div>
      ))}
   
        <h1 className="text-3xl font-bold mb-6 py-16">Partner Universities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnerUniversities.map((member, index) => (
            <div key={index} className="text-center">
              <div className="h-48 flex items-center justify-center">
                <Image src={member.image} alt={member.name} width={200} height={200} className="mx-auto mb-4 object-contain" />
              </div>
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
  )
}