"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectForm } from "@/components/project-form";
import { getProject, updateProject } from "@/lib/api";
import { useProjects } from "@/context/project-context";
import { toast } from "sonner";
import { Project, ProjectFormData } from "@/types/project";

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { refreshProjects } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProject(params.id);
        setProject(data);
      } catch (error) {
        toast.error("Failed to fetch project");
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      await updateProject(params.id, data);
      await refreshProjects();
      toast.success("Project updated successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to update project");
      console.error("Error updating project:", error);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <div className="mb-8 h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Project not found</h2>
          <p className="text-sm text-muted-foreground">
            The project you're trying to edit doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-8 text-2xl font-bold">Edit Project</h1>
      <ProjectForm
        initialData={project}
        onSubmit={handleSubmit}
        submitLabel="Update"
        type="edit"
      />
    </div>
  );
}
