import { UserSchema } from '@/types'
import { z } from 'zod'

export async function getAllUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  const users = z.array(UserSchema).parse(data)
  return users
}
