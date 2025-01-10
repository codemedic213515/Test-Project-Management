import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="p-8">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Page Not Found</AlertTitle>
        <AlertDescription>The page you are looking for does not exist.</AlertDescription>
      </Alert>
      <div className="mt-4 flex justify-start">
        <Button asChild variant="outline">
          <Link href="/">Back to Projects</Link>
        </Button>
      </div>
    </div>
  )
}

