import Link from 'next/link'
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-fds-dark text-white section">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">FDS France</h3>
            <p className="text-gray-300 text-sm">
              Front Démocratique et Social - Pour une Afrique juste, moderne et souveraine.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/le-parti" className="text-gray-300 hover:text-white">Le Parti</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white">Actualités</Link></li>
              <li><Link href="/publications" className="text-gray-300 hover:text-white">Publications</Link></li>
              <li><Link href="/evenements" className="text-gray-300 hover:text-white">Événements</Link></li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/diaspora" className="text-gray-300 hover:text-white">Diaspora</Link></li>
              <li><Link href="/rejoindre" className="text-gray-300 hover:text-white">Rejoindre</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-bold text-lg mb-4">Suivez-nous</h3>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-fds-green transition"><FiFacebook /></a>
              <a href="#" className="hover:text-fds-green transition"><FiTwitter /></a>
              <a href="#" className="hover:text-fds-green transition"><FiLinkedin /></a>
              <a href="#" className="hover:text-fds-green transition"><FiInstagram /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 FDS France. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
