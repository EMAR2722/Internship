export function CourseSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border border-border bg-card animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-muted" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
        </div>
        <div className="h-4 bg-muted rounded w-1/4 mt-4" />
      </div>
    </div>
  )
}

export function CourseSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CourseSkeleton key={i} />
      ))}
    </div>
  )
}
