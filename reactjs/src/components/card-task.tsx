import { Trash2Icon } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'

import { Button } from './ui/button'

interface tasksProps {
  id: string
  title: string
  description: string
  completed: boolean

  handleCheckTask(id: string): void
  handleRemoveTask(id: string): void
}

export function CardTask({
  completed,
  description,
  id,
  title,
  handleCheckTask,
  handleRemoveTask,
}: tasksProps) {
  return (
    <div
      key={id}
      className="flex items-center justify-between bg-muted rounded-md p-4 border border-zinc-500"
    >
      <div className="flex items-center">
        <Checkbox
          checked={completed}
          onCheckedChange={() => handleCheckTask(id)}
          className="mr-4"
        />

        <div className="space-y-1.5">
          <p
            className={`text-base ${completed ? 'line-through text-muted-foreground' : ''}`}
          >
            {title}
          </p>
          <p
            className={`text-sm text-zinc-400 ${completed ? 'line-through text-muted-foreground' : ''}`}
          >
            {description}
          </p>
        </div>
      </div>
      <Button
        disabled={completed}
        variant="ghost"
        size="icon"
        className="disabled:hidden"
        onClick={() => handleRemoveTask(id)}
      >
        <Trash2Icon className="w-5 h-5 text-red-400" />
      </Button>
    </div>
  )
}
