'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  Heart,
  Eye,
  GitFork,
  MessageCircle,
  Share2,
  Bookmark,
  Edit,
  Trash2,
  ArrowLeft,
  ExternalLink,
  User,
  Globe,
  BookOpen,
  Scroll,
  Sword,
  Users,
  Calendar,
  Lightbulb,
  Clock,
  Tag,
} from 'lucide-react';
import { IPCard } from '@/components/IPCard';
import { useStore } from '@/store';
import type { IPCategory } from '@/types';

const typeConfig: Record<IPCategory, { icon: typeof User; color: string; label: string }> = {
  character: { icon: User, color: 'bg-blue-500', label: 'Character' },
  world: { icon: Globe, color: 'bg-green-500', label: 'World' },
  story: { icon: BookOpen, color: 'bg-purple-500', label: 'Story' },
  lore: { icon: Scroll, color: 'bg-amber-500', label: 'Lore' },
  item: { icon: Sword, color: 'bg-red-500', label: 'Item' },
  faction: { icon: Users, color: 'bg-cyan-500', label: 'Faction' },
  event: { icon: Calendar, color: 'bg-pink-500', label: 'Event' },
  concept: { icon: Lightbulb, color: 'bg-yellow-500', label: 'Concept' },
};

const licenseLabels: Record<string, { label: string; description: string; className: string }> = {
  open: { label: 'Open License', description: 'Anyone can use, modify, and share', className: 'bg-green-100 text-green-800' },
  attribution: { label: 'Attribution', description: 'Free to use with credit', className: 'bg-blue-100 text-blue-800' },
  'non-commercial': { label: 'Non-Commercial', description: 'Free for non-commercial use only', className: 'bg-amber-100 text-amber-800' },
  exclusive: { label: 'Exclusive', description: 'Available for exclusive licensing', className: 'bg-purple-100 text-purple-800' },
  restricted: { label: 'Restricted', description: 'View only, no derivative works', className: 'bg-red-100 text-red-800' },
};

export default function IPDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { assets, currentUser, likeAsset, forkAsset, deleteAsset, getRelatedAssets, getAssetById } = useStore();

  const asset = assets.find((a) => a.slug === slug);

  if (!asset) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Not Found</h1>
          <p className="text-gray-500 mb-4">This creation doesn&apos;t exist or has been removed.</p>
          <Link href="/explore" className="btn-primary">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const config = typeConfig[asset.type];
  const TypeIcon = config.icon;
  const license = licenseLabels[asset.license];
  const isOwner = currentUser?.id === asset.author.id;
  const relatedAssets = getRelatedAssets(asset.id);
  const parentAsset = asset.parentId ? getAssetById(asset.parentId) : null;
  const worldAsset = asset.worldId ? getAssetById(asset.worldId) : null;

  const handleLike = () => {
    likeAsset(asset.id);
  };

  const handleFork = () => {
    const forked = forkAsset(asset.id);
    router.push(`/ip/${forked.slug}/edit`);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this? This action cannot be undone.')) {
      deleteAsset(asset.id);
      router.push('/explore');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: asset.title,
        text: asset.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

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
        if (line.startsWith('*') && line.endsWith('*')) {
          return <p key={i} className="italic text-primary-700 dark:text-primary-400 mb-4">{line.slice(1, -1)}</p>;
        }
        if (line.trim() === '') {
          return <br key={i} />;
        }
        return <p key={i} className="mb-4">{line}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Cover Image */}
      {asset.coverImage && (
        <div className="h-64 sm:h-80 lg:h-96 relative">
          <img
            src={asset.coverImage}
            alt={asset.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-16">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl ${config.color} flex items-center justify-center`}>
                <TypeIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} text-white`}>
                    {config.label}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${license.className}`}>
                    {license.label}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold">{asset.title}</h1>
              </div>

              {/* Owner Actions */}
              {isOwner && (
                <div className="flex gap-2">
                  <Link
                    href={`/ip/${asset.slug}/edit`}
                    className="btn-secondary text-sm gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button onClick={handleDelete} className="btn-ghost text-red-600 text-sm gap-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">{asset.summary}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <Link href={`/profile/${asset.author.username}`} className="flex items-center gap-2 hover:text-gray-700">
                <img src={asset.author.avatar} alt={asset.author.displayName} className="w-6 h-6 rounded-full" />
                {asset.author.displayName}
              </Link>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDistanceToNow(new Date(asset.createdAt), { addSuffix: true })}
              </span>
              {worldAsset && (
                <Link href={`/ip/${worldAsset.slug}`} className="flex items-center gap-1 text-primary-600 hover:text-primary-700">
                  <Globe className="w-4 h-4" />
                  {worldAsset.title}
                </Link>
              )}
              {parentAsset && (
                <Link href={`/ip/${parentAsset.slug}`} className="flex items-center gap-1 text-primary-600 hover:text-primary-700">
                  <GitFork className="w-4 h-4" />
                  Forked from {parentAsset.title}
                </Link>
              )}
            </div>

            {/* Tags */}
            {asset.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {asset.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/explore?tag=${tag.name}`}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 ip-content">
            {renderContent(asset.content)}
          </div>

          {/* License Info */}
          <div className="px-6 sm:px-8 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
            <h3 className="font-medium mb-1">License: {license.label}</h3>
            <p className="text-sm text-gray-500">{license.description}</p>
          </div>

          {/* Actions */}
          <div className="px-6 sm:px-8 py-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-3">
            <button onClick={handleLike} className="btn-ghost gap-1.5">
              <Heart className="w-5 h-5" />
              <span>{asset.stats.likes}</span>
            </button>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Eye className="w-5 h-5" />
              <span>{asset.stats.views}</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <MessageCircle className="w-5 h-5" />
              <span>{asset.stats.comments}</span>
            </span>

            <div className="flex-1" />

            <button onClick={handleFork} className="btn-secondary text-sm gap-1.5">
              <GitFork className="w-4 h-4" />
              Fork ({asset.stats.forks})
            </button>
            <button className="btn-ghost text-sm gap-1.5">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
            <button onClick={handleShare} className="btn-ghost text-sm gap-1.5">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Related */}
        {relatedAssets.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Related Creations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedAssets.map((related) => (
                <IPCard key={related.id} asset={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
