import Image from "next/image";

export default function About() {
  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="text-3xl font-bold mb-6">Meet Bobba!</h1>

      <h2 className="text-xl font-semibold mb-4">
        Meet Bobba, the friendly alien visiting from Space and accompany him on his multilingual language learning journey!
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Image section */}
        <div className="md:w-1/2">
          <Image
            src="/learning-material/story-1/story-en/Story1_title_E.webp"          // path to your image in the public/ directory
            alt="Bobba the alien"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Text section */}
        <div className="md:w-1/2">
          <p className="text-gray-600 mb-6 dark:text-white">
            This is Bobba in his spaceship! He comes from a planet far, far away. His biggest dream is to come to Earth! And he is about to arrive!
            Read up on his visit to Earth in the eight stories available on the AGENTIVE Platform!
          </p>
        </div>
      </div>
    </div>
  );
}