import Layout from '@/components/layout'
import Image from 'next/image'

export default function Blog() {
  const blogPosts = [
    { title: 'The Future of Education', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', image: '/placeholder.svg' },
    { title: 'How AI is Changing Learning', excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...', image: '/placeholder.svg' },
    { title: 'The Importance of Lifelong Learning', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco...', image: '/placeholder.svg' },
  ]

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
                <button className="mt-4 text-blue-600 hover:underline">Read more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}