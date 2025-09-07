import { useState } from 'react';
import { Send, Mail, User, Users, X, Check, Clock, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  to: string;
  toId: string;
  subject: string;
  content: string;
  date: string;
  status: 'sent' | 'draft' | 'error';
  type: 'student' | 'parent' | 'class';
}

type TabType = 'inbox' | 'sent' | 'new';

const sampleMessages: Message[] = [
  {
    id: '1',
    to: 'Tous les parents de CM2A',
    toId: 'class-1',
    subject: 'Réunion parents-professeurs',
    content: 'Je vous informe que la réunion parents-professeurs est prévue pour le 25 octobre à 16h00 dans la salle de classe.',
    date: '2023-10-10T14:30:00',
    status: 'sent',
    type: 'class'
  },
  {
    id: '2',
    to: 'Mme. Diop (Parent de Lina)',
    toId: 'p001',
    subject: 'Progrès en mathématiques',
    content: 'Je voulais vous informer que Lina a fait des progrès remarquables en mathématiques ce trimestre.',
    date: '2023-10-08T10:15:00',
    status: 'sent',
    type: 'parent'
  },
  {
    id: '3',
    to: 'Amadou Ndiaye',
    toId: 's002',
    subject: 'Devoir de français',
    content: 'N\'oublie pas de rendre ton devoir de français pour demain.',
    date: '2023-10-05T16:45:00',
    status: 'sent',
    type: 'student'
  },
];

const recipients = [
  { id: 'class-1', name: 'Tous les parents de CM2A', type: 'class' as const },
  { id: 'p001', name: 'Mme. Diop (Parent de Lina)', type: 'parent' as const },
  { id: 'p002', name: 'M. Ndiaye (Parent d\'Amadou)', type: 'parent' as const },
  { id: 'p003', name: 'M. Fall (Parent d\'Aïssatou)', type: 'parent' as const },
  { id: 's001', name: 'Lina Diop', type: 'student' as const },
  { id: 's002', name: 'Amadou Ndiaye', type: 'student' as const },
  { id: 's003', name: 'Aïssatou Fall', type: 'student' as const },
];

export default function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState<TabType>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [newMessage, setNewMessage] = useState<{
    to: string;
    toId: string;
    subject: string;
    content: string;
    type: 'student' | 'parent' | 'class';
  }>({ 
    to: '',
    toId: '',
    subject: '',
    content: '',
    type: 'parent'
  });
  const [messages, setMessages] = useState<Message[]>(sampleMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: Message = {
      id: Date.now().toString(),
      to: newMessage.to,
      toId: newMessage.toId,
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString(),
      status: 'sent',
      type: newMessage.type as 'student' | 'parent' | 'class'
    };
    
    setMessages([newMsg, ...messages]);
    setNewMessage({ to: '', toId: '', subject: '', content: '', type: 'parent' });
    setIsComposing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRecipientIcon = (type: string) => {
    switch (type) {
      case 'student':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'parent':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'class':
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <Mail className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
      <div className="border-b border-black/10">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'inbox' 
                ? 'border-brand text-brand' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Boîte de réception
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'sent' 
                ? 'border-brand text-brand' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Messages envoyés
          </button>
          <div className="flex-1 flex justify-end pr-4">
            <button
              onClick={() => {
                setIsComposing(true);
                setSelectedMessage(null);
              }}
              className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand text-black text-sm shadow-sm hover:bg-brand/90 transition-colors"
            >
              <Send className="h-4 w-4" />
              Nouveau message
            </button>
          </div>
        </nav>
      </div>

      <div className="flex h-[500px] overflow-hidden">
        {/* Message List */}
        <div className={`${selectedMessage || isComposing ? 'hidden md:block md:w-1/3' : 'w-full'} border-r border-black/10 overflow-y-auto`}>
          <div className="divide-y divide-black/10">
            {messages.filter(msg => 
              activeTab === 'inbox' || 
              (activeTab === 'sent' && msg.status === 'sent')
            ).map((message) => (
              <div 
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  setIsComposing(false);
                }}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${
                  selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getRecipientIcon(message.type)}
                    <span className="font-medium text-sm truncate">
                      {message.to}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {formatDate(message.date).split(' ')[0]}
                  </div>
                </div>
                <h3 className="font-medium mt-1 text-sm">
                  {message.subject}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {message.content}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {message.type === 'student' ? 'Élève' : 
                     message.type === 'parent' ? 'Parent' : 'Classe'}
                  </span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(message.status)}
                    <span className="text-xs text-gray-500">
                      {formatDate(message.date).split(' ')[1]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail or Compose */}
        <div className={`${selectedMessage || isComposing ? 'w-full md:w-2/3' : 'hidden'} flex flex-col h-full`}>
          {selectedMessage && !isComposing ? (
            <>
              <div className="p-4 border-b border-black/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-medium">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">À: {selectedMessage.to}</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(selectedMessage.date)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMessage(null)}
                    className="md:hidden text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{selectedMessage.content}</p>
                </div>
              </div>
              <div className="p-4 border-t border-black/10 bg-gray-50">
                <button
                  onClick={() => {
                    setNewMessage({
                      to: selectedMessage.to,
                      toId: selectedMessage.toId,
                      subject: `Re: ${selectedMessage.subject}`,
                      content: `\n\n\n---\n${selectedMessage.content}`,
                      type: selectedMessage.type
                    });
                    setIsComposing(true);
                    setSelectedMessage(null);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-gray-300 text-sm shadow-sm hover:bg-gray-50"
                >
                  <Mail className="h-4 w-4" />
                  Répondre
                </button>
              </div>
            </>
          ) : isComposing ? (
            <form onSubmit={handleSendMessage} className="flex flex-col h-full">
              <div className="p-4 border-b border-black/10">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Nouveau message</h2>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsComposing(false);
                      setNewMessage({ to: '', toId: '', subject: '', content: '', type: 'parent' });
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destinataire *
                  </label>
                  <select
                    required
                    value={newMessage.toId}
                    onChange={(e) => {
                      const selected = recipients.find(r => r.id === e.target.value);
                      if (selected) {
                        setNewMessage({
                          ...newMessage,
                          to: selected.name,
                          toId: selected.id,
                          type: selected.type
                        });
                      }
                    }}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Sélectionner un destinataire</option>
                    <optgroup label="Classes">
                      {recipients.filter(r => r.type === 'class').map(recipient => (
                        <option key={recipient.id} value={recipient.id}>
                          {recipient.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Parents">
                      {recipients.filter(r => r.type === 'parent').map(recipient => (
                        <option key={recipient.id} value={recipient.id}>
                          {recipient.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Élèves">
                      {recipients.filter(r => r.type === 'student').map(recipient => (
                        <option key={recipient.id} value={recipient.id}>
                          {recipient.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objet *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Objet du message"
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                    className="w-full h-64 p-2 border rounded-md"
                    placeholder="Écrivez votre message ici..."
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      Joindre un fichier
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.to || !newMessage.subject || !newMessage.content}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand text-black text-sm shadow-sm hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                    Envoyer
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center p-6">
                <Mail className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium">Aucun message sélectionné</h3>
                <p className="mt-1 text-sm">Sélectionnez un message ou créez-en un nouveau</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
