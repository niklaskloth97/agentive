import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto py-12 px-8 max-w-5xl">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Meet Bobba & Explore AGENTIVE</h1>
        <p className="text-lg text-gray-500 dark:text-gray-300">
          Bridging Multilingualism and Inclusive Early Childhood Education
        </p>
      </header>

      {/* OER Section */}
      <section className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl shadow-inner mb-16">
        <h2 className="text-2xl font-bold mb-6">Open Resources for Early Education</h2>
        <div className="prose prose-blue dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            How can open, digital resources support multilingual and inclusive learning from an early age? The AGENTIVE project responds to this question through its Open Educational Resources (OER)!
          </p>

          <p className="text-gray-600 dark:text-gray-300 mb-6">Explore the collection of OER in Early Childhood
            Education, including key features such as their degree of openness and thematic focus, by visiting the dedicated
            webpage. To deepen understanding on the degree of openness of ECE OER across countries and sectors in
            Europe, a dedicated study was carried out that screened and analysed 16 such resources. Within this
            research, the AGENTIVE OER were positioned as both innovative teaching tools and a reference model for
            openness and transferability. <br/><br/><br/><br/></p>

          <Link href="/oer" className="text-blue-600 font-medium hover:underline">
                Visit the OER Page &rarr;
              </Link>
        </div>
      </section>
    </div>
  );
}