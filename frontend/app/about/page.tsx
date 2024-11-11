import Image from 'next/image'

export default function About() {
  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About AGENTIVE</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Image src="/placeholder.svg" alt="About AGENTIVE" width={500} height={300} className="rounded-lg mb-4" />
          </div>
          <div className="md:w-1/2">
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
   
  )
}