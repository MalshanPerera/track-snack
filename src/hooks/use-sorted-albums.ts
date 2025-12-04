import { useMemo } from "react";

import { sortAlbums } from "@/lib/sort";
import type { Album, SortOption } from "@/types";

export function useSortedAlbums(albums: Album[], sortBy: SortOption): Album[] {
	return useMemo(() => sortAlbums(albums, sortBy), [albums, sortBy]);
}
