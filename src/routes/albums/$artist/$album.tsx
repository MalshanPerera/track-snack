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

import { formatPlayCount, getAlbumImage } from "@/lib/utils";
import { useAlbumInfo } from "@/presentation/hooks";

import { TrackList } from "./-components/track-list";

export const Route = createFileRoute("/albums/$artist/$album")({
	component: AlbumDetailPage,
});

function AlbumDetailPage() {
	const { artist, album } = Route.useParams();
	const decodedArtist = decodeURIComponent(artist);
	const decodedAlbum = decodeURIComponent(album);
	const [isWikiExpanded, setIsWikiExpanded] = useState(false);

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
							<Disc3 size={40} style={{ color: "var(--chakra-colors-red-500)" }} />
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
						<Link to="/albums/$artist" params={{ artist }}>
							<Button colorPalette="primary" size="lg">
								<ArrowLeft size={18} />
								Back to Artist
							</Button>
						</Link>
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
					position="absolute"
					inset={0}
					css={{
						"&::before": {
							content: '""',
							position: "absolute",
							inset: 0,
							backgroundImage: `url(${imageUrl})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							filter: "blur(60px) saturate(1.5)",
							transform: "scale(1.2)",
							opacity: 0.4,
						},
						"&::after": {
							content: '""',
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(to bottom, transparent 0%, var(--chakra-colors-bg-canvas) 100%)",
						},
					}}
				/>

				{/* Hero Content */}
				<Container maxW="container.xl" position="relative" zIndex={1} py={8}>
					{/* Back Button */}
					<Link to="/albums/$artist" params={{ artist }}>
						<Button
							variant="ghost"
							size="sm"
							mb={6}
							css={{
								color: "fg.muted",
								_hover: {
									color: "fg.default",
									bg: "bg.muted",
								},
							}}
						>
							<ArrowLeft size={16} />
							Back to {decodedArtist}
						</Button>
					</Link>

					<HStack
						gap={{ base: 6, md: 10 }}
						align="start"
						flexDirection={{ base: "column", md: "row" }}
					>
						{/* Album Cover */}
						<Box
							flexShrink={0}
							css={{
								animation: "albumFadeIn 0.6s ease-out",
								"@keyframes albumFadeIn": {
									"0%": {
										opacity: 0,
										transform: "scale(0.9)",
									},
									"100%": {
										opacity: 1,
										transform: "scale(1)",
									},
								},
							}}
						>
							<Box
								position="relative"
								width={{ base: "200px", sm: "250px", md: "300px" }}
								aspectRatio="1"
								borderRadius="xl"
								overflow="hidden"
								css={{
									boxShadow:
										"0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.1)",
									transition: "transform 0.3s ease",
									"&:hover": {
										transform: "scale(1.02)",
									},
									"&:hover .play-overlay": {
										opacity: 1,
									},
								}}
							>
								<Image
									src={imageUrl}
									alt={albumData.name}
									width="100%"
									height="100%"
									objectFit="cover"
								/>
								{/* Play Overlay */}
								<Box
									className="play-overlay"
									position="absolute"
									inset={0}
									bg="blackAlpha.600"
									display="flex"
									alignItems="center"
									justifyContent="center"
									opacity={0}
									css={{
										transition: "opacity 0.3s ease",
										cursor: "pointer",
									}}
								>
									<Box
										bg="primary.500"
										borderRadius="full"
										p={5}
										css={{
											boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
										}}
									>
										<Play size={36} fill="white" color="white" />
									</Box>
								</Box>
							</Box>
						</Box>

						{/* Album Info */}
						<VStack
							align="start"
							gap={4}
							flex={1}
							css={{
								animation: "infoSlideIn 0.6s ease-out",
								animationDelay: "0.1s",
								animationFillMode: "backwards",
								"@keyframes infoSlideIn": {
									"0%": {
										opacity: 0,
										transform: "translateY(20px)",
									},
									"100%": {
										opacity: 1,
										transform: "translateY(0)",
									},
								},
							}}
						>
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
									fontSize={{ base: "lg", md: "xl" }}
									fontWeight="semibold"
									color="fg.muted"
									css={{
										transition: "color 0.2s ease",
										"&:hover": {
											color: "var(--chakra-colors-primary-500)",
										},
									}}
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
										fontSize="sm"
										color="fg.muted"
										lineHeight="1.7"
										css={
											!isWikiExpanded
												? {
														display: "-webkit-box",
														WebkitLineClamp: 3,
														WebkitBoxOrient: "vertical",
														overflow: "hidden",
													}
												: {}
										}
									>
										{wikiSummary}
									</Text>
									{wikiSummary.length > 200 && (
										<Button
											variant="ghost"
											size="sm"
											mt={2}
											color="primary.500"
											onClick={() => setIsWikiExpanded(!isWikiExpanded)}
											css={{
												_hover: {
													bg: "primary.500/10",
												},
											}}
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
					bg="bg.panel"
					borderRadius="xl"
					border="1px solid"
					borderColor="border.muted"
					overflow="hidden"
					css={{
						animation: "trackListFadeIn 0.6s ease-out",
						animationDelay: "0.3s",
						animationFillMode: "backwards",
						"@keyframes trackListFadeIn": {
							"0%": {
								opacity: 0,
								transform: "translateY(20px)",
							},
							"100%": {
								opacity: 1,
								transform: "translateY(0)",
							},
						},
					}}
				>
					<TrackList tracks={tracks} />
				</Box>
			</Container>
		</Box>
	);
}
