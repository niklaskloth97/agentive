import { DashboardLayout } from "@/components/DashboardLayout"
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  const breadcrumbItems = [
    { label: "Multilingual Stories", href: "/dashboard" },
    { label: "Overview" }
  ];

  const learningmaterial = [
    { title: 'Daniel Dino goes on vacation', excerpt: 'Learning basic vocabulary', image: '/images/stories/dino-story/dino-adventure1.webp', link: '/blog/blog1' },
    { title: 'Paul Pirate explores foreign lands', excerpt: 'Dialogic reading about dealing with different cultures', image: '/images/stories/pirate-story/4.webp', link: '/blog/blog2' },
    { title: 'Monster at the hairdresser', excerpt: 'Dialogic reading about dealing with different cultures', image: '/images/stories/monster-story/monster.png', link: '/dashboard/multilingual-stories/a-monster-story' }
  ]

  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Multilingual Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningmaterial.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link href={post.link}>
               
                  <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover" />
               
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
                <Link className="mt-4 text-blue-600 hover:underline" href={post.link}>Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
