import Link from 'next/link';
import { ArrowLeft, Shield, Check, X, AlertTriangle } from 'lucide-react';

export default function LicensingGuidePage() {
  const licenses = [
    {
      name: 'Open',
      color: 'green',
      description: 'Anyone can use, modify, and share your work freely.',
      canDo: [
        'Use in any project (commercial or non-commercial)',
        'Modify and create derivative works',
        'Redistribute freely',
        'Use without attribution',
      ],
      cannotDo: [],
      bestFor: 'Creators who want maximum exposure and don\'t mind others using their work freely.',
    },
    {
      name: 'Attribution',
      color: 'blue',
      description: 'Free to use with proper credit to the original creator.',
      canDo: [
        'Use in any project (commercial or non-commercial)',
        'Modify and create derivative works',
        'Redistribute with attribution',
      ],
      cannotDo: [
        'Use without crediting the original creator',
      ],
      bestFor: 'Creators who want their work shared but want recognition for their contributions.',
    },
    {
      name: 'Non-Commercial',
      color: 'amber',
      description: 'Free for personal and non-commercial use only.',
      canDo: [
        'Use in personal projects',
        'Use in non-profit work',
        'Modify for personal use',
        'Share with attribution',
      ],
      cannotDo: [
        'Use in commercial projects',
        'Sell or monetize',
        'Use in paid products or services',
      ],
      bestFor: 'Creators who want to share their work but reserve commercial rights.',
    },
    {
      name: 'Exclusive',
      color: 'purple',
      description: 'Available for licensing agreements. Contact creator for terms.',
      canDo: [
        'View and read the content',
        'Contact creator for licensing',
        'Negotiate exclusive rights',
      ],
      cannotDo: [
        'Use without explicit permission',
        'Create derivative works',
        'Redistribute',
      ],
      bestFor: 'Creators looking to monetize their IP through licensing deals.',
    },
    {
      name: 'Restricted',
      color: 'red',
      description: 'View only. No use, modification, or redistribution allowed.',
      canDo: [
        'View and read the content',
        'Share links to the original',
      ],
      cannotDo: [
        'Use in any project',
        'Modify or create derivatives',
        'Copy or redistribute content',
        'Use any part without permission',
      ],
      bestFor: 'Creators who want to showcase work but protect all rights.',
    },
  ];

  const faqs = [
    {
      question: 'Can I change the license after publishing?',
      answer: 'Yes, you can change your license at any time. However, anyone who used your work under the previous license retains those rights for their existing projects.',
    },
    {
      question: 'What happens if someone violates my license?',
      answer: 'You can report violations through our platform. We take licensing seriously and will work with you to address any issues.',
    },
    {
      question: 'Do I retain ownership of my IP?',
      answer: 'Absolutely. You always retain full ownership of your intellectual property. Licenses only grant others permission to use your work in specific ways.',
    },
    {
      question: 'Can I grant someone special permission?',
      answer: 'Yes! You can always grant individual permissions beyond your default license. Just reach out to each other directly to arrange terms.',
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
    red: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-800' },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
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
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Licensing Guide</h1>
              <p className="text-purple-100">Understand and protect your creative rights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold mb-4">Understanding Licenses</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            When you share creative work on Plotter, you choose a license that tells others how they can use it. This protects your rights while enabling collaboration.
          </p>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Important:</strong> Plotter licenses are guidelines for our community. For legal protection, consult with a lawyer about formal copyright and licensing arrangements.
            </p>
          </div>
        </div>

        {/* License Types */}
        <h2 className="text-2xl font-bold mb-6">License Types</h2>
        <div className="space-y-6 mb-12">
          {licenses.map((license, i) => {
            const colors = colorClasses[license.color];
            return (
              <div
                key={i}
                className={`bg-white dark:bg-gray-900 rounded-xl p-6 border ${colors.border}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
                    {license.name}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{license.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      What others CAN do:
                    </h4>
                    <ul className="space-y-1">
                      {license.canDo.map((item, j) => (
                        <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {license.cannotDo.length > 0 && (
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        What others CANNOT do:
                      </h4>
                      <ul className="space-y-1">
                        {license.cannotDo.map((item, j) => (
                          <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-500 italic">
                  Best for: {license.bestFor}
                </p>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-12">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to share your work?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create something amazing and choose the license that&apos;s right for you.
          </p>
          <Link href="/create" className="btn-primary">
            Start Creating
          </Link>
        </div>
      </div>
    </div>
  );
}
