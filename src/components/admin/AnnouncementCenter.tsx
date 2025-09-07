import { useState } from 'react';
import { Mail, X, Check, Clock, AlertCircle, Plus } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  recipients: string[];
  date: string;
  status: 'draft' | 'scheduled' | 'sent' | 'error';
  scheduledDate?: string;
}

export default function AnnouncementCenter() {
  const [activeTab, setActiveTab] = useState<'drafts' | 'scheduled' | 'sent'>('drafts');
  const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState<Omit<Announcement, 'id' | 'date' | 'status'>>({ 
    title: '',
    content: '',
    recipients: [],
  });
  const [scheduledDate, setScheduledDate] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  // Données factices pour les annonces
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Réouverture de l\'école',
      content: 'Chers parents, nous avons le plaisir de vous informer que l\'école rouvrira ses portes le lundi 10 octobre. Les cours reprendront normalement selon l\'emploi du temps habituel.',
      recipients: ['Tous les parents'],
      date: '2023-10-05T14:30:00',
      status: 'sent'
    },
    {
      id: '2',
      title: 'Réunion du conseil d\'école',
      content: 'La prochaine réunion du conseil d\'école est prévue pour le vendredi 15 octobre à 17h00 dans la salle de réunion.',
      recipients: ['Membres du conseil d\'école'],
      date: '2023-10-12T09:15:00',
      status: 'scheduled',
      scheduledDate: '2023-10-12T09:15:00'
    },
    {
      id: '3',
      title: 'Projet éducatif 2023-2024',
      content: 'Veuillez trouver ci-joint le projet éducatif de l\'école pour l\'année scolaire 2023-2024.',
      recipients: [],
      date: '2023-09-28T16:45:00',
      status: 'draft'
    }
  ]);

  const recipientOptions = [
    { id: 'all', label: 'Tous les parents' },
    { id: 'teachers', label: 'Tous les enseignants' },
    { id: 'staff', label: 'Tout le personnel' },
    { id: 'specific', label: 'Destinataires spécifiques' },
    { id: 'class-1', label: 'Parents de la 1ère Maternelle' },
    { id: 'class-2', label: 'Parents de la 2e Maternelle' },
    { id: 'class-3', label: 'Parents de la 3e Maternelle' },
    { id: 'class-4', label: 'Parents du Primaire' },
    { id: 'class-5', label: 'Parents du Secondaire' },
  ];

  const handleRecipientToggle = (recipientId: string) => {
    setSelectedRecipients(prev => {
      if (prev.includes(recipientId)) {
        return prev.filter(id => id !== recipientId);
      } else {
        return [...prev, recipientId];
      }
    });
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (announcements.length + 1).toString();
    const now = new Date().toISOString();
    
    const announcement: Announcement = {
      id: newId,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      recipients: selectedRecipients.map(id => 
        recipientOptions.find(r => r.id === id)?.label || id
      ),
      date: now,
      status: scheduledDate ? 'scheduled' : 'sent',
      ...(scheduledDate && { scheduledDate })
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: '', content: '', recipients: [] });
    setSelectedRecipients([]);
    setScheduledDate('');
    setIsNewAnnouncementOpen(false);
  };

  const getStatusBadge = (status: Announcement['status']) => {
    switch (status) {
      case 'sent':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" /> Envoyé
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" /> Planifié
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Brouillon
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" /> Erreur
          </span>
        );
      default:
        return null;
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (activeTab === 'drafts') return announcement.status === 'draft';
    if (activeTab === 'scheduled') return announcement.status === 'scheduled';
    if (activeTab === 'sent') return announcement.status === 'sent';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail className="h-5 w-5 text-brand" />
          Centre de communication
        </h2>
        <button
          onClick={() => setIsNewAnnouncementOpen(true)}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-brand text-black text-sm shadow-sm hover:bg-brand/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nouveau communiqué
        </button>
      </div>

      <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
        <div className="border-b border-black/10">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('drafts')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'drafts'
                  ? 'border-b-2 border-brand text-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Brouillons
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'scheduled'
                  ? 'border-b-2 border-brand text-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Planifiés
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'sent'
                  ? 'border-b-2 border-brand text-brand'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Envoyés
            </button>
          </nav>
        </div>

        <div className="divide-y divide-black/10">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {announcement.title}
                      </h3>
                      {getStatusBadge(announcement.status)}
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {announcement.content}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {announcement.recipients.length > 0 ? (
                        announcement.recipients.map((recipient, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {recipient}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">Aucun destinataire sélectionné</span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                    <p className="text-xs text-gray-500">
                      {new Date(announcement.date).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    {announcement.status === 'scheduled' && announcement.scheduledDate && (
                      <p className="mt-1 text-xs text-blue-600">
                        Planifié pour {new Date(announcement.scheduledDate).toLocaleString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun communiqué trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === 'drafts' 
                  ? 'Vous n\'avez aucun brouillon de communiqué.'
                  : activeTab === 'scheduled'
                  ? 'Aucun communiqué planifié pour le moment.'
                  : 'Aucun communiqué envoyé pour le moment.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de nouveau communiqué */}
      {isNewAnnouncementOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Nouveau communiqué</h3>
              <button 
                onClick={() => {
                  setIsNewAnnouncementOpen(false);
                  setNewAnnouncement({ title: '', content: '', recipients: [] });
                  setSelectedRecipients([]);
                  setScheduledDate('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSendAnnouncement} className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titre du communiqué *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                  placeholder="Ex: Réouverture de l'école"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Contenu du message *
                </label>
                <textarea
                  id="content"
                  rows={6}
                  required
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                  placeholder="Rédigez votre message ici..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinataires *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                  {recipientOptions.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={`recipient-${option.id}`}
                        name="recipients"
                        type="checkbox"
                        checked={selectedRecipients.includes(option.id)}
                        onChange={() => handleRecipientToggle(option.id)}
                        className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                      />
                      <label htmlFor={`recipient-${option.id}`} className="ml-2 block text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Planifier l'envoi (facultatif)
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduledDate"
                    min={new Date().toISOString().slice(0, 16)}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-brand focus:border-brand"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewAnnouncementOpen(false);
                    setNewAnnouncement({ title: '', content: '', recipients: [] });
                    setSelectedRecipients([]);
                    setScheduledDate('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                  {scheduledDate ? 'Planifier' : 'Envoyer maintenant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
