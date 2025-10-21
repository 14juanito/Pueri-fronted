import { ArrowRight, School, Users, BookOpen, MessageSquare, Calendar, BarChart2, Shield, FileText, User, Quote, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../stores/auth'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

export default function Home() {
  const { isAuthenticated, user } = useAuth()
  return (
    <div className="relative overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand/30 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand shadow-sm backdrop-blur-sm"
            >
              <School className="size-4" /> École Primaire et Secondaire
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span className="bg-gradient-to-r from-brand to-blue-600 bg-clip-text text-transparent">Pueri Angeli</span>
              <span className="block mt-2 text-2xl font-semibold text-gray-600 sm:text-3xl">
                Gestion scolaire simplifiée
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl"
            >
              Établissement scolaire d'excellence à Kinshasa offrant un enseignement de qualité de la maternelle à la terminale. 
              Suivez la scolarité de vos enfants et restez connectés avec notre communauté éducative.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              {isAuthenticated ? (
                <Link
                  to={user?.role === 'ADMIN' ? '/admin' : user?.role === 'TEACHER' ? '/teacher' : '/parent'}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
                >
                  <ArrowRight className="size-4" />
                  Retour au tableau de bord
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-brand to-blue-600 px-6 py-3.5 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
                >
                  <span className="relative z-10">Se connecter</span>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  <span className="absolute inset-0 bg-gradient-to-r from-brand/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></span>
                </Link>
              )}
            </motion.div>
          </div>
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl bg-white p-2"
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-brand/20">
                <img 
                  src="/img-1-pueri.png" 
                  alt="Élèves de l'école Pueri Angeli à Kinshasa" 
                  className="w-full h-auto object-cover"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <SchoolGallery />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand/10 rounded-full mb-4">Fonctionnalités</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Tout ce dont vous avez besoin pour suivre la scolarité</h2>
            <p className="mt-4 text-lg text-gray-600">Une plateforme complète qui simplifie la gestion scolaire pour les parents, les enseignants et les administrateurs.</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <BarChart2 className="h-8 w-8 text-brand" />,
                title: "Suivi des notes",
                description: "Consultez les notes et les évaluations en temps réel avec des graphiques détaillés."
              },
              {
                icon: <Calendar className="h-8 w-8 text-brand" />,
                title: "Emploi du temps",
                description: "Accédez à l'emploi du temps mis à jour avec les cours, les devoirs et les événements."
              },
              {
                icon: <FileText className="h-8 w-8 text-brand" />,
                title: "Devoirs à faire",
                description: "Ne manquez plus jamais un devoir avec notre système de rappels et de notifications."
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-brand" />,
                title: "Messagerie sécurisée",
                description: "Communiquez facilement avec les enseignants et l'administration."
              },
              {
                icon: <User className="h-8 w-8 text-brand" />,
                title: "Profil personnalisé",
                description: "Gérez les informations personnelles et les préférences de notification."
              },
              {
                icon: <Shield className="h-8 w-8 text-brand" />,
                title: "Sécurité renforcée",
                description: "Vos données sont protégées avec les dernières technologies de chiffrement."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:border-brand/20 hover:shadow-md transition-all duration-300"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand/10 rounded-full mb-4">Témoignages</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Ce que disent nos utilisateurs</h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Marie D.",
                role: "Parent d'élève",
                content: "Enfin une plateforme qui simplifie vraiment la vie des parents ! Je peux suivre la scolarité de mes enfants en un coup d'œil.",
                rating: 5
              },
              {
                name: "Thomas L.",
                role: "Enseignant",
                content: "L'outil idéal pour gérer mes classes et communiquer efficacement avec les parents. Gain de temps considérable !",
                rating: 5
              },
              {
                name: "Sophie M.",
                role: "Directrice d'école",
                content: "Une solution complète qui répond parfaitement aux besoins de notre établissement. L'équipe est très réactive.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-medium">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand to-blue-600">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Prêt à simplifier la gestion scolaire ?</h2>
            <p className="text-lg text-blue-100 mb-8">Rejoignez dès maintenant des milliers d'utilisateurs satisfaits.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
              >
                Espace parents
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
              >
                Demande d'information
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick links by role */}
      <section className="mx-auto max-w-6xl px-4 pb-2">
        <div className="rounded-lg border border-black/10 bg-white p-4 animate-[fade-in_.5s_ease-out_both]">
          <div className="mb-3 font-medium">Liens rapides</div>
          {!isAuthenticated && (
            <p className="text-sm text-black/70">Connectez-vous pour accéder à votre espace.</p>
          )}
          {isAuthenticated && (
            <div className="flex flex-wrap gap-2">
              {user?.role === 'ADMIN' && (
                <>
                  <Link to="/admin/users/new" className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/5 transition-colors">Créer un utilisateur</Link>
                  <Link to="/admin/teachers" className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/5 transition-colors">Liste des professeurs</Link>
                  <Link to="/admin/parents" className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/5 transition-colors">Liste des parents</Link>
                </>
              )}
              {user?.role === 'TEACHER' && (
                <Link to="/teacher/assignments" className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/5 transition-colors">Déposer un devoir</Link>
              )}
              {user?.role === 'PARENT' && (
                <Link to="/parent/assignments" className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/5 transition-colors">Voir les devoirs</Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Founder section */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid items-center gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="aspect-square w-48 rounded-full bg-brand/40 mx-auto" />
          </div>
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs">
              <Quote className="size-4 text-brand" /> La Fondatrice
            </div>
            <h2 className="text-xl font-semibold">Mme. Doe</h2>
            <p className="text-black/70">
              Passionnée d’éducation, elle a fondé l’école avec l’ambition d’offrir un
              environnement d’apprentissage moderne, inclusif et axé sur la réussite de chacun.
            </p>
          </div>
        </div>
      </section>

      {/* Classes & Programs */}
      <section id="programmes" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-xl font-semibold">Classes et Programmes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProgramCard icon={<GraduationCap className="size-5" />} title="Maternelle" desc="Éveil et motricité" />
          <ProgramCard icon={<BookOpen className="size-5" />} title="Primaire" desc="Bases solides des savoirs" />
          <ProgramCard icon={<Users className="size-5" />} title="Secondaire" desc="Approfondissement et méthode" />
        </div>
      </section>

      {/* About & Contact */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xl font-semibold">À propos</h2>
            <p className="text-black/70">
              Notre établissement met l’élève au cœur du projet pédagogique. Nous favorisons la
              curiosité, l’autonomie et la collaboration.
            </p>
            <ul className="mt-4 list-disc pl-5 text-sm text-black/80 space-y-1">
              <li>Approche moderne et inclusive</li>
              <li>Suivi personnalisé</li>
              <li>Encadrement par une équipe expérimentée</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </div>
  )
}

function SchoolGallery() {
  // Available school images
  const images = [
    { src: '/p-1.jpeg', alt: 'Élèves en classe', category: 'Vie scolaire' },
    { src: '/p-2.jpeg', alt: 'Cérémonie de remise des prix', category: 'Événements' },
    { src: '/p-3.jpeg', alt: 'Sortie éducative', category: 'Sorties scolaires' },
    { src: '/p-4.jpeg', alt: 'Atelier créatif', category: 'Activités' },
    { src: '/p-5.jpeg', alt: 'Cours en plein air', category: 'Enseignement' }
  ]

  // Duplicate for seamless marquee
  const loop = [...images, ...images]

  return (
    <div id="gallery" className="relative overflow-hidden py-12 bg-gray-50">
      <motion.h2 
        className="mb-8 text-center text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Galerie de l'école
      </motion.h2>
      
      <div className="relative overflow-hidden">
        <div className="flex w-[200%] animate-marquee hover:animation-pause">
          {loop.map((img, i) => (
            <div key={i} className="w-[200px] flex-shrink-0 px-2">
              <motion.div 
                className="group relative h-48 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md sm:h-56"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-medium text-white">{img.alt}</p>
                    <p className="text-xs text-gray-200">{img.category}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          to="#"
          onClick={(e) => {
            e.preventDefault();
            // Scroll to gallery section
            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand/90"
        >
          Voir toute la galerie
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}

function ProgramCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-4 transition-shadow hover:shadow-sm">
      <div className="mb-2 inline-flex size-9 items-center justify-center rounded-md bg-brand/40 text-black">
        {icon}
      </div>
      <div className="font-medium">{title}</div>
      <div className="text-sm text-black/70">{desc}</div>
    </div>
  )
}

function ContactForm() {
  return (
    <form className="space-y-3 rounded-lg border border-black/10 bg-white p-4">
      <h2 className="text-xl font-semibold">Contact</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm" htmlFor="nom">Nom</label>
          <input id="nom" className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="emailc">Email</label>
          <input id="emailc" type="email" className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm" htmlFor="message">Message</label>
        <textarea id="message" rows={4} className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand" />
      </div>
      <button type="button" className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 font-medium text-black shadow-sm hover:opacity-90">
        Envoyer <ArrowRight className="size-4" />
      </button>
    </form>
  )
}
