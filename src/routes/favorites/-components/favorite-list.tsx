import { Box, Text, VStack } from "@chakra-ui/react";
import { Heart } from "lucide-react";

import type { FavoriteTrack } from "@/types";

import { FavoriteItem } from "./favorite-item";

interface FavoriteListProps {
	favorites: FavoriteTrack[];
	onTrackClick: (track: FavoriteTrack) => void;
}

export function FavoriteList({ favorites, onTrackClick }: FavoriteListProps) {
	if (favorites.length === 0) {
		return (
			<Box py={16} textAlign="center">
				<Box
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
					w={20}
					h={20}
					borderRadius="full"
					bg="bg.muted"
					mb={6}
				>
					<Heart size={40} style={{ color: "var(--chakra-colors-fg-muted)" }} />
				</Box>
				<Text color="fg.muted" fontSize="xl" fontWeight="medium" mb={2}>
					No favourites yet
				</Text>
				<Text color="fg.subtle" fontSize="md">
					Start adding songs from albums or search results
				</Text>
			</Box>
		);
	}

	return (
		<VStack gap={3} align="stretch">
			{favorites.map((track) => (
				<FavoriteItem
					key={`${track.artist.name}-${track.name}`}
					track={track}
					onClick={() => onTrackClick(track)}
				/>
			))}
		</VStack>
	);
}
