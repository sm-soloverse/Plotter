import Link from 'next/link';
import { Sparkles, Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Create: [
      { label: 'Characters', href: '/create?type=character' },
      { label: 'Worlds', href: '/create?type=world' },
      { label: 'Stories', href: '/create?type=story' },
      { label: 'Lore', href: '/create?type=lore' },
    ],
    Explore: [
      { label: 'Featured', href: '/explore?featured=true' },
      { label: 'Trending', href: '/explore?sort=trending' },
      { label: 'Recent', href: '/explore?sort=recent' },
      { label: 'Collections', href: '/collections' },
    ],
    Resources: [
      { label: 'Writing Tips', href: '/resources/writing-tips' },
      { label: 'Worldbuilding Guide', href: '/resources/worldbuilding' },
      { label: 'Licensing Guide', href: '/resources/licensing' },
      { label: 'API', href: '/developers' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">Plotter</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              The marketplace for micro intellectual property. Create, share, and discover amazing stories, characters, and worlds.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Plotter. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for storytellers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
