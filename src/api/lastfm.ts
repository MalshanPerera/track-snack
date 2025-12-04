import { env } from "@/env";
import type {
	Album,
	AlbumImage,
	ImageSize,
	PaginatedResponse,
	Track,
	TrackArtist,
} from "@/types";

import type {
	LastFmAlbumDto,
	LastFmArtistTopTracksResponse,
	LastFmChartTopTracksResponse,
	LastFmImageDto,
	LastFmResponse,
	LastFmTopAlbumsResponse,
	LastFmTrackDto,
	LastFmTrackInfoResponse,
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

// Helper to calculate pagination from LastFM search response
function calculateSearchPagination(
	results: LastFmResponse<unknown>["results"],
	currentPage: number,
	perPage: number,
): { totalPages: number; total: number; hasNextPage: boolean } {
	const totalResults = parseInt(
		results?.["opensearch:totalResults"] || "0",
		10,
	);
	const totalPages = Math.ceil(totalResults / perPage);
	return {
		total: totalResults,
		totalPages,
		hasNextPage: currentPage < totalPages,
	};
}

// API functions
export async function searchAlbums(
	query: string,
	limit = 30,
	page = 1,
): Promise<PaginatedResponse<Album>> {
	if (!query.trim()) {
		return {
			data: [],
			page: 1,
			perPage: limit,
			totalPages: 0,
			total: 0,
			hasNextPage: false,
		};
	}

	const data = await request<LastFmResponse<LastFmAlbumDto>>({
		method: "album.search",
		album: query,
		limit,
		page,
	});

	const albums = data.results?.albummatches?.album || [];
	const pagination = calculateSearchPagination(data.results, page, limit);

	return {
		data: albums.map(mapAlbum),
		page,
		perPage: limit,
		...pagination,
	};
}

export async function searchTracks(
	query: string,
	limit = 30,
	page = 1,
): Promise<PaginatedResponse<Track>> {
	if (!query.trim()) {
		return {
			data: [],
			page: 1,
			perPage: limit,
			totalPages: 0,
			total: 0,
			hasNextPage: false,
		};
	}

	const data = await request<LastFmResponse<LastFmTrackDto>>({
		method: "track.search",
		track: query,
		limit,
		page,
	});

	const tracks = data.results?.trackmatches?.track || [];
	const trackArray = Array.isArray(tracks) ? tracks : [tracks];
	const pagination = calculateSearchPagination(data.results, page, limit);

	return {
		data: trackArray.map(mapTrack),
		page,
		perPage: limit,
		...pagination,
	};
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
	limit = 30,
	page = 1,
): Promise<PaginatedResponse<Album>> {
	const data = await request<LastFmTopAlbumsResponse>({
		method: "artist.gettopalbums",
		artist,
		limit,
		page,
	});

	const albums = data.topalbums?.album || [];
	const attr = data.topalbums?.["@attr"];
	const totalPages = attr ? parseInt(attr.totalPages, 10) : 1;
	const total = attr ? parseInt(attr.total, 10) : albums.length;

	return {
		data: albums.map((dto) => ({
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
		})),
		page,
		perPage: limit,
		totalPages,
		total,
		hasNextPage: page < totalPages,
	};
}

export async function getChartTopTracks(
	limit = 50,
	page = 1,
): Promise<PaginatedResponse<Track>> {
	const data = await request<LastFmChartTopTracksResponse>({
		method: "chart.gettoptracks",
		limit,
		page,
	});

	const tracks = data.tracks?.track || [];
	const attr = data.tracks?.["@attr"];
	const totalPages = attr ? parseInt(attr.totalPages, 10) : 1;
	const total = attr ? parseInt(attr.total, 10) : tracks.length;

	return {
		data: tracks.map(mapTrack),
		page,
		perPage: limit,
		totalPages,
		total,
		hasNextPage: page < totalPages,
	};
}

export interface TrackWithAlbum extends Track {
	albumName?: string;
	albumArtist?: string;
}

export async function getArtistTopTracks(
	artist: string,
	limit = 30,
	page = 1,
): Promise<PaginatedResponse<TrackWithAlbum>> {
	if (!artist.trim()) {
		return {
			data: [],
			page: 1,
			perPage: limit,
			totalPages: 0,
			total: 0,
			hasNextPage: false,
		};
	}

	const data = await request<LastFmArtistTopTracksResponse>({
		method: "artist.gettoptracks",
		artist,
		limit,
		page,
	});

	const tracks = data.toptracks?.track || [];
	const attr = data.toptracks?.["@attr"];
	const totalPages = attr ? parseInt(attr.totalPages, 10) : 1;
	const total = attr ? parseInt(attr.total, 10) : tracks.length;

	return {
		data: tracks.map((dto) => ({
			name: dto.name,
			artist: {
				name: dto.artist.name,
				mbid: dto.artist.mbid,
				url: dto.artist.url,
			},
			playcount: parseInt(dto.playcount, 10),
			listeners: parseInt(dto.listeners, 10),
			url: dto.url,
			images: mapImages(dto.image),
			rank: parseInt(dto["@attr"].rank, 10),
		})),
		page,
		perPage: limit,
		totalPages,
		total,
		hasNextPage: page < totalPages,
	};
}

export interface TrackInfo {
	name: string;
	artist: string;
	albumName?: string;
	albumArtist?: string;
	playcount: number;
	listeners: number;
}

export async function getTrackInfo(
	artist: string,
	track: string,
): Promise<TrackInfo> {
	const data = await request<LastFmTrackInfoResponse>({
		method: "track.getInfo",
		artist,
		track,
	});

	const trackData = data.track;

	return {
		name: trackData.name,
		artist: trackData.artist.name,
		albumName: trackData.album?.title,
		albumArtist: trackData.album?.artist,
		playcount: parseInt(trackData.playcount, 10),
		listeners: parseInt(trackData.listeners, 10),
	};
}
