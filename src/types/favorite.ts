import type { AlbumImage, TrackArtist } from "./index";

export interface FavoriteTrack {
	name: string;
	artist: TrackArtist;
	duration?: number;
	url: string;
	albumName: string;
	albumArtist: string;
	images?: AlbumImage[];
	addedAt: number;
}
