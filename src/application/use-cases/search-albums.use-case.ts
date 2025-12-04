import type { Album } from "@/domain/entities/album";
import type { AlbumRepository } from "@/domain/repositories/album-repository";

export class SearchAlbumsUseCase {
	constructor(private readonly albumRepository: AlbumRepository) {}

	async execute(query: string, limit = 30, page = 1): Promise<Album[]> {
		if (!query.trim()) {
			return [];
		}
		return this.albumRepository.searchAlbums(query, limit, page);
	}
}
