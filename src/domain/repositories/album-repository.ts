import type { Album, Track } from "../entities/album";

export interface AlbumRepository {
	searchAlbums(query: string, limit?: number, page?: number): Promise<Album[]>;
	searchTracks(query: string, limit?: number, page?: number): Promise<Track[]>;
	getAlbumInfo(artist: string, album: string, mbid?: string): Promise<Album>;
	getArtistAlbums(artist: string, limit?: number): Promise<Album[]>;
}
