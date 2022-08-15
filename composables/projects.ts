import { Projects } from "~~/utils/interface"

export const useProjects = () => {
  const projects = useState<Projects[]>("projects", () => [])

  return { projects }
}
