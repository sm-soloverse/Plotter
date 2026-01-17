import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  IPAsset,
  User,
  Collection,
  IPCategory,
  LicenseType,
  ContentStatus,
  SearchFilters,
  IPAssetFormData,
  Tag,
} from '@/types';

// Current user (mock)
const currentUser: User = {
  id: 'user-1',
  username: 'storyweaver',
  displayName: 'Story Weaver',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=storyweaver',
  bio: 'Writer of worlds, creator of characters. Building micro-universes one story at a time.',
  createdAt: new Date('2024-01-01'),
  stats: {
    creations: 12,
    followers: 245,
    following: 89,
    likes: 1420,
  },
};

// Mock users for demo
const mockUsers: User[] = [
  currentUser,
  {
    id: 'user-2',
    username: 'worldbuilder42',
    displayName: 'World Builder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=worldbuilder',
    bio: 'Creating intricate fantasy worlds with deep lore.',
    createdAt: new Date('2024-02-15'),
    stats: { creations: 28, followers: 512, following: 156, likes: 3200 },
  },
  {
    id: 'user-3',
    username: 'mythmaker',
    displayName: 'Myth Maker',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mythmaker',
    bio: 'Mythology enthusiast crafting modern legends.',
    createdAt: new Date('2024-03-10'),
    stats: { creations: 45, followers: 890, following: 234, likes: 5600 },
  },
];

// Sample tags
const sampleTags: Tag[] = [
  { id: 'tag-1', name: 'Fantasy', category: 'genre', count: 234 },
  { id: 'tag-2', name: 'Sci-Fi', category: 'genre', count: 189 },
  { id: 'tag-3', name: 'Dark Fantasy', category: 'genre', count: 156 },
  { id: 'tag-4', name: 'Magic System', category: 'element', count: 123 },
  { id: 'tag-5', name: 'Political Intrigue', category: 'theme', count: 98 },
  { id: 'tag-6', name: 'Romance', category: 'genre', count: 201 },
  { id: 'tag-7', name: 'Horror', category: 'genre', count: 87 },
  { id: 'tag-8', name: 'Cyberpunk', category: 'genre', count: 145 },
  { id: 'tag-9', name: 'Steampunk', category: 'genre', count: 112 },
  { id: 'tag-10', name: 'Post-Apocalyptic', category: 'setting', count: 76 },
];

