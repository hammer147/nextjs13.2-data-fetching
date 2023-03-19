import { Post } from '@/types'

type Props = {
  postsPromise: Promise<Post[]>
}

export default async function UserPosts({ postsPromise }: Props) {
  const posts = await postsPromise

  return (
    <ul>
      {posts.map(post => (
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
