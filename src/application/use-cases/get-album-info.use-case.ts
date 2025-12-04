import type { Album } from "@/domain/entities/album";
import type { AlbumRepository } from "@/domain/repositories/album-repository";

export class GetAlbumInfoUseCase {
	constructor(private readonly albumRepository: AlbumRepository) {}

	async execute(artist: string, album: string, mbid?: string): Promise<Album> {
		if (!artist.trim() || !album.trim()) {
			throw new Error("Artist and album names are required");
		}
		return this.albumRepository.getAlbumInfo(artist, album, mbid);
	}
}
