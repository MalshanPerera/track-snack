import { useQuery } from "@tanstack/react-query";

import { searchAlbums } from "@/api/lastfm";

export const albumSearchKeys = {
	all: ["albums", "search"] as const,
	query: (query: string, page?: number) =>
		[...albumSearchKeys.all, query, page] as const,
};

export function useAlbumSearch(query: string, enabled = true) {
	return useQuery({
		queryKey: albumSearchKeys.query(query),
		queryFn: async () => {
			const result = await searchAlbums(query);
			return result.data;
		},
		enabled: enabled && query.length > 0,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
