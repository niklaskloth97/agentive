
import Image from 'next/image'

export default function LearningMaterial() {
  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Learning Material</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image src="/placeholder.svg" alt="Learning Material" width={400} height={300} className="rounded-lg mb-4" />
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Introduction to Machine Learning</li>
              <li>Advanced Web Development</li>
              <li>Data Structures and Algorithms</li>
              <li>Digital Marketing Fundamentals</li>
            </ul>
          </div>
        </div>
      </div>
  )
}