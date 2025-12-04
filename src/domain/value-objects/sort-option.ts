/**
 * Domain Value Object: Sort Options
 * Defines valid sorting strategies for albums
 */
export const SortOptions = {
	NAME_ASC: "name-asc",
	NAME_DESC: "name-desc",
	YEAR_ASC: "year-asc",
	YEAR_DESC: "year-desc",
} as const;

export type SortOption = (typeof SortOptions)[keyof typeof SortOptions];
