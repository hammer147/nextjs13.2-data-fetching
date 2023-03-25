import { UserSchema } from '@/types'
import { sleep } from './sleep'

export async function getUser(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  if (!response.ok) return undefined
  const data = await response.json()
  const result = UserSchema.safeParse(data)

  // Simulate slow network
  await sleep(1000)

  return result // Promise<{ success: false; error: ZodError } | { success: true; data: User }> 
}
