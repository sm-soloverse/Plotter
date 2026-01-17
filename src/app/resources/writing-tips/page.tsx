import Link from 'next/link';
import { ArrowLeft, BookOpen, Lightbulb, Target, Users, Sparkles, PenTool } from 'lucide-react';

export default function WritingTipsPage() {
  const tips = [
    {
      category: 'Character Development',
      icon: Users,
      tips: [
        {
          title: 'Give characters clear motivations',
          description: 'Every character should want something. Their desires drive their actions and create conflict.',
        },
        {
          title: 'Create internal contradictions',
          description: 'The most memorable characters have conflicting traits—a kind person with a cruel streak, a brave hero with a secret fear.',
        },
        {
          title: 'Show, don\'t tell personality',
          description: 'Reveal who characters are through their choices, dialogue, and reactions rather than direct description.',
        },
        {
          title: 'Give them a unique voice',
          description: 'Each character should speak differently. Consider their background, education, and personality in their dialogue.',
        },
      ],
    },
    {
      category: 'Story Structure',
      icon: Target,
      tips: [
        {
          title: 'Start with conflict',
          description: 'Hook readers immediately with tension. Something should be at stake from the first paragraph.',
        },
        {
          title: 'Every scene needs a purpose',
          description: 'Ask yourself: does this scene advance the plot, reveal character, or both? If neither, cut it.',
        },
        {
          title: 'Use the "Yes, but..." / "No, and..." technique',
          description: 'When characters try to achieve goals, complicate things. Success should come with new problems.',
        },
        {
          title: 'End scenes with forward momentum',
          description: 'Leave readers wanting more. End on questions, revelations, or decisions that propel the story forward.',
        },
      ],
    },
    {
      category: 'Writing Craft',
      icon: PenTool,
      tips: [
        {
          title: 'Use active voice',
          description: '"She threw the knife" is stronger than "The knife was thrown by her." Active voice creates urgency.',
        },
        {
          title: 'Vary sentence length',
          description: 'Mix short, punchy sentences with longer, flowing ones. This creates rhythm and controls pacing.',
        },
        {
          title: 'Choose specific details',
          description: 'Don\'t say "tree"—say "twisted oak" or "young birch." Specific details create vivid imagery.',
        },
        {
          title: 'Cut unnecessary words',
          description: 'Words like "very," "just," "really," and "that" often add nothing. Be ruthless with editing.',
        },
      ],
    },
    {
      category: 'Micro-Fiction Tips',
      icon: Sparkles,
      tips: [
        {
          title: 'Start in the middle',
          description: 'With limited words, skip setup. Drop readers into action and let them piece together context.',
        },
        {
          title: 'Imply the larger world',
          description: 'Reference things beyond the immediate story. Hints at a bigger universe make small pieces feel epic.',
        },
        {
          title: 'End with impact',
          description: 'The last line should land like a punch. Twist, reveal, or resonate—make it memorable.',
        },
        {
          title: 'Every word must earn its place',
          description: 'In short-form writing, there\'s no room for filler. Each word should do double duty.',
        },
      ],
    },
  ];

  const exercises = [
    {
      title: '100-Word Challenge',
      description: 'Write a complete story in exactly 100 words. This forces you to focus on what\'s essential.',
    },
    {
      title: 'Character Interview',
      description: 'Interview your character as if they\'re a real person. Ask about their past, fears, and dreams.',
    },
    {
      title: 'Rewrite a Scene',
      description: 'Take a scene you\'ve written and rewrite it from a different character\'s perspective.',
    },
    {
      title: 'First Line Collection',
      description: 'Write 10 possible first lines for a story. Pick the strongest one and build from there.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
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
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Writing Tips</h1>
              <p className="text-blue-100">Craft compelling stories, one word at a time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold mb-4">Welcome, Writer</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Whether you&apos;re creating your first character or your hundredth, there&apos;s always room to grow. These tips are designed to help you craft more compelling micro-IP on Plotter.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Remember: rules are meant to be broken. Once you understand these principles, feel free to bend them in service of your unique voice.
          </p>
        </div>

        {/* Tips by Category */}
        {tips.map((section, i) => {
          const Icon = section.icon;
          return (
            <div key={i} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">{section.category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.tips.map((tip, j) => (
                  <div
                    key={j}
                    className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
                  >
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Writing Exercises */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Writing Exercises</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Practice makes progress. Try these exercises to sharpen your skills:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exercises.map((exercise, i) => (
              <div
                key={i}
                className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4"
              >
                <h3 className="font-semibold mb-1">{exercise.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Put these tips into practice</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The best way to improve is to write. Start creating on Plotter today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create?type=story" className="btn-primary">
              Write a Story
            </Link>
            <Link href="/create?type=character" className="btn-secondary">
              Create a Character
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
