import type { Track } from "./track";

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
