import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Sex = 'Masculin' | 'Feminin' | ''

export type ParentProfile = {
  parentEmail: string
  code_parent: string
  sex: Sex
  studentPhone: string
  birthDate: string // ISO
  birthPlace: string
  nationality: string
  civilStatus: string
  province: string
  district: string
  territory: string
  sector: string
  commune: string
  emergencyName: string
  emergencyPhone: string
  emergencyAddress: string
  diplomaType: string
  diplomaNumber: string
  diplomaSection: string
  diplomaSchool: string
  diplomaYear: string
  passportPhotoUrl: string | null
}

type ParentProfileState = {
  data: ParentProfile
  update: (patch: Partial<ParentProfile>) => void
  clear: () => void
}

const initial: ParentProfile = {
  parentEmail: '',
  code_parent: '',
  sex: '',
  studentPhone: '',
  birthDate: '',
  birthPlace: '',
  nationality: '',
  civilStatus: '',
  province: '',
  district: '',
  territory: '',
  sector: '',
  commune: '',
  emergencyName: '',
  emergencyPhone: '',
  emergencyAddress: '',
  diplomaType: '',
  diplomaNumber: '',
  diplomaSection: '',
  diplomaSchool: '',
  diplomaYear: '',
  passportPhotoUrl: null,
}

export const useParentProfile = create<ParentProfileState>()(
  persist(
    (set) => ({
      data: initial,
      update: (patch) => set((s) => ({ data: { ...s.data, ...patch } })),
      clear: () => set({ data: initial }),
    }),
    { name: 'pueri-angeli-parent-profile' }
  )
)
