import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { getTrackKey, useFavoritesStore } from "@/stores/favorites-store";
import type { FavoriteTrack } from "@/types/favorite";

const createMockTrack = (
	overrides: Partial<FavoriteTrack> = {},
): FavoriteTrack => ({
	name: "Test Track",
	artist: { name: "Test Artist" },
	duration: 180,
	url: "https://example.com/track",
	albumName: "Test Album",
	albumArtist: "Test Artist",
	addedAt: Date.now(),
	...overrides,
});

describe("favorites-store", () => {
	beforeEach(() => {
		// Reset the store before each test
		act(() => {
			useFavoritesStore.setState({ favorites: [] });
		});
	});

	describe("getTrackKey", () => {
		it("should generate a unique key from artist and track name", () => {
			const key = getTrackKey("The Beatles", "Yesterday");
			expect(key).toBe("The Beatles-Yesterday");
		});

		it("should handle special characters", () => {
			const key = getTrackKey("AC/DC", "Back in Black");
			expect(key).toBe("AC/DC-Back in Black");
		});
	});

	describe("addFavorite", () => {
		it("should add a track to favorites", () => {
			const track = createMockTrack();

			act(() => {
				useFavoritesStore.getState().addFavorite(track);
			});

			const { favorites } = useFavoritesStore.getState();
			expect(favorites).toHaveLength(1);
			expect(favorites[0].name).toBe("Test Track");
		});

		it("should not add duplicate tracks", () => {
			const track = createMockTrack();

			act(() => {
				useFavoritesStore.getState().addFavorite(track);
				useFavoritesStore.getState().addFavorite(track);
			});

			const { favorites } = useFavoritesStore.getState();
			expect(favorites).toHaveLength(1);
		});

		it("should add different tracks", () => {
			const track1 = createMockTrack({ name: "Track 1" });
			const track2 = createMockTrack({ name: "Track 2" });

			act(() => {
				useFavoritesStore.getState().addFavorite(track1);
				useFavoritesStore.getState().addFavorite(track2);
			});

			const { favorites } = useFavoritesStore.getState();
			expect(favorites).toHaveLength(2);
		});

		it("should set addedAt timestamp when adding", () => {
			const track = createMockTrack({ addedAt: 0 });
			const beforeAdd = Date.now();

			act(() => {
				useFavoritesStore.getState().addFavorite(track);
			});

			const { favorites } = useFavoritesStore.getState();
			expect(favorites[0].addedAt).toBeGreaterThanOrEqual(beforeAdd);
		});
	});

	describe("removeFavorite", () => {
		it("should remove a track from favorites", () => {
			const track = createMockTrack();

			act(() => {
				useFavoritesStore.getState().addFavorite(track);
			});

			expect(useFavoritesStore.getState().favorites).toHaveLength(1);

			const trackKey = getTrackKey(track.artist.name, track.name);
			act(() => {
				useFavoritesStore.getState().removeFavorite(trackKey);
			});

			expect(useFavoritesStore.getState().favorites).toHaveLength(0);
		});

		it("should only remove the specified track", () => {
			const track1 = createMockTrack({ name: "Track 1" });
			const track2 = createMockTrack({ name: "Track 2" });

			act(() => {
				useFavoritesStore.getState().addFavorite(track1);
				useFavoritesStore.getState().addFavorite(track2);
			});

			const trackKey = getTrackKey(track1.artist.name, track1.name);
			act(() => {
				useFavoritesStore.getState().removeFavorite(trackKey);
			});

			const { favorites } = useFavoritesStore.getState();
			expect(favorites).toHaveLength(1);
			expect(favorites[0].name).toBe("Track 2");
		});

		it("should handle removing non-existent track gracefully", () => {
			const track = createMockTrack();

			act(() => {
				useFavoritesStore.getState().addFavorite(track);
			});

			act(() => {
				useFavoritesStore.getState().removeFavorite("non-existent-key");
			});

			expect(useFavoritesStore.getState().favorites).toHaveLength(1);
		});
	});

	describe("isFavorite", () => {
		it("should return true for favorited tracks", () => {
			const track = createMockTrack();

			act(() => {
				useFavoritesStore.getState().addFavorite(track);
			});

			const trackKey = getTrackKey(track.artist.name, track.name);
			expect(useFavoritesStore.getState().isFavorite(trackKey)).toBe(true);
		});

		it("should return false for non-favorited tracks", () => {
			expect(useFavoritesStore.getState().isFavorite("unknown-key")).toBe(
				false,
			);
		});

		it("should return false after track is removed", () => {
			const track = createMockTrack();
			const trackKey = getTrackKey(track.artist.name, track.name);

			act(() => {
				useFavoritesStore.getState().addFavorite(track);
			});

			expect(useFavoritesStore.getState().isFavorite(trackKey)).toBe(true);

			act(() => {
				useFavoritesStore.getState().removeFavorite(trackKey);
			});

			expect(useFavoritesStore.getState().isFavorite(trackKey)).toBe(false);
		});
	});
});
