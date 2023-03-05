import { getAllUsers } from '@/lib/getAllUsers'
import Link from 'next/link'

export const metadata = {
  title: 'Users'
}

type Props = {}

export default async function UsersPage({}: Props) {
  const users: User[] = await getAllUsers()

  return (
    <section>
      <h2 className='mb-5'>
        <Link href='/'>Back to Home</Link>
      </h2>
      {users.map(user => (
        <div key={user.id}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </div>
      ))}
    </section>
  )
}
