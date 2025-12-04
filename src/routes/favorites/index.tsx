import { useMemo, useState } from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import {
	Badge,
	Box,
	Container,
	Heading,
	HStack,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Heart, Search } from "lucide-react";

import { useFavoritesStore } from "@/stores/favorites-store";
import type { FavoriteTrack } from "@/types";

import { FavoriteList } from "./-components/favorite-list";
import { QuickAddButton, QuickAddModal } from "./-components/quick-add-modal";

export const Route = createFileRoute("/favorites/")({
	component: FavoritesPage,
});

function FavoritesPage() {
	const navigate = useNavigate();
	const { favorites } = useFavoritesStore();
	const [filterQuery, setFilterQuery] = useState("");
	const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

	const filteredFavorites = useMemo(() => {
		if (!filterQuery.trim()) {
			return favorites;
		}

		const query = filterQuery.toLowerCase();
		return favorites.filter(
			(track) =>
				track.name.toLowerCase().includes(query) ||
				track.artist.name.toLowerCase().includes(query) ||
				track.albumName.toLowerCase().includes(query),
		);
	}, [favorites, filterQuery]);

	const handleTrackClick = (track: FavoriteTrack) => {
		navigate({
			to: "/albums/$artist/$album",
			params: {
				artist: track.albumArtist,
				album: track.albumName,
			},
		});
	};

	return (
		<Box minH="100vh" bg="bg.canvas">
			<Container maxW="container.xl" py={8}>
				{/* Header Section */}
				<HStack
					gap={4}
					mb={8}
					align="center"
					justify="space-between"
					flexWrap="wrap"
				>
					<HStack gap={4} align="center">
						<Box
							p={3}
							borderRadius="xl"
							bg="red.500/10"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<Heart
								size={28}
								fill="var(--chakra-colors-red-500)"
								color="var(--chakra-colors-red-500)"
							/>
						</Box>
						<VStack align="start" gap={0}>
							<Heading size="2xl">Favourites</Heading>
							<Text
								color="fg.muted"
								fontSize="sm"
								display={{ base: "none", sm: "block" }}
							>
								Your saved songs collection
							</Text>
						</VStack>
						<Badge
							colorPalette="red"
							variant="subtle"
							fontSize="md"
							px={3}
							py={1}
							borderRadius="full"
						>
							{favorites.length}
						</Badge>
					</HStack>
					<QuickAddButton onClick={() => setIsQuickAddOpen(true)} />
				</HStack>

				{/* Filter Section */}
				{favorites.length > 0 && (
					<Box mb={6} position="relative">
						<Box
							position="absolute"
							left={4}
							top="50%"
							transform="translateY(-50%)"
							zIndex={1}
							pointerEvents="none"
							css={{ color: "fg.muted" }}
						>
							<Search size={20} />
						</Box>
						<Input
							value={filterQuery}
							onChange={(e) => setFilterQuery(e.target.value)}
							placeholder="Filter favourites by title, artist, or album..."
							bg="bg.subtle"
							borderColor="border.emphasized"
							pl={12}
							size="lg"
							css={{
								_focus: {
									borderColor: "primary.500",
									boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
								},
							}}
						/>
					</Box>
				)}

				{/* No Results Message */}
				{filterQuery &&
					filteredFavorites.length === 0 &&
					favorites.length > 0 && (
						<Box py={8} textAlign="center">
							<Text color="fg.muted" fontSize="lg">
								No favourites match "{filterQuery}"
							</Text>
						</Box>
					)}

				{/* Favorites List */}
				<FavoriteList
					favorites={filteredFavorites}
					onTrackClick={handleTrackClick}
				/>

				{/* Quick Add Modal */}
				<QuickAddModal
					isOpen={isQuickAddOpen}
					onClose={() => setIsQuickAddOpen(false)}
				/>
			</Container>
		</Box>
	);
}
