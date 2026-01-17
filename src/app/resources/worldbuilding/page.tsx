import Link from 'next/link';
import { ArrowLeft, Globe, Map, Users, Scroll, Sparkles, CheckCircle } from 'lucide-react';

export default function WorldbuildingGuidePage() {
  const sections = [
    {
      title: 'Geography & Environment',
      icon: Map,
      items: [
        'Physical landscape (mountains, rivers, oceans)',
        'Climate and weather patterns',
        'Natural resources and their distribution',
        'Unique geographical features',
        'How geography affects civilization',
      ],
    },
    {
      title: 'Cultures & Societies',
      icon: Users,
      items: [
        'Social structures and hierarchies',
        'Customs, traditions, and rituals',
        'Languages and communication',
        'Art, music, and entertainment',
        'Family structures and relationships',
      ],
    },
    {
      title: 'History & Lore',
      icon: Scroll,
      items: [
        'Creation myths and origin stories',
        'Major historical events',
        'Wars, conflicts, and resolutions',
        'Rise and fall of civilizations',
        'Legendary figures and heroes',
      ],
    },
    {
      title: 'Magic & Technology',
      icon: Sparkles,
      items: [
        'Rules and limitations of magic/tech',
        'Who can access these powers',
        'Cost or consequences of use',
        'How it shapes society',
        'Artifacts and innovations',
      ],
    },
  ];

  const tips = [
    {
      title: 'Start Small',
      description: 'Begin with a single location or community. Expand outward as your story demands.',
    },
    {
      title: 'Consider Consequences',
      description: 'Every element affects others. If magic exists, how does it change economics, warfare, and daily life?',
    },
    {
      title: 'Leave Room for Mystery',
      description: 'Not everything needs to be explained. Mysteries make worlds feel larger and more alive.',
    },
    {
      title: 'Ground in Reality',
      description: 'Even fantastical worlds need internal logic. Base your systems on real-world principles.',
    },
    {
      title: 'Show Through Story',
      description: 'Reveal your world through character experiences, not info dumps.',
    },
    {
      title: 'Iterate and Evolve',
      description: 'Your world will change as you write. Embrace the evolution.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Resources
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Worldbuilding Guide</h1>
              <p className="text-green-100">Create rich, immersive universes for your stories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold mb-4">What is Worldbuilding?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Worldbuilding is the art of creating fictional worlds—complete with their own geography, history, cultures, and rules. Whether you&apos;re writing fantasy, sci-fi, or any other genre, a well-built world makes your stories more immersive and believable.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            This guide will help you create worlds on Plotter, breaking down the process into manageable pieces that you can share and develop over time.
          </p>
        </div>

        {/* Core Elements */}
        <h2 className="text-2xl font-bold mb-6">Core Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <h2 className="text-2xl font-bold mb-6">Worldbuilding Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-semibold mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
            </div>
          ))}
        </div>

        {/* Using Plotter */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold mb-4">Building Worlds on Plotter</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>1. Create a World entry</strong> - Start with the big picture. Define your world&apos;s core concept, genre, and unique elements.
            </p>
            <p>
              <strong>2. Add Lore entries</strong> - Document history, mythology, and important events as separate lore pieces.
            </p>
            <p>
              <strong>3. Create Characters</strong> - Populate your world with characters and link them to your world.
            </p>
            <p>
              <strong>4. Write Stories</strong> - Tell tales set in your world to bring it to life.
            </p>
            <p>
              <strong>5. Add Items, Factions, and Events</strong> - Flesh out the details that make your world feel real.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/create?type=world" className="btn-primary">
              Create Your World
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
