import { useState } from 'react';
import { FileText, Upload, X, Calendar, Clock, BookOpen, Plus } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  dueTime: string;
  document: string;
  status: 'draft' | 'published' | 'graded';
}

export default function AssignmentsManager() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Exercices de mathématiques',
      subject: 'Mathématiques',
      dueDate: '2023-10-15',
      dueTime: '16:00',
      document: 'exercices_maths.pdf',
      status: 'published'
    },
    {
      id: '2',
      title: 'Rédaction française',
      subject: 'Français',
      dueDate: '2023-10-20',
      dueTime: '23:59',
      document: 'redaction_francais.docx',
      status: 'published'
    },
  ]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState<Omit<Assignment, 'id' | 'status'>>({ 
    title: '',
    subject: '',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '16:00',
    document: ''
  });
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setNewAssignment({...newAssignment, document: e.target.files[0].name});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    // In a real app, you would upload the file here
    const newAssignmentWithId = {
      ...newAssignment,
      id: Date.now().toString(),
      status: 'draft' as const
    };
    
    setAssignments([...assignments, newAssignmentWithId]);
    setIsUploadModalOpen(false);
    setNewAssignment({ 
      title: '',
      subject: '',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '16:00',
      document: ''
    });
    setFile(null);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Devoirs</h3>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-brand text-black text-sm shadow-sm hover:bg-brand/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Nouveau devoir
        </button>
      </div>

      <div className="space-y-4">
        {assignments.length > 0 ? (
          <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-black/10">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Devoir
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Matière
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date limite
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="relative px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-black/10 text-sm">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{assignment.title}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                          {assignment.subject}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <a 
                          href={`#${assignment.document}`} 
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          download
                        >
                          <FileText className="h-4 w-4" />
                          {assignment.document}
                        </a>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDate(assignment.dueDate)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {assignment.dueTime}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          assignment.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : assignment.status === 'graded'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assignment.status === 'published' ? 'Publié' : assignment.status === 'graded' ? 'Noté' : 'Brouillon'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Éditer
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun devoir</h3>
            <p className="mt-1 text-sm text-gray-500">Commencez par ajouter un devoir.</p>
            <div className="mt-6">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Nouveau devoir
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Ajouter un nouveau devoir</h3>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre du devoir *
                </label>
                <input
                  type="text"
                  required
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  placeholder="Ex: Exercices de mathématiques"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Matière *
                  </label>
                  <select
                    required
                    value={newAssignment.subject}
                    onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Sélectionner une matière</option>
                    <option value="Mathématiques">Mathématiques</option>
                    <option value="Français">Français</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Histoire-Géographie">Histoire-Géographie</option>
                    <option value="Anglais">Anglais</option>
                    <option value="EPS">EPS</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date limite *
                  </label>
                  <input
                    type="date"
                    required
                    value={newAssignment.dueDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure limite *
                  </label>
                  <input
                    type="time"
                    required
                    value={newAssignment.dueTime}
                    onChange={(e) => setNewAssignment({...newAssignment, dueTime: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fichier du devoir *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-brand hover:text-brand/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand"
                        >
                          <span>Téléverser un fichier</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.txt"
                          />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT (max. 10MB)</p>
                      {file && (
                        <p className="text-sm text-gray-900 mt-2 flex items-center justify-center gap-2">
                          <FileText className="h-4 w-4 text-brand" />
                          {file.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!file || !newAssignment.title || !newAssignment.subject}
                  className="px-4 py-2 text-sm font-medium text-white bg-brand rounded-md hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Publier le devoir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
