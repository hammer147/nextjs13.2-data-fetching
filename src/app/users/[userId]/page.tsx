import { getAllUsers } from '@/lib/getAllUsers'
import { getUser } from '@/lib/getUser'
import { getUserPosts } from '@/lib/getUserPosts'
import { Suspense } from 'react'
import UserPosts from './user-posts'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params: { userId } }: { params: { userId: string } }) {
  const userResult = await getUser(userId)
  if (!userResult || !userResult.success) {
    return {
      title: 'User Not Found'
    }
  }
  return {
    title: userResult.data.name,
    description: `Posts by ${userResult.data.name}`
  }
}

type Props = {
  params: {
    userId: string
  }
}

export default async function UserPage({ params: { userId } }: Props) {
  // these requests are made in parallel
  const userResultPromise = getUser(userId)
  const userPostsPromise = getUserPosts(userId)

  // this blocks the entire page until userResultPromise is resolved (userPostsPromise may still be loading)
  // we will see the jsx rendered by loading.tsx
  const userResult = await userResultPromise

  // when userResultPromise is resolved, we can start rendering the jsx
  // Note that we are not waiting for userPostsPromise to resolve,
  // we are passing it as a promise to an async component, that we wrap in a Suspense boundary

  if (!userResult || !userResult.success) notFound() // Note: notFound() does not require you to use return notFound() due to using the TypeScript never type

  return (
    <>
      <h2 className='mb-5 text-2xl font-bold text-violet-400'>{userResult.data.name}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <UserPosts postsPromise={userPostsPromise} />
      </Suspense>
    </>
  )
}

// the loading fallback will never be visible for pages that are statically generated, 
// comment out the following lines to see the difference

export async function generateStaticParams() {
  const usersResult = await getAllUsers()
  if (!usersResult || !usersResult.success) return []
  return usersResult.data.map(user => ({ userId: user.id.toString() }))
}
