import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Blocks. All rights reserved. Created with{" "}
          <Heart className="inline-block h-3 w-3 text-red-500" /> by Bonny Modipa
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

