import type { Track } from "@/domain/entities/album";
import type { AlbumRepository } from "@/domain/repositories/album-repository";

export class SearchTracksUseCase {
	constructor(private readonly albumRepository: AlbumRepository) {}

	async execute(query: string, limit = 30, page = 1): Promise<Track[]> {
		if (!query.trim()) {
			return [];
		}
		return this.albumRepository.searchTracks(query, limit, page);
	}
}
