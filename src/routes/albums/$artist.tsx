import { useState } from "react";

import {
	createFileRoute,
	Outlet,
	useMatch,
	useNavigate,
} from "@tanstack/react-router";

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
import { Disc3 } from "lucide-react";

import { InfiniteScroll } from "@/components/infinite-scroll";

import {
	getInfiniteArtistAlbumsQueryOptions,
	useInfiniteArtistAlbums,
	useSortedAlbums,
} from "@/hooks";
import type { Album, SortOption } from "@/types";
import { SortOptions } from "@/types";

import { AlbumGrid } from "./-components/album-grid";
import { AlbumSort } from "./-components/album-sort";

export const Route = createFileRoute("/albums/$artist")({
	component: ArtistAlbumsPage,
	loader: async ({ context: { queryClient }, params: { artist } }) => {
		const decodedArtist = decodeURIComponent(artist);
		// Prefetch the first page of albums
		await queryClient.ensureInfiniteQueryData(
			getInfiniteArtistAlbumsQueryOptions(decodedArtist),
		);
	},
});

function ArtistAlbumsPage() {
	const { artist } = Route.useParams();
	const navigate = useNavigate();
	const [sortBy, setSortBy] = useState<SortOption>(SortOptions.NAME_ASC);
	const decodedArtist = decodeURIComponent(artist);

	// Check if we're on a child route (album detail)
	const albumMatch = useMatch({
		from: "/albums/$artist/$album",
		shouldThrow: false,
	});

	const {
		albums,
		isLoading,
		error,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		prefetchNextPage,
	} = useInfiniteArtistAlbums(decodedArtist, !albumMatch);

	const sortedAlbums = useSortedAlbums(albums, sortBy);

	const handleAlbumClick = (album: Album) => {
		navigate({
			to: "/albums/$artist/$album",
			params: {
				artist: album.artist,
				album: album.name,
			},
		});
	};

	// If on album detail route, render the child route
	if (albumMatch) {
		return <Outlet />;
	}

	return (
		<Box minH="100vh" bg="bg.canvas">
			{/* Hero Header Section */}
			<Box borderColor="border.muted" py={{ base: 8, md: 12 }} mb={8}>
				<Container maxW="container.xl">
					<VStack gap={4} align="start">
						<HStack gap={4} align="center">
							<Box
								bg="primary.500"
								p={3}
								borderRadius="xl"
								css={{
									boxShadow:
										"0 8px 24px rgba(var(--chakra-colors-primary-500), 0.3)",
								}}
							>
								<Disc3 size={32} color="white" />
							</Box>
							<VStack align="start" gap={0}>
								<Text
									fontSize="sm"
									fontWeight="semibold"
									color="primary.400"
									textTransform="uppercase"
									letterSpacing="wider"
								>
									Discography
								</Text>
								<Heading size={{ base: "2xl", md: "3xl" }} fontWeight="black">
									{decodedArtist}
								</Heading>
							</VStack>
						</HStack>

						{!isLoading && albums.length > 0 && (
							<HStack
								justify="space-between"
								w="full"
								flexWrap="wrap"
								gap={4}
								pt={4}
							>
								<Text fontSize="md" color="fg.muted" fontWeight="medium">
									{albums.length} album{albums.length !== 1 ? "s" : ""} found
									{hasNextPage && "+"}
								</Text>
								<AlbumSort value={sortBy} onChange={setSortBy} />
							</HStack>
						)}
					</VStack>
				</Container>
			</Box>

			<Container maxW="container.xl" pb={12}>
				{isLoading && (
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						py={20}
						gap={4}
					>
						<Spinner
							size="xl"
							color="primary.500"
							css={{
								"--spinner-track-color": "var(--chakra-colors-bg-muted)",
							}}
						/>
						<Text color="fg.muted" fontSize="md" fontWeight="medium">
							Loading albums...
						</Text>
					</Box>
				)}

				{error && (
					<Alert.Root status="error" borderRadius="xl">
						<Alert.Indicator />
						<Alert.Content>
							<Alert.Title fontWeight="bold">Error loading albums</Alert.Title>
							<Alert.Description>
								{error instanceof Error
									? error.message
									: "Unknown error occurred"}
							</Alert.Description>
						</Alert.Content>
					</Alert.Root>
				)}

				{!isLoading && !error && (
					<InfiniteScroll
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
						fetchNextPage={fetchNextPage}
						onApproachEnd={prefetchNextPage}
					>
						<AlbumGrid albums={sortedAlbums} onAlbumClick={handleAlbumClick} />
					</InfiniteScroll>
				)}
			</Container>
		</Box>
	);
}
