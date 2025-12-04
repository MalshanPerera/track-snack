/**
 * Domain Entity: Album
 * Clean domain model without external API dependencies
 */
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

/**
 * Domain Entity: Track
 * Clean domain model for music tracks
 */
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
