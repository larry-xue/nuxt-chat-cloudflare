export default defineEventHandler(async (event) => {
  // fetch data
  const body = await readBody(event)
  return $fetch(process.env.CLOUDFLARE_CHAT_WORKER_URL, {
    method: 'POST',
    body
  })
})
