export async function getUserPosts(userId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  await sleep(3000)
  return res.json()
}

const sleep = async (milliseconds: number) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  })
}