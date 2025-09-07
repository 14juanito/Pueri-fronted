import type { ReactNode } from 'react';
import { School, BarChart2, Users, Settings, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white border-r border-black/10 p-4 flex flex-col">
          <div className="flex items-center gap-2 p-2 mb-8">
            <School className="h-6 w-6 text-brand" />
            <span className="font-semibold">Pueri Angeli Admin</span>
          </div>
          
          <nav className="space-y-1 flex-1">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'dashboard' ? 'bg-brand/10 text-brand' : 'hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="h-4 w-4" />
              Tableau de bord
            </button>
            <button
              onClick={() => onTabChange('classes')}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'classes' ? 'bg-brand/10 text-brand' : 'hover:bg-gray-100'
              }`}
            >
              <School className="h-4 w-4" />
              Classes & Cours
            </button>
            <button
              onClick={() => onTabChange('users')}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'users' ? 'bg-brand/10 text-brand' : 'hover:bg-gray-100'
              }`}
            >
              <Users className="h-4 w-4" />
              Utilisateurs
            </button>
          </nav>
          
          <div className="pt-4 border-t border-black/10">
            <button
              onClick={() => onTabChange('settings')}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'settings' ? 'bg-brand/10 text-brand' : 'hover:bg-gray-100'
              }`}
            >
              <Settings className="h-4 w-4" />
              Paramètres
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left rounded-md hover:bg-gray-100">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
