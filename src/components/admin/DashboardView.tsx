import { Users, UserPlus, BookOpen, FileText, Calendar, MessageSquare, BarChart2 } from 'lucide-react';
import { useState } from 'react';

// Composant pour les cartes de statistiques
function StatCard({ icon, title, value, change, changeType }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  change?: string;
  changeType?: 'up' | 'down';
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-gray-50">
          {icon}
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}

// Composant pour les éléments d'activité récente
function ActivityItem({ title, time, message, isNew = false }: { 
  title: string; 
  time: string; 
  message: string; 
  isNew?: boolean;
}) {
  return (
    <div className="flex items-start py-4">
      <div className={`flex-shrink-0 h-2 w-2 mt-1.5 rounded-full ${isNew ? 'bg-brand' : 'bg-gray-300'}`}></div>
      <div className="ml-3 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="mt-1 text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export function DashboardView() {
  const [timeRange, setTimeRange] = useState('7 derniers jours');
  
  return (
    <div className="space-y-6">
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Users className="h-6 w-6 text-brand" />}
          title="Professeurs"
          value="24"
          change="+3 ce mois-ci"
          changeType="up"
        />
        <StatCard 
          icon={<Users className="h-6 w-6 text-brand" />}
          title="Parents"
          value="120"
          change="+12 ce mois-ci"
          changeType="up"
        />
        <StatCard 
          icon={<Users className="h-6 w-6 text-brand" />}
          title="Élèves"
          value="340"
          change="+28 cette année"
          changeType="up"
        />
        <StatCard 
          icon={<BookOpen className="h-6 w-6 text-brand" />}
          title="Classes actives"
          value="15"
        />
      </div>

      {/* Section milieu - 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activité récente */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Activité récente</h2>
            <button className="text-sm font-medium text-brand hover:text-brand/80">
              Voir tout
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            <ActivityItem
              title="Nouveaux utilisateurs"
              time="Il y a 2 heures"
              message="3 nouveaux comptes parents ont été créés aujourd'hui."
              isNew={true}
            />
            <ActivityItem
              title="Mise à jour système"
              time="Hier"
              message="La version 2.1.0 a été déployée avec succès."
            />
            <ActivityItem
              title="Rapport mensuel"
              time="Il y a 3 jours"
              message="Le rapport d'activité de septembre est disponible."
            />
          </div>
        </div>

        {/* Actions rapides */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Actions rapides</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="p-2 rounded-lg bg-brand/10 text-brand">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Ajouter un utilisateur</p>
                <p className="text-sm text-gray-500">Créer un nouveau compte</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Communiquer</p>
                <p className="text-sm text-gray-500">Envoyer un message</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="p-2 rounded-lg bg-green-100 text-green-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Gérer les classes</p>
                <p className="text-sm text-gray-500">Créer ou modifier</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Générer un rapport</p>
                <p className="text-sm text-gray-500">Exporter les données</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Voir le calendrier</p>
                <p className="text-sm text-gray-500">Événements à venir</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Section bas - 2 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Statistiques d'activité */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Statistiques d'activité</h2>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
            >
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
              <option>Cette année</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            <BarChart2 className="h-12 w-12 opacity-50" />
          </div>
        </div>

        {/* Prochaines échéances */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Prochaines échéances</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="p-2 rounded-lg bg-brand/10 text-brand">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="ml-3 flex-1">
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