import type { AlbumImage } from "./album";

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
