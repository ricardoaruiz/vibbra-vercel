export type UseToken = {
  setToken: (token: string | null | undefined) => void
  getToken: () => string | undefined
  removeToken: () => void
  getUserIdFromToken: () => number
  getUserNameFromToken: () => string
}
