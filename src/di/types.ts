import type { GetAlbumInfoUseCase } from "@/application/use-cases/get-album-info.use-case";
import type { GetArtistAlbumsUseCase } from "@/application/use-cases/get-artist-albums.use-case";
import type { SearchAlbumsUseCase } from "@/application/use-cases/search-albums.use-case";
import type { SearchTracksUseCase } from "@/application/use-cases/search-tracks.use-case";
import type { AlbumRepository } from "@/domain/repositories/album-repository";
import type { SortService } from "@/domain/services/sort-service";

export interface Dependencies {
	// Repositories
	albumRepository: AlbumRepository;

	// Use Cases
	searchAlbumsUseCase: SearchAlbumsUseCase;
	searchTracksUseCase: SearchTracksUseCase;
	getAlbumInfoUseCase: GetAlbumInfoUseCase;
	getArtistAlbumsUseCase: GetArtistAlbumsUseCase;

	// Domain Services
	sortService: SortService;
}
