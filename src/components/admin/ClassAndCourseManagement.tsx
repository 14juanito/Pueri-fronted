import { useState } from 'react';
import { Users, BookOpen } from 'lucide-react';
import ClassManagement from './ClassManagement';
import CourseManagement from './CourseManagement';

interface ClassAndCourseManagementProps {
  onTabChange?: (tab: string) => void;
}

export default function ClassAndCourseManagement({ onTabChange }: ClassAndCourseManagementProps = {}) {
  const [activeTab, setActiveTab] = useState<'classes' | 'courses'>('classes');

  return (
    <div className="space-y-6">
      <div className="border-b border-black/10">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('classes')}
            className={`py-3 px-4 inline-flex items-center gap-2 text-sm font-medium border-b-2 ${
              activeTab === 'classes'
                ? 'border-brand text-brand'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4" />
            Classes
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3 px-4 inline-flex items-center gap-2 text-sm font-medium border-b-2 ${
              activeTab === 'courses'
                ? 'border-brand text-brand'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Cours
          </button>
        </nav>
      </div>

      <div className="py-4">
        {activeTab === 'classes' ? <ClassManagement /> : <CourseManagement />}
      </div>
    </div>
  );
}
