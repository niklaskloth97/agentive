import Image from "next/image";

export default function BsceEventBlog() {
  return (
    <div className="container mx-auto py-12 px-8 max-w-4xl">
      {/* Article Header */}
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
          Connecting with Higher Education: The BScE Event
        </h1>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
          April 7, 2026
        </p>
      </header>

      {/* Article Content */}
      <article className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
        <p className="mb-6">
          On 7th of April 2026, Jeanne Letsch presented the AGENTIVE project to a group of lecturers of the school
          practice office at the University of Luxembourg who organize internships for students of the Bachelor in
          Educational Sciences (BScE). Every student needs to do at least one school practice in a preschool.
        </p>

        <p className="mb-6">
          The lecturers found the materials highly relevant and useful for aspiring teachers who often lack multilingual
          materials and are uncertain about effective ways of drawing on children’s home languages in the classroom.
          The team appreciated the number of translations and the fact that our stories are bilingual. If the school
          practice office can help us familiarize students with the AGENTIVE resources and if students use our materials
          on school practice, the BScE acts as a multiplier for the project.
        </p>
      </article>
    </div>
  );
}