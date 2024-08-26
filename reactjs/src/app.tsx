import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Auth } from '@/pages/auth/index'

import Task from './pages/task'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/tasks',
    element: <Task />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}
