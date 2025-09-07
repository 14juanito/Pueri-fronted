import { useState } from 'react';
import { Settings } from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    schoolName: 'C.S. Pueri Angeli',
    address: 'Avenue de la Libération, 1234, Gombe, Kinshasa',
    phone: '+243 81 000 0000',
    email: 'contact@pueriangeli.cd',
    website: 'www.pueriangeli.cd',
    academicYear: '2024-2025',
    maxStudentsPerClass: 35,
    enableParentNotifications: true,
    enableSmsAlerts: false,
    defaultLanguage: 'fr',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Africa/Lubumbashi',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez ajouter la logique pour sauvegarder les paramètres
    alert('Paramètres mis à jour avec succès !');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-6 w-6 text-brand" />
        <h2 className="text-xl font-semibold">Paramètres</h2>
      </div>

      <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
        <div className="border-b border-black/10">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'general'
                  ? 'border-b-2 border-brand text-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Général
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-brand text-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'academic'
                  ? 'border-b-2 border-brand text-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Scolarité
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'security'
                  ? 'border-b-2 border-brand text-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sécurité
            </button>
          </nav>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Informations de l'école</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom de l'école
                      </label>
                      <input
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        value={settings.schoolName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                      />
                    </div>
                    <div>
                      <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
                        Année scolaire
                      </label>
                      <input
                        type="text"
                        id="academicYear"
                        name="academicYear"
                        value={settings.academicYear}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={settings.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={settings.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                        Site web
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={settings.website}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Préférences de notification</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="enableParentNotifications"
                        name="enableParentNotifications"
                        type="checkbox"
                        checked={settings.enableParentNotifications}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enableParentNotifications" className="font-medium text-gray-700">
                        Activer les notifications aux parents
                      </label>
                      <p className="text-gray-500">Envoyer des notifications par email aux parents pour les absences, les notes, etc.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="enableSmsAlerts"
                        name="enableSmsAlerts"
                        type="checkbox"
                        checked={settings.enableSmsAlerts}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enableSmsAlerts" className="font-medium text-gray-700">
                        Activer les alertes SMS
                      </label>
                      <p className="text-gray-500">Envoyer des notifications importantes par SMS aux parents</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Paramètres académiques</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="maxStudentsPerClass" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre maximum d'élèves par classe
                    </label>
                    <input
                      type="number"
                      id="maxStudentsPerClass"
                      name="maxStudentsPerClass"
                      min="1"
                      max="50"
                      value={settings.maxStudentsPerClass}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                      Langue par défaut
                    </label>
                    <select
                      id="defaultLanguage"
                      name="defaultLanguage"
                      value={settings.defaultLanguage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                    >
                      <option value="fr">Français</option>
                      <option value="en">Anglais</option>
                      <option value="ln">Lingala</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Paramètres de sécurité</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
                      Format de date
                    </label>
                    <select
                      id="dateFormat"
                      name="dateFormat"
                      value={settings.dateFormat}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                    >
                      <option value="DD/MM/YYYY">JJ/MM/AAAA</option>
                      <option value="MM/DD/YYYY">MM/JJ/AAAA</option>
                      <option value="YYYY-MM-DD">AAAA-MM-JJ</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                      Fuseau horaire
                    </label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand focus:border-brand"
                    >
                      <option value="Africa/Kinshasa">Kinshasa (GMT+1)</option>
                      <option value="Africa/Lubumbashi">Lubumbashi (GMT+2)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
