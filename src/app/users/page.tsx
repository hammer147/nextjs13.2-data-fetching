import { getAllUsers } from '@/lib/getAllUsers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
  const usersResult = await getAllUsers()
  if (!usersResult || !usersResult.success) {
    return {
      title: 'No Users Found'
    }
  }
  return {
    title: 'Users',
    description: `List of ${usersResult.data.length} users`
  }
}

type Props = {}

export default async function UsersPage({}: Props) {
  const usersResult = await getAllUsers()

  if (!usersResult || !usersResult.success) notFound() // Note: notFound() does not require you to use return notFound() due to using the TypeScript never type

  return (
    <section>
      <h2 className='mb-5'>
        <Link href='/'>Back to Home</Link>
      </h2>
      {usersResult.data.map(user => (
        <div key={user.id}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </div>
      ))}
    </section>
  )
}