// Initial mock IP assets
const initialAssets: IPAsset[] = [
  {
    id: 'ip-1',
    type: 'character',
    title: 'Kira Shadowbane',
    slug: 'kira-shadowbane',
    summary: 'A rogue assassin turned reluctant hero, haunted by her past.',
    content: `# Kira Shadowbane

Kira was born in the slums of Nethercross, where survival meant learning to fight before learning to read. Orphaned at seven, she was taken in by the Shadow Guild, trained to become one of their deadliest assets.

## The Turning Point

Everything changed when she was ordered to eliminate a target who turned out to be protecting orphans just like she once was. She couldn't complete the mission, and in that moment of hesitation, she found her humanity again.

Now she walks the line between light and darkness, using her deadly skills to protect those who cannot protect themselves.`,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    author: mockUsers[0],
    status: 'published',
    license: 'attribution',
    tags: [sampleTags[0], sampleTags[2]],
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-11-01'),
    stats: { views: 1250, likes: 89, forks: 12, comments: 23 },
    connections: ['ip-2'],
  },
  {
    id: 'ip-2',
    type: 'world',
    title: 'The Shattered Realms',
    slug: 'the-shattered-realms',
    summary: 'A fractured world where reality bends and ancient powers stir.',
    content: `# The Shattered Realms

Once a unified world of great magical empires, the Shattered Realms now exist as floating fragments suspended in an endless void. The Sundering, caused by a war between gods, broke reality itself.

## The Fragments

Each fragment maintains its own ecosystem, connected to others by bridges of crystallized magic. Some fragments are lush with life, others barren wastelands, and some host civilizations that have adapted to this strange existence.

## Magic

Magic flows through the void like rivers of light, and those who learn to harness it can bend reality—but at great cost. The more powerful the magic, the more it draws the attention of things that lurk in the spaces between.`,
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    author: mockUsers[1],
    status: 'published',
    license: 'open',
    tags: [sampleTags[0], sampleTags[3]],
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-10-28'),
    stats: { views: 2340, likes: 156, forks: 34, comments: 45 },
    connections: ['ip-1', 'ip-3'],
  },
  {
    id: 'ip-3',
    type: 'lore',
    title: 'The Sundering',
    slug: 'the-sundering',
    summary: 'The cataclysmic event that shattered the world into fragments.',
    content: `# The Sundering

Three thousand years ago, the world was whole. The great empires of Aethon, Valoria, and the Dusk Kingdoms competed for dominance, their mages wielding powers that rivaled the gods themselves.

## The War of Ascension

When the Mage-King Valdris attempted to become a god, the pantheon divided. Some supported mortal ascension, others opposed it. Their war tore through dimensions.

## The Breaking

At the climax of the battle, the goddess Eternal and the god Oblivion struck each other with weapons forged from pure creation and destruction. The resulting clash shattered reality itself.

## Aftermath

The survivors found themselves on floating fragments of their once-great world, struggling to understand what remained.`,
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
    author: mockUsers[1],
    status: 'published',
    license: 'attribution',
    tags: [sampleTags[0], sampleTags[4]],
    createdAt: new Date('2024-09-22'),
    updatedAt: new Date('2024-10-15'),
    stats: { views: 1890, likes: 123, forks: 18, comments: 31 },
    worldId: 'ip-2',
    connections: ['ip-2'],
  },
  {
    id: 'ip-4',
    type: 'story',
    title: 'Echoes in the Void',
    slug: 'echoes-in-the-void',
    summary: 'A short tale of a void-walker discovering an impossible transmission.',
    content: `# Echoes in the Void

The void between fragments was supposed to be empty. Everyone knew that. The crystallized magic bridges were the only safe passage, and venturing into the darkness meant certain dissolution.

So when Maya's receiver picked up the signal, she didn't believe it at first.

*"...if anyone can hear this... we're still here... the Original World... it wasn't destroyed..."*

The message looped, ancient and impossible. The Original World—the mythical unified planet from before the Sundering—was just a legend. A comforting story told to children.

Maya adjusted her void-suit, checked her tether, and stepped off the edge of her fragment into the endless dark.

Some legends were worth dying for.`,
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
    author: mockUsers[2],
    status: 'published',
    license: 'non-commercial',
    tags: [sampleTags[1], sampleTags[0]],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-10'),
    stats: { views: 890, likes: 67, forks: 8, comments: 19 },
    worldId: 'ip-2',
    connections: ['ip-2', 'ip-3'],
  },
  {
    id: 'ip-5',
    type: 'item',
    title: 'The Compass of Lost Things',
    slug: 'compass-of-lost-things',
    summary: 'An artifact that always points toward what you seek most.',
    content: `# The Compass of Lost Things

A small brass compass with no magnetic needle. Instead, a crystal shard floats in luminescent fluid, always pointing toward what the holder most needs to find.

## Properties

- **Seeking**: The compass attunes to the holder's deepest desire or most urgent need
- **Truth-seeing**: Cannot be deceived by illusions or misdirection
- **Cost**: Each use drains a memory from the holder—usually small, but increasingly significant

## History

Created by the Wandering Sage Elros for his daughter, who was lost during the Sundering. The compass passed through many hands, each seeking something precious.

## Current Location

Unknown. Last seen in the possession of a void-walker named Maya.`,
    coverImage: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=800',
    author: mockUsers[2],
    status: 'published',
    license: 'open',
    tags: [sampleTags[0], sampleTags[3]],
    createdAt: new Date('2024-10-25'),
    updatedAt: new Date('2024-11-05'),
    stats: { views: 1120, likes: 94, forks: 22, comments: 16 },
    worldId: 'ip-2',
    connections: ['ip-2', 'ip-4'],
  },
  {
    id: 'ip-6',
    type: 'faction',
    title: 'The Void Walkers Guild',
    slug: 'void-walkers-guild',
    summary: 'Brave explorers who traverse the darkness between fragments.',
    content: `# The Void Walkers Guild

When the world shattered, most people stayed on their fragments, building new lives among the ruins. But some looked out into the void and saw not danger, but opportunity.

## Purpose

The Void Walkers Guild maps the spaces between, discovers new fragments, and maintains the crystal bridges that connect civilization.

## Membership

Joining requires surviving a solo walk through the void—a journey that kills three out of four who attempt it. Those who return are changed, able to sense the currents of magic that flow through the darkness.

## Structure

- **The Council of Echoes**: Seven senior walkers who guide the guild
- **Pathfinders**: Those who discover new routes
- **Bridgemasters**: Specialists in crystal bridge construction
- **Seekers**: Hunters of artifacts and lost knowledge`,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    author: mockUsers[1],
    status: 'published',
    license: 'attribution',
    tags: [sampleTags[0], sampleTags[1]],
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-20'),
    stats: { views: 780, likes: 56, forks: 9, comments: 12 },
    worldId: 'ip-2',
    connections: ['ip-2', 'ip-4'],
  },
];

