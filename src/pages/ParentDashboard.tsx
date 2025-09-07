import { CheckCircle2, AlertCircle, MessageSquare, BookOpen, User } from 'lucide-react';

function KpiCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center justify-center size-12 rounded-md bg-brand/20 text-brand">
          {icon}
        </div>
        <div>
          <div className="text-sm text-black/60">{label}</div>
          <div className="text-xl font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function ParentDashboard() {

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tableau de bord – Parent</h1>
          <p className="text-black/60">Résumé de la situation scolaire</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-brand/10 text-sm text-brand font-medium">
          <MessageSquare className="size-4" />
          <span>2 nouveaux messages</span>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard icon={<BookOpen className="h-5 w-5" />} label="Moyenne générale" value="15.2/20" />
        <KpiCard icon={<CheckCircle2 className="h-5 w-5 text-green-500" />} label="Absences" value="0 jour" />
        <KpiCard icon={<AlertCircle className="h-5 w-5 text-yellow-500" />} label="Retards" value="2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
            <div className="px-6 py-3 border-b border-black/10 flex items-center justify-between">
              <h2 className="font-medium">Dernières notes</h2>
              <button className="text-sm text-brand hover:underline">Voir tout</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-black/10">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Matière
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commentaire
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-black/10">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Mathématiques</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        16/20
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      01/09/2023
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Bon raisonnement, bon travail
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Français</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        12/20
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      31/08/2023
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Attention à l'orthographe
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
            <div className="px-6 py-3 border-b border-black/10 flex items-center justify-between">
              <h2 className="font-medium">Emploi du temps</h2>
              <button className="text-sm text-brand hover:underline">Voir la semaine</button>
            </div>
            <div className="p-4 space-y-4">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'].map(day => (
                <div key={day} className="text-sm">
                  <div className="font-medium text-black/60 mb-2">{day} 4/09</div>
                  <div className="space-y-2">
                    {[
                      { time: '08h-10h', subject: 'Maths', room: 'A12' },
                      { time: '10h-12h', subject: 'Français', room: 'B05' },
                      { time: '14h-16h', subject: 'Sciences', room: 'Labo 1' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="text-xs font-medium w-12">{item.time}</div>
                        <div className="flex-1">
                          <div className="font-medium">{item.subject}</div>
                          <div className="text-xs text-black/60">Salle {item.room}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
          <div className="px-6 py-3 border-b border-black/10 flex items-center justify-between">
            <h2 className="font-medium">Messages récents</h2>
            <button className="text-sm text-brand hover:underline">Voir tout</button>
          </div>
          <div className="p-4 space-y-4">
            {[
              { 
                id: 1,
                from: 'M. Ndiaye', 
                role: 'Professeur de Mathématiques',
                subject: 'Prochain contrôle', 
                preview: 'Je vous informe que le prochain contrôle de mathématiques aura lieu le...',
                time: 'Il y a 2h',
                unread: true,
                avatar: null
              },
              { 
                id: 2,
                from: 'Vie Scolaire', 
                role: 'Administration',
                subject: 'Absence justifiée', 
                preview: 'Nous accusons réception de votre justificatif pour l\'absence du...',
                time: 'Hier',
                unread: false,
                avatar: null
              },
            ].map((msg) => (
              <div key={msg.id} className="p-3 rounded-md hover:bg-gray-50 cursor-pointer border border-transparent hover:border-black/10 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {msg.avatar ? (
                      <img className="h-10 w-10 rounded-full" src={msg.avatar} alt={msg.from} />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{msg.from}</h3>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-sm font-medium">{msg.subject}</p>
                    <p className="text-sm text-gray-500 truncate">{msg.preview}</p>
                    <div className="mt-1 flex items-center gap-2">
                      {msg.unread && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand/10 text-brand">
                          Non lu
                        </span>
                      )}
                      <span className="text-xs text-gray-500">{msg.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
          <div className="px-6 py-3 border-b border-black/10 flex items-center justify-between">
            <h2 className="font-medium">Prochains devoirs</h2>
            <button className="text-sm text-brand hover:underline">Voir tout</button>
          </div>
          <div className="p-4 space-y-4">
            {[
              {
                id: 1,
                subject: 'Mathématiques',
                title: 'Exercices chapitre 3',
                dueDate: 'Demain',
                priority: 'high',
                completed: false
              },
              {
                id: 2,
                subject: 'Français',
                title: 'Rédaction',
                dueDate: 'Vendredi',
                priority: 'medium',
                completed: false
              },
              {
                id: 3,
                subject: 'Histoire',
                title: 'Préparation exposé',
                dueDate: 'Lundi prochain',
                priority: 'low',
                completed: false
              }
            ].map((homework) => (
              <div key={homework.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50">
                <div className={`mt-0.5 flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full ${
                  homework.priority === 'high' ? 'bg-red-100 text-red-600' : 
                  homework.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                  'bg-gray-100 text-gray-600'
                }`}>
                  <span className="text-xs font-medium">{homework.subject[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{homework.title}</p>
                  <p className="text-xs text-gray-500">{homework.subject} • {homework.dueDate}</p>
                </div>
                <button className="ml-2 p-1 text-gray-400 hover:text-gray-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
