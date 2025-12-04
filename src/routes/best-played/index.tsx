import { createFileRoute, useNavigate } from "@tanstack/react-router";

import {
	Badge,
	Box,
	Container,
	Heading,
	HStack,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { BarChart3, Disc3, Search } from "lucide-react";

import { useArtistTopAlbums } from "@/hooks";
import { SearchBar } from "@/routes/search/-components/search-bar";
import { useBestPlayedStore } from "@/stores/best-played-store";

import { AlbumChart, type ChartAlbumData } from "./-components/album-chart";
import { Pagination } from "./-components/pagination";

export const Route = createFileRoute("/best-played/")({
	component: BestPlayedPage,
});

const ITEMS_PER_PAGE = 30;

function BestPlayedPage() {
	const navigate = useNavigate();

	const searchQuery = useBestPlayedStore((state) => state.searchQuery);
	const currentPage = useBestPlayedStore((state) => state.currentPage);
	const setSearchQuery = useBestPlayedStore((state) => state.setSearchQuery);
	const setCurrentPage = useBestPlayedStore((state) => state.setCurrentPage);

	const isSearching = searchQuery.trim().length > 0;

	const { data: artistAlbumsData, isLoading } = useArtistTopAlbums(
		searchQuery,
		currentPage,
		ITEMS_PER_PAGE,
		isSearching,
	);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	const handleAlbumClick = (albumData: ChartAlbumData) => {
		navigate({
			to: "/albums/$artist/$album",
			params: {
				artist: albumData.artist,
				album: albumData.name,
			},
			search: {
				from: "best-played",
			},
		});
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const totalPages = artistAlbumsData?.totalPages ?? 0;

	return (
		<Box minH="100vh" bg="bg.canvas">
			<Container maxW="container.xl" py={8}>
				<VStack gap={8} align="stretch">
					<VStack gap={2} align="start">
						<Heading size="2xl" display="flex" alignItems="center" gap={3}>
							<BarChart3 size={32} />
							Best Played
						</Heading>
						<Text color="fg.muted" fontSize="lg">
							Search for an artist to discover their most played albums
						</Text>
					</VStack>

					<SearchBar
						onSearch={handleSearch}
						defaultValue={searchQuery}
						placeholder="Search for an artist..."
					/>

					<Box
						bg="bg.panel"
						borderRadius="xl"
						border="1px solid"
						borderColor="border.muted"
						p={6}
					>
						{!isSearching ? (
							// Empty state - prompt to search
							<VStack gap={6} py={12}>
								<Box
									w={20}
									h={20}
									borderRadius="full"
									bg="primary.500/10"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<Search
										size={40}
										style={{ color: "var(--chakra-colors-primary-500)" }}
									/>
								</Box>
								<VStack gap={2}>
									<Heading size="lg" textAlign="center">
										Search for an Artist
									</Heading>
									<Text color="fg.muted" textAlign="center" maxW="md">
										Enter an artist name above to see their top albums ranked by
										play count
									</Text>
								</VStack>
							</VStack>
						) : (
							<>
								<HStack justify="space-between" mb={6}>
									<HStack gap={3}>
										<Disc3
											size={24}
											style={{ color: "var(--chakra-colors-primary-500)" }}
										/>
										<Heading size="lg">{searchQuery}'s Top Albums</Heading>
									</HStack>
									<HStack gap={2}>
										{currentPage > 0 && totalPages > 0 && (
											<Badge variant="outline">
												Page {currentPage} of {Math.min(totalPages, 10)}
											</Badge>
										)}
										<Badge colorPalette="primary" variant="subtle">
											By Play Count
										</Badge>
									</HStack>
								</HStack>

								{isLoading ? (
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										py={12}
									>
										<VStack gap={4}>
											<Spinner size="xl" colorPalette="primary" />
											<Text color="fg.muted">Loading albums...</Text>
										</VStack>
									</Box>
								) : artistAlbumsData?.data &&
									artistAlbumsData.data.length > 0 ? (
									<VStack gap={6} align="stretch">
										<AlbumChart
											albums={artistAlbumsData.data}
											onAlbumClick={handleAlbumClick}
										/>

										{totalPages > 1 && (
											<Pagination
												currentPage={currentPage}
												totalPages={totalPages}
												onPageChange={handlePageChange}
											/>
										)}
									</VStack>
								) : (
									<Box py={8} textAlign="center">
										<Text color="fg.muted">
											No albums found for "{searchQuery}". Try a different
											artist name.
										</Text>
									</Box>
								)}
							</>
						)}
					</Box>
				</VStack>
			</Container>
		</Box>
	);
}
