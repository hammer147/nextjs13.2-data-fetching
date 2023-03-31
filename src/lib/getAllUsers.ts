import { userSchema } from '@/types'
import { z } from 'zod'

export async function getAllUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) return undefined
  const data = await response.json()
  const result = z.array(userSchema).safeParse(data)
  return result // Promise<{ success: false; error: ZodError } | { success: true; data: User[] }> 
}
