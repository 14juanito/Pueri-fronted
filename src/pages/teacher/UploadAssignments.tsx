import { useState } from 'react'
import { Upload } from 'lucide-react'
import { useAssignments } from '../../stores/assignments'

export default function UploadAssignments() {
  const { add } = useAssignments()
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !file) return
    const url = URL.createObjectURL(file)
    add({ title, fileName: file.name, url })
    setSent(true)
    setTitle('')
    setFile(null)
    setTimeout(() => setSent(false), 1200)
  }

  return (
    <section className="max-w-lg">
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Déposer un devoir (PDF)</h1>
        <p className="text-sm text-black/60">Les parents seront notifiés (mock)</p>
      </header>
      <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-black/10 bg-white p-4">
        {sent && (
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Devoir envoyé (mock)</div>
        )}
        <div className="space-y-1">
          <label className="text-sm" htmlFor="title">Titre</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-md border border-black/10 px-3 py-2" />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="file">Fichier PDF</label>
          <input id="file" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>
        <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 font-medium text-black">
          <Upload className="size-4" /> Envoyer
        </button>
      </form>
    </section>
  )
}
