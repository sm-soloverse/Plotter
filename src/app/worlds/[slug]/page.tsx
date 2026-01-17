'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  Globe,
  Users,
  BookOpen,
  Scroll,
  Sword,
  Calendar,
  Lightbulb,
  ArrowLeft,
  Plus,
  Heart,
  Eye,
  GitFork,
} from 'lucide-react';
import { IPCard } from '@/components/IPCard';
import { Tabs } from '@/components/Tabs';
import { EmptyState } from '@/components/EmptyState';
import { useStore } from '@/store';
import type { IPCategory } from '@/types';

const typeIcons: Record<IPCategory, typeof Users> = {
  character: Users,
  world: Globe,
  story: BookOpen,
  lore: Scroll,
  item: Sword,
  faction: Users,
  event: Calendar,
  concept: Lightbulb,
};

export default function WorldDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { assets, getAssetsByWorld } = useStore();

  const world = assets.find((a) => a.slug === slug && a.type === 'world');

  if (!world) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">World Not Found</h1>
          <p className="text-gray-500 mb-4">This world doesn&apos;t exist or has been removed.</p>
          <Link href="/worlds" className="btn-primary">
            Browse Worlds
          </Link>
        </div>
      </div>
    );
  }

  const worldContent = getAssetsByWorld(world.id);
  const characters = worldContent.filter((a) => a.type === 'character');
  const stories = worldContent.filter((a) => a.type === 'story');
  const lore = worldContent.filter((a) => a.type === 'lore');
  const items = worldContent.filter((a) => a.type === 'item');
  const factions = worldContent.filter((a) => a.type === 'faction');
  const events = worldContent.filter((a) => a.type === 'event');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'characters', label: 'Characters', count: characters.length, icon: <Users className="w-4 h-4" /> },
    { id: 'stories', label: 'Stories', count: stories.length, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'lore', label: 'Lore', count: lore.length, icon: <Scroll className="w-4 h-4" /> },
    { id: 'more', label: 'More', count: items.length + factions.length + events.length },
  ];

  // Simple markdown to HTML conversion
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) {
          return <h1 key={i} className="text-3xl font-bold mb-4 mt-8 first:mt-0">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-semibold mb-3 mt-6">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-medium mb-2 mt-4">{line.slice(4)}</h3>;
        }
        if (line.startsWith('- ')) {
          return <li key={i} className="ml-4 list-disc mb-1">{line.slice(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={i} />;
        }
        return <p key={i} className="mb-4">{line}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="relative">
        {world.coverImage ? (
          <div className="h-64 sm:h-80 lg:h-96">
            <img
              src={world.coverImage}
              alt={world.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        ) : (
          <div className="h-64 sm:h-80 bg-gradient-to-r from-green-600 to-emerald-600" />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/worlds"
              className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              All Worlds
            </Link>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{world.title}</h1>
                <p className="text-white/80 max-w-2xl">{world.summary}</p>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/70">
                  <Link href={`/profile/${world.author.username}`} className="flex items-center gap-2 hover:text-white">
                    <img src={world.author.avatar} alt="" className="w-5 h-5 rounded-full" />
                    {world.author.displayName}
                  </Link>
                  <span>{worldContent.length} entries</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {world.stats.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {world.stats.views}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs tabs={tabs} defaultTab="overview">
              {(activeTab) => (
                <div className="mt-6">
                  {activeTab === 'overview' && (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                      <div className="ip-content">
                        {renderContent(world.content)}
                      </div>
                    </div>
                  )}

                  {activeTab === 'characters' && (
                    characters.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {characters.map((char) => (
                          <IPCard key={char.id} asset={char} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={Users}
                        title="No characters yet"
                        description="Create the first character in this world."
                        action={{ label: 'Create Character', href: `/create?type=character&world=${world.id}` }}
                      />
                    )
                  )}

                  {activeTab === 'stories' && (
                    stories.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stories.map((story) => (
                          <IPCard key={story.id} asset={story} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={BookOpen}
                        title="No stories yet"
                        description="Write the first story set in this world."
                        action={{ label: 'Write Story', href: `/create?type=story&world=${world.id}` }}
                      />
                    )
                  )}

                  {activeTab === 'lore' && (
                    lore.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lore.map((entry) => (
                          <IPCard key={entry.id} asset={entry} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={Scroll}
                        title="No lore yet"
                        description="Document the first piece of lore for this world."
                        action={{ label: 'Add Lore', href: `/create?type=lore&world=${world.id}` }}
                      />
                    )
                  )}

                  {activeTab === 'more' && (
                    <div className="space-y-8">
                      {items.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Sword className="w-5 h-5" />
                            Items ({items.length})
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                              <IPCard key={item.id} asset={item} />
                            ))}
                          </div>
                        </div>
                      )}

                      {factions.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Factions ({factions.length})
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {factions.map((faction) => (
                              <IPCard key={faction.id} asset={faction} />
                            ))}
                          </div>
                        </div>
                      )}

                      {events.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Events ({events.length})
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => (
                              <IPCard key={event.id} asset={event} />
                            ))}
                          </div>
                        </div>
                      )}

                      {items.length === 0 && factions.length === 0 && events.length === 0 && (
                        <EmptyState
                          icon={Plus}
                          title="No additional content"
                          description="Add items, factions, or events to this world."
                          action={{ label: 'Create Content', href: '/create' }}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold mb-3">Add to this World</h3>
              <div className="space-y-2">
                <Link
                  href={`/create?type=character&world=${world.id}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Add Character</span>
                </Link>
                <Link
                  href={`/create?type=story&world=${world.id}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Write Story</span>
                </Link>
                <Link
                  href={`/create?type=lore&world=${world.id}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Scroll className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">Document Lore</span>
                </Link>
                <Link
                  href={`/create?type=item&world=${world.id}`}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Sword className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Create Item</span>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold mb-3">World Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{worldContent.length}</p>
                  <p className="text-xs text-gray-500">Total Entries</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{characters.length}</p>
                  <p className="text-xs text-gray-500">Characters</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{stories.length}</p>
                  <p className="text-xs text-gray-500">Stories</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{world.stats.forks}</p>
                  <p className="text-xs text-gray-500">Forks</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {world.tags.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {world.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/explore?tag=${tag.name}`}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Creator */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold mb-3">Created By</h3>
              <Link
                href={`/profile/${world.author.username}`}
                className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg -m-2 transition-colors"
              >
                <img
                  src={world.author.avatar}
                  alt={world.author.displayName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{world.author.displayName}</p>
                  <p className="text-sm text-gray-500">@{world.author.username}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
