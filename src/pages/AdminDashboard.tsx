import { useState } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { DashboardView } from '../components/admin/DashboardView';
import { UsersView } from '../components/admin/UsersView';
import ClassAndCourseManagement from '../components/admin/ClassAndCourseManagement';
import AdminSettings from '../components/admin/AdminSettings';
import AnnouncementCenter from '../components/admin/AnnouncementCenter';
import { CommunicationCenter } from '../components/admin/CommunicationCenter';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onTabChange={setActiveTab} />;
      case 'classes':
        return <ClassAndCourseManagement />;
      case 'users':
        return <UsersView />;
      case 'announcements':
        return <AnnouncementCenter />;
      case 'communication':
        return <CommunicationCenter />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardView onTabChange={setActiveTab} />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Tableau de bord';
      case 'classes':
        return 'Gestion des classes';
      case 'users':
        return 'Gestion des utilisateurs';
      case 'announcements':
        return 'Annonces';
      case 'communication':
        return 'Centre de communication';
      case 'settings':
        return 'Paramètres';
      default:
        return 'Tableau de bord';
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Vue d’ensemble des statistiques';
      case 'classes':
        return 'Gérez les classes, les cours et les affectations';
      case 'users':
        return 'Gérez les comptes utilisateurs et les autorisations';
      case 'settings':
        return 'Configurez les paramètres de l\'application';
      default:
        return 'Vue d’ensemble des statistiques';
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{getPageTitle()}</h1>
            <p className="text-black/60">{getPageDescription()}</p>
          </div>
        </header>
        
        {renderContent()}
      </div>
    </AdminLayout>
  );
}
