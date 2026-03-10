import Image from 'next/image'
import Link from 'next/link'

export default function Blog() {
  const blogPosts = [
    { title: 'Kickoff - Enable Multilinguism', excerpt: 'We just started our journey. Learn about what we want to achive!', image: '/images/blogThumbnails/blog1.jpg', link: '/blog/blog1' },
    { title: 'Website going live', excerpt: 'We just launched the website you can see here. Learn more here', image: '/images/blogThumbnails/blog2.png', link: '/blog/blog2' },
      { title: 'Meet Bobba!', excerpt: 'Learn who Bobba is!', image: '/learning-material/story-1/story-en/Story1_title_E.webp', link: '/blog/blog3' },
      { title: 'Story 1 - Meet the Creators!', excerpt: 'Bobba\'s first trip to earth', image: '/learning-material/story-1/story-en/Story1_title_E.webp', link: '/blog/blog4' },
      { title: 'Story 2 - Meet the Creators!', excerpt: 'At the kindergarten', image: '/learning-material/story-2/story-en/Story 2_title_E.jpg', link: '/blog/blog5' },
      { title: 'Story 3 - Meet the Creators!', excerpt: 'Bobba at the beach', image: '/learning-material/story-3/story-title/Story 3_COVER_E.JPG', link: '/blog/blog6' },
      { title: 'Story 4 - Meet the Creators!', excerpt: 'Sleeping at a friend\'s', image: '/learning-material/story-4/story-en/Story 4_2 title_E.jpg', link: '/blog/blog7' },
      { title: 'Story 5 - Meet the Creators!', excerpt: 'Bobba in the library', image: '/learning-material/story-5/story-en/Story 5_title_E.jpg', link: '/blog/blog8' },
      { title: 'Story 6 - Meet the Creators!', excerpt: 'The Monster castle', image: '/learning-material/story-6/covers/Story 6_title_E.jpg', link: '/blog/blog9' },
      { title: 'Story 7 - Meet the Creators!', excerpt: 'Celebrating Olivia\'s birthday', image: '/learning-material/story-7/covers/Story 7_title_E.jpg', link: '/blog/blog10' },
      { title: 'Story 8 - Meet the Creators!', excerpt: 'Going home', image: '/learning-material/story-8/covers/Story 8_title_E.jpg', link: '/blog/blog11'},
      { title: 'Milestone Reached', excerpt: 'Bobba and his adventures are now available in 15 languages!', image: '/placeholder.svg', link: '/blog/blog12'},
      { title: 'The open AGENTIVE resources for Multilingual Early Childhood Education', excerpt: 'Explore the OER Page!', image: '/images/blogThumbnails/oer-agentive.png', link: '/blog/blog13'}
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