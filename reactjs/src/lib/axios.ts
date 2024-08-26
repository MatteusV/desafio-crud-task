import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://desafio-crud-task.railway.internal',
  withCredentials: true,
})
