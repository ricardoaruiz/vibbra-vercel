export type User = {
  id: number
  name: string
  email: string
  login: string
  password: string
  location: Location
}

type Location = {
  lat: number
  lng: number
  address: string
  city: string
  state: string
  zip_code: number
}
