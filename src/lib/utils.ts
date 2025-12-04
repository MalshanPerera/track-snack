import type { AlbumImage, ImageSize, Track } from "@/types";

/**
 * Utility Functions
 * Helper functions for the presentation layer
 */

export function getAlbumImage(
	images: AlbumImage[],
	preferredSize: ImageSize = "extralarge",
): string {
	if (!images || images.length === 0) {
		return "/placeholder-album.png";
	}

	const sizeOrder: ImageSize[] = [
		"mega",
		"extralarge",
		"large",
		"medium",
		"small",
	];
	const startIndex = sizeOrder.indexOf(preferredSize);

	// Try to find the preferred size or the next available larger size
	for (let i = startIndex; i < sizeOrder.length; i++) {
		const image = images.find((img) => img.size === sizeOrder[i]);
		if (image?.url) return image.url;
	}

	// Fallback to any available image
	const anyImage = images.find((img) => img.url);
	return anyImage?.url || "/placeholder-album.png";
}

export function formatDuration(seconds: number | undefined): string {
	if (!seconds) return "0:00";
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatPlayCount(count: number | undefined): string {
	if (!count) return "0";
	if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
	if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
	return count.toString();
}

export function getTrackKey(track: Track): string {
	return `${track.artist.name}-${track.name}`;
}
