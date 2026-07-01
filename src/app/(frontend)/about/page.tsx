import AboutSection from '@/components/AboutSection'
import BlogList1 from '@/components/Blog/blog'
import BlogSingle1 from '@/components/Blog/blogsingle'

export default function About() {
  return (
    <div className="w-full py-12">
      <AboutSection />
      <div className="container mx-auto max-w-7xl px-4">
        <BlogSingle1 />
        <BlogList1 />
      </div>
    </div>
  )
}
