import Image from "next/image";
import Link from "next/link";

export default function MilestoneBlog() {
  const languagesCount = 15;

  return (
    <div className="container mx-auto py-12 px-8 max-w-5xl">
      {/* Header Section */}
      <header className="text-center mb-12">

        <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-6">
          Bobba Speaks Your Language! 🌍
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          We&apos;ve just hit a major orbit: Bobba&apos;s stories are now available in 15 languages!

        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        {/* Image section */}
        <div className="md:w-1/2 group">
          <Image
            src="/learning-material/story-1/story-en/Story1_title_E.webp"
            alt="Bobba the alien celebrating"
            width={600}
            height={600}
            className="rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        {/* Text section */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Breaking the Language Barrier</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Bobba&apos;s journey from a planet far, far away just got a lot more accessible.
            To ensure every child can accompany him on his visit to Earth, we have expanded
            the AGENTIVE Platform to support 15 different languages from across the European continent.
         </p>
          <p>
              Language is the key to the stars. Now, Bobba can say &apos;Hello&apos; to almost everyone in Europe!
            </p>

        </div>
      </div>

      {/* Stats / Future Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-gray-100 dark:border-gray-800 pt-12">
        <div>
          <h3 className="text-4xl font-bold text-blue-600">15</h3>
          <p className="text-gray-500">Live Languages</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-600">8</h3>
          <p className="text-gray-500">Core Stories</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-600">∞</h3>
          <p className="text-gray-500">More to Come</p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-lg mb-6">This is just the beginning of our multilingual mission.</p>

        {/* Add your destination path in the href attribute below */}
        <Link href="/dashboard">
          <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
            Explore the Stories
          </button>
        </Link>
      </div>
    </div>
  );
}