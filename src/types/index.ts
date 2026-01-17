// Core IP Types for Micro-IP Marketplace

export type IPCategory = 'character' | 'world' | 'lore' | 'story' | 'item' | 'faction' | 'event' | 'concept';

export type LicenseType =
  | 'open'           // Free to use, modify, and share
  | 'attribution'    // Free with credit required
  | 'non-commercial' // Free for non-commercial use only
  | 'exclusive'      // Available for exclusive licensing
  | 'restricted';    // View only, no derivative works

export type ContentStatus = 'draft' | 'published' | 'archived' | 'featured';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  stats: {
    creations: number;
    followers: number;
    following: number;
    likes: number;
  };
}

export interface Tag {
  id: string;
  name: string;
  category?: string;
  count?: number;
}

export interface IPAsset {
  id: string;
  type: IPCategory;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  author: User;
  status: ContentStatus;
  license: LicenseType;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  stats: {
    views: number;
    likes: number;
    forks: number;
    comments: number;
  };
  parentId?: string;      // For forks/derivatives
  worldId?: string;       // Associated world
  connections: string[];  // Related IP asset IDs
}

// Character-specific fields
export interface Character extends IPAsset {
  type: 'character';
  details: {
    fullName?: string;
    aliases?: string[];
    age?: string;
    species?: string;
    occupation?: string;
    affiliation?: string;
    appearance?: string;
    personality?: string;
    abilities?: string[];
    backstory?: string;
    relationships?: {
      characterId?: string;
      characterName: string;
      relationship: string;
    }[];
    quotes?: string[];
  };
}

// World-specific fields
export interface World extends IPAsset {
  type: 'world';
  details: {
    genre?: string;
    setting?: string;
    era?: string;
    geography?: string;
    history?: string;
    magic?: string;
    technology?: string;
    cultures?: string[];
    rules?: string[];
    locations?: {
      name: string;
      description: string;
    }[];
  };
}

// Lore-specific fields
export interface Lore extends IPAsset {
  type: 'lore';
  details: {
    category?: string;
    timeframe?: string;
    significance?: string;
    sources?: string[];
    relatedEvents?: string[];
  };
}

// Story-specific fields
export interface Story extends IPAsset {
  type: 'story';
  details: {
    genre?: string;
    wordCount?: number;
    chapters?: {
      title: string;
      content: string;
      order: number;
    }[];
    synopsis?: string;
    themes?: string[];
    warnings?: string[];
  };
}

// Item-specific fields
export interface Item extends IPAsset {
  type: 'item';
  details: {
    itemType?: string;
    rarity?: string;
    origin?: string;
    properties?: string[];
    history?: string;
    currentOwner?: string;
  };
}

// Faction-specific fields
export interface Faction extends IPAsset {
  type: 'faction';
  details: {
    factionType?: string;
    leadership?: string;
    goals?: string[];
    values?: string[];
    enemies?: string[];
    allies?: string[];
    headquarters?: string;
    members?: number;
  };
}

// Event-specific fields
export interface Event extends IPAsset {
  type: 'event';
  details: {
    eventType?: string;
    date?: string;
    duration?: string;
    location?: string;
    participants?: string[];
    outcome?: string;
    consequences?: string[];
  };
}

// Concept-specific fields
export interface Concept extends IPAsset {
  type: 'concept';
  details: {
    conceptType?: string;
    applications?: string[];
    limitations?: string[];
    examples?: string[];
  };
}

// Collection of IP assets
export interface Collection {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  author: User;
  assets: string[];  // IP asset IDs
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Comment on IP assets
export interface Comment {
  id: string;
  assetId: string;
  author: User;
  content: string;
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

// Search and filter options
export interface SearchFilters {
  query?: string;
  types?: IPCategory[];
  licenses?: LicenseType[];
  tags?: string[];
  author?: string;
  sortBy?: 'recent' | 'popular' | 'trending' | 'alphabetical';
  worldId?: string;
}

// Form data types for creating/editing
export interface IPAssetFormData {
  type: IPCategory;
  title: string;
  summary: string;
  content: string;
  coverImage?: string;
  license: LicenseType;
  tags: string[];
  worldId?: string;
  status: ContentStatus;
  details: Record<string, unknown>;
}
