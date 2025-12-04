import { useCallback } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getArtistAlbums } from "@/api/lastfm";
import type { PaginatedResponse } from "@/api/types";
import type { Album } from "@/types";

const ITEMS_PER_PAGE = 30;

export const infiniteArtistAlbumsKeys = {
	all: ["albums", "artist", "infinite"] as const,
	byArtist: (artist: string) =>
		[...infiniteArtistAlbumsKeys.all, artist] as const,
};

export function useInfiniteArtistAlbums(artist: string, enabled = true) {
	const queryClient = useQueryClient();

	const infiniteQuery = useInfiniteQuery({
		queryKey: infiniteArtistAlbumsKeys.byArtist(artist),
		queryFn: ({ pageParam }) =>
			getArtistAlbums(artist, ITEMS_PER_PAGE, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.hasNextPage ? lastPage.page + 1 : undefined,
		enabled: enabled && artist.length > 0,
		staleTime: 5 * 60 * 1000,
	});

	// Prefetch next page when approaching the end
	const prefetchNextPage = useCallback(() => {
		if (!infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage) return;

		const lastPage = infiniteQuery.data?.pages.at(-1);
		if (!lastPage) return;

		const nextPage = lastPage.page + 1;
		queryClient.prefetchInfiniteQuery({
			queryKey: infiniteArtistAlbumsKeys.byArtist(artist),
			queryFn: ({ pageParam }) =>
				getArtistAlbums(artist, ITEMS_PER_PAGE, pageParam),
			initialPageParam: nextPage,
			getNextPageParam: (lastPage: PaginatedResponse<Album>) =>
				lastPage.hasNextPage ? lastPage.page + 1 : undefined,
			pages: 1,
		});
	}, [
		queryClient,
		artist,
		infiniteQuery.hasNextPage,
		infiniteQuery.isFetchingNextPage,
		infiniteQuery.data?.pages,
	]);

	// Flatten all pages into a single array
	const albums =
		infiniteQuery.data?.pages.flatMap(
			(page: PaginatedResponse<Album>) => page.data,
		) ?? [];

	return {
		...infiniteQuery,
		albums,
		prefetchNextPage,
	};
}

// Query options for route loader prefetching
export function getInfiniteArtistAlbumsQueryOptions(artist: string) {
	return {
		queryKey: infiniteArtistAlbumsKeys.byArtist(artist),
		queryFn: ({ pageParam }: { pageParam: number }) =>
			getArtistAlbums(artist, ITEMS_PER_PAGE, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage: PaginatedResponse<Album>) =>
			lastPage.hasNextPage ? lastPage.page + 1 : undefined,
		staleTime: 5 * 60 * 1000,
	};
}
