import { useQuery } from "@tanstack/react-query";

import { useDI } from "@/di";

/**
 * Presentation Hook: Album Info
 * React Query hook for fetching album details
 */

export const albumInfoKeys = {
	all: ["albums", "info"] as const,
	detail: (artist: string, album: string) =>
		[...albumInfoKeys.all, artist, album] as const,
};

export function useAlbumInfo(artist: string, album: string, enabled = true) {
	const { getAlbumInfoUseCase } = useDI();

	return useQuery({
		queryKey: albumInfoKeys.detail(artist, album),
		queryFn: () => getAlbumInfoUseCase.execute(artist, album),
		enabled: enabled && artist.length > 0 && album.length > 0,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
}
