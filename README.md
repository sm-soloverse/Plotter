# Plotter - Micro-IP Marketplace

A marketplace for short-form writers to plan, create, and share their lore, characters, stories, and more.

## Features

### Create & Manage IP
- **Characters** - Create memorable characters with backstory, traits, and relationships
- **Worlds** - Build entire universes with lore, locations, and rules
- **Stories** - Write short fiction, flash fiction, or story outlines
- **Lore** - Document history, mythology, and world events
- **Items** - Design magical artifacts, weapons, or objects
- **Factions** - Create organizations, guilds, or groups
- **Events** - Document significant historical or future events
- **Concepts** - Define magic systems, technologies, or abstract ideas

### Licensing Options
- **Open** - Anyone can use, modify, and share
- **Attribution** - Free to use with credit
- **Non-Commercial** - Free for non-commercial use only
- **Exclusive** - Available for exclusive licensing
- **Restricted** - View only, no derivative works

### Discovery & Sharing
- Browse and search marketplace
- Filter by type, license, and tags
- Fork and remix other creators' work
- Save to collections
- Follow creators

### User Features
- Personal profile with stats
- Manage creations (published, drafts, archived)
- Collections to organize favorites
- Customizable settings

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/plotter.git
cd plotter
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── create/            # Create new IP
│   ├── explore/           # Browse marketplace
│   ├── ip/[slug]/         # IP detail & edit pages
│   ├── characters/        # Characters listing
│   ├── worlds/            # Worlds listing
│   ├── stories/           # Stories listing
│   ├── collections/       # Collections listing
│   ├── profile/           # User profile
│   ├── my-creations/      # Manage user's creations
│   └── settings/          # User settings
├── components/            # Reusable UI components
│   ├── Navigation.tsx     # Top navigation bar
│   ├── Footer.tsx         # Footer
│   ├── IPCard.tsx         # IP asset card component
│   ├── IPForm.tsx         # Create/edit IP form
│   ├── FilterPanel.tsx    # Search filters
│   ├── TagInput.tsx       # Tag input component
│   ├── Modal.tsx          # Modal dialog
│   ├── Tabs.tsx           # Tab navigation
│   └── ...
├── store/                 # Zustand state management
│   └── index.ts           # Global store with mock data
└── types/                 # TypeScript type definitions
    └── index.ts           # IP types, user types, etc.
```

## Key Features Explained

### IP Asset System
Each IP asset has:
- Type (character, world, story, lore, item, faction, event, concept)
- Title and summary
- Full markdown content
- Cover image
- Author information
- License type
- Tags for discovery
- Stats (views, likes, forks, comments)
- Connections to related assets
- Optional world association

### Markdown Support
Content supports basic markdown formatting:
- Headings (# ## ###)
- Lists (- item)
- Emphasis (*italic*)
- Paragraphs

### Forking System
Users can fork any IP asset to create their own version, maintaining a link to the original for attribution.

### Collections
Organize and curate IP assets into themed collections for easy sharing and discovery.

## Development

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New IP Types

1. Add type to `IPCategory` in `src/types/index.ts`
2. Create type-specific interface extending `IPAsset`
3. Add type config in components (icon, color, label)
4. Update forms and filters as needed

## License

MIT
