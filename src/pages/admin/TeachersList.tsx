import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

type Teacher = { id: string; name: string; email: string }

const initial: Teacher[] = [
  { id: 't1', name: 'Alice Martin', email: 'alice@ecole.fr' },
  { id: 't2', name: 'Bruno Dupont', email: 'bruno@ecole.fr' },
]

export default function TeachersList() {
  const [items, setItems] = useState<Teacher[]>(initial)

  function remove(id: string) {
    setItems((s) => s.filter((t) => t.id !== id))
  }

  return (
    <section>
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Professeurs</h1>
        <p className="text-sm text-black/60">Liste (mock) avec actions</p>
      </header>

      <div className="overflow-x-auto rounded-lg border border-black/10 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-black/5 text-left">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} className="border-t border-black/10">
                <td className="p-3">{t.name}</td>
                <td className="p-3">{t.email}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button className="inline-flex items-center gap-1 rounded-md border border-black/10 px-2 py-1 text-xs hover:bg-black/5">
                      <Pencil className="size-3.5" /> Modifier
                    </button>
                    <button onClick={() => remove(t.id)} className="inline-flex items-center gap-1 rounded-md border border-black/10 px-2 py-1 text-xs hover:bg-black/5 text-red-600">
                      <Trash2 className="size-3.5" /> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
