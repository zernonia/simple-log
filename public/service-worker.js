self.addEventListener("fetch", function (event) {
  event.respondWith(
    (async function () {
      try {
        var res = await fetch(event.request, { cache: "no-store" })
        var cache = await caches.open("cache")
        cache.put(event.request.url, res.clone())
        return res
      } catch (error) {
        return caches.match(event.request)
      }
    })()
  )
})

self.addEventListener("push", (event) => {
  let notification = event.data.json()
  self.registration.showNotification(notification.name, {
    icon: "https://emojicdn.elk.sh/" + notification.icon ?? "⚡️",
    body: notification.description,
    data: notification,
  })
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  console.log(event.notification)
  const data = event.notification.data
  event.waitUntil(
    self.clients.openWindow(`https://simple-log.vercel.app/app/${data.project_id}/${data.channel_id}/${data.id}`)
  )
})
