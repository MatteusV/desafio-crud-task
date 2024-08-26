import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginSchema = z.infer<typeof loginSchema>

export function LoginModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchema>()

  async function handleLoginUser(data: LoginSchema) {
    const navigate = useNavigate()
    const { status } = await api.post('/auth', data)

    if (status) {
      toast.success('Login efetuado.')
      setTimeout(() => {
        navigate('/tasks')
      }, 700)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-6 space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Não possui uma conta?{' '}
            <a href="" className="text-primary underline">
              Criar conta
            </a>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleLoginUser)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Coloque seu email"
                {...register('email')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Coloque sua senha"
                {...register('password')}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full hover:border border-green-300 hover:cursor-pointer hover:text-green-300 disabled:cursor-progress"
            >
              {!isSubmitting ? (
                'Enviar'
              ) : (
                <Loader className="size-5 animate-spin" />
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
