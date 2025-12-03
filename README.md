# 🎵 Track Snack

A modern React application that showcases albums and songs using the Last.fm API. Discover artists, explore their discographies, search for music, and manage your favorite tracks—all in one beautiful interface.

## 📋 Overview

Artist Showcase is a single-page application built with React and TypeScript that provides an intuitive way to browse and explore music. The app fetches artist, album, and track data from the Last.fm API, allowing users to discover new music and manage their favorites.

**API:** [Last.fm API](https://www.last.fm/api)

## ✨ Features

### Must-Haves ✅

- **Album Overview**
  - Display all albums for an artist with cover art, name, and release year
  - Sort albums by year or name
  - Responsive layout

- **Album Detail View**
  - Show comprehensive album information
  - Display complete track list with all songs
  - Navigate back to artist overview

- **Search Functionality**
  - Search for songs or albums
  - Display all tracks/albums matching the search query
  - Real-time search results

### Nice-to-Haves 🎁

- **Favorites System**
  - Add songs to a favorites list
  - Add favorites from album detail view
  - Add favorites from search results
  - Favorites overview page with all favorite songs (title, duration, album, favorite state)
  - Remove songs from favorites
  - Search bar for quick favorite management
  - Click a song to open its album detail

- **Best Played Graph**
  - Visual graph of the most-played tracks on an album
  - Search for album and view play count statistics
  - Graph all songs by play count

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Powerful data fetching and caching
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management for favorites
- **Recharts** - Beautiful charts for play count visualization
- **Chakra UI** - Accessible component library with beautiful design system

### Development Tools

- **Biome** - Fast linter and formatter
- **Vitest** - Unit testing framework
- **T3Env** - Type-safe environment variables
- **Lucide React** - Beautiful icon library

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
VITE_LAST_FM_API_KEY
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

## 🏗️ Building for Production

To create a production build:

```bash
bun run build
```

Or with npm/yarn:

```bash
npm run build
# or
yarn build
```

The optimized build will be in the `dist` directory.

To preview the production build locally:

```bash
bun run serve
```

Or with npm/yarn:

```bash
npm run serve
# or
yarn serve
```
