import { env } from "@/env";
import type { Album, AlbumImage, ImageSize, Track, TrackArtist } from "@/types";

import type {
	LastFmAlbumDto,
	LastFmImageDto,
	LastFmResponse,
	LastFmTopAlbumsResponse,
	LastFmTrackDto,
} from "./types";

const API_BASE_URL = env.VITE_BASE_URL;
const API_KEY = env.VITE_LAST_FM_API_KEY;

// Internal request helper
async function request<T>(params: Record<string, string | number>): Promise<T> {
	const searchParams = new URLSearchParams({
		api_key: API_KEY,
		format: "json",
		...Object.fromEntries(
			Object.entries(params).map(([key, value]) => [key, String(value)]),
		),
	});

	const response = await fetch(`${API_BASE_URL}?${searchParams.toString()}`);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data: LastFmResponse<T> = await response.json();

	if (data.error) {
		throw new Error(data.message || `API error: ${data.error}`);
	}

	return data as T;
}

// Mappers
function mapImages(images: LastFmImageDto[] | undefined): AlbumImage[] {
	if (!images) return [];

	return images
		.filter((img) => img["#text"] && img.size)
		.map((img) => ({
			url: img["#text"],
			size: (img.size || "medium") as ImageSize,
		}));
}

function mapTrackArtist(artist: LastFmTrackDto["artist"]): TrackArtist {
	if (typeof artist === "string") {
		return { name: artist };
	}
	return {
		name: artist.name,
		mbid: artist.mbid,
		url: artist.url,
	};
}

function mapTrack(dto: LastFmTrackDto): Track {
	return {
		name: dto.name,
		artist: mapTrackArtist(dto.artist),
		duration: dto.duration ? parseInt(dto.duration, 10) : undefined,
		listeners: dto.listeners ? parseInt(dto.listeners, 10) : undefined,
		playcount: dto.playcount ? parseInt(dto.playcount, 10) : undefined,
		url: dto.url,
		streamable: dto.streamable?.fulltrack === "1",
		images: mapImages(dto.image),
		rank: dto["@attr"]?.rank ? parseInt(dto["@attr"].rank, 10) : undefined,
	};
}

function mapAlbum(dto: LastFmAlbumDto): Album {
	const tracks = dto.tracks?.track
		? Array.isArray(dto.tracks.track)
			? dto.tracks.track.map(mapTrack)
			: [mapTrack(dto.tracks.track)]
		: undefined;

	return {
		name: dto.name,
		artist: dto.artist,
		mbid: dto.mbid,
		url: dto.url,
		images: mapImages(dto.image),
		listeners: dto.listeners ? parseInt(dto.listeners, 10) : undefined,
		playcount: dto.playcount ? parseInt(dto.playcount, 10) : undefined,
		tracks,
		wiki: dto.wiki
			? {
					published: dto.wiki.published,
					summary: dto.wiki.summary,
					content: dto.wiki.content,
				}
			: undefined,
	};
}

// API functions
export async function searchAlbums(
	query: string,
	limit = 30,
	page = 1,
): Promise<Album[]> {
	if (!query.trim()) return [];

	const data = await request<LastFmResponse<LastFmAlbumDto>>({
		method: "album.search",
		album: query,
		limit,
		page,
	});

	const albums = data.results?.albummatches?.album || [];
	return albums.map(mapAlbum);
}

export async function searchTracks(
	query: string,
	limit = 30,
	page = 1,
): Promise<Track[]> {
	if (!query.trim()) return [];

	const data = await request<LastFmResponse<LastFmTrackDto>>({
		method: "track.search",
		track: query,
		limit,
		page,
	});

	const tracks = data.results?.trackmatches?.track || [];
	const trackArray = Array.isArray(tracks) ? tracks : [tracks];
	return trackArray.map(mapTrack);
}

export async function getAlbumInfo(
	artist: string,
	album: string,
	mbid?: string,
): Promise<Album> {
	if (!artist.trim() || !album.trim()) {
		throw new Error("Artist and album names are required");
	}

	const params: Record<string, string | number> = {
		method: "album.getinfo",
		artist,
		album,
	};

	if (mbid) {
		params.mbid = mbid;
	}

	const data = await request<LastFmResponse<LastFmAlbumDto>>(params);

	const albumDto = data.album || data.results?.album;

	if (!albumDto) {
		throw new Error("Album not found");
	}

	return mapAlbum(albumDto);
}

export async function getArtistAlbums(
	artist: string,
	limit = 50,
): Promise<Album[]> {
	const data = await request<LastFmTopAlbumsResponse>({
		method: "artist.gettopalbums",
		artist,
		limit,
	});

	const albums = data.topalbums?.album || [];

	return albums.map((dto) => ({
		name: dto.name,
		artist: dto.artist.name,
		mbid: dto.mbid,
		url: dto.url,
		images: dto.image
			.filter((img) => img["#text"] && img.size)
			.map((img) => ({
				url: img["#text"],
				size: (img.size || "medium") as ImageSize,
			})),
		playcount: dto.playcount,
	}));
}
