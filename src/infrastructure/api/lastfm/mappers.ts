import type {
	Album,
	AlbumImage,
	ImageSize,
	Track,
	TrackArtist,
} from "@/domain/entities/album";

import type { LastFmAlbumDto, LastFmImageDto, LastFmTrackDto } from "./types";

/**
 * Infrastructure Mappers
 * Convert Last.fm API DTOs to clean domain entities
 */

export function mapLastFmImagesToDomain(
	images: LastFmImageDto[] | undefined,
): AlbumImage[] {
	if (!images) return [];

	return images
		.filter((img) => img["#text"] && img.size)
		.map((img) => ({
			url: img["#text"],
			size: (img.size || "medium") as ImageSize,
		}));
}

export function mapLastFmTrackArtistToDomain(
	artist: LastFmTrackDto["artist"],
): TrackArtist {
	if (typeof artist === "string") {
		return { name: artist };
	}
	return {
		name: artist.name,
		mbid: artist.mbid,
		url: artist.url,
	};
}

export function mapLastFmTrackToDomain(dto: LastFmTrackDto): Track {
	return {
		name: dto.name,
		artist: mapLastFmTrackArtistToDomain(dto.artist),
		duration: dto.duration ? parseInt(dto.duration, 10) : undefined,
		listeners: dto.listeners ? parseInt(dto.listeners, 10) : undefined,
		playcount: dto.playcount ? parseInt(dto.playcount, 10) : undefined,
		url: dto.url,
		streamable: dto.streamable?.fulltrack === "1",
		images: mapLastFmImagesToDomain(dto.image),
		rank: dto["@attr"]?.rank ? parseInt(dto["@attr"].rank, 10) : undefined,
	};
}

export function mapLastFmAlbumToDomain(dto: LastFmAlbumDto): Album {
	const tracks = dto.tracks?.track
		? Array.isArray(dto.tracks.track)
			? dto.tracks.track.map(mapLastFmTrackToDomain)
			: [mapLastFmTrackToDomain(dto.tracks.track)]
		: undefined;

	return {
		name: dto.name,
		artist: dto.artist,
		mbid: dto.mbid,
		url: dto.url,
		images: mapLastFmImagesToDomain(dto.image),
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
