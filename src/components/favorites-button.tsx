import { useMemo } from "react";

import { Button } from "@chakra-ui/react";
import { Heart } from "lucide-react";

import { getTrackKey, useFavoritesStore } from "@/stores/favorites-store";
import type { FavoriteTrack } from "@/types";

interface FavoriteButtonProps {
	track: FavoriteTrack;
	size?: number;
}

export function FavoriteButton({ track, size = 18 }: FavoriteButtonProps) {
	const addFavorite = useFavoritesStore((state) => state.addFavorite);
	const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
	const favorites = useFavoritesStore((state) => state.favorites);

	const trackKey = getTrackKey(track.artist.name, track.name);
	const isFavoriteTrack = useMemo(
		() =>
			favorites.some((f) => getTrackKey(f.artist.name, f.name) === trackKey),
		[favorites, trackKey],
	);

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isFavoriteTrack) {
			removeFavorite(trackKey);
		} else {
			addFavorite(track);
		}
	};

	return (
		<Button
			onClick={handleClick}
			p={2}
			borderRadius="full"
			display="flex"
			alignItems="center"
			justifyContent="center"
			css={{
				color: isFavoriteTrack ? "var(--chakra-colors-red-500)" : "fg.muted",
				transition: "all 0.2s ease",
				cursor: "pointer",
				"&:hover": {
					color: "var(--chakra-colors-red-500)",
					bg: "var(--chakra-colors-red-500/10)",
					transform: "scale(1.1)",
				},
				"&:active": {
					transform: "scale(0.95)",
				},
			}}
			aria-label={
				isFavoriteTrack ? "Remove from favorites" : "Add to favorites"
			}
		>
			<Heart
				size={size}
				fill={isFavoriteTrack ? "currentColor" : "none"}
				strokeWidth={2}
			/>
		</Button>
	);
}
