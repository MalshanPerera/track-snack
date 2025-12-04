import { describe, expect, it } from "vitest";

import { sortAlbums } from "@/lib/sort";
import type { Album } from "@/types";
import { SortOptions } from "@/types";

const createMockAlbum = (overrides: Partial<Album>): Album => ({
	name: "Test Album",
	artist: "Test Artist",
	url: "https://example.com",
	images: [],
	...overrides,
});

describe("sortAlbums", () => {
	const albums: Album[] = [
		createMockAlbum({
			name: "Zebra",
			wiki: { published: "2020-01-01", summary: "", content: "" },
		}),
		createMockAlbum({
			name: "Apple",
			wiki: { published: "2018-01-01", summary: "", content: "" },
		}),
		createMockAlbum({
			name: "Mango",
			wiki: { published: "2022-01-01", summary: "", content: "" },
		}),
		createMockAlbum({ name: "Banana" }), // No wiki/year
	];

	describe("NAME_ASC", () => {
		it("should sort albums by name ascending", () => {
			const sorted = sortAlbums(albums, SortOptions.NAME_ASC);
			expect(sorted.map((a) => a.name)).toEqual([
				"Apple",
				"Banana",
				"Mango",
				"Zebra",
			]);
		});

		it("should not mutate original array", () => {
			const original = [...albums];
			sortAlbums(albums, SortOptions.NAME_ASC);
			expect(albums).toEqual(original);
		});
	});

	describe("NAME_DESC", () => {
		it("should sort albums by name descending", () => {
			const sorted = sortAlbums(albums, SortOptions.NAME_DESC);
			expect(sorted.map((a) => a.name)).toEqual([
				"Zebra",
				"Mango",
				"Banana",
				"Apple",
			]);
		});
	});

	describe("YEAR_ASC", () => {
		it("should sort albums by year ascending", () => {
			const sorted = sortAlbums(albums, SortOptions.YEAR_ASC);
			// Albums without year (0) come first
			expect(sorted.map((a) => a.name)).toEqual([
				"Banana",
				"Apple",
				"Zebra",
				"Mango",
			]);
		});

		it("should handle albums without wiki data", () => {
			const albumsNoWiki = [
				createMockAlbum({ name: "A" }),
				createMockAlbum({ name: "B" }),
			];
			const sorted = sortAlbums(albumsNoWiki, SortOptions.YEAR_ASC);
			expect(sorted).toHaveLength(2);
		});
	});

	describe("YEAR_DESC", () => {
		it("should sort albums by year descending", () => {
			const sorted = sortAlbums(albums, SortOptions.YEAR_DESC);
			expect(sorted.map((a) => a.name)).toEqual([
				"Mango",
				"Zebra",
				"Apple",
				"Banana",
			]);
		});
	});

	describe("edge cases", () => {
		it("should handle empty array", () => {
			const sorted = sortAlbums([], SortOptions.NAME_ASC);
			expect(sorted).toEqual([]);
		});

		it("should handle single item array", () => {
			const single = [createMockAlbum({ name: "Solo" })];
			const sorted = sortAlbums(single, SortOptions.NAME_ASC);
			expect(sorted).toHaveLength(1);
			expect(sorted[0].name).toBe("Solo");
		});

		it("should handle unknown sort option by returning copy", () => {
			const sorted = sortAlbums(
				albums,
				"UNKNOWN" as unknown as typeof SortOptions.NAME_ASC,
			);
			expect(sorted).toHaveLength(albums.length);
		});
	});
});
