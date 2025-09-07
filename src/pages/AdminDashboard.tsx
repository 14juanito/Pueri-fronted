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
      case 'reports':
      case 'calendar':
        // TODO: Implémenter les composants ReportsView et CalendarView
        return <div className="p-6">Fonctionnalité en cours de développement</div>;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardView onTabChange={setActiveTab} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-6">
        {renderContent()}
      </div>
    </AdminLayout>
  );
}
