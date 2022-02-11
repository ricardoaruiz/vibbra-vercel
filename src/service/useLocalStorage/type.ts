export type UseLocalStorage = {
  setToken: (token: string | null | undefined) => void
  getToken: () => string | null
}
