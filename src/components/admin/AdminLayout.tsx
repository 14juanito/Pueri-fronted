import { useState, type ReactNode } from 'react';
import { School, BarChart2, Users, Settings, LogOut, Menu, X, MessageSquare } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                  md:translate-x-0 transform transition-transform duration-200 ease-in-out
                  fixed md:static inset-y-0 left-0 z-40 w-64 h-screen bg-white border-r border-black/10 p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between p-2 mb-8">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6 text-brand" />
            <span className="font-semibold">Pueri Angeli Admin</span>
          </div>
        </div>
          
          <nav className="space-y-1 flex-1">
            <NavItem 
              icon={<BarChart2 className="h-4 w-4" />}
              label="Tableau de bord"
              active={activeTab === 'dashboard'}
              onClick={() => onTabChange('dashboard')}
            />
            <NavItem 
              icon={<School className="h-4 w-4" />}
              label="Classes & Cours"
              active={activeTab === 'classes'}
              onClick={() => onTabChange('classes')}
            />
            <NavItem 
              icon={<Users className="h-4 w-4" />}
              label="Utilisateurs"
              active={activeTab === 'users'}
              onClick={() => onTabChange('users')}
            />
            <NavItem 
              icon={<MessageSquare className="h-4 w-4" />}
              label="Communication"
              active={activeTab === 'communication'}
              onClick={() => onTabChange('communication')}
            />
          </nav>
          
          <div className="pt-4 border-t border-black/10">
            <NavItem 
              icon={<Settings className="h-4 w-4" />}
              label="Paramètres"
              active={activeTab === 'settings'}
              onClick={() => onTabChange('settings')}
            />
            <button
              onClick={() => {
                // Handle logout
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 mt-1"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
      </div>
      
      {/* Main content */}
      <main className={`flex-1 p-4 md:p-6 transition-all duration-200 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        {children}
      </main>
    </div>
  );
}

interface NavItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-md transition-colors ${
        active ? 'bg-brand/10 text-brand font-medium' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className={`${active ? 'text-brand' : 'text-gray-500'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
