import { useAuth } from '../stores/auth'
import { useParentProfile } from '../stores/parentProfile'
import { useState } from 'react'
import { Save, Image as ImageIcon } from 'lucide-react'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const { data, update } = useParentProfile()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [saved, setSaved] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateProfile({ name, email })
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Mon Profil</h1>
        <p className="text-black/60">Modifiez vos informations personnelles</p>
      </header>
      <form onSubmit={onSubmit} className="space-y-6 rounded-lg border border-black/10 bg-white p-4 animate-[fade-in_.4s_ease-out_both]">
        {saved && (
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Profil enregistré</div>
        )}
        <div className="space-y-1">
          <label className="text-sm" htmlFor="name">Nom</label>
          <input
            id="name"
            className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {user?.role === 'PARENT' && (
          <div className="space-y-4 pt-2 border-t border-black/10">
            <h2 className="text-lg font-semibold">Profil Parent</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm" htmlFor="parentEmail">Email du parent</label>
                <input id="parentEmail" type="email" value={data.parentEmail} onChange={(e) => update({ parentEmail: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="code_parent">Code parent</label>
                <input id="code_parent" value={data.code_parent} onChange={(e) => update({ code_parent: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="sex">Sexe</label>
                <select id="sex" value={data.sex} onChange={(e) => update({ sex: e.target.value as any })} className="w-full rounded-md border border-black/10 px-3 py-2">
                  <option value="">Choisissez</option>
                  <option value="Masculin">Masculin</option>
                  <option value="Feminin">Féminin</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="studentPhone">Téléphone de l'étudiant(e) *</label>
                <input id="studentPhone" value={data.studentPhone} onChange={(e) => update({ studentPhone: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="birthDate">Date de naissance *</label>
                <input id="birthDate" type="date" value={data.birthDate} onChange={(e) => update({ birthDate: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="birthPlace">Lieu de naissance *</label>
                <input id="birthPlace" value={data.birthPlace} onChange={(e) => update({ birthPlace: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="nationality">Nationalité *</label>
                <input id="nationality" value={data.nationality} onChange={(e) => update({ nationality: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="civilStatus">État civil *</label>
                <input id="civilStatus" value={data.civilStatus} onChange={(e) => update({ civilStatus: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="province">Province *</label>
                <input id="province" value={data.province} onChange={(e) => update({ province: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="district">District *</label>
                <input id="district" value={data.district} onChange={(e) => update({ district: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="territory">Territoire *</label>
                <input id="territory" value={data.territory} onChange={(e) => update({ territory: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="sector">Secteur *</label>
                <input id="sector" value={data.sector} onChange={(e) => update({ sector: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="commune">Commune *</label>
                <input id="commune" value={data.commune} onChange={(e) => update({ commune: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm" htmlFor="emergencyName">Nom de la personne à contacter en urgence *</label>
                <input id="emergencyName" value={data.emergencyName} onChange={(e) => update({ emergencyName: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="emergencyPhone">Téléphone urgence *</label>
                <input id="emergencyPhone" value={data.emergencyPhone} onChange={(e) => update({ emergencyPhone: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm" htmlFor="emergencyAddress">Adresse urgence *</label>
                <input id="emergencyAddress" value={data.emergencyAddress} onChange={(e) => update({ emergencyAddress: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="diplomaType">Type de diplôme</label>
                <input id="diplomaType" value={data.diplomaType} onChange={(e) => update({ diplomaType: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="diplomaNumber">Numéro du diplôme</label>
                <input id="diplomaNumber" value={data.diplomaNumber} onChange={(e) => update({ diplomaNumber: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="diplomaSection">Section du diplôme *</label>
                <input id="diplomaSection" value={data.diplomaSection} onChange={(e) => update({ diplomaSection: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="diplomaSchool">Établissement du diplôme *</label>
                <input id="diplomaSchool" value={data.diplomaSchool} onChange={(e) => update({ diplomaSchool: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-1">
                <label className="text-sm" htmlFor="diplomaYear">Année d'obtention du diplôme *</label>
                <input id="diplomaYear" value={data.diplomaYear} onChange={(e) => update({ diplomaYear: e.target.value })} className="w-full rounded-md border border-black/10 px-3 py-2" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm" htmlFor="passport">Photo passeport (visage)</label>
                <div className="flex items-center gap-3">
                  <input id="passport" type="file" accept="image/*" onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (!f) return
                    const url = URL.createObjectURL(f)
                    update({ passportPhotoUrl: url })
                  }} />
                  {data.passportPhotoUrl && (
                    <img src={data.passportPhotoUrl} alt="Passeport" className="h-16 w-16 rounded-md object-cover border border-black/10" />
                  )}
                </div>
                <p className="text-xs text-black/60 inline-flex items-center gap-2"><ImageIcon className="size-3.5" /> Utilisable pour les documents officiels.</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2 font-medium text-black shadow-sm hover:opacity-90 transition-transform hover:scale-[1.01] focus-visible:ring-2 ring-brand"
        >
          <Save className="size-4" /> Enregistrer
        </button>
      </form>
    </section>
  )
}
