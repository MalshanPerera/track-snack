import type { Album } from "@/domain/entities/album";
import type { AlbumRepository } from "@/domain/repositories/album-repository";

/**
 * Use Case: Get Artist Albums
 * Fetches all albums by a specific artist using artist.gettopalbums endpoint
 */
export class GetArtistAlbumsUseCase {
	constructor(private readonly albumRepository: AlbumRepository) {}

	async execute(artist: string, limit = 50): Promise<Album[]> {
		return this.albumRepository.getArtistAlbums(artist, limit);
	}
}

