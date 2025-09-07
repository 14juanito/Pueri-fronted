import { create } from 'zustand'

export type Assignment = {
  id: string
  title: string
  fileName: string
  url: string // object URL or external URL
  createdAt: number
}

type AssignmentsState = {
  items: Assignment[]
  add: (a: Omit<Assignment, 'id' | 'createdAt'>) => void
  remove: (id: string) => void
  clear: () => void
}

export const useAssignments = create<AssignmentsState>((set) => ({
  items: [],
  add: (a) =>
    set((s) => ({
      items: [
        { id: crypto.randomUUID(), createdAt: Date.now(), ...a },
        ...s.items,
      ],
    })),
  remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
  clear: () => set({ items: [] }),
}))
