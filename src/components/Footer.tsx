import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

interface FooterLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    title: 'Liens rapides',
    links: [
      { name: 'Accueil', href: '/' },
      { name: 'Fonctionnalités', href: '/#features' },
      { name: 'À propos', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Support', href: '/support' },
      { name: 'Mentions légales', href: '/legal' },
      { name: 'Confidentialité', href: '/privacy' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { name: 'contact@pueriangeli.sn', href: 'mailto:contact@pueriangeli.sn', icon: <Mail className="h-4 w-4" /> },
      { name: '+221 77 000 00 00', href: 'tel:+221770000000', icon: <Phone className="h-4 w-4" /> },
      { name: 'Dakar, Sénégal', href: '#', icon: <MapPin className="h-4 w-4" /> },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    {link.icon}
                    <a href={link.href} className="hover:text-white">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Pueri Angeli. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
