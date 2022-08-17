// @ts-ignore
import Notification from "~~/assets/notification.mp3"
import { toRefs } from "@vueuse/core"

export const useSound = () => {
  const soundState = useState("audio", () => ({
    audio: undefined as HTMLAudioElement,
    volumn: 0.3,
  }))
  const { audio, volumn } = toRefs(soundState)

  onMounted(() => {
    audio.value = new Audio(Notification)
    audio.value.volume = volumn.value
  })

  watch(volumn, (newValue) => {
    audio.value.volume = volumn.value
  })

  const play = async () => {
    try {
      audio.value && (await audio.value.play())
    } catch (err) {
      console.error(err.message)
    }
  }

  return { audio, play }
}
