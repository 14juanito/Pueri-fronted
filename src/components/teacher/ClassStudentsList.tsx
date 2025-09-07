import { Users, Phone, Mail, User } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  parentId: string;
}

const students: Student[] = [
  {
    id: '1',
    name: 'Lina Diop',
    parentName: 'Mariama Diop',
    parentPhone: '77 123 45 67',
    parentEmail: 'mariama.diop@example.com',
    parentId: 'p001'
  },
  {
    id: '2',
    name: 'Amadou Ndiaye',
    parentName: 'Fatou Ndiaye',
    parentPhone: '76 234 56 78',
    parentEmail: 'fatou.ndiaye@example.com',
    parentId: 'p002'
  },
  {
    id: '3',
    name: 'Aïssatou Fall',
    parentName: 'Moussa Fall',
    parentPhone: '75 345 67 89',
    parentEmail: 'moussa.fall@example.com',
    parentId: 'p003'
  },
];

export default function ClassStudentsList() {
  return (
    <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-black/10 flex items-center gap-2">
        <Users className="size-5 text-brand" />
        <h2 className="font-medium">Liste des élèves - CM2A</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-black/10">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Élève
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parent
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-black/10 text-sm">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-brand" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-xs text-gray-500">ID: {student.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.parentName}</div>
                  <div className="text-xs text-gray-500">ID: {student.parentId}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    <span>{student.parentPhone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs text-blue-600 truncate max-w-[180px]">{student.parentEmail}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    Contacter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 text-right text-sm">
        <span className="text-gray-700">Total: {students.length} élèves</span>
      </div>
    </div>
  );
}
