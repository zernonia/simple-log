import type { Users, Events, VapidSubscription } from "./interface"
import webpush from "web-push"

export const sendNotification = async (subscriptions: VapidSubscription[], events: Events) => {
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
  const result = await Promise.all(
    subscriptions.map(async (subscription) => {
      const endpoint = subscription.endpoint
      const id = endpoint.substr(endpoint.length - 8, endpoint.length)
      try {
        const result = await webpush.sendNotification(subscription, JSON.stringify(events), options)
        console.log(`Endpoint ID: ${id}`)
        console.log(`Result: ${result.statusCode}`)
        return id
      } catch (error) {
        console.log(`Endpoint ID: ${id}`)
        console.log(`Error: ${error} `)
      }
    })
  )
  console.log({ result })

  return result
}
