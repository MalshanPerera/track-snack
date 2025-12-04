import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { FavoriteTrack } from "@/types/favorite";

interface FavoritesState {
	favorites: FavoriteTrack[];
	addFavorite: (track: FavoriteTrack) => void;
	removeFavorite: (trackKey: string) => void;
	isFavorite: (trackKey: string) => boolean;
}

function getTrackKey(artistName: string, trackName: string): string {
	return `${artistName}-${trackName}`;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],

			addFavorite: (track) => {
				const key = getTrackKey(track.artist.name, track.name);
				const exists = get().favorites.some(
					(f) => getTrackKey(f.artist.name, f.name) === key,
				);

				if (!exists) {
					set((state) => ({
						favorites: [...state.favorites, { ...track, addedAt: Date.now() }],
					}));
				}
			},

			removeFavorite: (trackKey) => {
				set((state) => ({
					favorites: state.favorites.filter(
						(f) => getTrackKey(f.artist.name, f.name) !== trackKey,
					),
				}));
			},

			isFavorite: (trackKey) => {
				return get().favorites.some(
					(f) => getTrackKey(f.artist.name, f.name) === trackKey,
				);
			},
		}),
		{
			name: "track-snack-favorites",
		},
	),
);

export { getTrackKey };
