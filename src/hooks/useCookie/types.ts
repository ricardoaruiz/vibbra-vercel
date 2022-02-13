export type UseCookies = {
  setToken: (token: string | null | undefined) => void
  getToken: () => string | undefined
  removeToken: () => void
}
