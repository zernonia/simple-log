import { serverSupabaseServiceRole } from "#supabase/server"
import { Users, Events } from "~~/utils/interface"
import webpush from "web-push"

export default defineEventHandler(async (event) => {
  const payload = await useBody(event)
  const client = serverSupabaseServiceRole(event)

  //@ts-ignore
  const { data, error } = await client.from<Users>("users").select("*").eq("id", payload.record.owner_id)

  if (data) {
    sendNotification(data, payload.record)
  }
  return "ok"
})

const sendNotification = (users: Users[], events: Events) => {
  const vapidDetails = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
    subject: process.env.VAPID_SUBJECT,
  }

  // Customize how the push service should attempt to deliver the push message.
  // And provide authentication information.
  const options = {
    TTL: 10000,
    vapidDetails: vapidDetails,
  }
  // Send a push message to each client specified in the subscriptions array.
  users.forEach((user) => {
    const endpoint = user.sub.endpoint
    const id = endpoint.substr(endpoint.length - 8, endpoint.length)
    webpush
      .sendNotification(user.sub, JSON.stringify(events), options)
      .then((result) => {
        console.log(`Endpoint ID: ${id}`)
        console.log(`Result: ${result.statusCode}`)
      })
      .catch((error) => {
        console.log(`Endpoint ID: ${id}`)
        console.log(`Error: ${error} `)
      })
  })
}
