import { InviteBD, UserAppTokenBD, UserBD } from './types'

const users: UserBD[] = [
  {
    id: 1,
    name: 'Ricardo Ruiz',
    email: 'ricardo.almendro.ruiz@gmail.com',
    login: 'rruiz',
    password: '1234',
    location: {
      lat: 123456.123456,
      lng: 654321.654321,
      address: 'Alamenda dos Resedas, 154',
      city: 'Artur Nogueira',
      state: 'São Paulo',
      zip_code: 13162322
    }
  },
  {
    id: 2,
    name: 'Cinthya Carvalho',
    email: 'ccarvalho@gmail.com',
    login: 'ccarvalho',
    password: '1234',
    location: {
      lat: 123456.123456,
      lng: 654321.654321,
      address: 'Alamenda dos Resedas, 154',
      city: 'Artur Nogueira',
      state: 'São Paulo',
      zip_code: 13162322
    }
  },
  {
    id: 3,
    name: 'Guilherme Ruiz',
    email: 'gui@gmail.com',
    login: 'guiruiz',
    password: '1234',
    location: {
      lat: 123456.123456,
      lng: 654321.654321,
      address: 'Alamenda dos Resedas, 154',
      city: 'Artur Nogueira',
      state: 'São Paulo',
      zip_code: 13162322
    }
  },
  {
    id: 4,
    name: 'Haruko Nakamura',
    email: 'hnaka@gmail.com',
    login: 'hnaka',
    password: '1234',
    location: {
      lat: 123456.123456,
      lng: 654321.654321,
      address: 'Alamenda dos Resedas, 154',
      city: 'Artur Nogueira',
      state: 'São Paulo',
      zip_code: 13162322
    }
  }
]

const userAppToken: UserAppTokenBD = {
  rruiz: ['rruizAppToken1', 'rruizAppToken2'],
  ccarvalho: ['ccarvalhoAppToken1', 'ccarvalhoAppToken2'],
  guiruiz: ['guiruizAppToken1', 'guiruizAppToken2'],
  hnaka: ['hnakaAppToken1', 'hnakaAppToken2']
}

const invites: InviteBD[] = [
  {
    id: 5,
    user: 1,
    user_invited: 2
  },
  {
    id: 6,
    user: 1,
    user_invited: 4
  },
  {
    id: 7,
    user: 2,
    user_invited: 1
  },
  {
    id: 8,
    user: 2,
    user_invited: 4
  },
  {
    id: 9,
    user: 4,
    user_invited: 4
  },
  {
    id: 10,
    user: 4,
    user_invited: 1
  },
  {
    id: 11,
    user: 4,
    user_invited: 2
  },
  {
    id: 12,
    user: 4,
    user_invited: 3
  }
]

// DATA
export default {
  last_id: 100,
  users,
  userAppToken,
  invites
}
