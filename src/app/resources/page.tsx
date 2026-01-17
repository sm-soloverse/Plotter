import Link from 'next/link';
import { BookOpen, Globe, Shield, Code, Sparkles, ArrowRight } from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    {
      title: 'Writing Tips',
      description: 'Craft compelling stories with advice on character development, story structure, and writing craft.',
      icon: BookOpen,
      href: '/resources/writing-tips',
      color: 'bg-blue-500',
    },
    {
      title: 'Worldbuilding Guide',
      description: 'Create rich, immersive universes with guides on geography, cultures, history, and magic systems.',
      icon: Globe,
      href: '/resources/worldbuilding',
      color: 'bg-green-500',
    },
    {
      title: 'Licensing Guide',
      description: 'Understand your rights and choose the best license for your creative work.',
      icon: Shield,
      href: '/resources/licensing',
      color: 'bg-purple-500',
    },
  ];

  const quickTips = [
    'Start with a single character or location and expand from there',
    'Use markdown formatting to organize your content with headings and lists',
    'Tag your creations to help others discover them',
    'Link your creations to worlds to build interconnected universes',
    'Fork others\' work (with proper license) to remix and expand ideas',
    'Iterate on drafts before publishing—you can always edit later',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Resources</h1>
              <p className="text-white/80">Guides and tips to level up your creative work</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, i) => {
            const Icon = resource.icon;
            return (
              <Link
                key={i}
                href={resource.href}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${resource.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  {resource.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {resource.description}
                </p>
                <span className="flex items-center gap-1 text-primary-600 text-sm font-medium">
                  Read guide
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Quick Tips */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Tips for Plotter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-600">{i + 1}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API Section */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Developer API</h2>
              <p className="text-gray-400">Coming Soon</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4">
            We&apos;re building an API that will let you integrate Plotter content into your own projects, games, and applications.
          </p>
          <p className="text-gray-400 text-sm">
            Interested in early access? Drop us a line.
          </p>
        </div>
      </div>
    </div>
  );
}
