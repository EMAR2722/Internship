import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CourseDetailContent } from '@/components/course-detail-content'
import { Skeleton } from '@/components/ui/skeleton'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function CourseDetailSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero Skeleton */}
      <Skeleton className="h-80 w-full" />
      
      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  )
}

export default async function CoursePage({ params }: PageProps) {
  const { id } = await params

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <Suspense fallback={<CourseDetailSkeleton />}>
          <CourseDetailContent courseId={id} />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
