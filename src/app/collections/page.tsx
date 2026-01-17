'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Library, Plus, Search, Folder, Lock, Globe } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { Modal } from '@/components/Modal';
import { useStore } from '@/store';

export default function CollectionsPage() {
  const { collections, currentUser, createCollection, getAssetById } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');

  const filteredCollections = collections.filter(
    (col) =>
      col.isPublic &&
      (col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      createCollection(newCollectionName, newCollectionDesc);
      setNewCollectionName('');
      setNewCollectionDesc('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Library className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Collections</h1>
              <p className="text-amber-100">Curated sets of characters, worlds, and stories</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary bg-white text-amber-600 hover:bg-amber-50 gap-1.5"
            >
              <Plus className="w-5 h-5" />
              Create Collection
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">
          {filteredCollections.length} collection{filteredCollections.length !== 1 ? 's' : ''} found
        </p>

        {filteredCollections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection) => {
              const previewAssets = collection.assets.slice(0, 4).map((id) => getAssetById(id)).filter(Boolean);
              return (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 card-hover"
                >
                  {/* Preview Grid */}
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 grid grid-cols-2 gap-0.5 p-0.5">
                    {previewAssets.length > 0 ? (
                      previewAssets.map((asset, i) => (
                        <div key={i} className="bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          {asset?.coverImage ? (
                            <img
                              src={asset.coverImage}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Folder className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 flex items-center justify-center">
                        <Folder className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold group-hover:text-primary-600 transition-colors">
                        {collection.name}
                      </h3>
                      {collection.isPublic ? (
                        <Globe className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    {collection.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {collection.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{collection.assets.length} items</span>
                      <div className="flex items-center gap-2">
                        <img
                          src={collection.author.avatar}
                          alt=""
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{collection.author.displayName}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={Library}
            title="No collections yet"
            description="Create a collection to organize and share your favorite creations."
            action={{ label: 'Create Collection', href: '#' }}
          />
        )}
      </div>

      {/* Create Collection Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Collection">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="My Awesome Collection"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description (optional)</label>
            <textarea
              value={newCollectionDesc}
              onChange={(e) => setNewCollectionDesc(e.target.value)}
              placeholder="What's this collection about?"
              rows={3}
              className="input-field resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setIsModalOpen(false)} className="btn-ghost">
              Cancel
            </button>
            <button
              onClick={handleCreateCollection}
              disabled={!newCollectionName.trim()}
              className="btn-primary"
            >
              Create Collection
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
