export default function Home() {
  return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to AGENTIVE</h1>
        <p className="text-gray-600">
          This is the home page of our educational platform. Here you can find the latest learning materials and updates about our platform.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Material</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Multilingual Dino Story</li>
            <li>A pirate story</li>
          </ul>
        </div>
      </div>
  )
}