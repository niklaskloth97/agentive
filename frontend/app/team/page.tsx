import Image from 'next/image'

export default function Team() {


  const teamMembers = [
    { name: 'Claudine Kirsch', role: 'Project Manager', image: '/images/claudine-kirsch.JPG' },
    { name: 'Niklas Kloth', role: 'Platform Development', image: '/images/niklas-kloth.JPG' },
    { name: 'Mike Johnson', role: 'Lead Developer', image: '/placeholder.svg' },
    { name: 'Sarah Brown', role: 'UX Designer', image: '/placeholder.svg' },
  ]
  const partnerUniversities = [
    { name: 'Univeristy of ', role: 'CEO', image: '/placeholder.svg' },
    { name: 'Jane Smith', role: 'CTO', image: '/placeholder.svg' },
    { name: 'Mike Johnson', role: 'Lead Developer', image: '/placeholder.svg' },
    { name: 'Sarah Brown', role: 'UX Designer', image: '/placeholder.svg' },
  ]

  return (
      <div className="container py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">The Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Image src={member.image} alt={member.name} width={200} height={200} className="rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-6 py-16">Partner Universities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnerUniversities.map((member, index) => (
            <div key={index} className="text-center">
              <Image src={member.image} alt={member.name} width={200} height={200} className="rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
  )
}