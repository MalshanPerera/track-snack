import { useState } from "react";

import { createFileRoute, Link } from "@tanstack/react-router";

import {
	Badge,
	Box,
	Button,
	Container,
	Heading,
	HStack,
	Image,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";
import {
	ArrowLeft,
	Calendar,
	Disc3,
	Headphones,
	Play,
	Users,
} from "lucide-react";

import { useAlbumInfo } from "@/hooks";
import { formatPlayCount, getAlbumImage } from "@/lib/utils";

import { TrackList } from "./-components/track-list";
import styles from "./album-detail.module.css";

type AlbumSearchParams = {
	from?: "best-played";
};

export const Route = createFileRoute("/albums/$artist/$album")({
	component: AlbumDetailPage,
	validateSearch: (search: Record<string, unknown>): AlbumSearchParams => {
		return {
			from: search.from === "best-played" ? "best-played" : undefined,
		};
	},
});

function AlbumDetailPage() {
	const { artist, album } = Route.useParams();
	const { from } = Route.useSearch();
	const decodedArtist = decodeURIComponent(artist);
	const decodedAlbum = decodeURIComponent(album);
	const [isWikiExpanded, setIsWikiExpanded] = useState(false);

	const isFromBestPlayed = from === "best-played";

	const {
		data: albumData,
		isLoading,
		error,
	} = useAlbumInfo(decodedArtist, decodedAlbum);

	if (isLoading) {
		return (
			<Box minH="100vh" bg="bg.canvas">
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					minH="60vh"
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
						Loading album...
					</Text>
				</Box>
			</Box>
		);
	}

	if (error || !albumData) {
		return (
			<Box minH="100vh" bg="bg.canvas">
				<Container maxW="container.xl" py={12}>
					<VStack gap={6} textAlign="center">
						<Box
							w={20}
							h={20}
							borderRadius="full"
							bg="red.500/10"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<Disc3
								size={40}
								style={{ color: "var(--chakra-colors-red-500)" }}
							/>
						</Box>
						<VStack gap={2}>
							<Heading size="xl" color="fg.default">
								Album Not Found
							</Heading>
							<Text color="fg.muted" fontSize="lg">
								{error instanceof Error
									? error.message
									: "We couldn't find this album. It may have been removed or the link is incorrect."}
							</Text>
						</VStack>
						{isFromBestPlayed ? (
							<Link to="/best-played">
								<Button colorPalette="primary" size="lg">
									<ArrowLeft size={18} />
									Back to Best Played
								</Button>
							</Link>
						) : (
							<Link to="/albums/$artist" params={{ artist }}>
								<Button colorPalette="primary" size="lg">
									<ArrowLeft size={18} />
									Back to Artist
								</Button>
							</Link>
						)}
					</VStack>
				</Container>
			</Box>
		);
	}

	const imageUrl = getAlbumImage(albumData.images, "mega");
	const tracks = albumData.tracks || [];
	const releaseYear = albumData.wiki?.published
		? new Date(albumData.wiki.published).getFullYear()
		: null;

	// Clean wiki summary (remove HTML tags)
	const wikiSummary = albumData.wiki?.summary
		?.replace(/<[^>]*>/g, "")
		?.replace(/&[^;]+;/g, " ")
		?.trim();

	return (
		<Box minH="100vh" bg="bg.canvas">
			{/* Hero Section with Blurred Background */}
			<Box position="relative" overflow="hidden">
				{/* Blurred Background Image */}
				<Box
					className={styles.blurredBg}
					style={{ "--bg-image": `url(${imageUrl})` } as React.CSSProperties}
					css={{
						"&::before": {
							backgroundImage: `url(${imageUrl})`,
						},
					}}
				/>

				{/* Hero Content */}
				<Container maxW="container.xl" position="relative" zIndex={1} py={8}>
					{/* Back Button */}
					{isFromBestPlayed ? (
						<Link to="/best-played">
							<Button
								className={styles.backButton}
								variant="ghost"
								size="sm"
								mb={6}
								color="fg.muted"
							>
								<ArrowLeft size={16} />
								Back to Best Played
							</Button>
						</Link>
					) : (
						<Link to="/albums/$artist" params={{ artist }}>
							<Button
								className={styles.backButton}
								variant="ghost"
								size="sm"
								mb={6}
								color="fg.muted"
							>
								<ArrowLeft size={16} />
								Back to {decodedArtist}
							</Button>
						</Link>
					)}

					<HStack
						gap={{ base: 6, md: 10 }}
						align="start"
						flexDirection={{ base: "column", md: "row" }}
					>
						{/* Album Cover */}
						<Box className={styles.albumCover} flexShrink={0}>
							<Box
								className={styles.albumCoverContainer}
								width={{ base: "200px", sm: "250px", md: "300px" }}
								aspectRatio="1"
							>
								<Image
									src={imageUrl}
									alt={albumData.name}
									width="100%"
									height="100%"
									objectFit="cover"
								/>
								{/* Play Overlay */}
								<Box className={styles.playOverlay} bg="blackAlpha.600">
									<Box className={styles.playButton} bg="primary.500">
										<Play size={36} fill="white" color="white" />
									</Box>
								</Box>
							</Box>
						</Box>

						{/* Album Info */}
						<VStack className={styles.albumInfo} align="start" gap={4} flex={1}>
							{/* Album Type Badge */}
							<Badge
								colorPalette="primary"
								variant="subtle"
								px={3}
								py={1}
								borderRadius="full"
								fontSize="xs"
								fontWeight="bold"
								textTransform="uppercase"
								letterSpacing="wider"
							>
								Album
							</Badge>

							{/* Album Name */}
							<Heading
								size={{ base: "2xl", md: "3xl", lg: "4xl" }}
								fontWeight="black"
								lineHeight="1.1"
								color="fg.default"
							>
								{albumData.name}
							</Heading>

							{/* Artist Name */}
							<Link to="/albums/$artist" params={{ artist }}>
								<Text
									className={styles.artistLink}
									fontSize={{ base: "lg", md: "xl" }}
									fontWeight="semibold"
									color="fg.muted"
								>
									{albumData.artist}
								</Text>
							</Link>

							{/* Stats Row */}
							<HStack gap={4} flexWrap="wrap" pt={2}>
								{releaseYear && (
									<HStack gap={2} color="fg.muted">
										<Calendar size={16} />
										<Text fontSize="sm" fontWeight="medium">
											{releaseYear}
										</Text>
									</HStack>
								)}
								{tracks.length > 0 && (
									<HStack gap={2} color="fg.muted">
										<Disc3 size={16} />
										<Text fontSize="sm" fontWeight="medium">
											{tracks.length} tracks
										</Text>
									</HStack>
								)}
								{albumData.playcount && (
									<HStack gap={2} color="fg.muted">
										<Headphones size={16} />
										<Text fontSize="sm" fontWeight="medium">
											{formatPlayCount(albumData.playcount)} plays
										</Text>
									</HStack>
								)}
								{albumData.listeners && (
									<HStack gap={2} color="fg.muted">
										<Users size={16} />
										<Text fontSize="sm" fontWeight="medium">
											{formatPlayCount(albumData.listeners)} listeners
										</Text>
									</HStack>
								)}
							</HStack>

							{/* Wiki Summary */}
							{wikiSummary && (
								<Box pt={2} maxW="600px">
									<Text
										className={
											!isWikiExpanded ? styles.wikiTruncate : undefined
										}
										fontSize="sm"
										color="fg.muted"
										lineHeight="1.7"
									>
										{wikiSummary}
									</Text>
									{wikiSummary.length > 200 && (
										<Button
											className={styles.readMoreButton}
											variant="ghost"
											size="sm"
											mt={2}
											color="primary.500"
											onClick={() => setIsWikiExpanded(!isWikiExpanded)}
										>
											{isWikiExpanded ? "Show less" : "Read more"}
										</Button>
									)}
								</Box>
							)}
						</VStack>
					</HStack>
				</Container>
			</Box>

			{/* Track List Section */}
			<Container maxW="container.xl" py={8}>
				<Box
					className={styles.trackListContainer}
					bg="bg.panel"
					borderRadius="xl"
					border="1px solid"
					borderColor="border.muted"
					overflow="hidden"
				>
					<TrackList
						tracks={tracks}
						albumName={albumData.name}
						albumArtist={albumData.artist}
					/>
				</Box>
			</Container>
		</Box>
	);
}
