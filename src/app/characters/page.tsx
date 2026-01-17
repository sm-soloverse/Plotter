'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Plus, Search } from 'lucide-react';
import { IPCard } from '@/components/IPCard';
import { EmptyState } from '@/components/EmptyState';
import { useStore } from '@/store';

export default function CharactersPage() {
  const { getAssetsByType, searchAssets } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const allCharacters = getAssetsByType('character');
  const characters = searchQuery
    ? searchAssets({ query: searchQuery, types: ['character'] })
    : allCharacters;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Characters</h1>
              <p className="text-blue-100">Discover memorable characters and their stories</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search characters..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <Link href="/create?type=character" className="btn-primary bg-white text-blue-600 hover:bg-blue-50 gap-1.5">
              <Plus className="w-5 h-5" />
              Create Character
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">
          {characters.length} character{characters.length !== 1 ? 's' : ''} found
        </p>

        {characters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <IPCard key={character.id} asset={character} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="No characters yet"
            description="Be the first to create a character and share it with the community."
            action={{ label: 'Create Character', href: '/create?type=character' }}
          />
        )}
      </div>
    </div>
  );
}
