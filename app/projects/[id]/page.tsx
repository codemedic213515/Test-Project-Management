"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getProject, toggleFavorite } from "@/lib/api"
import { Project } from "@/types/project"
import { useProjects } from "@/context/project-context"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { refreshProjects } = useProjects()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProject(params.id)
        setProject(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch project details"
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  const handleToggleFavorite = async () => {
    if (!project) return
    try {
      const updatedProject = await toggleFavorite(project.id)
      setProject(updatedProject)
      await refreshProjects()
      toast.success(updatedProject.isFavorite ? "Added to favorites" : "Removed from favorites")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update favorite status"
      toast.error(errorMessage)
    }
  }

  if (loading) {
    return (
      <div className="p-8 animate-pulse">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded bg-muted" />
            <div className="h-10 w-24 rounded bg-muted" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-40 rounded-lg bg-muted" />
          <div className="h-20 rounded-lg bg-muted" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-start">
          <Button asChild variant="outline">
            <Link href="/">Back to Projects</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="p-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>This project could not be found.</AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-start">
          <Button asChild variant="outline">
            <Link href="/">Back to Projects</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFavorite}
          >
            <Star
              className={cn(
                "h-5 w-5",
                project.isFavorite && "fill-yellow-400 text-yellow-400"
              )}
            />
          </Button>
          <Button asChild variant="outline">
            <Link href={`/projects/${project.id}/edit`}>Edit</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="font-medium">Project ID</div>
              <div>{project.id}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="font-medium">Description</div>
              <div>{project.description}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="font-medium">Start Date</div>
              <div>{format(new Date(project.startDate), "PPP")}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="font-medium">End Date</div>
              <div>{format(new Date(project.endDate), "PPP")}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="font-medium">Manager</div>
              <div>{project.projectManager}</div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-start">
          <Button asChild variant="outline">
            <Link href="/">Back to Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

