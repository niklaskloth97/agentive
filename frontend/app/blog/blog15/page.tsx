import Image from "next/image";

export default function EltereschoulEventBlog() {
  return (
    <div className="container mx-auto py-12 px-8 max-w-4xl">
      {/* Article Header */}
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
          Project Introduction: Eltereschoul Event
        </h1>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          April 2, 2026
        </p>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden shadow-md">
        <Image
          src="/images/blogThumbnails/blog15/EltSch1.jpg"
          alt="Eltereschoul Event Presentation"
          fill
          sizes="(max-width: 1200px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
        <p className="mb-6">
          We began the month of April by introducing the AGENTIVE project to a team of interested professionals!
          On 2nd of April 2026, we had the pleasure to be invited by the Eltereschoul, a “school for parents” in Esch.
          The Eltereschoul works closely with municipalities, schools and day care centers, and interacts with parents
          to discuss all matters related to education and family. The institution has six regional branches in
          Esch/Alzette, Luxembourg-Belair, Clervaux, and Remich.
        </p>

        <p className="mb-6">
          Dr. Claudine Kirsch presented the AGENTIVE platform and materials to their team of educators, who later
          engaged in a fruitful discussion on the possible ways to introduce these materials in their work with
          parents. They manifested a real need for these resources and suggested some stimulating ideas!
        </p>
      </article>
    </div>
  );
}