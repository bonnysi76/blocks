import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

interface AdminBadgeProps {
  variant?: "default" | "subtle"
}

export function AdminBadge({ variant = "default" }: AdminBadgeProps) {
  return (
    <Badge variant={variant === "default" ? "default" : "outline"} className="ml-2 gap-1 px-1.5 py-0 text-[10px]">
      <Shield className="h-3 w-3" />
      ADMIN
    </Badge>
  )
}

