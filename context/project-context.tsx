"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Project } from "@/types/project"
import { getProjects } from "@/lib/api"
import { toast } from "sonner"

interface ProjectContextType {
  projects: Project[]
  favoriteProjects: Project[]
  loading: boolean
  error: string | null
  refreshProjects: () => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const favoriteProjects = projects.filter(project => project.isFavorite)

  const refreshProjects = async () => {
    try {
      console.log('Refreshing projects...')
      setLoading(true)
      setError(null)
      const data = await getProjects()
      console.log('Projects fetched:', data)
      setProjects(data)
    } catch (err) {
      console.error('Error fetching projects:', err)
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch projects"
      setError(errorMessage)
      toast.error(errorMessage)
      
      // Retry logic for initial load
      if (retryCount < 3 && projects.length === 0) {
        console.log('Retrying project fetch...')
        setRetryCount(prev => prev + 1)
        setTimeout(refreshProjects, 1000 * (retryCount + 1))
      }
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    console.log('ProjectProvider mounted, fetching initial projects...')
    refreshProjects()
  }, [])

  const value = {
    projects,
    favoriteProjects,
    loading,
    error,
    refreshProjects,
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}

