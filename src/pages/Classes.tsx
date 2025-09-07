import { GraduationCap, BookOpen, Palette, Music, Globe, Calculator, TestTube2, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const levels = [
  {
    title: 'Maternelle',
    description: 'Un environnement chaleureux et stimulant pour les tout-petits, favorisant leur éveil et leur développement global.',
    age: '3-5 ans',
    icon: <GraduationCap className="h-8 w-8" />,
    features: [
      'Éveil sensoriel et moteur',
      'Socialisation et autonomie',
      'Découverte du langage',
      'Activités créatives et artistiques',
      'Sorties éducatives',
    ],
    color: 'from-pink-500 to-purple-500',
  },
  {
    title: 'Primaire',
    description: 'Un apprentissage complet et progressif pour construire des bases solides dans toutes les matières fondamentales.',
    age: '6-11 ans',
    icon: <BookOpen className="h-8 w-8" />,
    features: [
      'Français et mathématiques',
      'Sciences et technologie',
      'Histoire-géographie',
      'Langues vivantes',
      'Éducation physique et sportive',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Secondaire',
    description: 'Un enseignement approfondi pour préparer les élèves aux études supérieures et à leur future vie professionnelle.',
    age: '12-18 ans',
    icon: <GraduationCap className="h-8 w-8" />,
    features: [
      'Enseignements généraux et spécialisés',
      'Orientation professionnelle',
      'Projets interdisciplinaires',
      'Préparation aux examens',
      'Ateliers pratiques',
    ],
    color: 'from-green-500 to-teal-500',
  },
];

const subjects = [
  { name: 'Arts', icon: <Palette className="h-6 w-6" /> },
  { name: 'Musique', icon: <Music className="h-6 w-6" /> },
  { name: 'Langues', icon: <Globe className="h-6 w-6" /> },
  { name: 'Mathématiques', icon: <Calculator className="h-6 w-6" /> },
  { name: 'Sciences', icon: <TestTube2 className="h-6 w-6" /> },
  { name: 'Histoire', icon: <History className="h-6 w-6" /> },
];

export default function Classes() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos Niveaux d'Enseignement
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Découvrez nos différents cycles éducatifs conçus pour accompagner chaque élève dans son parcours d'apprentissage.
          </motion.p>
        </div>
      </section>

      {/* Class Levels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {levels.map((level, index) => (
              <motion.div
                key={level.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                <div className={`h-2 bg-gradient-to-r ${level.color}`}></div>
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${level.color} text-white mb-4`}>
                    {level.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{level.title}</h2>
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <p className="text-sm text-gray-500 mb-6">Âge: {level.age}</p>
                  
                  <h3 className="font-medium text-gray-900 mb-3">Domaines d'apprentissage :</h3>
                  <ul className="space-y-2 mb-6">
                    {level.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={`/contact?interest=${encodeURIComponent(level.title)}`}
                    className={`mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r ${level.color} hover:opacity-90 transition-opacity`}
                  >
                    En savoir plus
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Matières</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un enseignement diversifié et de qualité dans toutes les disciplines fondamentales.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ y: -5, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              >
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  {subject.icon}
                </div>
                <h3 className="font-medium text-gray-900">{subject.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à nous rejoindre ?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Découvrez comment nous pouvons accompagner votre enfant dans son parcours éducatif.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
            >
              Nous contacter
            </Link>
            <Link
              to="/admission"
              className="px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              Procédure d'admission
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
