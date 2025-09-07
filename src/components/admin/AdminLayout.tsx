import type { ReactNode } from 'react';
import { Home, BookOpen, Users, Settings, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-2 space-y-1">
                <NavItem 
                  icon={<Home className="h-5 w-5 text-gray-500" />}
                  label="Tableau de bord"
                  active={activeTab === 'dashboard'}
                  onClick={() => onTabChange('dashboard')}
                />
                <NavItem 
                  icon={<BookOpen className="h-5 w-5 text-gray-500" />}
                  label="Classes & Cours"
                  active={activeTab === 'classes'}
                  onClick={() => onTabChange('classes')}
                />
                <NavItem 
                  icon={<Users className="h-5 w-5 text-gray-500" />}
                  label="Utilisateurs"
                  active={activeTab === 'users'}
                  onClick={() => onTabChange('users')}
                />
                <NavItem 
                  icon={<Settings className="h-5 w-5 text-gray-500" />}
                  label="Paramètres"
                  active={activeTab === 'settings'}
                  onClick={() => onTabChange('settings')}
                />
              </nav>
              
              <div className="pt-4 border-t border-black/10">
                <NavItem 
                  icon={
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  }
                  label="Communiquer"
                  active={activeTab === 'communication'}
                  onClick={() => onTabChange('communication')}
                  className="mt-1"
                />
                <div className="pt-4 mt-auto">
                  <button
                    onClick={() => onTabChange('logout')}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 mt-1"
                  >
                    <LogOut className="h-5 w-5" />
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

function NavItem({ icon, label, active, onClick, className }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-md transition-colors ${
        active ? 'bg-brand/10 text-brand font-medium' : 'text-gray-700 hover:bg-gray-100'
      } ${className}`}
    >
      <span className={`${active ? 'text-brand' : 'text-gray-500'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
