import { LucideIcon } from "lucide-react"

export default function EmptyState({
    icon:Icon,
    message}:{
        icon:LucideIcon;
        message:string;
    }
){ 
  return (
    <div className="empty-state">
     { Icon && <Icon className="size-12 test-muted-foreground/50 mx-auto mb-4" />}
      <p className="text-lg font-medium">{message}</p>
    </div>
  )
}
