import type { Album, Track } from "@/domain/entities/album";
import type { AlbumRepository } from "@/domain/repositories/album-repository";
import { env } from "@/env";

import { mapLastFmAlbumToDomain, mapLastFmTrackToDomain } from "./mappers";
import type {
	LastFmAlbumDto,
	LastFmResponse,
	LastFmTopAlbumsResponse,
	LastFmTrackDto,
} from "./types";

const API_BASE_URL = env.VITE_BASE_URL;
const API_KEY = env.VITE_LAST_FM_API_KEY;

export class LastFmClient implements AlbumRepository {
	private async request<T>(
		params: Record<string, string | number>,
	): Promise<T> {
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

	async searchAlbums(query: string, limit = 30, page = 1): Promise<Album[]> {
		const data = await this.request<LastFmResponse<LastFmAlbumDto>>({
			method: "album.search",
			album: query,
			limit,
			page,
		});

		const albums = data.results?.albummatches?.album || [];
		return albums.map(mapLastFmAlbumToDomain);
	}

	async searchTracks(query: string, limit = 30, page = 1): Promise<Track[]> {
		const data = await this.request<LastFmResponse<LastFmTrackDto>>({
			method: "track.search",
			track: query,
			limit,
			page,
		});

		const tracks = data.results?.trackmatches?.track || [];
		const trackArray = Array.isArray(tracks) ? tracks : [tracks];
		return trackArray.map(mapLastFmTrackToDomain);
	}

	async getAlbumInfo(
		artist: string,
		album: string,
		mbid?: string,
	): Promise<Album> {
		const params: Record<string, string | number> = {
			method: "album.getinfo",
			artist,
			album,
		};

		if (mbid) {
			params.mbid = mbid;
		}

		const data = await this.request<LastFmResponse<LastFmAlbumDto>>(params);

		// The album.getinfo endpoint returns album at root level, not in results
		const albumDto = data.album || data.results?.album;

		if (!albumDto) {
			throw new Error("Album not found");
		}

		return mapLastFmAlbumToDomain(albumDto);
	}

	async getArtistAlbums(artist: string, limit = 50): Promise<Album[]> {
		return this.getTopAlbumsByArtist(artist, limit);
	}

	async getTopAlbumsByArtist(artist: string, limit = 50): Promise<Album[]> {
		const data = await this.request<LastFmTopAlbumsResponse>({
			method: "artist.gettopalbums",
			artist,
			limit,
		});

		const albums = data.topalbums?.album || [];

		// Map LastFmTopAlbumDto to Album domain entity
		return albums.map((dto) => ({
			name: dto.name,
			artist: dto.artist.name,
			mbid: dto.mbid,
			url: dto.url,
			images: dto.image
				.filter((img) => img["#text"] && img.size)
				.map((img) => ({
					url: img["#text"],
					size: (img.size || "medium") as
						| "small"
						| "medium"
						| "large"
						| "extralarge"
						| "mega",
				})),
			playcount: dto.playcount,
		}));
	}
}
