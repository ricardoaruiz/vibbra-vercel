export type UserBD = {
  id: number
  name: string
  email: string
  login: string
  password: string
  location: LocationBD
}

type LocationBD = {
  lat: number
  lng: number
  address: string
  city: string
  state: string
  zip_code: number
}

export type UserAppTokenBD = {
  [key: string]: string[]
}

export type InviteBD = {
  id: number
  user: number
  user_invited: number
}
