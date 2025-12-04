import { describe, expect, it } from "vitest";

import {
	formatDuration,
	formatPlayCount,
	getAlbumImage,
	getTrackKey,
} from "@/lib/utils";
import type { AlbumImage, Track } from "@/types";

describe("utils", () => {
	describe("formatDuration", () => {
		it("should format seconds to mm:ss", () => {
			expect(formatDuration(65)).toBe("1:05");
			expect(formatDuration(180)).toBe("3:00");
			expect(formatDuration(3661)).toBe("61:01");
		});

		it("should handle zero seconds", () => {
			expect(formatDuration(0)).toBe("0:00");
		});

		it("should handle undefined", () => {
			expect(formatDuration(undefined)).toBe("0:00");
		});

		it("should pad single digit seconds", () => {
			expect(formatDuration(61)).toBe("1:01");
			expect(formatDuration(9)).toBe("0:09");
		});
	});

	describe("formatPlayCount", () => {
		it("should format millions with M suffix", () => {
			expect(formatPlayCount(1000000)).toBe("1.0M");
			expect(formatPlayCount(2500000)).toBe("2.5M");
			expect(formatPlayCount(10500000)).toBe("10.5M");
		});

		it("should format thousands with K suffix", () => {
			expect(formatPlayCount(1000)).toBe("1.0K");
			expect(formatPlayCount(2500)).toBe("2.5K");
			expect(formatPlayCount(999999)).toBe("1000.0K");
		});

		it("should return plain number for small counts", () => {
			expect(formatPlayCount(999)).toBe("999");
			expect(formatPlayCount(1)).toBe("1");
			expect(formatPlayCount(500)).toBe("500");
		});

		it("should handle zero and undefined", () => {
			expect(formatPlayCount(0)).toBe("0");
			expect(formatPlayCount(undefined)).toBe("0");
		});
	});

	describe("getAlbumImage", () => {
		const mockImages: AlbumImage[] = [
			{ url: "small.jpg", size: "small" },
			{ url: "medium.jpg", size: "medium" },
			{ url: "large.jpg", size: "large" },
			{ url: "extralarge.jpg", size: "extralarge" },
		];

		it("should return preferred size when available", () => {
			expect(getAlbumImage(mockImages, "large")).toBe("large.jpg");
			expect(getAlbumImage(mockImages, "medium")).toBe("medium.jpg");
		});

		it("should fallback to larger size when preferred not available", () => {
			const limitedImages: AlbumImage[] = [
				{ url: "small.jpg", size: "small" },
				{ url: "medium.jpg", size: "medium" },
			];
			expect(getAlbumImage(limitedImages, "mega")).toBe("medium.jpg");
		});

		it("should return placeholder for empty array", () => {
			expect(getAlbumImage([])).toBe("/placeholder-album.png");
		});

		it("should return placeholder for undefined/null images", () => {
			expect(getAlbumImage(undefined as unknown as AlbumImage[])).toBe(
				"/placeholder-album.png",
			);
		});

		it("should skip images with empty URLs", () => {
			const imagesWithEmpty: AlbumImage[] = [
				{ url: "", size: "large" },
				{ url: "medium.jpg", size: "medium" },
			];
			expect(getAlbumImage(imagesWithEmpty, "large")).toBe("medium.jpg");
		});
	});

	describe("getTrackKey", () => {
		it("should generate key from track object", () => {
			const track: Track = {
				name: "Yesterday",
				artist: { name: "The Beatles" },
				url: "https://example.com",
			};
			expect(getTrackKey(track)).toBe("The Beatles-Yesterday");
		});

		it("should handle tracks with special characters", () => {
			const track: Track = {
				name: "Rock & Roll",
				artist: { name: "Led Zeppelin" },
				url: "https://example.com",
			};
			expect(getTrackKey(track)).toBe("Led Zeppelin-Rock & Roll");
		});
	});
});
