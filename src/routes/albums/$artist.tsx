import { useState } from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import {
	Alert,
	Box,
	Container,
	Heading,
	HStack,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";

import type { Album } from "@/domain/entities/album";
import {
	type SortOption,
	SortOptions,
} from "@/domain/value-objects/sort-option";
import { useAlbumSearch, useSortedAlbums } from "@/presentation/hooks";

import { AlbumGrid } from "./-components/album-grid";
import { AlbumSort } from "./-components/album-sort";

export const Route = createFileRoute("/albums/$artist")({
	component: ArtistAlbumsPage,
});

function ArtistAlbumsPage() {
	const { artist } = Route.useParams();
	const navigate = useNavigate();
	const [sortBy, setSortBy] = useState<SortOption>(SortOptions.NAME_ASC);
	const decodedArtist = decodeURIComponent(artist);

	const { data: albums = [], isLoading, error } = useAlbumSearch(decodedArtist);
	const sortedAlbums = useSortedAlbums(albums, sortBy);

	const handleAlbumClick = (album: Album) => {
		navigate({
			to: "/albums/$artist/$album",
			params: {
				artist: encodeURIComponent(album.artist),
				album: encodeURIComponent(album.name),
			},
		});
	};

	return (
		<Container maxW="container.xl" py={8}>
			<VStack gap={6} align="stretch">
				<HStack justify="space-between" flexWrap="wrap" gap={4}>
					<Heading size="2xl">Albums by {decodedArtist}</Heading>
					{!isLoading && albums.length > 0 && (
						<AlbumSort value={sortBy} onChange={setSortBy} />
					)}
				</HStack>

				{isLoading && (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						py={12}
					>
						<Spinner size="xl" colorPalette="primary" />
					</Box>
				)}

				{error && (
					<Alert.Root status="error">
						<Alert.Indicator />
						<Alert.Content>
							<Alert.Title>Error loading albums</Alert.Title>
							<Alert.Description>
								{error instanceof Error
									? error.message
									: "Unknown error occurred"}
							</Alert.Description>
						</Alert.Content>
					</Alert.Root>
				)}

				{!isLoading && !error && albums.length === 0 && (
					<Box py={12} textAlign="center">
						<Text color="fg.muted" fontSize="lg">
							No albums found for "{decodedArtist}"
						</Text>
					</Box>
				)}

				{!isLoading && !error && albums.length > 0 && (
					<>
						<Text fontSize="sm" color="fg.muted">
							Found {albums.length} album{albums.length !== 1 ? "s" : ""}
						</Text>
						<AlbumGrid albums={sortedAlbums} onAlbumClick={handleAlbumClick} />
					</>
				)}
			</VStack>
		</Container>
	);
}
