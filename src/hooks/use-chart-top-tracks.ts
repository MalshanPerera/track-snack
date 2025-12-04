import { useQuery } from "@tanstack/react-query";

import { getChartTopTracks } from "@/api/lastfm";

export const chartTopTracksKeys = {
	all: ["chart", "topTracks"] as const,
	list: (page: number, limit: number) =>
		[...chartTopTracksKeys.all, page, limit] as const,
};

export function useChartTopTracks(page = 1, limit = 30, enabled = true) {
	return useQuery({
		queryKey: chartTopTracksKeys.list(page, limit),
		queryFn: () => getChartTopTracks(limit, page),
		enabled,
		staleTime: 5 * 60 * 1000,
	});
}
