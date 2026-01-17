'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  Heart,
  Eye,
  GitFork,
  MessageCircle,
  User,
  Globe,
  BookOpen,
  Scroll,
  Sword,
  Users as UsersIcon,
  Calendar,
  Lightbulb,
} from 'lucide-react';
import type { IPAsset, IPCategory } from '@/types';

interface IPCardProps {
  asset: IPAsset;
  variant?: 'default' | 'compact' | 'featured';
}

const typeConfig: Record<IPCategory, { icon: typeof User; color: string; label: string }> = {
  character: { icon: User, color: 'bg-blue-500', label: 'Character' },
  world: { icon: Globe, color: 'bg-green-500', label: 'World' },
  story: { icon: BookOpen, color: 'bg-purple-500', label: 'Story' },
  lore: { icon: Scroll, color: 'bg-amber-500', label: 'Lore' },
  item: { icon: Sword, color: 'bg-red-500', label: 'Item' },
  faction: { icon: UsersIcon, color: 'bg-cyan-500', label: 'Faction' },
  event: { icon: Calendar, color: 'bg-pink-500', label: 'Event' },
  concept: { icon: Lightbulb, color: 'bg-yellow-500', label: 'Concept' },
};

const licenseLabels: Record<string, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  attribution: { label: 'Attribution', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  'non-commercial': { label: 'Non-Commercial', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
  exclusive: { label: 'Exclusive', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  restricted: { label: 'Restricted', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
};

export function IPCard({ asset, variant = 'default' }: IPCardProps) {
  const config = typeConfig[asset.type];
  const TypeIcon = config.icon;
  const license = licenseLabels[asset.license];

  if (variant === 'compact') {
    return (
      <Link
        href={`/ip/${asset.slug}`}
        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        {asset.coverImage ? (
          <img
            src={asset.coverImage}
            alt={asset.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <div className={`w-12 h-12 rounded-lg ${config.color} flex items-center justify-center`}>
            <TypeIcon className="w-6 h-6 text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate group-hover:text-primary-600 transition-colors">
            {asset.title}
          </h3>
          <p className="text-xs text-gray-500 truncate">{asset.summary}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Heart className="w-3 h-3" />
          {asset.stats.likes}
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/ip/${asset.slug}`}
        className="group relative block overflow-hidden rounded-2xl card-hover"
      >
        <div className="aspect-[16/10] relative">
          {asset.coverImage ? (
            <img
              src={asset.coverImage}
              alt={asset.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full ${config.color}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.color} text-white text-xs font-medium`}>
              <TypeIcon className="w-3.5 h-3.5" />
              {config.label}
            </div>
          </div>

          {/* License Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${license.className}`}>
              {license.label}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
              {asset.title}
            </h3>
            <p className="text-sm text-gray-300 line-clamp-2 mb-4">
              {asset.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={asset.author.avatar}
                  alt={asset.author.displayName}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-300">{asset.author.displayName}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {asset.stats.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {asset.stats.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/ip/${asset.slug}`}
      className="group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 card-hover"
    >
      {/* Cover Image */}
      <div className="aspect-[16/9] relative overflow-hidden">
        {asset.coverImage ? (
          <img
            src={asset.coverImage}
            alt={asset.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full ${config.color} flex items-center justify-center`}>
            <TypeIcon className="w-16 h-16 text-white/50" />
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${config.color} text-white text-xs font-medium`}>
            <TypeIcon className="w-3 h-3" />
            {config.label}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary-600 transition-colors line-clamp-1">
            {asset.title}
          </h3>
          <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${license.className}`}>
            {license.label}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {asset.summary}
        </p>

        {/* Tags */}
        {asset.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {asset.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400"
              >
                {tag.name}
              </span>
            ))}
            {asset.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-400">
                +{asset.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <img
              src={asset.author.avatar}
              alt={asset.author.displayName}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-xs text-gray-500">{asset.author.displayName}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1" title="Likes">
              <Heart className="w-3.5 h-3.5" />
              {asset.stats.likes}
            </span>
            <span className="flex items-center gap-1" title="Views">
              <Eye className="w-3.5 h-3.5" />
              {asset.stats.views}
            </span>
            <span className="flex items-center gap-1" title="Forks">
              <GitFork className="w-3.5 h-3.5" />
              {asset.stats.forks}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
