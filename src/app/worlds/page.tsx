'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, Plus, Search } from 'lucide-react';
import { IPCard } from '@/components/IPCard';
import { EmptyState } from '@/components/EmptyState';
import { useStore } from '@/store';

export default function WorldsPage() {
  const { getAssetsByType, searchAssets } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const allWorlds = getAssetsByType('world');
  const worlds = searchQuery
    ? searchAssets({ query: searchQuery, types: ['world'] })
    : allWorlds;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Worlds</h1>
              <p className="text-green-100">Explore rich universes built by creative writers</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search worlds..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <Link href="/create?type=world" className="btn-primary bg-white text-green-600 hover:bg-green-50 gap-1.5">
              <Plus className="w-5 h-5" />
              Create World
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">
          {worlds.length} world{worlds.length !== 1 ? 's' : ''} found
        </p>

        {worlds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {worlds.map((world) => (
              <IPCard key={world.id} asset={world} variant="featured" />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Globe}
            title="No worlds yet"
            description="Be the first to build a world and share it with the community."
            action={{ label: 'Create World', href: '/create?type=world' }}
          />
        )}
      </div>
    </div>
  );
}
