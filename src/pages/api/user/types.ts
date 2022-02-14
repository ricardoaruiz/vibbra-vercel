export type GetUsersResponse = UserResponse[]

export type UserResponse = {
  id: number
  name: string
  email: string
  login: string
  password?: string
  location?: LocationResponse
}

type LocationResponse = {
  lat: number
  lng: number
  address: string
  city: string
  state: string
  zip_code: number
}
