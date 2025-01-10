"use client"

import { useRouter } from "next/navigation"
import { ProjectForm } from "@/components/project-form"
import { createProject } from "@/lib/api"
import { useProjects } from "@/context/project-context"
import { toast } from "sonner"
import { ProjectFormData } from "@/types/project"

export default function CreateProject() {
  const router = useRouter()
  const { refreshProjects } = useProjects()

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      await createProject(data)
      await refreshProjects()
      toast.success("Project created successfully")
      router.push("/")
    } catch (error) {
      toast.error("Failed to create project")
      console.error("Error creating project:", error)
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-8 text-2xl font-bold">Create New Project</h1>
      <ProjectForm onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  )
}

