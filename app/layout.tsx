import { Inter } from 'next/font/google'
import { Toaster } from "sonner"
import { ProjectProvider } from "@/context/project-context"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
            </div>
          </SidebarProvider>
        </ProjectProvider>
        <Toaster />
      </body>
    </html>
  )
}

