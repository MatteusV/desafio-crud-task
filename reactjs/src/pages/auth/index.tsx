import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
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

import { LoginModal } from './login-modal'

const formRegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type RegisterSchema = z.infer<typeof formRegisterSchema>

export function Auth() {
  const { hash } = useLocation()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterSchema>()

  const [isLogin, setIsLogin] = useState(false)

  async function handleRegisterAccount(data: RegisterSchema) {
    const { status } = await api.post('/users', data)

    switch (status) {
      case 201:
        toast.success('Conta criada.')
        setTimeout(() => {
          window.location.href = '/#login'
        }, 800)
        break
      case 409:
        toast.error('Email ja foi cadastrado.')
        break
    }
  }

  useEffect(() => {
    if (hash === '#login') {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [hash])

  if (isLogin) {
    return <LoginModal />
  } else {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Card className="w-full max-w-md p-6 space-y-4">
          <CardHeader>
            <CardTitle className="text-2xl">Criar conta</CardTitle>
            <CardDescription>
              Já possui uma conta?{' '}
              <a href="#login" className="text-primary underline">
                Login
              </a>
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(handleRegisterAccount)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Coloque seu nome"
                  {...register('username')}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Coloque seu email"
                  {...register('email')}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Coloque sua senha"
                  {...register('password')}
                  required
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
}
