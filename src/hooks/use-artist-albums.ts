import { useQuery } from "@tanstack/react-query";

import { getArtistAlbums } from "@/api/lastfm";

export const artistAlbumsKeys = {
	all: ["albums", "artist"] as const,
	byArtist: (artist: string, limit?: number) =>
		[...artistAlbumsKeys.all, artist, limit] as const,
};

export function useArtistAlbums(artist: string, limit = 50, enabled = true) {
	return useQuery({
		queryKey: artistAlbumsKeys.byArtist(artist, limit),
		queryFn: () => getArtistAlbums(artist, limit),
		enabled: enabled && artist.length > 0,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
