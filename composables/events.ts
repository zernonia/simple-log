import { Events } from "~~/utils/interface"

export const useEvents = () => {
  const { params } = toRefs(useRoute())
  const event = useState<Events>("event", () => null)
  const events = useState<Events[]>("events", () => [])
  const isPendingEvents = useState("events-loading", () => false)

  whenever(
    () => [params.value.eventId, events.value],
    () => {
      if (events.value) {
        event.value = events.value.find((i) => i.id === params.value.eventId)
      }
    },
    { immediate: true }
  )

  return { event, events, isPendingEvents }
}
