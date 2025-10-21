import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserRole } from '../types'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateProfile: (data: Partial<Pick<User, 'firstName' | 'lastName' | 'email'>>) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ 
        user: {
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          isActive: userData.isActive,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt
        }, 
        isAuthenticated: true 
      }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => {
        const u = get().user
        if (!u) return
        set({ 
          user: { 
            ...u, 
            ...data,
            updatedAt: new Date().toISOString()
          } 
        })
      },
    }),
    { name: 'pueri-angeli-auth' }
  )
)
