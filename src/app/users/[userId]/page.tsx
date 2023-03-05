import { getUser } from '@/lib/getUser'
import { getUserPosts } from '@/lib/getUserPosts'
import { Suspense } from 'react'
import UserPosts from './user-posts'

export async function generateMetadata({ params: { userId } }: { params: { userId: string } }) {
  const userData: Promise<User> = getUser(userId)
  const user = await userData
  return {
    title: user.name,
    description: `Posts by ${user.name}`
  }
}

type Props = {
  params: {
    userId: string
  }
}

export default async function UserPage({ params: { userId } }: Props) {
  // these requests are made in parallel
  const userData: Promise<User> = getUser(userId)
  const userPostsData: Promise<Post[]> = getUserPosts(userId)

  // this blocks the entire page until userData is resolved (userPostsData may still be loading)
  // we will see the jsx rendered by loading.tsx
  const user = await userData

  // when userData is resolved, we can start rendering the jsx
  // Note that we are not waiting for userPostsData to resolve,
  // we are passing it as a promise to an async component, that we wrap in a Suspense boundary

  return (
    <>
      <h2 className='mb-5 text-2xl font-bold text-violet-400'>{user.name}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <UserPosts postsPromise={userPostsData} />
      </Suspense>
    </>
  )
}
