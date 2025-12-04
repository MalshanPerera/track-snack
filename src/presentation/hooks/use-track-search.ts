import { useQuery } from "@tanstack/react-query";

import { useDI } from "@/di";

/**
 * Presentation Hook: Track Search
 * React Query hook for searching tracks
 */

export const trackSearchKeys = {
	all: ["tracks", "search"] as const,
	query: (query: string, page?: number) =>
		[...trackSearchKeys.all, query, page] as const,
};

export function useTrackSearch(query: string, enabled = true) {
	const { searchTracksUseCase } = useDI();

	return useQuery({
		queryKey: trackSearchKeys.query(query),
		queryFn: () => searchTracksUseCase.execute(query),
		enabled: enabled && query.length > 0,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
