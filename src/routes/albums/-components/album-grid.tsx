import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Disc3 } from "lucide-react";

import type { Album } from "@/types";

import { AlbumCard } from "./album-card";

interface AlbumGridProps {
	albums: Album[];
	onAlbumClick?: (album: Album) => void;
}

export function AlbumGrid({ albums, onAlbumClick }: AlbumGridProps) {
	if (albums.length === 0) {
		return (
			<Box
				py={16}
				textAlign="center"
				css={{
					animation: "fadeIn 0.5s ease-out",
					"@keyframes fadeIn": {
						from: { opacity: 0 },
						to: { opacity: 1 },
					},
				}}
			>
				<Box
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
					w={20}
					h={20}
					borderRadius="full"
					bg="bg.muted"
					mb={4}
				>
					<Disc3 size={40} style={{ color: "var(--chakra-colors-fg-muted)" }} />
				</Box>
				<Text color="fg.muted" fontSize="lg" fontWeight="medium">
					No albums found
				</Text>
				<Text color="fg.subtle" fontSize="sm" mt={1}>
					Try searching for a different artist
				</Text>
			</Box>
		);
	}

	return (
		<Box
			css={{
				animation: "gridFadeIn 0.3s ease-out",
				"@keyframes gridFadeIn": {
					from: {
						opacity: 0,
					},
					to: {
						opacity: 1,
					},
				},
			}}
		>
			<SimpleGrid
				columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
				gap={{ base: 4, md: 6, lg: 8 }}
			>
				{albums.map((album, index) => (
					<AlbumCard
						key={`${album.artist}-${album.name}-${album.mbid || index}`}
						album={album}
						index={index}
						onClick={() => onAlbumClick?.(album)}
					/>
				))}
			</SimpleGrid>
		</Box>
	);
}
