import Image from 'next/image'

export default function LearningMaterial() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/images/Slide3.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="contain"
        className="w-full h-full object-contain filter blur-sm"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h1 className="text-3xl font-bold text-red-700 mb-4">Still in Progress - Stay tuned</h1>
          <p className="text-red-700">
            Welcome to our learning material section. Here you will soon find a variety of resources to help you on your educational journey.
          </p>
        </div>
      </div>
    </div>
  )
}