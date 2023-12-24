import { create } from 'zustand'
import { Me } from '@/types'

interface UserContext {
  user: Me | null
  setUser: (user: Me) => void
}

export const userContext = create<UserContext>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
