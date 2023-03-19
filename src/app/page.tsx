import Link from 'next/link'

export const metadata = {
  title: 'Home'
}

export default function Home() {
  return (
    <main className=''>
      <h1>Home Page</h1>
      <Link href='/users'>Users</Link>
    </main>
  )
}
