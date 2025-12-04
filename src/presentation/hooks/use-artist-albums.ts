import { useQuery } from "@tanstack/react-query";

import { useDI } from "@/di";

/**
 * Presentation Hook: Artist Albums
 * React Query hook for fetching albums by a specific artist
 */

export const artistAlbumsKeys = {
	all: ["albums", "artist"] as const,
	byArtist: (artist: string, limit?: number) =>
		[...artistAlbumsKeys.all, artist, limit] as const,
};

export function useArtistAlbums(artist: string, limit = 50, enabled = true) {
	const { getArtistAlbumsUseCase } = useDI();

	return useQuery({
		queryKey: artistAlbumsKeys.byArtist(artist, limit),
		queryFn: () => getArtistAlbumsUseCase.execute(artist, limit),
		enabled: enabled && artist.length > 0,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

