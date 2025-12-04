import { useCallback } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { searchAlbums } from "@/api/lastfm";
import type { Album, PaginatedResponse } from "@/types";

const ITEMS_PER_PAGE = 30;

export const infiniteAlbumSearchKeys = {
	all: ["albums", "search", "infinite"] as const,
	query: (query: string) => [...infiniteAlbumSearchKeys.all, query] as const,
};

export function useInfiniteAlbumSearch(query: string, enabled = true) {
	const queryClient = useQueryClient();

	const infiniteQuery = useInfiniteQuery({
		queryKey: infiniteAlbumSearchKeys.query(query),
		queryFn: ({ pageParam }) => searchAlbums(query, ITEMS_PER_PAGE, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.hasNextPage ? lastPage.page + 1 : undefined,
		enabled: enabled && query.length > 0,
		staleTime: 5 * 60 * 1000,
	});

	// Prefetch next page when approaching the end
	const prefetchNextPage = useCallback(() => {
		if (!infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage) return;

		const lastPage = infiniteQuery.data?.pages.at(-1);
		if (!lastPage) return;

		const nextPage = lastPage.page + 1;
		queryClient.prefetchInfiniteQuery({
			queryKey: infiniteAlbumSearchKeys.query(query),
			queryFn: ({ pageParam }) =>
				searchAlbums(query, ITEMS_PER_PAGE, pageParam),
			initialPageParam: nextPage,
			getNextPageParam: (lastPage: PaginatedResponse<Album>) =>
				lastPage.hasNextPage ? lastPage.page + 1 : undefined,
			pages: 1,
		});
	}, [
		queryClient,
		query,
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
