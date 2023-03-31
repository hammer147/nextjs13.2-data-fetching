import { postSchema } from '@/types'
import { z } from 'zod'
import { sleep } from './sleep'

export async function getUserPosts(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  if (!response.ok) return undefined
  const data = await response.json()
  const result = z.array(postSchema).safeParse(data)

  // Simulate slow network
  await sleep(3000)

  return result // Promise<{ success: false; error: ZodError } | { success: true; data: Post[] }>
}
