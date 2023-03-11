import { User, UserSchema } from '@/types'

export async function getUser(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  const user = UserSchema.parse(data)
  await sleep(1000) // Simulate slow network
  return user
}

const sleep = async (milliseconds: number) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  })
}
