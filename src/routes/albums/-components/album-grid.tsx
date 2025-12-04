import { SimpleGrid } from "@chakra-ui/react";

import type { Album } from "@/domain/entities/album";

import { AlbumCard } from "./album-card";

interface AlbumGridProps {
	albums: Album[];
	onAlbumClick?: (album: Album) => void;
}

export function AlbumGrid({ albums, onAlbumClick }: AlbumGridProps) {
	if (albums.length === 0) {
		return null;
	}

	return (
		<SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} gap={4}>
			{albums.map((album, index) => (
				<AlbumCard
					key={`${album.artist}-${album.name}-${index}`}
					album={album}
					onClick={() => onAlbumClick?.(album)}
				/>
			))}
		</SimpleGrid>
	);
}
