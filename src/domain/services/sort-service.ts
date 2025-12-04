import type { Album } from "../entities/album";
import { type SortOption, SortOptions } from "../value-objects/sort-option";

/**
 * Domain Service: Album Sorting
 * Handles sorting logic for album collections
 */
export class SortService {
	sortAlbums(albums: Album[], sortBy: SortOption): Album[] {
		const sorted = [...albums];

		switch (sortBy) {
			case SortOptions.NAME_ASC:
				return sorted.sort((a, b) => a.name.localeCompare(b.name));

			case SortOptions.NAME_DESC:
				return sorted.sort((a, b) => b.name.localeCompare(a.name));

			case SortOptions.YEAR_ASC:
				return sorted.sort((a, b) => {
					const yearA = this.extractYear(a.wiki?.published);
					const yearB = this.extractYear(b.wiki?.published);
					return yearA - yearB;
				});

			case SortOptions.YEAR_DESC:
				return sorted.sort((a, b) => {
					const yearA = this.extractYear(a.wiki?.published);
					const yearB = this.extractYear(b.wiki?.published);
					return yearB - yearA;
				});

			default:
				return sorted;
		}
	}

	private extractYear(dateString?: string): number {
		if (!dateString) return 0;
		return new Date(dateString).getFullYear() || 0;
	}
}
