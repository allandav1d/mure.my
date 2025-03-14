import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ActivityItem {
  id: string
  user: {
    name: string
    email: string
    avatar?: string
  }
  action: string
  target: string
  date: string
}

interface ActivityListProps {
  items: ActivityItem[]
}

export function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.user.avatar} alt={item.user.name} />
            <AvatarFallback>
              {item.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm">
              <span className="font-medium">{item.user.name}</span>{" "}
              <span className="text-muted-foreground">{item.action}</span>{" "}
              <span className="font-medium">{item.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

