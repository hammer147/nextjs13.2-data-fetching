import { PostSchema } from '@/types'
import { z } from 'zod'

export async function getUserPosts(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  const posts = z.array(PostSchema).parse(data)
  await sleep(3000) // Simulate slow network
  return posts
}

const sleep = async (milliseconds: number) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  })
}