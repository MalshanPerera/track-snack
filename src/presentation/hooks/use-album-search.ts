import { useQuery } from "@tanstack/react-query";

import { useDI } from "@/di";

/**
 * Presentation Hook: Album Search
 * React Query hook for searching albums
 */

export const albumSearchKeys = {
	all: ["albums", "search"] as const,
	query: (query: string, page?: number) =>
		[...albumSearchKeys.all, query, page] as const,
};

export function useAlbumSearch(query: string, enabled = true) {
	const { searchAlbumsUseCase } = useDI();

	return useQuery({
		queryKey: albumSearchKeys.query(query),
		queryFn: () => searchAlbumsUseCase.execute(query),
		enabled: enabled && query.length > 0,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
