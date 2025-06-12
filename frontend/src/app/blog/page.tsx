import Image from 'next/image'
import Link from 'next/link'

export default function Blog() {
  const blogPosts = [
    { title: 'Kickoff - Enable Multilinguism', excerpt: 'We just started our journey. Learn about what we want to achive!', image: '/placeholder.svg', link: '/blog/blog1' },
    { title: 'Website going live', excerpt: 'We just launched the website you can see here. Learn more here', image: '/placeholder.svg', link: '/blog/blog2' }
  ]

  return (
      <div className="container mx-auto py-8 px-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
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
  )
}