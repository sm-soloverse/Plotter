'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Settings,
  Edit,
  Heart,
  Eye,
  GitFork,
} from 'lucide-react';
import { IPCard } from '@/components/IPCard';
import { Tabs } from '@/components/Tabs';
import { EmptyState } from '@/components/EmptyState';
import { useStore } from '@/store';
import { formatDistanceToNow } from 'date-fns';

export default function ProfilePage() {
  const { currentUser, getAssetsByAuthor, collections } = useStore();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Not Logged In</h1>
          <p className="text-gray-500 mb-4">Please log in to view your profile.</p>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const userAssets = getAssetsByAuthor(currentUser.id);
  const userCollections = collections.filter((c) => c.author.id === currentUser.id);

  const publishedAssets = userAssets.filter((a) => a.status === 'published');
  const draftAssets = userAssets.filter((a) => a.status === 'draft');

  const totalViews = userAssets.reduce((sum, a) => sum + a.stats.views, 0);
  const totalLikes = userAssets.reduce((sum, a) => sum + a.stats.likes, 0);
  const totalForks = userAssets.reduce((sum, a) => sum + a.stats.forks, 0);

  const tabs = [
    { id: 'published', label: 'Published', count: publishedAssets.length },
    { id: 'drafts', label: 'Drafts', count: draftAssets.length },
    { id: 'collections', label: 'Collections', count: userCollections.length },
    { id: 'likes', label: 'Liked', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
          <div className="flex items-start gap-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg"
            />
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">{currentUser.displayName}</h1>
                <Link href="/settings" className="p-1.5 rounded-lg hover:bg-white/10">
                  <Settings className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-white/80 mb-3">@{currentUser.username}</p>
              {currentUser.bio && <p className="max-w-lg">{currentUser.bio}</p>}
              <div className="flex items-center gap-4 mt-4 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDistanceToNow(new Date(currentUser.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {userAssets.length}
            </p>
            <p className="text-sm text-gray-500">Creations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-1">
              <Eye className="w-5 h-5 text-gray-400" />
              {totalViews.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Total Views</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-1">
              <Heart className="w-5 h-5 text-red-400" />
              {totalLikes.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Total Likes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-1">
              <GitFork className="w-5 h-5 text-primary-400" />
              {totalForks.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Total Forks</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs tabs={tabs} defaultTab="published">
          {(activeTab) => (
            <div className="mt-6">
              {activeTab === 'published' && (
                publishedAssets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publishedAssets.map((asset) => (
                      <IPCard key={asset.id} asset={asset} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={User}
                    title="No published creations"
                    description="Start creating and publish your first work."
                    action={{ label: 'Create Something', href: '/create' }}
                  />
                )
              )}

              {activeTab === 'drafts' && (
                draftAssets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {draftAssets.map((asset) => (
                      <IPCard key={asset.id} asset={asset} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Edit}
                    title="No drafts"
                    description="Your unpublished work will appear here."
                    action={{ label: 'Create Something', href: '/create' }}
                  />
                )
              )}

              {activeTab === 'collections' && (
                userCollections.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCollections.map((collection) => (
                      <Link
                        key={collection.id}
                        href={`/collections/${collection.id}`}
                        className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 card-hover"
                      >
                        <h3 className="font-semibold mb-1">{collection.name}</h3>
                        <p className="text-sm text-gray-500">{collection.assets.length} items</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={User}
                    title="No collections"
                    description="Create collections to organize your favorite creations."
                    action={{ label: 'Browse Creations', href: '/explore' }}
                  />
                )
              )}

              {activeTab === 'likes' && (
                <EmptyState
                  icon={Heart}
                  title="No liked creations"
                  description="Creations you like will appear here."
                  action={{ label: 'Explore', href: '/explore' }}
                />
              )}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
