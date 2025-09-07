import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = 'ADMIN' | 'TEACHER' | 'PARENT'

type User = {
  name: string
  email: string
  role: Role
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateProfile: (data: Partial<Pick<User, 'name' | 'email'>>) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => {
        const u = get().user
        if (!u) return
        set({ user: { ...u, ...data } })
      },
    }),
    { name: 'pueri-angeli-auth' }
  )
)
