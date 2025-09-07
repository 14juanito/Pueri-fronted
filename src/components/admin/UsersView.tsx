import { User, UserPlus, Edit, Trash2 } from 'lucide-react';

interface UsersViewProps {
  onTabChange?: (tab: string) => void;
}

export function UsersView({ onTabChange }: UsersViewProps = {}) {
  // Sample user data - in a real app, this would come from an API
  const users = [
    {
      id: 1,
      name: 'Mamadou Ndiaye',
      email: 'm.ndiaye@pueriangeli.sn',
      role: 'Enseignant',
      status: 'Actif',
      avatar: null
    },
    {
      id: 2,
      name: 'Aminata Diallo',
      email: 'a.diallo@pueriangeli.sn',
      role: 'Enseignant',
      status: 'Actif',
      avatar: null
    },
    {
      id: 3,
      name: 'Ibrahim Sow',
      email: 'i.sow@pueriangeli.sn',
      role: 'Administrateur',
      status: 'Actif',
      avatar: null
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-medium">Liste des utilisateurs</h2>
            <p className="text-sm text-gray-500">Gérez les comptes utilisateurs et les autorisations</p>
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-brand text-black text-sm shadow-sm hover:bg-brand/90">
            <UserPlus className="h-4 w-4" />
            Ajouter un utilisateur
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/10">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-black/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {user.avatar ? (
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                        ) : (
                          <User className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
