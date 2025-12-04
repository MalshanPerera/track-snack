import { Badge, Box, Spinner, Tabs, Text, VStack } from "@chakra-ui/react";

import { AlbumGrid } from "@/routes/albums/-components/album-grid";
import type { Album, Track } from "@/types";

import { TrackListItem } from "./track-list-item";

interface SearchResultsProps {
	albums: Album[];
	tracks: Track[];
	isLoading: boolean;
	onAlbumClick?: (album: Album) => void;
	onTrackClick?: (track: Track) => void;
}

export function SearchResults({
	albums,
	tracks,
	isLoading,
	onAlbumClick,
	onTrackClick,
}: SearchResultsProps) {
	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" py={12}>
				<VStack gap={4}>
					<Spinner size="xl" colorPalette="primary" />
					<Text color="fg.muted">Searching...</Text>
				</VStack>
			</Box>
		);
	}

	if (albums.length === 0 && tracks.length === 0) {
		return (
			<Box py={12} textAlign="center">
				<Text color="fg.muted" fontSize="lg">
					No results found. Try a different search term.
				</Text>
			</Box>
		);
	}

	return (
		<Tabs.Root defaultValue="albums" colorPalette="primary" width="100%">
			<Tabs.List>
				<Tabs.Trigger value="albums">
					Albums
					{albums.length > 0 && (
						<Badge ml={2} colorPalette="primary" variant="subtle" fontSize="xs">
							{albums.length}
						</Badge>
					)}
				</Tabs.Trigger>
				<Tabs.Trigger value="tracks">
					Tracks
					{tracks.length > 0 && (
						<Badge ml={2} colorPalette="primary" variant="subtle" fontSize="xs">
							{tracks.length}
						</Badge>
					)}
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="albums" pt={6}>
				{albums.length === 0 ? (
					<Box py={8} textAlign="center">
						<Text color="fg.muted">No albums found</Text>
					</Box>
				) : (
					<AlbumGrid albums={albums} onAlbumClick={onAlbumClick} />
				)}
			</Tabs.Content>
			<Tabs.Content value="tracks" pt={6}>
				{tracks.length === 0 ? (
					<Box py={8} textAlign="center">
						<Text color="fg.muted">No tracks found</Text>
					</Box>
				) : (
					<VStack gap={3} align="stretch">
						{tracks.map((track, index) => (
							<TrackListItem
								key={track.url || `${track.name}-${index}`}
								track={track}
								onClick={() => onTrackClick?.(track)}
							/>
						))}
					</VStack>
				)}
			</Tabs.Content>
		</Tabs.Root>
	);
}
