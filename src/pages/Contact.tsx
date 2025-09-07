import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: 'Demande d\'information',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi de formulaire
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitMessage({
        type: 'success',
        text: 'Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.'
      });
      
      // Réinitialisation du formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        sujet: 'Demande d\'information',
        message: ''
      });
      
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div>
                <Link 
                  to="/" 
                  className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
                <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
                <p className="text-xl text-blue-100 max-w-3xl">
                  Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre démarche d'inscription.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
                
                {submitMessage.text && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-50 text-green-800' 
                      : 'bg-red-50 text-red-800'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        required
                        value={formData.prenom}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        required
                        value={formData.nom}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-1">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="sujet"
                      name="sujet"
                      required
                      value={formData.sujet}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="Demande d'information">Demande d'information</option>
                      <option value="Inscription">Inscription</option>
                      <option value="Renseignement pédagogique">Renseignement pédagogique</option>
                      <option value="Autre">Autre demande</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Votre message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Décrivez-nous votre demande en quelques mots..."
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        'Envoi en cours...'
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* Informations de contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
                  <p className="text-gray-600 mb-6">
                    Notre équipe est disponible pour répondre à vos questions du lundi au vendredi, de 7h30 à 17h00.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Adresse</h3>
                        <p className="mt-1 text-gray-600">
                          Avenue de la Libération, 1234<br />
                          Commune de la Gombe<br />
                          Kinshasa, RDC
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Email</h3>
                        <p className="mt-1 text-gray-600">
                          <a href="mailto:contact@pueriangeli.cd" className="hover:text-blue-600">
                            contact@pueriangeli.cd
                          </a>
                        </p>
                        <p className="mt-1 text-gray-600">
                          <a href="mailto:admissions@pueriangeli.cd" className="hover:text-blue-600">
                            admissions@pueriangeli.cd
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Téléphone</h3>
                        <p className="mt-1 text-gray-600">
                          <a href="tel:+243810000000" className="hover:text-blue-600">
                            +243 81 000 0000
                          </a>
                        </p>
                        <p className="mt-1 text-gray-600">
                          <a href="tel:+243820000000" className="hover:text-blue-600">
                            +243 82 000 0000 (WhatsApp)
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Heures d'ouverture</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Lundi - Vendredi</span>
                      <span className="font-medium text-gray-900">7h30 - 17h00</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Samedi</span>
                      <span className="font-medium text-gray-900">8h00 - 12h00</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Dimanche</span>
                      <span className="font-medium text-gray-900">Fermé</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Visitez-nous</h3>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.391347576714!2d15.266578215330968!3d-4.322979646804193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a31b0dbd3d1c5%3A0xb1c5f5f5b5f5f5f5!2sKinshasa%2C%20R%C3%A9publique%20D%C3%A9mocratique%20du%20Congo!5e0!3m2!1sfr!2s!4v1620000000000!5m2!1sfr!2s"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Carte de localisation de l'école Pueri Angeli"
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
