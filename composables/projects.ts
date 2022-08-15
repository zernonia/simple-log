import { Projects } from "~~/utils/interface"

export const useProjects = () => {
  const { params } = toRefs(useRoute())
  const projects = useState<Projects[]>("projects", () => [])

  const selectedProject = computed(() => projects.value?.find((i) => i.id === params.value?.projectId))
  const selectedChannel = computed(() => selectedProject.value?.channels?.find((i) => i.id === params.value?.channelId))

  return { projects, selectedProject, selectedChannel }
}
