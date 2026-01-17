import Link from 'next/link';
import {
  Sparkles,
  Users,
  Globe,
  Shield,
  Zap,
  Heart,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Create Micro-IP',
      description: 'Build characters, worlds, stories, and lore in bite-sized pieces that can be easily shared and remixed.',
    },
    {
      icon: Shield,
      title: 'Control Your Rights',
      description: 'Choose from multiple licensing options to control how others can use your creative work.',
    },
    {
      icon: Users,
      title: 'Connect & Collaborate',
      description: 'Discover other creators, fork their work, and build upon each other\'s ideas.',
    },
    {
      icon: Globe,
      title: 'Build Universes',
      description: 'Link characters, stories, and lore together to create rich, interconnected worlds.',
    },
  ];

  const values = [
    {
      title: 'Creator-First',
      description: 'We believe creators should own and control their intellectual property. Every feature is designed with creator rights in mind.',
    },
    {
      title: 'Open Collaboration',
      description: 'The best stories are built together. We make it easy to share, remix, and build upon each other\'s work with proper attribution.',
    },
    {
      title: 'Accessible Creation',
      description: 'You don\'t need to write a novel to share your ideas. Micro-IP makes creative writing accessible to everyone.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            About Plotter
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Where Stories Begin
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Plotter is the marketplace for micro intellectual property. We help writers create, share, and discover bite-sized creative content—from characters and worlds to stories and lore.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We&apos;re democratizing creative worldbuilding. Not everyone has time to write a novel, but everyone has stories to tell. Plotter makes it easy to capture those ideas and share them with the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-2">Create Your IP</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use our intuitive editor to create characters, build worlds, write stories, or document lore. Each piece of content is a self-contained unit of intellectual property.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-2">Choose Your License</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Decide how others can use your work. From completely open to restricted viewing, you control your creative rights.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-2">Share & Discover</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Publish your work to the marketplace. Discover creations from other writers. Fork and remix with proper attribution.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-2">Build Your Universe</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect your creations together. Link characters to worlds, stories to lore. Build rich, interconnected universes piece by piece.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start creating?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join our community of writers and start building your creative universe today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
