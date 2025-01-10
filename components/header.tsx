"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Header() {
  const pathname = usePathname()
  const isProjectPage = pathname.startsWith("/projects/")

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        <div className="font-semibold">
          {isProjectPage ? (
            <Button variant="ghost" asChild className="-ml-2">
              <Link href="/">← Back to Projects</Link>
            </Button>
          ) : (
            "Projects"
          )}
        </div>
      </div>
    </header>
  )
}

