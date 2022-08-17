import { Events } from "~~/utils/interface"

export const useEvents = () => {
  const { params } = toRefs(useRoute())
  const event = useState<Events>("event", () => null)
  const events = useState<Events[]>("events", () => [])

  const channelEvents = useState<{ [key: string]: Events[] }>("channel-events", () => ({}))
  const currentChannelEvents = computed(() => channelEvents.value?.[params.value.channelId?.toString()])
  const isPendingEvents = useState("events-loading", () => false)

  whenever(
    () => [params.value.eventId, currentChannelEvents.value],
    () => {
      if (currentChannelEvents.value) {
        event.value = currentChannelEvents.value.find((i) => i.id === params.value.eventId)
      }
    },
    { immediate: true }
  )

  return { event, events, channelEvents, currentChannelEvents, isPendingEvents }
}
