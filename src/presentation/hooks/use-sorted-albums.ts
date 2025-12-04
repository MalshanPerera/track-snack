import { useMemo } from "react";

import { useDI } from "@/di";
import type { Album } from "@/domain/entities/album";
import type { SortOption } from "@/domain/value-objects/sort-option";

/**
 * Presentation Hook: Sorted Albums
 * React hook for sorting album collections
 */
export function useSortedAlbums(albums: Album[], sortBy: SortOption): Album[] {
	const { sortService } = useDI();

	return useMemo(() => {
		return sortService.sortAlbums(albums, sortBy);
	}, [albums, sortBy, sortService]);
}
