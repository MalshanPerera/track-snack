import { useMemo } from "react";

import { Button } from "@chakra-ui/react";
import { Heart } from "lucide-react";

import { getTrackKey, useFavoritesStore } from "@/stores/favorites-store";
import type { FavoriteTrack } from "@/types";

import styles from "./favorites-button.module.css";

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
			className={`${styles.button} ${isFavoriteTrack ? styles.favorited : styles.notFavorited}`}
			onClick={handleClick}
			p={2}
			borderRadius="full"
			variant="ghost"
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
