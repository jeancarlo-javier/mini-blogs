import type { User, UserCreate } from '../types/userTypes'
import type { UserCredentials } from '../types/userTypes'

const apiUrl =
  import.meta.env.VITE_ENV === 'development'
    ? '/api'
    : import.meta.env.VITE_BACKEND_URL

export function getLocalAuth(): string | null {
  return localStorage.getItem('auth')
}

const getEncodedCredentials = (
  credentials?: UserCredentials
): string | null => {
  let encodedCredentials: string | null = null
  if (!credentials) {
    encodedCredentials = getLocalAuth()
  } else if (credentials.email && credentials.password) {
    encodedCredentials = btoa(`${credentials.email}:${credentials.password}`)
  }

  return encodedCredentials
}

export function clearAuth(): void {
  localStorage.removeItem('auth')
}

export async function authUser(
  credentials?: UserCredentials
): Promise<User | null> {
  const encodedCredentials = getEncodedCredentials(credentials)

  if (!encodedCredentials) return null

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if (response.status !== 200) {
    return null
  }

  const user = await response.json()

  if (user && credentials) {
    localStorage.setItem(
      'auth',
      btoa(`${credentials.email}:${credentials.password}`)
    )
  }

  return user
}

export async function registerUser(user: UserCreate): Promise<User | null> {
  console.log('registerUser', user)

  const response = await fetch(`${apiUrl}/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (response.status !== 200) {
    return null
  }

  const newUser = await response.json()

  if (newUser) {
    localStorage.setItem('auth', btoa(`${user.email}:${user.password}`))
  }

  return newUser
}
