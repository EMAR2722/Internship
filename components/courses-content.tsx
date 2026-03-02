'use client'

import { useEffect, useState } from 'react'
import { Course } from '@/lib/types'
import { getCourses } from '@/lib/api'
import { CourseCard } from './course-card'
import { CourseSkeletonGrid } from './course-skeleton'
import { AlertCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        setError(null)
        const data = await getCourses()
        setCourses(data)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load courses. Please try again later.'
        )
        console.error('Error fetching courses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Filter courses based on search and level
  useEffect(() => {
    let filtered = courses

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.name.toLowerCase().includes(query)
      )
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter((course) => course.level === selectedLevel)
    }

    setFilteredCourses(filtered)
  }, [courses, searchQuery, selectedLevel])

  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => window.location.reload()} className="bg-primary">
          Try Again
        </Button>
      </div>
    )
  }

  if (loading) {
    return <CourseSkeletonGrid count={6} />
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-base"
            />
          </div>

          {/* Level Filter Buttons - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:flex gap-2">
            {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? 'default' : 'outline'}
                onClick={() => setSelectedLevel(level)}
                className={
                  selectedLevel === level
                    ? 'bg-primary text-primary-foreground'
                    : 'border-border'
                }
                size="sm"
              >
                {level === 'all' ? 'All' : level}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Level Filter */}
        <div className="lg:hidden flex gap-2 flex-wrap">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <Button
              key={level}
              variant={selectedLevel === level ? 'default' : 'outline'}
              onClick={() => setSelectedLevel(level)}
              className={
                selectedLevel === level
                  ? 'bg-primary text-primary-foreground'
                  : 'border-border'
              }
              size="sm"
            >
              {level === 'all' ? 'All Levels' : level}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground pt-2">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No courses found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('')
              setSelectedLevel('all')
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
