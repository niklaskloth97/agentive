import Image from 'next/image';

export default function AgentivePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[400px]">
        <Image 
          src="/hero.webp" 
          alt="AGENTIVE Banner" 
          layout="fill" 
          objectFit="cover" 
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Welcome to AGENTIVE</h1>
          <p className="text-4xl mt-2 drop-shadow-md">Boosting linguistic diversity in early childhood education through synergies </p>
          <a href="about" className="mt-4 inline-block bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700">More about us</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-6">
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">What Can You Expect?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p>This website is just the beginning - think of it as a sneak peek into what is to come. AGENTIVE aims to create resources that celebrate linguistic diversity and enable teachers to create inclusive learning opportunities where children develop multilingual competence.</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p>Our materials will be openly available, enabling teachers and parents to adapt and share them freely. </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p>Stay tuned as we develop and release these exciting resources in the coming months!</p>
            </div>
          </div>
        </section>

        {/* Who Are We? Section */}
        <section className="flex flex-col md:flex-row items-center mt-12">
          <div className="md:w-1/2">
            <Image src="/who-we-are.jpg" alt="Who Are We?" width={600} height={400} className="rounded-lg shadow-md"/>
          </div>
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-bold mb-4">Who Are We?</h2>
            <p>AGENTIVE involves universities and organizations from Luxembourg, Switzerland, Greece, Slovenia, Germany and Italy. Together, we are leveraging expertise across academia, schools, and businesses to drive innovation in multilingual education. </p>
            <a href="testing_about/about" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">About Us</a>
          </div>
        </section>

        {/* Curious About the Team Section */}
        <section className="flex flex-col md:flex-row-reverse items-center mt-12">
          <div className="md:w-1/2">
            <Image src="/team.jpg" alt="Curious About the Team?" width={600} height={400} className="rounded-lg shadow-md"/>
          </div>
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-bold mb-4">Curious About the Team Behind AGENTIVE?</h2>
            <p>Our team is made up of passionate educators, teachers, and developers working together to make multilingual education accessible for everyone.</p>
            <a href="team" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Check Out Our Team</a>
          </div>
        </section>

        {/* Follow Our Journey Section */}
        <section className="flex flex-col md:flex-row items-center mt-12">
          <div className="md:w-1/2">
            <Image src="/blog.jpg" alt="Follow Our Journey" width={600} height={400} className="rounded-lg shadow-md"/>
          </div>
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-bold mb-4">Follow Our Journey</h2>
            <p>From project milestones to insights about multilingualism, we’ll be sharing updates, reflections, and behind-the-scenes moments on our blog.</p>
            <a href="blog" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Read the Latest Updates</a>
          </div>
        </section>

        {/* Stay Tuned Section */}
        <section className="text-left mt-16">
          <h2 className="text-3xl font-bold mb-4">Stay Tuned!</h2>
          <p className="text-lg">AGENTIVE has started on 1st October 2024. In the coming months, we will design 8 pedagogical sets comprising stories in multiple languages and materials, which we will unveil in the Summer.</p>
          <p className="text-lg mt-2">Whether you’re a teacher, a parent, or simply curious about the world of multilingual education, there’s something here for you.</p>
        </section>
      </div>
    </>
  );
}