interface StoreState {
  // Data
  currentUser: User | null;
  users: User[];
  assets: IPAsset[];
  collections: Collection[];
  tags: Tag[];

  // UI State
  searchFilters: SearchFilters;
  isCreating: boolean;
  selectedAsset: IPAsset | null;

  // Actions
  setCurrentUser: (user: User | null) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setSelectedAsset: (asset: IPAsset | null) => void;
  setIsCreating: (creating: boolean) => void;

  // Asset CRUD
  createAsset: (formData: IPAssetFormData) => IPAsset;
  updateAsset: (id: string, formData: Partial<IPAssetFormData>) => void;
  deleteAsset: (id: string) => void;
  likeAsset: (id: string) => void;
  forkAsset: (id: string) => IPAsset;

  // Collection CRUD
  createCollection: (name: string, description?: string) => Collection;
  addToCollection: (collectionId: string, assetId: string) => void;
  removeFromCollection: (collectionId: string, assetId: string) => void;

  // Queries
  getAssetById: (id: string) => IPAsset | undefined;
  getAssetsByType: (type: IPCategory) => IPAsset[];
  getAssetsByAuthor: (authorId: string) => IPAsset[];
  getAssetsByWorld: (worldId: string) => IPAsset[];
  searchAssets: (filters: SearchFilters) => IPAsset[];
  getRelatedAssets: (assetId: string) => IPAsset[];
  getFeaturedAssets: () => IPAsset[];
  getTrendingAssets: () => IPAsset[];
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial data
      currentUser,
      users: mockUsers,
      assets: initialAssets,
      collections: [],
      tags: sampleTags,

      // UI State
      searchFilters: {},
      isCreating: false,
      selectedAsset: null,

      // Actions
      setCurrentUser: (user) => set({ currentUser: user }),
      setSearchFilters: (filters) => set({ searchFilters: filters }),
      setSelectedAsset: (asset) => set({ selectedAsset: asset }),
      setIsCreating: (creating) => set({ isCreating: creating }),

