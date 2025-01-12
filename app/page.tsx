"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useProjects } from "@/context/project-context";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toggleFavorite } from "@/lib/api";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function ProjectList() {
  const { projects, loading, error, refreshProjects } = useProjects();

  const handleToggleFavorite = async (id: string) => {
    try {
      await toggleFavorite(id);
      refreshProjects();
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Button asChild>
            <Link href="/projects/new">Create Project</Link>
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Error loading projects</h2>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={refreshProjects} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 w-1/2">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/projects/new">Create Project</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project ID</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Project Manager</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>
                  <Link
                    href={`/projects/${project.id}`}
                    className="hover:underline">
                    {project.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {format(new Date(project.startDate), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>
                  {format(new Date(project.endDate), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>{project.projectManager}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleFavorite(project.id)}>
                      <Star
                        className={cn(
                          "h-4 w-4",
                          project.isFavorite &&
                            "fill-yellow-400 text-yellow-400",
                        )}
                      />
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/projects/${project.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
