import { useAssignments } from '../../stores/assignments'
import { Download } from 'lucide-react'

export default function ParentAssignments() {
  const { items } = useAssignments()
  return (
    <section>
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Devoirs</h1>
        <p className="text-sm text-black/60">Consultez et téléchargez les devoirs publiés</p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-lg border border-black/10 bg-white p-4 text-black/70">
          Aucun devoir pour le moment.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((a) => (
            <li key={a.id} className="flex items-center justify-between rounded-lg border border-black/10 bg-white p-4">
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-black/60">{a.fileName}</div>
              </div>
              <a href={a.url} download className="inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm hover:bg-black/5">
                <Download className="size-4" /> Télécharger
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
