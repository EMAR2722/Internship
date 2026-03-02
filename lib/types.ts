// API Response Types
export interface ApiCourse {
  id: string
  title: string
  instructor: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  thumbnail: string
  rating: number
  enrolled: number
  category: string
  description?: string
  whatYouLearn?: string[]
  courseIncludes?: string[]
}

// Application Types
export interface Course {
  id: string
  title: string
  description: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  instructor: {
    name: string
    bio?: string
    avatar?: string
  }
  duration: string
  enrolledCount: number
  rating: number
  imageUrl: string
  whatYouLearn: string[]
  courseIncludes: string[]
  price?: number
}

export interface ApiResponse<T> {
  data: T
  error?: string
}
