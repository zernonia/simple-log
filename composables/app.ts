export const useAppSettings = () => {
  return useState("app-settings", () => ({
    isNavBarShowing: false,
  }))
}
