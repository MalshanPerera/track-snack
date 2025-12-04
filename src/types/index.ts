// Re-export pagination types
export type { PaginatedResponse } from "@/api/types";

// Domain types for Album and Track

export interface Album {
	name: string;
	artist: string;
	mbid?: string;
	url: string;
	images: AlbumImage[];
	listeners?: number;
	playcount?: number;
	tracks?: Track[];
	wiki?: AlbumWiki;
}

export interface AlbumImage {
	url: string;
	size: ImageSize;
}

export type ImageSize = "small" | "medium" | "large" | "extralarge" | "mega";

export interface AlbumWiki {
	published?: string;
	summary: string;
	content: string;
}

export interface Track {
	name: string;
	artist: TrackArtist;
	duration?: number;
	listeners?: number;
	playcount?: number;
	url: string;
	streamable?: boolean;
	images?: AlbumImage[];
	rank?: number;
}

export interface TrackArtist {
	name: string;
	mbid?: string;
	url?: string;
}

// Sort options
export const SortOptions = {
	NAME_ASC: "name-asc",
	NAME_DESC: "name-desc",
	YEAR_ASC: "year-asc",
	YEAR_DESC: "year-desc",
} as const;

export type SortOption = (typeof SortOptions)[keyof typeof SortOptions];