      // Asset CRUD
      createAsset: (formData) => {
        const { currentUser, assets, tags } = get();
        if (!currentUser) throw new Error('Must be logged in to create assets');

        const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const newAsset: IPAsset = {
          id: `ip-${uuidv4()}`,
          type: formData.type,
          title: formData.title,
          slug,
          summary: formData.summary,
          content: formData.content,
          coverImage: formData.coverImage,
          author: currentUser,
          status: formData.status,
          license: formData.license,
          tags: formData.tags.map((tagName) => {
            const existing = tags.find((t) => t.name.toLowerCase() === tagName.toLowerCase());
            return existing || { id: `tag-${uuidv4()}`, name: tagName };
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
          stats: { views: 0, likes: 0, forks: 0, comments: 0 },
          worldId: formData.worldId,
          connections: [],
        };

        set({ assets: [newAsset, ...assets] });
        return newAsset;
      },

      updateAsset: (id, formData) => {
        const { assets, tags } = get();
        set({
          assets: assets.map((asset) =>
            asset.id === id
              ? {
                  ...asset,
                  ...formData,
                  tags: formData.tags
                    ? formData.tags.map((tagName) => {
                        const existing = tags.find((t) => t.name.toLowerCase() === tagName.toLowerCase());
                        return existing || { id: `tag-${uuidv4()}`, name: tagName };
                      })
                    : asset.tags,
                  updatedAt: new Date(),
                }
              : asset
          ),
        });
      },

      deleteAsset: (id) => {
        const { assets } = get();
        set({ assets: assets.filter((a) => a.id !== id) });
      },

      likeAsset: (id) => {
        const { assets } = get();
        set({
          assets: assets.map((asset) =>
            asset.id === id
              ? { ...asset, stats: { ...asset.stats, likes: asset.stats.likes + 1 } }
              : asset
          ),
        });
      },

      forkAsset: (id) => {
        const { currentUser, assets } = get();
        if (!currentUser) throw new Error('Must be logged in to fork assets');

        const original = assets.find((a) => a.id === id);
        if (!original) throw new Error('Asset not found');

        const forkedAsset: IPAsset = {
          ...original,
          id: `ip-${uuidv4()}`,
          title: `${original.title} (Fork)`,
          slug: `${original.slug}-fork-${Date.now()}`,
          author: currentUser,
          status: 'draft',
          createdAt: new Date(),
          updatedAt: new Date(),
          stats: { views: 0, likes: 0, forks: 0, comments: 0 },
          parentId: original.id,
        };

        // Update original's fork count
        set({
          assets: [
            forkedAsset,
            ...assets.map((a) =>
              a.id === id ? { ...a, stats: { ...a.stats, forks: a.stats.forks + 1 } } : a
            ),
          ],
        });

        return forkedAsset;
      },

      // Collection CRUD
      createCollection: (name, description) => {
        const { currentUser, collections } = get();
        if (!currentUser) throw new Error('Must be logged in');

        const collection: Collection = {
          id: `col-${uuidv4()}`,
          name,
          description,
          author: currentUser,
          assets: [],
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set({ collections: [collection, ...collections] });
        return collection;
      },

      addToCollection: (collectionId, assetId) => {
        const { collections } = get();
        set({
          collections: collections.map((col) =>
            col.id === collectionId && !col.assets.includes(assetId)
              ? { ...col, assets: [...col.assets, assetId], updatedAt: new Date() }
              : col
          ),
        });
      },

      removeFromCollection: (collectionId, assetId) => {
        const { collections } = get();
        set({
          collections: collections.map((col) =>
            col.id === collectionId
              ? { ...col, assets: col.assets.filter((id) => id !== assetId), updatedAt: new Date() }
              : col
          ),
        });
      },

      // Queries
      getAssetById: (id) => get().assets.find((a) => a.id === id),

      getAssetsByType: (type) => get().assets.filter((a) => a.type === type && a.status === 'published'),

      getAssetsByAuthor: (authorId) => get().assets.filter((a) => a.author.id === authorId),

      getAssetsByWorld: (worldId) => get().assets.filter((a) => a.worldId === worldId && a.status === 'published'),

      searchAssets: (filters) => {
        let results = get().assets.filter((a) => a.status === 'published');

        if (filters.query) {
          const query = filters.query.toLowerCase();
          results = results.filter(
            (a) =>
              a.title.toLowerCase().includes(query) ||
              a.summary.toLowerCase().includes(query) ||
              a.content.toLowerCase().includes(query) ||
              a.tags.some((t) => t.name.toLowerCase().includes(query))
          );
        }

        if (filters.types && filters.types.length > 0) {
          results = results.filter((a) => filters.types!.includes(a.type));
        }

        if (filters.licenses && filters.licenses.length > 0) {
          results = results.filter((a) => filters.licenses!.includes(a.license));
        }

        if (filters.tags && filters.tags.length > 0) {
          results = results.filter((a) =>
            filters.tags!.some((tag) => a.tags.some((t) => t.name.toLowerCase() === tag.toLowerCase()))
          );
        }

        if (filters.author) {
          results = results.filter((a) => a.author.id === filters.author);
        }

        if (filters.worldId) {
          results = results.filter((a) => a.worldId === filters.worldId);
        }

        // Sort
        switch (filters.sortBy) {
          case 'popular':
            results.sort((a, b) => b.stats.likes - a.stats.likes);
            break;
          case 'trending':
            results.sort((a, b) => b.stats.views - a.stats.views);
            break;
          case 'alphabetical':
            results.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'recent':
          default:
            results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return results;
      },

      getRelatedAssets: (assetId) => {
        const { assets } = get();
        const asset = assets.find((a) => a.id === assetId);
        if (!asset) return [];

        return assets.filter(
          (a) =>
            a.id !== assetId &&
            a.status === 'published' &&
            (asset.connections.includes(a.id) ||
              a.worldId === asset.worldId ||
              a.tags.some((t) => asset.tags.some((at) => at.id === t.id)))
        ).slice(0, 6);
      },

      getFeaturedAssets: () => {
        return get().assets
          .filter((a) => a.status === 'published')
          .sort((a, b) => b.stats.likes + b.stats.views - (a.stats.likes + a.stats.views))
          .slice(0, 6);
      },

      getTrendingAssets: () => {
        return get().assets
          .filter((a) => a.status === 'published')
          .sort((a, b) => b.stats.views - a.stats.views)
          .slice(0, 10);
      },
    }),
    {
      name: 'micro-ip-store',
      partialize: (state) => ({
        assets: state.assets,
        collections: state.collections,
      }),
    }
  )
);
