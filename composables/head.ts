export const useCustomHead = (title?: string, description?: string, image?: string) => {
  useHead({
    title,
    meta: [
      {
        name: "description",
        content:
          description ?? "Event tracking all in 1 place, checking events notification should be easy and simple!",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@zernonia" },
      { name: "twitter:title", content: `Event tracking all in 1 place | SimpleLog ` },
      {
        name: "twitter:description",
        content:
          description ?? "Event tracking all in 1 place, checking events notification should be easy and simple!",
      },
      { name: "twitter:image", content: image ?? "https://simple-log.vercel.app/og.png" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: `Event tracking all in 1 place | SimpleLog ` },
      { property: "og:url", content: "https://simple-log.vercel.app/" },
      { property: "og:image", content: image ?? "https://simple-log.vercel.app/og.png" },
      { property: "og:image:secure_url", content: image ?? "https://simple-log.vercel.app/og.png" },
      { property: "og:image:type", content: "image/png" },
      {
        property: "og:description",
        content:
          description ?? "Event tracking all in 1 place, checking events notification should be easy and simple!",
      },
    ],
  })
}
