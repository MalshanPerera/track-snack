import { useState } from "react";

import {
	Badge,
	Box,
	Button,
	CloseButton,
	Dialog,
	HStack,
	Image,
	Input,
	Portal,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Check, Plus, Search } from "lucide-react";

import { FavoriteButton } from "@/components/favorites-button";

import { useInfiniteTrackSearch } from "@/hooks";
import { formatDuration, getAlbumImage } from "@/lib/utils";
import { getTrackKey, useFavoritesStore } from "@/stores/favorites-store";
import type { FavoriteTrack, Track } from "@/types";

import styles from "./quick-add-modal.module.css";

interface QuickAddModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function TrackSearchItem({ track }: { track: Track }) {
	const favorites = useFavoritesStore((state) => state.favorites);
	const trackKey = getTrackKey(track.artist.name, track.name);
	const isFavorited = favorites.some(
		(f) => getTrackKey(f.artist.name, f.name) === trackKey,
	);

	const imageUrl = track.images?.length
		? getAlbumImage(track.images, "medium")
		: null;

	const favoriteTrack: FavoriteTrack = {
		name: track.name,
		artist: track.artist,
		duration: track.duration,
		url: track.url,
		albumName: "Unknown Album",
		albumArtist: track.artist.name,
		images: track.images,
		addedAt: 0,
	};

	return (
		<HStack
			className={styles.trackItem}
			p={3}
			borderRadius="lg"
			bg={isFavorited ? "primary.500/5" : "bg.subtle"}
			borderWidth="1px"
			borderColor={isFavorited ? "primary.500/30" : "border.muted"}
			gap={3}
			_hover={{
				bg: isFavorited ? "primary.500/10" : "bg.muted",
			}}
		>
			{/* Track Image */}
			<Box
				className={styles.thumbnail}
				w="48px"
				h="48px"
				borderRadius="md"
				overflow="hidden"
				bg="bg.muted"
			>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={track.name}
						w="100%"
						h="100%"
						objectFit="cover"
					/>
				) : (
					<Text fontSize="xl">🎵</Text>
				)}
			</Box>

			{/* Track Info */}
			<VStack align="start" gap={0} flex={1} minW={0}>
				<Text
					className={styles.truncate}
					fontWeight="semibold"
					fontSize="sm"
				>
					{track.name}
				</Text>
				<Text
					className={styles.truncate}
					fontSize="xs"
					color="fg.muted"
				>
					{track.artist.name}
				</Text>
			</VStack>

			{/* Duration & Favorite Button */}
			<HStack gap={2} flexShrink={0}>
				{track.duration && (
					<Text fontSize="xs" color="fg.muted">
						{formatDuration(track.duration)}
					</Text>
				)}
				{isFavorited ? (
					<Badge
						colorPalette="green"
						variant="subtle"
						fontSize="xs"
						display="flex"
						alignItems="center"
						gap={1}
					>
						<Check size={12} />
						Added
					</Badge>
				) : (
					<FavoriteButton track={favoriteTrack} size={16} />
				)}
			</HStack>
		</HStack>
	);
}

export function QuickAddModal({ isOpen, onClose }: QuickAddModalProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [submittedQuery, setSubmittedQuery] = useState("");

	const { tracks, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteTrackSearch(submittedQuery, submittedQuery.length > 0);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			setSubmittedQuery(searchQuery.trim());
		}
	};

	const handleClose = () => {
		setSearchQuery("");
		setSubmittedQuery("");
		onClose();
	};

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={(details) => !details.open && handleClose()}
			placement="center"
			size="lg"
		>
			<Portal>
				<Dialog.Backdrop className={styles.backdrop} bg="blackAlpha.600" />
				<Dialog.Positioner>
					<Dialog.Content
						maxH="80vh"
						overflow="hidden"
						display="flex"
						flexDirection="column"
					>
						<Dialog.Header borderBottom="1px solid" borderColor="border.muted">
							<HStack justify="space-between" align="center">
								<VStack align="start" gap={0}>
									<Dialog.Title>Quick Add Songs</Dialog.Title>
									<Text fontSize="sm" color="fg.muted">
										Search and add songs to your favourites
									</Text>
								</VStack>
								<Dialog.CloseTrigger asChild>
									<CloseButton size="sm" />
								</Dialog.CloseTrigger>
							</HStack>
						</Dialog.Header>

						<Dialog.Body
							p={0}
							flex={1}
							overflow="hidden"
							display="flex"
							flexDirection="column"
						>
							{/* Search Form */}
							<Box p={4} borderBottom="1px solid" borderColor="border.muted">
								<form onSubmit={handleSearch}>
									<HStack gap={2}>
										<Box position="relative" flex={1}>
											<Box className={styles.searchIcon}>
												<Search size={18} />
											</Box>
											<Input
												className={styles.searchInput}
												value={searchQuery}
												onChange={(e) => setSearchQuery(e.target.value)}
												placeholder="Search for songs..."
												pl={10}
												size="md"
												bg="bg.subtle"
												borderColor="border.emphasized"
												_focus={{
													borderColor: "primary.500",
													boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
												}}
											/>
										</Box>
										<Button
											type="submit"
											colorPalette="primary"
											disabled={!searchQuery.trim()}
										>
											Search
										</Button>
									</HStack>
								</form>
							</Box>

							{/* Results */}
							<Box flex={1} overflow="auto" p={4}>
								{!submittedQuery ? (
									<VStack gap={4} py={8}>
										<Box
											className={styles.emptyIcon}
											w={16}
											h={16}
											borderRadius="full"
											bg="primary.500/10"
										>
											<Search
												size={32}
												style={{ color: "var(--chakra-colors-primary-500)" }}
											/>
										</Box>
										<VStack gap={1}>
											<Text fontWeight="medium" fontSize="lg">
												Search for songs
											</Text>
											<Text color="fg.muted" fontSize="sm" textAlign="center">
												Find songs to add to your favourites
											</Text>
										</VStack>
									</VStack>
								) : isLoading ? (
									<VStack py={8}>
										<Spinner size="lg" colorPalette="primary" />
										<Text color="fg.muted">Searching...</Text>
									</VStack>
								) : tracks.length === 0 ? (
									<VStack py={8}>
										<Text color="fg.muted">
											No songs found for "{submittedQuery}"
										</Text>
									</VStack>
								) : (
									<VStack gap={2} align="stretch">
										<Text fontSize="sm" color="fg.muted" mb={2}>
											{tracks.length} songs found
											{hasNextPage && "+"}
										</Text>
										{tracks.map((track, index) => (
											<TrackSearchItem
												key={track.url || `${track.name}-${index}`}
												track={track}
											/>
										))}
										{hasNextPage && (
											<Button
												variant="ghost"
												size="sm"
												onClick={() => fetchNextPage()}
												disabled={isFetchingNextPage}
												mt={2}
											>
												{isFetchingNextPage ? (
													<Spinner size="sm" />
												) : (
													"Load more"
												)}
											</Button>
										)}
									</VStack>
								)}
							</Box>
						</Dialog.Body>

						<Dialog.Footer borderTop="1px solid" borderColor="border.muted">
							<Button variant="ghost" onClick={handleClose}>
								Done
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}

interface QuickAddButtonProps {
	onClick: () => void;
}

export function QuickAddButton({ onClick }: QuickAddButtonProps) {
	return (
		<Button
			onClick={onClick}
			colorPalette="primary"
			size="md"
			gap={2}
		>
			<Plus size={18} />
			<Text display={{ base: "none", sm: "inline" }}>Quick Add</Text>
		</Button>
	);
}
