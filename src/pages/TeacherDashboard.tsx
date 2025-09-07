import { useState } from 'react';
import { Users, MessageCircle, FileText, BarChart2, Plus } from 'lucide-react';
import GradeEntryForm from '../components/teacher/GradeEntryForm';
import ClassStudentsList from '../components/teacher/ClassStudentsList';
import AssignmentsManager from '../components/teacher/AssignmentsManager';
import CommunicationCenter from '../components/teacher/CommunicationCenter';

type TabType = 'assignments' | 'grades' | 'students' | 'communication';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('assignments');
  const [showGradeForm, setShowGradeForm] = useState(false);

  const tabs = [
    { id: 'assignments', icon: <FileText className="h-5 w-5" />, label: 'Devoirs' },
    { id: 'grades', icon: <BarChart2 className="h-5 w-5" />, label: 'Notes' },
    { id: 'students', icon: <Users className="h-5 w-5" />, label: 'Élèves' },
    { id: 'communication', icon: <MessageCircle className="h-5 w-5" />, label: 'Communication' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Tableau de bord – Professeur</h1>
        <p className="text-black/60">Gérez vos classes, les notes et la communication</p>
      </header>

      {/* Tabs */}
      <div className="border-b border-black/10">
        <nav className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-3 px-4 inline-flex items-center gap-2 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-brand text-brand'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="py-4">
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand" />
                Gestion des devoirs
              </h2>
            </div>
            <AssignmentsManager />
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-brand" />
                Saisie des notes
              </h2>
              <button
                onClick={() => setShowGradeForm(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-brand text-black text-sm shadow-sm hover:bg-brand/90 transition-colors"
              >
                <Plus className="h-4 w-4" /> Nouvelle note
              </button>
            </div>
            
            {/* Gradebook will go here */}
            <div className="bg-white rounded-lg border border-black/10 p-6 text-center">
              <p className="text-gray-500">Sélectionnez une classe pour voir le cahier de notes</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {['CM2A', 'CM1B', 'CE2C'].map((classe) => (
                  <button
                    key={classe}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium">Classe de {classe}</h3>
                    <p className="text-sm text-gray-500">25 élèves</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-brand" />
              Liste des élèves
            </h2>
            <ClassStudentsList />
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-brand" />
              Centre de communication
            </h2>
            <CommunicationCenter />
          </div>
        )}
      </div>

      {/* Grade Entry Modal */}
      {showGradeForm && <GradeEntryForm onClose={() => setShowGradeForm(false)} />}
    </div>
  );
}
