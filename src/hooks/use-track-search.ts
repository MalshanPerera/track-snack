import { useQuery } from "@tanstack/react-query";

import { searchTracks } from "@/api/lastfm";

export const trackSearchKeys = {
	all: ["tracks", "search"] as const,
	query: (query: string, page?: number) =>
		[...trackSearchKeys.all, query, page] as const,
};

export function useTrackSearch(query: string, enabled = true) {
	return useQuery({
		queryKey: trackSearchKeys.query(query),
		queryFn: async () => {
			const result = await searchTracks(query);
			return result.data;
		},
		enabled: enabled && query.length > 0,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
