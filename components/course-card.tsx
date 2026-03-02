import Link from 'next/link'
import Image from 'next/image'
import { Course } from '@/lib/types'
import { LevelBadge } from './level-badge'
import { Clock, Users, Star } from 'lucide-react'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="group cursor-pointer rounded-xl overflow-hidden border border-border bg-card transition-all hover:shadow-xl hover:border-primary/50">
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden bg-muted">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
              {course.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="text-sm text-muted-foreground">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Instructor:</span>
            <div className="font-semibold text-foreground">{course.instructor.name}</div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground text-center">
            <div className="flex items-center gap-2 flex-1 min-w-fit">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{course.duration} weeks</span>
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-fit">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{(course.enrolledCount / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-fit">
              <Star className="w-4 h-4 flex-shrink-0 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold">{course.rating}</span>
            </div>
          </div>

          {/* Level Badge */}
          <div className="pt-2 border-t border-border">
            <LevelBadge level={course.level} />
          </div>
        </div>
      </div>
    </Link>
  )
}
