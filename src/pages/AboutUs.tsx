import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Award, Heart, School, User, Mail, Phone, MapPin } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const teamMembers = [
  {
    name: 'Mme. Marie-Louise Kabasele',
    role: 'Directrice Générale',
    bio: 'Avec plus de 20 ans d\'expérience dans l\'éducation en RDC, elle dirige notre établissement avec passion et dévouement pour l\'excellence éducative.',
    image: '/logo.png',
  },
  {
    name: 'M. Didier Tshibangu',
    role: 'Directeur des Études Secondaires',
    bio: 'Expert en pédagogie, il supervise les programmes académiques du secondaire avec rigueur et innovation.',
    image: '/logo.png',
  },
  {
    name: 'Mme. Grace Mbayo',
    role: 'Directrice du Primaire',
    bio: 'Spécialiste de l\'enseignement fondamental, elle veille à l\'épanouissement de chaque élève du primaire.',
    image: '/logo.png',
  },
  {
    name: 'Mme. Sarah Mbuyi',
    role: 'Responsable Maternelle',
    bio: 'Passionnée par la petite enfance, elle crée un environnement chaleureux pour nos tout-petits.',
    image: '/logo.png',
  },
];

const stats = [
  { id: 1, name: 'Années d\'excellence', value: '12+', icon: <Award className="h-8 w-8 text-white" /> },
  { id: 2, name: 'Élèves', value: '450+', icon: <Users className="h-8 w-8 text-white" /> },
  { id: 3, name: 'Enseignants qualifiés', value: '35+', icon: <User className="h-8 w-8 text-white" /> },
  { id: 4, name: 'Taux de réussite', value: '95%', icon: <Heart className="h-8 w-8 text-white" /> },
];

const values = [
  {
    name: 'Excellence Académique',
    description: 'Un programme éducatif rigoureux conforme au programme national de la RDC, enrichi par des méthodes pédagogiques innovantes.',
    icon: <Award className="h-6 w-6 text-blue-600" />,
  },
  {
    name: 'Enracinement Culturel',
    description: 'Fiers de notre héritage congolais, nous intégrons la culture locale dans notre programme éducatif.',
    icon: <Users className="h-6 w-6 text-blue-600" />,
  },
  {
    name: 'Ouverture Internationale',
    description: 'Un apprentissage bilingue (français/anglais) et une ouverture sur le monde pour préparer nos élèves aux défis globaux.',
    icon: <School className="h-6 w-6 text-blue-600" />,
  },
  {
    name: 'Communauté Bienveillante',
    description: 'Nous cultivons un environnement inclusif et bienveillant pour tous les membres de notre communauté scolaire.',
    icon: <Users className="h-6 w-6 text-blue-600" />,
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMzYgMzR2LTRoNHY0aDR2NGgtNHY0aC00di00aC00di00aDR6bTAtMTZ2NGg0djRoNHY0aC00djRoLTR2LTRoLTJ2LTJoMnYtMmgydjJ6TTI0IDZ2NGg0djRoNHY0aC00djRoLTR2LTRoLTR2LTRoNHYtNGg0em0xMiAxMnY0aDR2NGgtNHYtNHptMCAyNHY0aDR2LTRoLTJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos de Notre École</h1>
            <p className="text-xl text-blue-100">
              Découvrez notre engagement envers l'excellence éducative et notre passion pour le développement de chaque élève.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div 
              className="mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fondée en 2010, notre école s'est rapidement imposée comme une référence dans l'éducation de qualité en Afrique de l'Ouest.
                  Notre mission est de former des leaders éclairés, créatifs et responsables, prêts à relever les défis de demain.
                </p>
                <p>
                  Au fil des années, nous avons construit une communauté éducative dynamique qui allie tradition et innovation,
                  tout en restant fidèle à nos valeurs fondamentales d'excellence, d'intégrité et de respect.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers de compter parmi nos anciens élèves des professionnels accomplis dans divers domaines,
                  témoignant de la qualité de l'éducation que nous dispensons.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="/img-1-pueri.png" 
                alt="Élèves de l'école" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold">Une école, une famille</h3>
                  <p className="text-blue-100">Construire l'avenir ensemble</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.id}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 mb-4">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Nos Valeurs
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Les principes fondamentaux qui guident notre action éducative
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={value.name}
                className="flex items-start p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    {value.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{value.name}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Notre Équipe Pédagogique
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Des professionnels passionnés dédiés à la réussite de vos enfants
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Prêt à nous rejoindre ?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Découvrez comment nous pouvons accompagner votre enfant dans son parcours éducatif.
                Notre équipe est à votre disposition pour répondre à toutes vos questions.
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
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Adresse</h3>
              <p className="text-gray-600">123 Avenue de l'Éducation<br />Dakar, Sénégal</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
              <p className="text-blue-600">contact@pueriangeli.sn</p>
              <p className="text-blue-600">admission@pueriangeli.sn</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600">+221 33 123 45 67</p>
              <p className="text-gray-600">+221 77 123 45 67</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
