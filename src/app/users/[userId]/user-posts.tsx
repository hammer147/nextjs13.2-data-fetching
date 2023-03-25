import { Post } from '@/types'
import { ZodError } from 'zod'

type Props = {
  postsPromise: Promise<
    { success: false; error: ZodError } | { success: true; data: Post[] } | undefined
  >
}

export default async function UserPosts({ postsPromise }: Props) {
  const postsResult = await postsPromise
  if (!postsResult || !postsResult.success) return <div>no posts found</div>

  return (
    <ul>
      {postsResult.data.map(post => (
        <li key={post.id} className='mb-5'>
          <article>
            <h2 className='font-bold text-green-400'>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        </li>
      ))}
    </ul>
  )
}
