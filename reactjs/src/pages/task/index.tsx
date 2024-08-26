import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { CardTask } from '@/components/card-task'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'

import { AddTaskModal } from './add-task-modal'

interface tasksProps {
  id: string
  title: string
  description: string
  completed: boolean
  created_at: string | Date
  updated_at?: string | Date
}

export default function Task() {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<tasksProps[]>()
  const [newTask, setNewTask] = useState('')
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false)

  useEffect(() => {
    const cookie = document.cookie.match('tokenJwt')

    if (cookie![0] === 'tokenJwt') {
      api.get('/tasks').then(({ status, data }) => {
        if (status === 409) {
          toast.error('Faça login novamente.')
        }

        setTasks(data.tasks)
      })
    } else {
      navigate('/')
    }
  }, [])

  function handleCheckTask(id: string) {
    const updatedTasks = tasks?.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    )
    setTasks(updatedTasks)

    const task = tasks?.find((task) => task.id === id)

    api.patch(`/tasks/${id}`, {
      completed: !task?.completed,
    })
  }

  function handleRemoveTask(id: string) {
    const updatedTasks = tasks?.filter((task) => task.id !== id)
    setTasks(updatedTasks)

    api.delete(`tasks/${id}`)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
      <div className="bg-background rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Input
            type="text"
            placeholder="Criar nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 mr-4"
          />
          <Button
            className="bg-zinc-50 text-zinc-800 font-medium"
            onClick={() => setOpenAddTaskModal(true)}
            type="button"
          >
            Criar tarefa
          </Button>
        </div>
        <div className="space-y-4">
          {tasks &&
            tasks.map((task) => (
              <CardTask
                completed={task.completed}
                description={task.description}
                id={task.id}
                title={task.title}
                key={task.id}
                handleCheckTask={handleCheckTask}
                handleRemoveTask={handleRemoveTask}
              />
            ))}
        </div>
      </div>
      {openAddTaskModal && (
        <AddTaskModal
          title={newTask}
          setOpenAddTaskModal={setOpenAddTaskModal}
        />
      )}
    </div>
  )
}
