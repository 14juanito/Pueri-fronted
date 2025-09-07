import { useState } from 'react';
import { Users, Plus, Edit, Trash2, Search, X } from 'lucide-react';

// Interface pour typer les données d'une classe
type ClassData = {
  id: string;
  name: string;
  level: string;
  teacher: string;
  studentCount: number;
  capacity: number;
  academicYear: string;
  students?: string[];
};

// Interface pour les données d'étudiant
type StudentData = {
  id: string;
  name: string;
  matricule: string;
  classId: string;
};

const ClassManagement = () => {
  // États pour la gestion des classes
  const [classes, setClasses] = useState<ClassData[]>([
    { 
      id: 'c1', 
      name: '6P-A', 
      level: '6e Primaire', 
      teacher: 'M. Ndiaye', 
      studentCount: 2, 
      capacity: 30, 
      academicYear: '2024-2025',
      students: ['s1', 's2']
    },
    { 
      id: 'c2', 
      name: '5P-B', 
      level: '5e Primaire', 
      teacher: 'Mme. Diallo', 
      studentCount: 0, 
      capacity: 30, 
      academicYear: '2024-2025',
      students: []
    },
  ]);

  // Données factices pour les étudiants
  const [students, setStudents] = useState<StudentData[]>([
    { id: 's1', name: 'Jean Kabasele', matricule: 'MAT001', classId: 'c1' },
    { id: 's2', name: 'Marie Mbayo', matricule: 'MAT002', classId: 'c1' },
    { id: 's3', name: 'Luc Tshibanda', matricule: 'MAT003', classId: '' },
  ]);

  // États pour la gestion des modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isManageStudentsOpen, setIsManageStudentsOpen] = useState(false);
  
  // États pour la gestion des formulaires
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClass, setEditingClass] = useState<ClassData | null>(null);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  const [currentClassId, setCurrentClassId] = useState<string | null>(null);
  const [currentClassStudents, setCurrentClassStudents] = useState<StudentData[]>([]);
  
  const [newClass, setNewClass] = useState<Omit<ClassData, 'id' | 'studentCount'>>({
    name: '',
    level: '1ère Maternelle',
    teacher: '',
    capacity: 30,
    academicYear: '2024-2025',
    students: []
  });
  
  // Constantes pour les sélecteurs
  const classLevels = [
    '1ère Maternelle', '2e Maternelle', '3e Maternelle',
    '1ère Primaire', '2e Primaire', '3e Primaire', '4e Primaire', '5e Primaire', '6e Primaire',
    '7e Secondaire', '8e Secondaire'
  ];
  
  const academicYears = ['2023-2024', '2024-2025', '2025-2026'];

  // Filtrer les classes selon le terme de recherche
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cls.teacher && cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())) ||
    cls.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer la création/mise à jour d'une classe
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingClass) {
      // Mise à jour d'une classe existante
      setClasses(classes.map(cls => 
        cls.id === editingClass.id ? { ...newClass, id: editingClass.id, studentCount: editingClass.studentCount } : cls
      ));
    } else {
      // Création d'une nouvelle classe
      const newClassData: ClassData = {
        ...newClass,
        id: `c${Date.now()}`,
        studentCount: 0,
        students: []
      };
      setClasses([...classes, newClassData]);
    }
    
    // Réinitialiser le formulaire
    setNewClass({
      name: '',
      level: '1ère Maternelle',
      teacher: '',
      capacity: 30,
      academicYear: '2024-2025',
      students: []
    });
    setEditingClass(null);
    setIsCreateModalOpen(false);
  };

  // Pré-remplir le formulaire pour l'édition
  const handleEdit = (cls: ClassData) => {
    setEditingClass(cls);
    setNewClass({
      name: cls.name,
      level: cls.level,
      teacher: cls.teacher,
      capacity: cls.capacity,
      academicYear: cls.academicYear,
      students: [...(cls.students || [])]
    });
    setIsCreateModalOpen(true);
  };

  // Confirmer la suppression
  const confirmDelete = (classId: string) => {
    setClassToDelete(classId);
    setIsDeleteConfirmOpen(true);
  };

  // Supprimer une classe
  const handleDelete = () => {
    if (!classToDelete) return;
    
    // Désaffecter les étudiants de cette classe
    const updatedStudents = students.map(student => 
      student.classId === classToDelete 
        ? { ...student, classId: '' } 
        : student
    );
    
    setStudents(updatedStudents);
    setClasses(classes.filter(cls => cls.id !== classToDelete));
    setIsDeleteConfirmOpen(false);
    setClassToDelete(null);
  };

  // Gérer les étudiants d'une classe
  const handleManageStudents = (classId: string) => {
    setCurrentClassId(classId);
    setCurrentClassStudents(students.filter(s => s.classId === classId));
    setIsManageStudentsOpen(true);
  };

  // Ajouter un étudiant à une classe
  const addStudentToClass = (studentId: string) => {
    if (!currentClassId) return;
    
    const updatedStudents = students.map(student => 
      student.id === studentId 
        ? { ...student, classId: currentClassId }
        : student
    );
    
    setStudents(updatedStudents);
    
    // Mettre à jour le compteur d'étudiants
    const updatedClasses = classes.map(cls => {
      if (cls.id === currentClassId) {
        const isAlreadyInClass = cls.students?.includes(studentId) || false;
        
        return {
          ...cls,
          studentCount: isAlreadyInClass ? cls.studentCount : cls.studentCount + 1,
          students: isAlreadyInClass ? cls.students : [...(cls.students || []), studentId]
        };
      }
      return cls;
    });
    
    setClasses(updatedClasses);
    setCurrentClassStudents(updatedStudents.filter(s => s.classId === currentClassId));
  };

  // Retirer un étudiant d'une classe
  const removeStudentFromClass = (studentId: string) => {
    if (!currentClassId) return;
    
    const updatedStudents = students.map(student => 
      student.id === studentId 
        ? { ...student, classId: '' }
        : student
    );
    
    setStudents(updatedStudents);
    
    // Mettre à jour le compteur d'étudiants
    const updatedClasses = classes.map(cls => {
      if (cls.id === currentClassId) {
        return {
          ...cls,
          studentCount: Math.max(0, cls.studentCount - 1),
          students: cls.students?.filter(id => id !== studentId) || []
        };
      }
      return cls;
    });
    
    setClasses(updatedClasses);
    setCurrentClassStudents(updatedStudents.filter(s => s.classId === currentClassId));
  };

  return (
    <div className="space-y-6 p-6">
      {/* En-tête avec titre et barre de recherche */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-brand" />
          Gestion des classes
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une classe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <button
            onClick={() => {
              setNewClass({
                name: '',
                level: '1ère Maternelle',
                teacher: '',
                capacity: 30,
                academicYear: '2024-2025',
                students: []
              });
              setEditingClass(null);
              setIsCreateModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand text-black rounded-md hover:bg-brand/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nouvelle classe
          </button>
        </div>
      </div>

      {/* Tableau des classes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Classe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enseignant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Élèves
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Année scolaire
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <tr key={cls.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cls.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cls.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cls.teacher}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => handleManageStudents(cls.id)}
                        className="text-brand hover:underline"
                      >
                        {cls.studentCount} / {cls.capacity}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cls.academicYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(cls)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => confirmDelete(cls.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Aucune classe trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de création/édition de classe */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingClass ? 'Modifier la classe' : 'Créer une nouvelle classe'}
                </h3>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingClass(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom de la classe *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
                    placeholder="Ex: 6P-A"
                  />
                </div>
                
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Niveau *
                  </label>
                  <select
                    id="level"
                    required
                    value={newClass.level}
                    onChange={(e) => setNewClass({...newClass, level: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
                  >
                    {classLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">
                    Enseignant responsable *
                  </label>
                  <input
                    type="text"
                    id="teacher"
                    required
                    value={newClass.teacher}
                    onChange={(e) => setNewClass({...newClass, teacher: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
                    placeholder="Nom de l'enseignant"
                  />
                </div>
                
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                    Capacité maximale
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    min="1"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({...newClass, capacity: parseInt(e.target.value) || 30})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
                  />
                </div>
                
                <div>
                  <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">
                    Année scolaire *
                  </label>
                  <select
                    id="academicYear"
                    required
                    value={newClass.academicYear}
                    onChange={(e) => setNewClass({...newClass, academicYear: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand"
                  >
                    {academicYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setEditingClass(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand/90"
                  >
                    {editingClass ? 'Mettre à jour' : 'Créer la classe'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {isDeleteConfirmOpen && classToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Confirmer la suppression</h3>
              <button
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setClassToDelete(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer cette classe ? Cette action est irréversible.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setClassToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de gestion des étudiants */}
      {isManageStudentsOpen && currentClassId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Gérer les étudiants - {classes.find(c => c.id === currentClassId)?.name}
                </h3>
                <button
                  onClick={() => {
                    setIsManageStudentsOpen(false);
                    setCurrentClassId(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Étudiants dans la classe */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Étudiants dans la classe</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-2">
                    {currentClassStudents.length > 0 ? (
                      currentClassStudents.map((student) => (
                        <div key={student.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.matricule}</p>
                          </div>
                          <button
                            onClick={() => removeStudentFromClass(student.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Retirer de la classe"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">Aucun étudiant dans cette classe</p>
                    )}
                  </div>
                </div>
                
                {/* Étudiants disponibles */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Étudiants disponibles</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-2">
                    {students
                      .filter(s => !s.classId || !currentClassStudents.some(cs => cs.id === s.id))
                      .map((student) => (
                        <div key={student.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.matricule}</p>
                          </div>
                          <button
                            onClick={() => addStudentToClass(student.id)}
                            className="text-brand hover:text-brand/80 p-1"
                            title="Ajouter à la classe"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    {students.every(s => s.classId && s.classId === currentClassId) && (
                      <p className="text-sm text-gray-500 text-center py-4">Tous les étudiants sont déjà dans cette classe</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={() => {
                  setIsManageStudentsOpen(false);
                  setCurrentClassId(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
