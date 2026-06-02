import Image from "next/image";

export default function FestivalMigrationsBlog() {
  // Array of 7 image paths for the Festival Migrations event
  const fdmImages = [
    '/images/blogThumbnails/blog14/FdM 1.jpeg',
    '/images/blogThumbnails/blog14/FdM 2.jpeg',
    '/images/blogThumbnails/blog14/FdM 3.jpeg',
    '/images/blogThumbnails/blog14/FdM 4.jpeg',
    '/images/blogThumbnails/blog14/FdM 5.jpeg',
    '/images/blogThumbnails/blog14/FdM 6.jpg',
    '/images/blogThumbnails/blog14/FdM 7.jpg',
  ];

  return (
    <div className="container mx-auto py-12 px-8 max-w-4xl">
      {/* Article Header */}
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
          Event Report: Festival Migrations, Cultures & Citoyenneté
        </h1>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          March 21, 2026
        </p>
      </header>

      {/* Article Content */}
      <article className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-12 text-lg leading-relaxed">
        <p className="mb-6">
          On the 21st of March we participated in the 43rd edition of the Festival Migrations, Cultures & Citoyenneté
          in the city of Luxembourg, where we were kindly hosted by the reading space &quot;Book On&quot;.
        </p>
        <p className="mb-6">
          Dr. Claudine Kirsch, together with three MA students – Laura Becker, Echefulachi Anyanwu and Giulia Puddinu –
          presented the AGENTIVE project to curious parents and children. We narrated the story <em>Celebrating Olivia’s Birthday</em>,
          using a small Kamishibaï theatre, and encouraged the parents and the children to use their home languages as a
          mediating resource. Following the interactive storytelling, parents were invited to engage in a multilingual
          conversation with their children while exploring a story-related activity.
        </p>
        <p className="mb-8">
          Afterwards we had the pleasure of continuing the conversation with parents on the topics of multilingual practices,
          early literacy and language learning.
        </p>
        <p className="font-semibold text-gray-800 dark:text-gray-200 border-l-4 border-blue-500 pl-4 my-6 italic">
          We send a warm thank you to everyone that participated and that made the event possible!
        </p>
      </article>

      {/* Image Gallery Section */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Event Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {fdmImages.map((src, index) => (
            <div
              key={index}
              className={`relative w-full h-56 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
                index === 6 ? 'sm:col-span-2 md:col-span-3 lg:col-span-1' : '' 
              }`}
            >
              <Image
                src={src}
                alt={`Festival Migrations, Cultures & Citoyenneté Photo ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority={index < 3} // Optimizes loading for top row images
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}