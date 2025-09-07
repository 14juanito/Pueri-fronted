import { useState } from 'react';
import { Send, MessageSquare, User, Users, BookOpen } from 'lucide-react';

type AudienceType = 'all' | 'teachers' | 'parents' | 'class';
type ClassType = {
  id: string;
  name: string;
};

export function CommunicationCenter() {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [audience, setAudience] = useState<AudienceType>('all');
  const [selectedClass, setSelectedClass] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Simuler des classes (à remplacer par une vraie liste depuis votre store/API)
  const classes: ClassType[] = [
    { id: '1', name: 'CP' },
    { id: '2', name: 'CE1' },
    { id: '3', name: 'CE2' },
    { id: '4', name: 'CM1' },
    { id: '5', name: 'CM2' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !subject.trim()) return;

    setIsSending(true);
    
    try {
      // Simuler un envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici, vous ajouterez la logique d'envoi à votre API
      console.log('Message envoyé:', {
        subject,
        message,
        audience,
        class: audience === 'class' ? selectedClass : undefined,
      });
      
      setIsSent(true);
      setMessage('');
      setSubject('');
      
      // Réinitialiser le message de succès après 3 secondes
      setTimeout(() => setIsSent(false), 3000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Nouvelle communication</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Objet
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              placeholder="Objet de la communication"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              placeholder="Votre message..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destinataires
            </label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <button
                type="button"
                onClick={() => setAudience('all')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  audience === 'all' 
                    ? 'border-brand bg-brand/10 text-brand' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5 mb-1" />
                <span className="text-sm">Tous</span>
              </button>
              
              <button
                type="button"
                onClick={() => setAudience('teachers')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  audience === 'teachers' 
                    ? 'border-brand bg-brand/10 text-brand' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 mb-1" />
                <span className="text-sm">Professeurs</span>
              </button>
              
              <button
                type="button"
                onClick={() => setAudience('parents')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  audience === 'parents' 
                    ? 'border-brand bg-brand/10 text-brand' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5 mb-1" />
                <span className="text-sm">Parents</span>
              </button>
              
              <button
                type="button"
                onClick={() => setAudience('class')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  audience === 'class' 
                    ? 'border-brand bg-brand/10 text-brand' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="h-5 w-5 mb-1" />
                <span className="text-sm">Classe</span>
              </button>
            </div>
            
            {audience === 'class' && (
              <div className="mt-3">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  required
                >
                  <option value="">Sélectionnez une classe</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSending || !message.trim() || !subject.trim() || (audience === 'class' && !selectedClass)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                'Envoi en cours...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer la communication
                </>
              )}
            </button>
          </div>
          
          {isSent && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
              Votre communication a été envoyée avec succès !
            </div>
          )}
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Historique des communications</h2>
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p>Aucune communication récente</p>
        </div>
      </div>
    </div>
  );
}
