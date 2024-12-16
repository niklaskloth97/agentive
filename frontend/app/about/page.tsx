import Image from 'next/image'

export default function About() {
  return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">About AGENTIVE</h1>
        <h2 className="text-xl font-semibold mb-4"> Stimulating Multilingual Learning in Early Childhood Education </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* <div className="md:w-1/2">
            <Image src="/placeholder.svg" alt="About AGENTIVE" width={500} height={300} className="rounded-lg mb-4" />
          </div> */}
          <div /*className="md:w-1/2"*/>
            <h2 className="text-m font-semibold mb-4">Our Vision: Promoting Multilingualism in Early Childhood</h2>
            <p className="text-gray-600 mb-4">
            In the world – not just in Europe - where multiple languages coexist and shape today's societies, AGENTIVE aims to equip children with the tools to navigate and thrive in multilingual environments. Current research highlights the cognitive, social, and academic benefits of multilingualism, particularly when introduced early in life. AGENTIVE seeks to bridge the gap in early childhood language education by providing accessible, evidence-based resources to support multilingual literacy development. 
            </p>
            <h2 className="text-m font-semibold mb-4">An EU-Funded Erasmus+ Initiative </h2>
            <p className="text-gray-600 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2 className="text-m font-semibold mb-4">An EU-Funded Erasmus+ Initiative </h2>
            <p className="text-gray-600 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2 className="text-m font-semibold mb-4">An EU-Funded Erasmus+ Initiative </h2>
            <p className="text-gray-600 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2 className="text-m font-semibold mb-4">An EU-Funded Erasmus+ Initiative </h2>
            <p className="text-gray-600 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2 className="text-m font-semibold mb-4">An EU-Funded Erasmus+ Initiative </h2>
            <p className="text-gray-600 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
   
  )
}