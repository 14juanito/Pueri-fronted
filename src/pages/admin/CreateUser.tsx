import { useState } from 'react'
import { UserPlus } from 'lucide-react'

export default function CreateUser() {
  const [role, setRole] = useState<'TEACHER' | 'PARENT'>('TEACHER')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Mock submit
    setSaved(true)
    setTimeout(() => setSaved(false), 1200)
    setName('')
    setEmail('')
  }

  return (
    <section>
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Inscrire un utilisateur</h1>
        <p className="text-sm text-black/60">Créer un nouveau professeur ou parent</p>
      </header>
      <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-black/10 bg-white p-4 max-w-md">
        {saved && (
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Utilisateur enregistré (mock)</div>
        )}
        <div className="space-y-1">
          <label className="text-sm" htmlFor="role">Rôle</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full rounded-md border border-black/10 px-3 py-2">
            <option value="TEACHER">Professeur</option>
            <option value="PARENT">Parent</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="name">Nom</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-black/10 px-3 py-2" />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-black/10 px-3 py-2" />
        </div>
        <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 font-medium text-black">
          <UserPlus className="size-4" /> Enregistrer
        </button>
      </form>
    </section>
  )
}
