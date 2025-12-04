# 🎵 Track Snack

A modern React application that showcases albums and songs using the Last.fm API. Discover artists, explore their discographies, search for music, and manage your favorite tracks—all in one beautiful interface.

**API:** [Last.fm API](https://www.last.fm/api)

## ✨ Features

### 🎤 Album Overview

- Display all albums for an artist with cover art, name, and release year
- Sort albums by year or name
- Responsive grid layout

### 💿 Album Detail View

- Show comprehensive album information
- Display complete track list with all songs
- Navigate back to artist overview

### 🔍 Search Functionality

- Search for songs or albums
- Display all tracks/albums matching the search query
- Real-time search results

### ❤️ Favorites System

- Add songs to a favorites list
- Add favorites from album detail view
- Add favorites from search results
- Favorites overview page with all favorite songs (title, duration, album, favorite state)
- Remove songs from favorites
- Search bar for quick favorite management
- Click a song to open its album detail

### 📊 Best Played Graph

- Visual graph of the most-played tracks on an album
- Search for album and view play count statistics
- Graph all songs by play count

## 🛠️ Tech Stack

### Core Technologies

| Technology          | Description                                               |
| ------------------- | --------------------------------------------------------- |
| **React 19**        | UI library with latest features                           |
| **TypeScript**      | Type-safe development                                     |
| **TanStack Router** | File-based routing with type safety                       |
| **TanStack Query**  | Powerful data fetching and caching                        |
| **Chakra UI**       | Accessible component library with beautiful design system |
| **Vite 7**          | Fast build tool and dev server                            |
| **Zustand**         | Lightweight state management for favorites                |
| **Recharts**        | Beautiful charts for play count visualization             |
| **Zod**             | Schema validation for type-safe data                      |

### Development Tools

| Tool                | Description                       |
| ------------------- | --------------------------------- |
| **Biome**           | Fast linter and formatter         |
| **Vitest**          | Unit testing framework            |
| **Testing Library** | React component testing utilities |
| **T3Env**           | Type-safe environment variables   |
| **Lucide React**    | Beautiful icon library            |

## 📁 Project Structure

```
track-snack/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── __tests__/              # Test files
│   │   ├── lib/                # Library function tests
│   │   └── stores/             # Store tests
│   ├── api/                    # API layer
│   │   ├── lastfm.ts           # Last.fm API client
│   │   └── types.ts            # API response types
│   ├── components/             # Shared components
│   │   ├── ui/                 # UI primitives (color-mode, toaster, tooltip)
│   │   ├── favorites-button.tsx
│   │   ├── infinite-scroll.tsx
│   │   ├── navigation.tsx
│   │   ├── not-found.tsx
│   │   └── theme-toggle.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-album-info.ts
│   │   ├── use-artist-top-albums.ts
│   │   ├── use-infinite-album-search.ts
│   │   ├── use-infinite-artist-albums.ts
│   │   ├── use-infinite-track-search.ts
│   │   └── use-sorted-albums.ts
│   ├── lib/                    # Utility functions
│   │   ├── sort.ts
│   │   └── utils.ts
│   ├── providers/              # React context providers
│   │   ├── query-provider.tsx
│   │   └── root-provider.tsx
│   ├── routes/                 # TanStack Router file-based routes
│   │   ├── __root.tsx          # Root layout
│   │   ├── index.tsx           # Home page
│   │   ├── albums/             # Album routes
│   │   │   ├── -components/    # Album-specific components
│   │   │   ├── $artist.tsx     # Artist albums page
│   │   │   └── $artist/
│   │   │       └── $album.tsx  # Album detail page
│   │   ├── best-played/        # Best played feature
│   │   │   ├── -components/    # Chart components
│   │   │   └── index.tsx
│   │   ├── favorites/          # Favorites feature
│   │   │   ├── -components/    # Favorites components
│   │   │   └── index.tsx
│   │   └── search/             # Search feature
│   │       ├── -components/    # Search components
│   │       └── index.tsx
│   ├── stores/                 # Zustand stores
│   │   ├── best-played-store.ts
│   │   └── favorites-store.ts
│   ├── types/                  # TypeScript type definitions
│   │   ├── album.ts
│   │   ├── favorite.ts
│   │   ├── pagination.ts
│   │   ├── sort.ts
│   │   └── track.ts
│   ├── env.ts                  # Environment configuration
│   ├── main.tsx                # Application entry point
│   ├── routeTree.gen.ts        # Auto-generated route tree
│   └── styles.css              # Global styles
├── biome.json                  # Biome configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Bun** (v1.0+) - [Install Bun](https://bun.sh/docs/installation)
  - Alternatively, you can use `npm` or `yarn`, but Bun is recommended for faster performance

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd track-snack
```

### 2. Install Dependencies

```bash
bun install
```

If you're using npm or yarn:

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.sample .env
```

Add your Last.fm API key to the `.env` file:

```env
VITE_LAST_FM_API_KEY=your_api_key_here
```

**Note:** Create your own at [Last.fm API](https://www.last.fm/api/account/create).

### 4. Run the Development Server

```bash
bun run dev
```

Or with npm/yarn:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

Run the test suite:

```bash
bun run test
```

## 🏗️ Building for Production

To create a production build:

```bash
bun run build
```

The optimized build will be in the `dist` directory.

To preview the production build locally:

```bash
bun run serve
```

## 📝 Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `bun run dev`    | Start development server |
| `bun run build`  | Build for production     |
| `bun run serve`  | Preview production build |
| `bun run test`   | Run tests                |
| `bun run lint`   | Lint code with Biome     |
| `bun run format` | Format code with Biome   |
| `bun run check`  | Run Biome checks         |
