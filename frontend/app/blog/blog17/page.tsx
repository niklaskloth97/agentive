import Image from "next/image";

export default function LittlePandaBlog() {
  // Array of 3 image paths for the Little Panda Education event
  const pandaImages = [
    '/images/blogThumbnails/blog17/IMG_3430.jpeg',
    '/images/blogThumbnails/blog17/IMG_3431.jpeg',
    '/images/blogThumbnails/blog17/IMG_3432.jpeg',
  ];

  return (
    <div className="container mx-auto py-12 px-8 max-w-4xl">
      {/* Article Header */}
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight text-gray-900 dark:text-white">
          Recording Chinese Stories Together with Little Panda Education
        </h1>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          April 28, 2026
        </p>
      </header>

      {/* Article Content */}
      <article className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-12 text-lg leading-relaxed">
        <p className="mb-6">
          On the 28th of April, we had the wonderful opportunity to collaborate with Little Panda Education
          for a Chinese story recording session. Founded by Sisi CLEES-YIN, Little Panda Education has been
          promoting interactive and joyful Chinese language learning in Luxembourg since 2018. Through
          creative workshops, storytelling, music and immersive activities, the school inspires children to
          discover the Chinese language and culture in a playful meaningful way.
        </p>

        <p className="mb-6">
          This philosophy closely aligns with AGENTIVE’s mission of supporting multilingual education through
          inclusive and engaging learning experiences for children all across Europe. During the recording session
          of the Bobba stories in Chinese, three children from the school stepped into the shoes of real storytellers.
          Even though it was their first experience in a podcast studio, they managed to approach the recordings
          with impressive concentration, enthusiasm and confidence.
        </p>

        <p className="mb-6">
          Isla, for example, shared how much she loved the Bobba character because he is an alien. The character
          reminded her of her favourite story about alien chickens visiting Earth. Even though the recording was
          challenging because Isla is still very young, she showed great patience and focus throughout the recording
          session. She told us that she enjoys listening to Bobba’s stories at home which made the experience of
          recording a story even more meaningful. Luis described the project simply but enthusiastically:
          <span className="italic"> &quot;I think recording books is a lot of fun, and I really enjoy participating in this project.&quot;</span>
        </p>

        <p className="mb-6">
          Fiona reflected on the broader impact of the recordings and the importance of widely sharing Chinese
          language stories with children: <span className="italic">&quot;I feel very happy to be able to record Chinese storybooks for
          children all over Europe, so that more children can listen to Chinese, and to know that Chinese is cool.&quot;</span>
          Even though it was difficult to keep completely quiet during the recording, Fiona too managed to stay
          focused and record her parts with great care.
        </p>

        <p className="mb-6">
          Reflecting on the collaboration, Sisi highlighted what makes this project truly groundbreaking. While
          storytelling is mostly done by native speakers, this partnership with AGENTIVE&apos;s Chinese version
          recording offered a unique opportunity for Little Panda&apos;s non-Chinese students to join the storytelling
          project, acting as young Chinese language ambassadors without being native speakers. The experience of
          stepping into the recording booth gave them immense positive reinforcement, and boosted their confidence
          in learning and speaking the learned language, Mandarin Chinese. More importantly, we hope it sets a
          good example for children across Europe to get inspired and encouraged to take a more active role in their
          multilingual learning journeys.
        </p>

        <p className="mb-6">
          The recording session reflects the heart of the project, to create inclusive and engaging multilingual
          resources that help children connect with different languages and cultures. By contributing their own
          voices, the children are helping other young listeners discover the beauty of the Chinese language, other
          languages such as Esperanto and storytelling. Their participation shows how multilingual education can be
          both educational and enjoyable at the same time. Ultimately, their positive energy and dedication made this recording session a memorable and inspiring experience.
        </p>
      </article>

      {/* Image Gallery Section */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Event Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pandaImages.map((src, index) => (
            <div
              key={index}
              className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Image
                src={src}
                alt={`Little Panda Education Recording Session Photo ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}