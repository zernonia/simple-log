export const useAppSettings = () => {
  const settings = useState("app-settings", () => ({
    isNavBarShowing: false,
  }))

  const paginationBus = useEventBus<string>("pagination")

  return {
    settings,
    paginationBus,
  }
}
