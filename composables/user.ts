import { Users } from "~~/utils/interface"

export const useUser = () => {
  return useState<Users>("user", () => null)
}
