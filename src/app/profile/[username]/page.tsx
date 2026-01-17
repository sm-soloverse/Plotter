'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  Calendar,
  Heart,
  Eye,
  GitFork,
  Users as UsersIcon,
  UserPlus,
  ExternalLink,
} from 'lucide-react';
import { IPCard } from '@/components/IPCard';
import { Tabs } from '@/components/Tabs';
import { EmptyState } from '@/components/EmptyState';
import { useStore } from '@/store';

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { users, getAssetsByAuthor, collections, currentUser } = useStore();

  const user = users.find((u) => u.username === username);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
          <p className="text-gray-500 mb-4">This user doesn&apos;t exist.</p>
          <Link href="/explore" className="btn-primary">
            Explore Creations
          </Link>
        </div>
      </div>
    );
  }

  const userAssets = getAssetsByAuthor(user.id).filter((a) => a.status === 'published');
  const userCollections = collections.filter((c) => c.author.id === user.id && c.isPublic);

  const totalViews = userAssets.reduce((sum, a) => sum + a.stats.views, 0);
  const totalLikes = userAssets.reduce((sum, a) => sum + a.stats.likes, 0);
  const totalForks = userAssets.reduce((sum, a) => sum + a.stats.forks, 0);

  const isOwnProfile = currentUser?.id === user.id;

  const tabs = [
    { id: 'creations', label: 'Creations', count: userAssets.length },
    { id: 'collections', label: 'Collections', count: userCollections.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg"
            />
            <div className="flex-1 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">{user.displayName}</h1>
                {!isOwnProfile && (
                  <button className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm gap-1.5 w-fit">
                    <UserPlus className="w-4 h-4" />
                    Follow
                  </button>
                )}
                {isOwnProfile && (
                  <Link
                    href="/settings"
                    className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm w-fit"
                  >
                    Edit Profile
                  </Link>
                )}
              </div>
              <p className="text-white/80 mb-3">@{user.username}</p>
              {user.bio && <p className="max-w-lg mb-4">{user.bio}</p>}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4" />
                  {user.stats.followers} followers
                </span>
                <span>{user.stats.following} following</span>
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
        <Tabs tabs={tabs} defaultTab="creations">
          {(activeTab) => (
            <div className="mt-6">
              {activeTab === 'creations' && (
                userAssets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userAssets.map((asset) => (
                      <IPCard key={asset.id} asset={asset} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={ExternalLink}
                    title="No public creations"
                    description={`${user.displayName} hasn't published any creations yet.`}
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
                        {collection.description && (
                          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{collection.description}</p>
                        )}
                        <p className="text-sm text-gray-400">{collection.assets.length} items</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={ExternalLink}
                    title="No public collections"
                    description={`${user.displayName} hasn't created any public collections yet.`}
                  />
                )
              )}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
