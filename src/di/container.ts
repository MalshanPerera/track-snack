import { GetAlbumInfoUseCase } from "@/application/use-cases/get-album-info.use-case";
import { GetArtistAlbumsUseCase } from "@/application/use-cases/get-artist-albums.use-case";
import { SearchAlbumsUseCase } from "@/application/use-cases/search-albums.use-case";
import { SearchTracksUseCase } from "@/application/use-cases/search-tracks.use-case";
import { SortService } from "@/domain/services/sort-service";
import { LastFmClient } from "@/infrastructure/api/lastfm/lastfm-client";

import type { Dependencies } from "./types";

/**
 * Creates a dependency container with all production dependencies
 * This is the ONLY place where concrete implementations are instantiated
 */
export function createContainer(): Dependencies {
	// Infrastructure
	const albumRepository = new LastFmClient();

	// Domain Services
	const sortService = new SortService();

	// Use Cases (wired with dependencies)
	const searchAlbumsUseCase = new SearchAlbumsUseCase(albumRepository);
	const searchTracksUseCase = new SearchTracksUseCase(albumRepository);
	const getAlbumInfoUseCase = new GetAlbumInfoUseCase(albumRepository);
	const getArtistAlbumsUseCase = new GetArtistAlbumsUseCase(albumRepository);

	return {
		albumRepository,
		sortService,
		searchAlbumsUseCase,
		searchTracksUseCase,
		getAlbumInfoUseCase,
		getArtistAlbumsUseCase,
	};
}

/**
 * Create a test container with mock dependencies
 * Useful for unit testing components
 */
export function createTestContainer(
	overrides: Partial<Dependencies> = {},
): Dependencies {
	const defaults = createContainer();
	return { ...defaults, ...overrides };
}
