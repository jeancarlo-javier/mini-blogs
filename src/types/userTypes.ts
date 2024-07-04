import { Ref } from 'vue'

export type InjectedUser = Ref<User | null | undefined>

export interface User {
  id: number
  name: string
  email: string
}

export interface UserCreate {
  name: string
  email: string
  password: string
}

export interface UserCredentials {
  email: string
  password: string
}
