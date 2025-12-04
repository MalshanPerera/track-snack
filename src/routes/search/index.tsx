import { useEffect, useState } from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Container, Heading, VStack } from "@chakra-ui/react";

import { useInfiniteAlbumSearch, useInfiniteTrackSearch } from "@/hooks";
import type { Album, Track } from "@/types";

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

	const {
		albums,
		isLoading: albumsLoading,
		hasNextPage: hasNextAlbumsPage,
		isFetchingNextPage: isFetchingNextAlbumsPage,
		fetchNextPage: fetchNextAlbumsPage,
		prefetchNextPage: prefetchNextAlbumsPage,
	} = useInfiniteAlbumSearch(searchQuery, searchQuery.length > 0);

	const {
		tracks,
		isLoading: tracksLoading,
		hasNextPage: hasNextTracksPage,
		isFetchingNextPage: isFetchingNextTracksPage,
		fetchNextPage: fetchNextTracksPage,
		prefetchNextPage: prefetchNextTracksPage,
	} = useInfiniteTrackSearch(searchQuery, searchQuery.length > 0);

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
					hasNextAlbumsPage={hasNextAlbumsPage}
					isFetchingNextAlbumsPage={isFetchingNextAlbumsPage}
					fetchNextAlbumsPage={fetchNextAlbumsPage}
					prefetchNextAlbumsPage={prefetchNextAlbumsPage}
					hasNextTracksPage={hasNextTracksPage}
					isFetchingNextTracksPage={isFetchingNextTracksPage}
					fetchNextTracksPage={fetchNextTracksPage}
					prefetchNextTracksPage={prefetchNextTracksPage}
				/>
			</VStack>
		</Container>
	);
}
