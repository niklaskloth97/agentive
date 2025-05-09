import Image from 'next/image';
import VisionCard from "@/components/VisionCard";
import FlexSectionWithButton from "@/components/FlexSectionWithButton";
import HeroSection from '@/components/HeroSection';



const visionItems = [
  { title: "This website is just the beginning - think of it as a sneak peek into what is to come.", color: "text-primary", description: "AGENTIVE aims to create resources that celebrate linguistic diversity and enable teachers to create inclusive learning opportunities where children develop multilingual competence." },
  { title: "Rich source of materials", color: "text-accent", description: "Our materials will be openly available, enabling teachers and parents to adapt and share them freely." },
  { title: "Continuous development", color: "text-ring", description: "Stay tuned as we develop and release these exciting resources in the coming months!" }
];

export default function AgentivePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title="Welcome to AGENTIVE" 
        subtitle="A Multilingual Education Initiative" 
        backgroundImage="/hero.webp" 
        height={400} 
        overlayBrightness="brightness-75"
        className="relative w-full h-[400px]"
      />

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
            <VisionCard 
              title="What can you expect?" 
              items={visionItems} 
            />

      {/* Who Are We? Section */}
            <FlexSectionWithButton 
              imageSrc="/who-we-are.jpg" 
              imageAlt="Who Are We?" 
              imageWidth={600} 
              imageHeight={400} 
              title="Who Are We?" 
              description="AGENTIVE involves universities and organizations from Luxembourg, Switzerland, Greece, Slovenia, Germany and Italy. Together, we are leveraging expertise across academia, schools, and businesses to drive innovation in multilingual education." 
              buttonLink="testing_about/about" 
              buttonText="Read more about Us"
              imagePosition='left' 
              variant='primary'
            />

      {/* Curious About the Team Section */}
            <FlexSectionWithButton 
                imageSrc="/team.jpg" 
                imageAlt="Curious About the Team?" 
                imageWidth={600} 
                imageHeight={400} 
                title="Curious About the Team Behind AGENTIVE?" 
                description="Our team is made up of passionate educators, teachers, and developers working together to make multilingual education accessible for everyone." 
                buttonLink="team" 
                buttonText="Check out our team"
                imagePosition='right' 
                variant='secondary'
                />
            
      {/* Follow Our Journey */}
            <FlexSectionWithButton
              imageSrc="/blog.jpg"
              imageAlt="Follow Our Journey"
              imageWidth={600}
              imageHeight={400}
              title="Follow Our Journey"
              description="From project milestones to insights about multilingualism, we’ll be sharing updates, reflections, and behind-the-scenes moments on our blog."
              buttonLink="blog"
              buttonText="Read the Latest Updates"
              imagePosition='left'
              variant='accent'
            />
              
        
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
