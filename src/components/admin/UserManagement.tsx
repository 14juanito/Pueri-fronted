import { useState } from 'react';
import { User, UserPlus, UserCog, Search, Edit, Trash2, X, Phone } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
}

const sampleUsers: UserData[] = [
  {
    id: 'u1',
    name: 'Mariama Diop',
    email: 'mariama.diop@example.com',
    phone: '77 123 45 67',
    role: 'parent',
    status: 'active',
    lastLogin: '2023-10-10T14:30:00',
    createdAt: '2023-01-15T09:30:00'
  },
  {
    id: 'u2',
    name: 'M. Ndiaye',
    email: 'ndiaye@example.com',
    phone: '76 234 56 78',
    role: 'teacher',
    status: 'active',
    lastLogin: '2023-10-09T11:20:00',
    createdAt: '2023-02-20T10:15:00'
  },
  {
    id: 'u3',
    name: 'Aïssatou Fall',
    email: 'aissatou@example.com',
    phone: '75 345 67 89',
    role: 'student',
    status: 'active',
    lastLogin: '2023-10-08T08:45:00',
    createdAt: '2023-09-01T08:00:00'
  },
  {
    id: 'u4',
    name: 'Papa Sow',
    email: 'papa.sow@example.com',
    phone: '70 456 78 90',
    role: 'parent',
    status: 'inactive',
    lastLogin: '2023-09-28T16:20:00',
    createdAt: '2023-03-10T14:30:00'
  },
  {
    id: 'u5',
    name: 'Mme. Diallo',
    email: 'diallo@example.com',
    phone: '78 567 89 01',
    role: 'teacher',
    status: 'active',
    lastLogin: '2023-10-10T09:15:00',
    createdAt: '2023-04-05T11:20:00'
  }
];

const roleOptions = [
  { value: 'all', label: 'Tous les rôles' },
  { value: 'admin', label: 'Administrateur' },
  { value: 'teacher', label: 'Enseignant' },
  { value: 'parent', label: 'Parent' },
  { value: 'student', label: 'Élève' },
];

const statusOptions = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'pending', label: 'En attente' },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [_, setSelectedUser] = useState<UserData | null>(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'teacher' as const,
    matricule: '',
    password: '',
    confirmPassword: ''
  });

  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    const roleClasses = {
      admin: 'bg-purple-100 text-purple-800',
      teacher: 'bg-blue-100 text-blue-800',
      parent: 'bg-green-100 text-green-800',
      student: 'bg-yellow-100 text-yellow-800',
    };
    
    const roleLabels = {
      admin: 'Admin',
      teacher: 'Enseignant',
      parent: 'Parent',
      student: 'Élève',
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleClasses[role as keyof typeof roleClasses]}`}>
        {roleLabels[role as keyof typeof roleLabels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    
    const statusLabels = {
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En attente',
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    // In a real app, you would open an edit modal here
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, you would show a confirmation dialog and then delete the user
    console.log('Delete user:', userId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Vérifier que les mots de passe correspondent
    if (newUser.password !== newUser.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Ici, vous pourriez ajouter la logique pour enregistrer le nouvel utilisateur
    console.log('Nouvel utilisateur:', {
      ...newUser,
      // Ne pas envoyer le mot de passe de confirmation au serveur
      confirmPassword: undefined
    });
    
    // Réinitialiser le formulaire
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'teacher',
      matricule: '',
      password: '',
      confirmPassword: ''
    });
    
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <UserCog className="h-5 w-5 text-brand" />
          Gestion des utilisateurs
        </h2>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand text-black text-sm shadow-sm hover:bg-brand/90 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          Ajouter un utilisateur
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Rechercher
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand sm:text-sm"
                placeholder="Nom ou email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              id="role"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm rounded-md"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              id="status"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/10">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-black/10">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-brand" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastLogin).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
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
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-black/10 bg-gray-50">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Précédent
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Suivant
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">1</span> à <span className="font-medium">5</span> sur{' '}
                <span className="font-medium">12</span> résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Précédent</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="bg-brand text-black relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium">
                  1
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Suivant</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Ajouter un nouvel utilisateur</h3>
              <button 
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={newUser.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                    placeholder="Nom de famille"
                  />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom(s) *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={newUser.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                    placeholder="Prénom(s)"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={newUser.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                    placeholder="email@exemple.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={newUser.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                    placeholder="+243 XX XXX XXXX"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                  >
                    <option value="teacher">Enseignant</option>
                    <option value="admin">Administrateur</option>
                    <option value="parent">Parent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="matricule" className="block text-sm font-medium text-gray-700 mb-1">
                    Matricule *
                  </label>
                  <input
                    type="text"
                    id="matricule"
                    name="matricule"
                    required
                    value={newUser.matricule}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                    placeholder="Ex: MAT-2024-001"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    minLength={6}
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                    placeholder="••••••"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    minLength={6}
                    value={newUser.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                    placeholder="••••••"
                  />
                </div>
              </div>
              
              <div className="col-span-2 flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                  Ajouter l'utilisateur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
