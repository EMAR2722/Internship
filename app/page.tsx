import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CoursesContent } from '@/components/courses-content'
import { CourseSkeletonGrid } from '@/components/course-skeleton'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Explore Our Courses
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl text-balance">
            Master new skills with expert-led courses designed for the modern learner. Start your learning journey today with INFNOVA Academy.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:px-6 md:py-16">
        <Suspense fallback={<CourseSkeletonGrid count={6} />}>
          <CoursesContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
