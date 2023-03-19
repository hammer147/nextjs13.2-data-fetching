import { User, UserSchema } from '@/types'

export async function getUser(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()

  const result = UserSchema.safeParse(data)
  await sleep(1000) // Simulate slow network
  return result // { success: false; error: ZodError } or { success: true; data: User }
}

const sleep = async (milliseconds: number) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  })
}
