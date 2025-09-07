import { Users, UserPlus, BookOpen, FileText, Calendar } from 'lucide-react';

function KpiCard({ 
  icon, 
  label, 
  value,
  trend = null,
  trendLabel = ''
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  trend?: 'up' | 'down' | null;
  trendLabel?: string;
}) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-black/60 mb-1">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
        <div className="p-2 rounded-lg bg-brand/10 text-brand">
          {icon}
        </div>
      </div>
      {trend && (
        <div className={`mt-3 text-xs flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? (
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V7.414l-4.293 4.293a1 1 0 01-1.414 0L8 9.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 12.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 10.414 14.586 14H12z" clipRule="evenodd" />
            </svg>
          )}
          {trendLabel}
        </div>
      )}
    </div>
  );
}

function QuickActionButton({ 
  icon, 
  label, 
  description,
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="p-4 rounded-lg border border-black/10 bg-white hover:bg-gray-50 transition-colors text-left group"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors">
          {icon}
        </div>
        <div>
          <div className="font-medium text-gray-900">{label}</div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
      </div>
    </button>
  );
}

function NotificationItem({ 
  title, 
  time, 
  message,
  isNew = false
}: { 
  title: string; 
  time: string;
  message: string;
  isNew?: boolean;
}) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex-shrink-0 h-2 w-2 rounded-full ${isNew ? 'bg-brand' : 'bg-transparent'}`}></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
}

export function DashboardView({ onTabChange }: { onTabChange: (tab: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble des activités et statistiques</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          icon={<Users className="h-5 w-5" />} 
          label="Professeurs" 
          value="24" 
          trend="up"
          trendLabel="+3 ce mois-ci"
        />
        <KpiCard 
          icon={<Users className="h-5 w-5" />} 
          label="Parents" 
          value="120" 
          trend="up"
          trendLabel="+12 ce mois-ci"
        />
        <KpiCard 
          icon={<Users className="h-5 w-5" />} 
          label="Élèves" 
          value="340" 
          trend="up"
          trendLabel="+28 cette année"
        />
        <KpiCard 
          icon={<BookOpen className="h-5 w-5" />} 
          label="Classes actives" 
          value="15" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activité récente */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
            <div className="px-6 py-3 border-b border-black/10 flex items-center justify-between">
              <h2 className="font-medium">Activité récente</h2>
              <button className="text-sm text-brand hover:underline">Voir tout</button>
            </div>
            <div className="divide-y divide-gray-100">
              <NotificationItem
                title="Nouveaux utilisateurs"
                time="Il y a 2 heures"
                message="3 nouveaux comptes parents ont été créés aujourd'hui."
                isNew={true}
              />
              <NotificationItem
                title="Mise à jour système"
                time="Hier"
                message="La version 2.1.0 a été déployée avec succès."
              />
              <NotificationItem
                title="Rapport mensuel"
                time="Il y a 3 jours"
                message="Le rapport d'activité de septembre est disponible."
              />
            </div>
          </div>
        </div>

        {/* Accès rapides */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Actions rapides</h2>
          <div className="space-y-3">
            <QuickActionButton
              icon={<UserPlus className="h-5 w-5" />}
              label="Ajouter un utilisateur"
              description="Créer un nouveau compte utilisateur"
              onClick={() => onTabChange('users')}
            />
            <QuickActionButton
              icon={<BookOpen className="h-5 w-5" />}
              label="Gérer les classes"
              description="Créer ou modifier des classes"
              onClick={() => onTabChange('classes')}
            />
            <QuickActionButton
              icon={<FileText className="h-5 w-5" />}
              label="Générer un rapport"
              description="Exporter les données du système"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Statistiques avancées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-black/10 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Statistiques d'activité</h2>
            <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
              <option>Cette année</option>
            </select>
          </div>
          <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-400">
            Graphique des statistiques
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-black/10 p-4">
          <h2 className="font-medium mb-4">Prochaines échéances</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-brand" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Réunion des professeurs</p>
                  <p className="text-xs text-gray-500">15 Octobre 2023 • 14:00 - 16:00</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
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
  );
}
