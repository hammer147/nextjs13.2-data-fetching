export async function getUser(userId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  await sleep(1000)
  return res.json()
}

const sleep = async (milliseconds: number) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  })
}
