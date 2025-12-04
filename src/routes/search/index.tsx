import { useEffect, useState } from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Container, Heading, VStack } from "@chakra-ui/react";

import type { Album, Track } from "@/domain/entities/album";
import { useAlbumSearch, useTrackSearch } from "@/presentation/hooks";

import { SearchBar } from "./-components/search-bar";
import { SearchResults } from "./-components/search-results";

export const Route = createFileRoute("/search/")({
	component: SearchPage,
	validateSearch: (search: Record<string, unknown>) => ({
		q: (search.q as string) || "",
	}),
});

function SearchPage() {
	const { q } = Route.useSearch();
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState(q);

	const { data: albums = [], isLoading: albumsLoading } = useAlbumSearch(
		searchQuery,
		searchQuery.length > 0,
	);
	const { data: tracks = [], isLoading: tracksLoading } = useTrackSearch(
		searchQuery,
		searchQuery.length > 0,
	);

	useEffect(() => {
		setSearchQuery(q);
	}, [q]);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		navigate({
			to: "/search",
			search: { q: query },
		});
	};

	const handleAlbumClick = (album: Album) => {
		navigate({
			to: "/albums/$artist/$album",
			params: {
				artist: encodeURIComponent(album.artist),
				album: encodeURIComponent(album.name),
			},
		});
	};

	const handleTrackClick = (track: Track) => {
		const artistName = track.artist.name;
		navigate({
			to: "/albums/$artist",
			params: { artist: encodeURIComponent(artistName) },
		});
	};

	return (
		<Container maxW="container.xl" py={8}>
			<VStack gap={8} align="stretch">
				<Heading size="2xl">Search</Heading>
				<SearchBar
					onSearch={handleSearch}
					defaultValue={q}
					placeholder="Search for albums or tracks..."
				/>
				<SearchResults
					albums={albums}
					tracks={tracks}
					isLoading={albumsLoading || tracksLoading}
					onAlbumClick={handleAlbumClick}
					onTrackClick={handleTrackClick}
				/>
			</VStack>
		</Container>
	);
}
