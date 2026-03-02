import { Course, ApiCourse } from './types'

const API_BASE_URL = 'https://infnova-course-api.vercel.app/api'

// Map API course to application course format
function mapApiCourse(apiCourse: ApiCourse): Course {
  // Extract duration number from string like "12 weeks"
  const durationNum = parseInt(apiCourse.duration.split(' ')[0]) || 0

  return {
    id: apiCourse.id,
    title: apiCourse.title,
    description: apiCourse.description || `Explore ${apiCourse.title} with expert instruction from ${apiCourse.instructor}.`,
    category: apiCourse.category,
    level: apiCourse.level,
    instructor: {
      name: apiCourse.instructor,
      bio: `Expert instructor in ${apiCourse.category}`,
    },
    duration: apiCourse.duration,
    enrolledCount: apiCourse.enrolled,
    rating: apiCourse.rating,
    imageUrl: apiCourse.thumbnail,
    whatYouLearn: apiCourse.whatYouLearn || [
      'Master core concepts',
      'Build real-world projects',
      'Get expert guidance',
      'Earn a certificate',
    ],
    courseIncludes: apiCourse.courseIncludes || [
      `${durationNum} weeks of content`,
      'Lifetime access',
      'Certificate of completion',
      'Access on mobile and desktop',
    ],
  }
}

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Handle both array and object with data property
    const coursesList = Array.isArray(data) ? data : data.data || data

    if (!Array.isArray(coursesList)) {
      throw new Error('Invalid response format')
    }

    return coursesList.map(mapApiCourse)
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw error
  }
}

export async function getCourseById(id: string): Promise<Course> {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch course: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Handle both direct object and object with data property
    const courseData = data.data || data

    if (!courseData) {
      throw new Error('Course not found')
    }

    return mapApiCourse(courseData)
  } catch (error) {
    console.error('Error fetching course:', error)
    throw error
  }
}
