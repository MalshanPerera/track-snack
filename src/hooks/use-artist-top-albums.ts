import { useQuery } from "@tanstack/react-query";

import { getArtistAlbums } from "@/api/lastfm";

export const artistTopAlbumsKeys = {
	all: ["artist", "topAlbums"] as const,
	list: (artist: string, page: number, limit: number) =>
		[...artistTopAlbumsKeys.all, artist, page, limit] as const,
};

export function useArtistTopAlbums(
	artist: string,
	page = 1,
	limit = 30,
	enabled = true,
) {
	return useQuery({
		queryKey: artistTopAlbumsKeys.list(artist, page, limit),
		queryFn: () => getArtistAlbums(artist, limit, page),
		enabled: enabled && artist.length > 0,
		staleTime: 5 * 60 * 1000,
	});
}

