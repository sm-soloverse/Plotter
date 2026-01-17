'use client';

import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Users,
  Globe,
  BookOpen,
  Scroll,
  TrendingUp,
  Star,
  Zap,
} from 'lucide-react';
import { IPCard } from '@/components/IPCard';
import { useStore } from '@/store';

export default function HomePage() {
  const { getFeaturedAssets, getTrendingAssets, getAssetsByType } = useStore();

  const featuredAssets = getFeaturedAssets();
  const trendingAssets = getTrendingAssets();
  const characters = getAssetsByType('character').slice(0, 4);
  const worlds = getAssetsByType('world').slice(0, 4);

  const categories = [
    { type: 'character', label: 'Characters', icon: Users, count: characters.length, color: 'from-blue-500 to-blue-600' },
    { type: 'world', label: 'Worlds', icon: Globe, count: worlds.length, color: 'from-green-500 to-green-600' },
    { type: 'story', label: 'Stories', icon: BookOpen, count: getAssetsByType('story').length, color: 'from-purple-500 to-purple-600' },
    { type: 'lore', label: 'Lore', icon: Scroll, count: getAssetsByType('lore').length, color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 sm:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 dark:bg-primary-900/30 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200 dark:bg-accent-900/30 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            The marketplace for micro intellectual property
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Create, Share, and Discover
            <span className="block gradient-text">Amazing Stories</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Build your creative universe. Share characters, worlds, lore, and stories.
            Connect with writers and discover micro-IP to inspire your next creation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create" className="btn-primary text-lg px-8 py-3 gap-2">
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/explore" className="btn-secondary text-lg px-8 py-3">
              Explore Marketplace
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">500+</p>
              <p className="text-sm text-gray-500">Creations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">200+</p>
              <p className="text-sm text-gray-500">Writers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">50+</p>
              <p className="text-sm text-gray-500">Worlds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.type}
                  href={`/${cat.type}s`}
                  className="group relative overflow-hidden rounded-2xl p-6 card-hover"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90`} />
                  <div className="relative text-white">
                    <Icon className="w-8 h-8 mb-3 opacity-90" />
                    <h3 className="text-xl font-bold">{cat.label}</h3>
                    <p className="text-white/80 text-sm">{cat.count} available</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold">Featured Creations</h2>
            </div>
            <Link
              href="/explore?featured=true"
              className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAssets.slice(0, 3).map((asset) => (
              <IPCard key={asset.id} asset={asset} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold">Trending Now</h2>
            </div>
            <Link
              href="/explore?sort=trending"
              className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingAssets.slice(0, 4).map((asset) => (
              <IPCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Plotter Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create and share your micro-IP in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build characters, worlds, stories, and lore using our intuitive editor.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Share</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your license and share with the community. Keep control of your IP.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Connect</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover inspiration, fork creations, and collaborate with other writers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to share your stories?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join hundreds of writers building their creative universes on Plotter.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
