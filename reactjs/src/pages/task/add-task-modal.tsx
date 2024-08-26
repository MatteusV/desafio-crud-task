import { Loader, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'

interface AddTaskModalProps {
  title: string
  setOpenAddTaskModal(value: boolean): void
}

const createTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
})

type CreateTaskSchema = z.infer<typeof createTaskSchema>

export function AddTaskModal({
  setOpenAddTaskModal,
  title,
}: AddTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateTaskSchema>()

  async function handleCreateNewTask(data: CreateTaskSchema) {
    const { status } = await api.post('tasks', data)

    switch (status) {
      case 201:
        toast.success('Tarefa criada.')
        setTimeout(() => {
          window.location.reload()
        }, 800)
        break
      case 409:
        toast.error('Falha ao criar a tarefa! faça login novamente.')
        break
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="w-full flex justify-between items-center">
          <div>
            <h2 className="font-medium">Criar nova tarefa</h2>
            <p className="text-xs md:text-base text-zinc-400">
              Insira os detalhes da sua nova tarefa.
            </p>
          </div>

          <Button onClick={() => setOpenAddTaskModal(false)}>
            <X className="size-4" />
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateNewTask)}
          className="space-y-4"
        >
          <div className="flex flex-col gap-4">
            <Input
              className="border-zinc-500"
              placeholder="Titulo da tarefa"
              defaultValue={title}
              {...register('title')}
              required
            />
            <Input
              className="border-zinc-500"
              placeholder="Descrição"
              {...register('description')}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-zinc-100 text-zinc-800"
            >
              {isSubmitting ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                'Criar'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
