import { Projects } from "~~/utils/interface"

export const useProjects = () => {
  const { params } = toRefs(useRoute())
  const client = useSupabaseClient()
  const projects = useState<Projects[]>("projects", () => [])

  const selectedProject = computed(() => projects.value?.find((i) => i.id === params.value?.projectId))
  const selectedChannel = computed(() => selectedProject.value?.channels?.find((i) => i.id === params.value?.channelId))

  const { refresh } = useLazyAsyncData(
    "projects",
    async () => {
      const { data } = await client.from<Projects>("projects").select("*, channels!project_id(*)")
      projects.value = data
      return data
    },
    { server: false }
  )

  return { projects, selectedProject, selectedChannel, refresh }
}
