'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Grid, List } from 'lucide-react';
import { IPCard } from '@/components/IPCard';
import { FilterPanel } from '@/components/FilterPanel';
import { EmptyState } from '@/components/EmptyState';
import { PageLoader } from '@/components/LoadingSpinner';
import { useStore } from '@/store';
import type { SearchFilters } from '@/types';

function ExploreContent() {
  const searchParams = useSearchParams();
  const { searchAssets } = useStore();

  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    sortBy: (searchParams.get('sort') as SearchFilters['sortBy']) || 'recent',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchInput, setSearchInput] = useState(filters.query || '');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setFilters((prev) => ({ ...prev, query }));
      setSearchInput(query);
    }
  }, [searchParams]);

  const results = searchAssets(filters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, query: searchInput });
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'recent' });
    setSearchInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">Explore</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover characters, worlds, stories, and more from creative writers
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by title, description, or tags..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & View Toggle */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onClear={clearFilters}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>

        {/* Results */}
        {results.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((asset) => (
                <IPCard key={asset.id} asset={asset} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((asset) => (
                <IPCard key={asset.id} asset={asset} variant="compact" />
              ))}
            </div>
          )
        ) : (
          <EmptyState
            icon={Search}
            title="No results found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={{ label: 'Clear filters', href: '/explore' }}
          />
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ExploreContent />
    </Suspense>
  );
}
