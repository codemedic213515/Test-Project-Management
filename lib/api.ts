import { Project, ProjectFormData } from "@/types/project"

// Add logging to the delay function
const delay = (min: number, max: number) => {
  const duration = Math.random() * (max - min) + min
  console.log(`API delay: ${duration}ms`)
  return new Promise(resolve => setTimeout(resolve, duration))
}

// Simulate random errors with configurable probability and max retries
const shouldError = (probability = 0.1, retryCount = 0) => {
  // Decrease error probability with each retry
  const adjustedProbability = probability / (retryCount + 1)
  return Math.random() < adjustedProbability
}

// Error types
export class ApiError extends Error {
  constructor(
    message: string, 
    public status: number,
    public isRetryable: boolean = true
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Add logging to the retry logic
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 2,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let i = 0; i <= maxRetries; i++) {
    try {
      console.log(`Attempt ${i + 1} of ${maxRetries + 1}`)
      return await operation()
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error)
      lastError = error as Error
      
      if (error instanceof ApiError && !error.isRetryable) {
        throw error
      }
      
      if (i === maxRetries) {
        break
      }
      
      const retryDelay = baseDelay * Math.pow(2, i)
      console.log(`Retrying in ${retryDelay}ms...`)
      await delay(retryDelay, retryDelay * 1.5)
    }
  }

  throw lastError
}

// Initial mock data
let projects: Project[] = [
  {
    id: "project_a",
    name: "Project A",
    description: "Project A Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
    isFavorite: true
  },
  {
    id: "project_b",
    name: "Project B",
    description: "Project B Description",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
    isFavorite: true
  },
  {
    id: "project_c",
    name: "Project C",
    description: "Project C Description",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
    isFavorite: false
  }
]

// Update the getProjects function to have less random errors during development
export async function getProjects(): Promise<Project[]> {
  return withRetry(async () => {
    console.log('Fetching projects...')
    await delay(800, 2000)

    // Reduce error probability during development
    if (shouldError(0.05)) {
      console.error('Simulated error in getProjects')
      throw new ApiError(
        "Failed to fetch projects. The server is temporarily unavailable.", 
        503,
        true
      )
    }

    console.log('Returning projects:', projects)
    return [...projects]
  })
}

export async function getProject(id: string): Promise<Project> {
  return withRetry(async () => {
    await delay(500, 1500)

    if (shouldError()) {
      throw new ApiError(
        "Failed to fetch project details. Please try again later.", 
        503,
        true
      )
    }

    const project = projects.find(p => p.id === id)
    if (!project) {
      throw new ApiError("Project not found", 404, false)
    }

    return { ...project }
  })
}

export async function createProject(data: ProjectFormData): Promise<Project> {
  return withRetry(async () => {
    await delay(1000, 2500)

    if (!data.id || !data.name || !data.description) {
      throw new ApiError(
        "Invalid project data. Please fill in all required fields.", 
        400,
        false
      )
    }

    if (projects.some(p => p.id === data.id)) {
      throw new ApiError(
        "A project with this ID already exists.", 
        409,
        false
      )
    }

    if (shouldError()) {
      throw new ApiError(
        "Failed to create project. Please try again later.", 
        503,
        true
      )
    }

    const newProject: Project = {
      ...data,
      isFavorite: false
    }

    projects = [...projects, newProject]
    return newProject
  })
}

export async function updateProject(id: string, data: ProjectFormData): Promise<Project> {
  return withRetry(async () => {
    await delay(1000, 2000)

    if (!data.name || !data.description) {
      throw new ApiError(
        "Invalid project data. Please fill in all required fields.", 
        400,
        false
      )
    }

    if (shouldError()) {
      throw new ApiError(
        "Failed to update project. Please try again later.", 
        503,
        true
      )
    }

    const index = projects.findIndex(p => p.id === id)
    if (index === -1) {
      throw new ApiError("Project not found", 404, false)
    }

    const updatedProject = {
      ...projects[index],
      ...data
    }
    projects = [...projects.slice(0, index), updatedProject, ...projects.slice(index + 1)]
    return updatedProject
  })
}

export async function toggleFavorite(id: string): Promise<Project> {
  return withRetry(async () => {
    await delay(500, 1500)

    if (shouldError(0.05)) {
      throw new ApiError(
        "Failed to update favorite status. Please try again.", 
        503,
        true
      )
    }

    const index = projects.findIndex(p => p.id === id)
    if (index === -1) {
      throw new ApiError("Project not found", 404, false)
    }

    const updatedProject = {
      ...projects[index],
      isFavorite: !projects[index].isFavorite
    }
    projects = [...projects.slice(0, index), updatedProject, ...projects.slice(index + 1)]
    return updatedProject
  })
}

export async function deleteProject(id: string): Promise<void> {
  return withRetry(async () => {
    await delay(800, 2000)

    if (shouldError()) {
      throw new ApiError(
        "Failed to delete project. Please try again later.", 
        503,
        true
      )
    }

    const index = projects.findIndex(p => p.id === id)
    if (index === -1) {
      throw new ApiError("Project not found", 404, false)
    }

    projects = projects.filter(p => p.id !== id)
  })
}

