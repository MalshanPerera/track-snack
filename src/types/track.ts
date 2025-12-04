import type { AlbumImage } from "./album";

/**
 * Track domain model
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

/**
 * Track artist information
 */
export interface TrackArtist {
	name: string;
	mbid?: string;
	url?: string;
}
