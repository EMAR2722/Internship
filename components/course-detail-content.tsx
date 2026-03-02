'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Course } from '@/lib/types'
import { getCourseById } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LevelBadge } from './level-badge'
import { AlertCircle, ArrowLeft, Clock, Users, Star, CheckCircle2 } from 'lucide-react'

interface CourseDetailContentProps {
  courseId: string
}

export function CourseDetailContent({ courseId }: CourseDetailContentProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true)
        setError(null)
        const data = await getCourseById(courseId)
        setCourse(data)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load course. Please try again later.'
        )
        console.error('Error fetching course:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button asChild className="mt-4 bg-primary">
          <Link href="/">Back to Courses</Link>
        </Button>
      </div>
    )
  }

  if (loading || !course) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-80 bg-muted rounded-lg" />
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4 md:px-6">
        <Button asChild variant="ghost" className="gap-2 text-foreground hover:text-primary">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
      </div>

      {/* Hero Section with Overlay Content */}
      <div className="relative w-full bg-primary overflow-hidden">
        {/* Background Image */}
        <div className="relative h-80 md:h-96">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/60" />
        </div>

        {/* Overlaid Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-4 text-white">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/90 bg-white/20 px-4 py-1.5 rounded-full">
                  {course.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                  {course.title}
                </h1>
                <p className="text-lg text-white/90 max-w-2xl line-clamp-3">
                  {course.description}
                </p>

                {/* Course Meta Info - Inline */}
                <div className="flex flex-wrap gap-6 pt-4 text-white/95">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👨‍🏫</span>
                    <span className="font-semibold">Instructor: {course.instructor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{(course.enrolledCount / 1000).toFixed(1)}K enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating} rating</span>
                  </div>
                </div>

                {/* Level Badge */}
                <div className="pt-2">
                  <LevelBadge level={course.level} />
                </div>
              </div>

              {/* Right Image Area (shows course thumbnail in smaller size) */}
              <div className="hidden lg:flex items-end justify-end">
                <div className="relative w-full h-48 rounded-xl overflow-hidden border-4 border-white/20">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Meta */}
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  {course.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-foreground text-balance">
                {course.title}
              </h1>

              {/* Course Meta Info */}
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration} weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating} rating</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="space-y-6 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded">
                  <span className="text-xl">📖</span>
                </div>
                <h2 className="text-2xl font-bold">What You&apos;ll Learn</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouLearn?.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Description */}
            <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
              <h2 className="text-2xl font-bold">Course Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {course.description}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This comprehensive course is designed to provide you with practical, hands-on experience and real-world skills. You&apos;ll work on projects that simulate actual industry scenarios, giving you the confidence to apply your knowledge immediately.
              </p>
            </div>

            {/* Your Instructor */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Instructor</h2>
              <div className="flex gap-4 p-6 rounded-lg border border-border bg-card">
                <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground flex-shrink-0">
                  {course.instructor.name.charAt(0)}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{course.instructor.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="rounded-lg border border-border bg-card p-6 space-y-4 sticky top-20">
              <h3 className="text-xl font-bold">Enroll Today</h3>
              <p className="text-sm text-muted-foreground">
                Join {course.enrolledCount.toLocaleString()} students already enrolled
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base h-12 rounded-lg">
                Enroll Now
              </Button>
              <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary/5 font-semibold h-12 rounded-lg">
                Add to Wishlist
              </Button>

              {/* Course Includes */}
              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="font-bold">This course includes:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {course.courseIncludes?.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Level Badge */}
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-2">Difficulty Level</p>
                <LevelBadge level={course.level} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
