import type { AlbumImage } from "./album";
import type { TrackArtist } from "./track";

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
