'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Library,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { IPCard } from '@/components/IPCard';
import { EmptyState } from '@/components/EmptyState';
import { Tabs } from '@/components/Tabs';
import { useStore } from '@/store';
import type { IPCategory, ContentStatus } from '@/types';

export default function MyCreationsPage() {
  const { currentUser, getAssetsByAuthor, deleteAsset, updateAsset } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<IPCategory | 'all'>('all');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Not Logged In</h1>
          <p className="text-gray-500 mb-4">Please log in to view your creations.</p>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const allAssets = getAssetsByAuthor(currentUser.id);

  let filteredAssets = allAssets;
  if (searchQuery) {
    filteredAssets = filteredAssets.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (selectedType !== 'all') {
    filteredAssets = filteredAssets.filter((a) => a.type === selectedType);
  }

  const publishedAssets = filteredAssets.filter((a) => a.status === 'published');
  const draftAssets = filteredAssets.filter((a) => a.status === 'draft');
  const archivedAssets = filteredAssets.filter((a) => a.status === 'archived');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this? This action cannot be undone.')) {
      deleteAsset(id);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: ContentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    updateAsset(id, { status: newStatus });
  };

  const tabs = [
    { id: 'all', label: 'All', count: filteredAssets.length },
    { id: 'published', label: 'Published', count: publishedAssets.length },
    { id: 'drafts', label: 'Drafts', count: draftAssets.length },
    { id: 'archived', label: 'Archived', count: archivedAssets.length },
  ];

  const typeOptions: { value: IPCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'character', label: 'Characters' },
    { value: 'world', label: 'Worlds' },
    { value: 'story', label: 'Stories' },
    { value: 'lore', label: 'Lore' },
    { value: 'item', label: 'Items' },
    { value: 'faction', label: 'Factions' },
    { value: 'event', label: 'Events' },
    { value: 'concept', label: 'Concepts' },
  ];

  const renderAssets = (assets: typeof filteredAssets) => {
    if (assets.length === 0) {
      return (
        <EmptyState
          icon={Library}
          title="No creations here"
          description="Create something new to get started."
          action={{ label: 'Create New', href: '/create' }}
        />
      );
    }

    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assets.map((asset) => (
            <div key={asset.id} className="relative group">
              <IPCard asset={asset} />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Link
                  href={`/ip/${asset.slug}/edit`}
                  className="p-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleToggleStatus(asset.id, asset.status)}
                  className="p-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={asset.status === 'published' ? 'Unpublish' : 'Publish'}
                >
                  {asset.status === 'published' ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(asset.id)}
                  className="p-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
          >
            <IPCard asset={asset} variant="compact" />
            <div className="flex items-center gap-2 ml-auto">
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  asset.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : asset.status === 'draft'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {asset.status}
              </span>
              <Link
                href={`/ip/${asset.slug}/edit`}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Edit className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleDelete(asset.id)}
                className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">My Creations</h1>
              <p className="text-gray-500">Manage your characters, worlds, stories, and more</p>
            </div>
            <Link href="/create" className="btn-primary gap-1.5">
              <Plus className="w-5 h-5" />
              Create New
            </Link>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your creations..."
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as IPCategory | 'all')}
                className="input-field py-2.5"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-1 border-l border-gray-200 dark:border-gray-700 pl-2 ml-2">
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
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs tabs={tabs} defaultTab="all">
          {(activeTab) => (
            <div className="mt-6">
              {activeTab === 'all' && renderAssets(filteredAssets)}
              {activeTab === 'published' && renderAssets(publishedAssets)}
              {activeTab === 'drafts' && renderAssets(draftAssets)}
              {activeTab === 'archived' && renderAssets(archivedAssets)}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
