export default function About() {
  return (
    <div className="container mx-auto py-8 px-8">
            <h1 className="text-3xl font-bold mb-6  ">Welcome to AGENTIVE </h1>
      <h2 className="text-xl font-semibold "> Our &quot;Virtual Window&quot; to the Future of Multilingual Education </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* <div className="md:w-1/2">
          <Image src="/placeholder.svg" alt="About AGENTIVE" width={500} height={300} className="rounded-lg mb-4" />
        </div> */}
        <div /*className="md:w-1/2"*/>
          <p className="text-gray-600 mb-6 dark:text-white">
          We are thrilled to announce the go-live of the AGENTIVE website, your first glimpse into a transformative project designed to revolutionize multilingual education in early childhood. While this is just the beginning, our site serves as a &quot;virtual shop window&quot; showcasing what&apos;s to come. Unlike a traditional shop, however, everything we offer will be freely available, reflecting our commitment to open-source principles and accessibility for all.
          </p>
          <h2 className="text-m font-semibold "> A Platform for Open Education </h2>
          <div className="text-gray-600 mb-4 dark:text-white">
            <p className='mb-1'>At the heart of AGENTIVE is the principle of openness:</p>
            <ul className="list-disc ml-8">
                <li className="mb-1">
                    <p className='font-semibold dark:text-white'>	Open-Source Platform: 
                    </p>
                </li>
                 <p className = 'font-sembibold dark:text-white'> 
                    AGENTIVE is built on the philosophy that public projects funded by public money should provide public access. Our platform and code are open source, embracing the mantra &quot;public money, public code&quot;. 
                    </p>
                <li className="mb-1">
                    <p className='font-semibold dark:text-white'>	Open Licensing:
                    </p>
                 <p className = 'font-sembibold dark:text-white'> The materials we create will be available under an open-source license, such as a Creative Commons license, enabling educators, schools, and families to adapt and share resources. The specific licensing terms are still under discussion, but our focus remains on maximizing accessibility and collaboration.
                    </p>
                </li>
                <li className= "mb-1 dark:text-white">
                <p className = 'font-semibold dark:text-white'>  Accessibility in Mind: 
                    </p>
                </li>
                    <p className = 'font-sembibold dark:text-white'> AGENTIVE is built on the philosophy that public projects funded by public money should provide public access. Our platform and code are open source, embracing the mantra &quot;public money, public code&quot;. 
                    </p>
            </ul>
          </div>

          <h2 className="text-m font-semibold mb-2 "> A Glimpse of What&apos;s to Come </h2>
          <div className="text-gray-600 mb-4 dark:text-white">
            <p className='mb-1'>While our website is live, AGENTIVE is still in the early stages of development. Here&apos;s what to expect in the coming months:</p>
            <ul className="list-disc ml-8">
                <li className="mb-1 dark:text-white">
                    <p className='font-semibold dark:text-white'>	Open-Access Materials:
                    </p>
                </li>
                 <p className = 'font-sembibold dark:text-white'> 
                 Although the materials aren&apos;t ready yet, they will soon be added to the platform under open-source licenses. These resources will empower teachers, parents, and children to engage with multilingual education like never before.
                 </p>
                <li className="mb-1 dark:text-white">
                    <p className='font-semibold dark:text-white'>	Privacy-Preserving Analytics:
                    </p>
                 <p className = 'font-sembibold dark:text-white'> As we grow, understanding how our platform is used will be critical. We are exploring privacy-preserving analytics solutions to ensure we gather insights without compromising user privacy.

                 </p>
                </li>
                <li className= "mb-1 dark:text-white">
                <p className = 'font-semibold dark:text-white'> Continuous Platform Development:
                    </p>
                </li>
                    <p className = 'font-sembibold dark:text-white' > Our platform is designed to be flexible and extendable, ensuring we can adapt and improve over time as needs evolve.
                    </p>
            </ul>
          </div>
          <p className="text-gray-600 mb-4 dark:text-white">
          The AGENTIVE platform isn&apos;t just a website — it&apos;s a gateway to fostering multilingualism in early childhood education. By providing open-access resources built on a modern, accessible digital infrastructure, we aim to bridge gaps in multilingual education and offer tools that empower educators across Europe and beyond.
          </p>

          <p className="text-gray-600 mb-4 dark:text-white">
          We&apos;re excited to embark on this journey with you, and we look forward to sharing updates as AGENTIVE continues to grow. Keep exploring our site, and stay tuned for new developments, resources, and stories as we build the future of multilingual education together.
          </p>

        
          <h2 className="text-m font-semibold mb-2"> Our Platform Concept (For the Tech Enthusiasts here) </h2>
    
          <div className="text-gray-600 mb-4 dark:text-white">
            <p className='mb-1'>For those curious about the technical backbone of our platform, AGENTIVE is built using state-of-the-art tools and frameworks:</p>
            <ul className="list-disc ml-8">
                <li className="mb-1">
                    <p className='font-semibold'>	React + TypeScript:
                    </p>
                </li>
                 <p className = 'font-sembibold'> 
                 A modern and robust combination, ensuring our platform is efficient, scalable, and developer-friendly.
                 </p>
                <li className="mb-1">
                    <p className='font-semibold'>	ShadCN/UI for Design:
                    </p>
                 <p className = 'font-sembibold'> Leveraging the ShadCN/UI library, our website benefits from a coherent and sleek design that integrates seamlessly with existing solutions. This approach allows us to build on proven frameworks rather than reinventing the wheel.
                 </p>
                 </li>
            </ul>
          </div>
          </div>
      </div>
    </div>
  )
}