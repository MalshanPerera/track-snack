import { createFileRoute } from "@tanstack/react-router";

import {
	Box,
	Container,
	Heading,
	HStack,
	Image,
	Spinner,
	Text,
	VStack,
} from "@chakra-ui/react";

import type { Track } from "@/domain/entities/album";
import { formatPlayCount, getAlbumImage } from "@/lib/utils";
import { useAlbumInfo } from "@/presentation/hooks";

export const Route = createFileRoute("/albums/$artist/$album")({
	component: AlbumDetailPage,
});

function AlbumDetailPage() {
	const { artist, album } = Route.useParams();
	const decodedArtist = decodeURIComponent(artist);
	const decodedAlbum = decodeURIComponent(album);

	const {
		data: albumData,
		isLoading,
		error,
	} = useAlbumInfo(decodedArtist, decodedAlbum);

	if (isLoading) {
		return (
			<Container maxW="container.xl" py={8}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minH="400px"
				>
					<Spinner size="xl" colorPalette="primary" />
				</Box>
			</Container>
		);
	}

	if (error || !albumData) {
		return (
			<Container maxW="container.xl" py={8}>
				<Box p={8} textAlign="center">
					<Text color="fg.error">
						Failed to load album:{" "}
						{error instanceof Error ? error.message : "Unknown error"}
					</Text>
				</Box>
			</Container>
		);
	}

	const imageUrl = getAlbumImage(albumData.images, "mega");
	const tracks = albumData.tracks || [];

	return (
		<Container maxW="container.xl" py={8}>
			<VStack gap={8} align="stretch">
				<HStack
					gap={8}
					align="start"
					flexDirection={{ base: "column", md: "row" }}
				>
					<Image
						src={imageUrl}
						alt={albumData.name}
						width={{ base: "100%", md: "300px" }}
						aspectRatio="1"
						objectFit="cover"
						borderRadius="lg"
						flexShrink={0}
					/>
					<VStack align="start" gap={4} flex={1}>
						<VStack align="start" gap={2}>
							<Heading size="2xl">{albumData.name}</Heading>
							<Text fontSize="xl" color="fg.muted">
								{albumData.artist}
							</Text>
						</VStack>
						{albumData.wiki && (
							<Box>
								<Text
									fontSize="sm"
									color="fg.muted"
									css={{
										display: "-webkit-box",
										WebkitLineClamp: 5,
										WebkitBoxOrient: "vertical",
										overflow: "hidden",
									}}
								>
									{albumData.wiki.summary || albumData.wiki.content}
								</Text>
							</Box>
						)}
						<HStack gap={4}>
							{albumData.playcount && (
								<Text fontSize="sm" color="fg.muted">
									{formatPlayCount(albumData.playcount)} plays
								</Text>
							)}
							{albumData.listeners && (
								<Text fontSize="sm" color="fg.muted">
									{formatPlayCount(albumData.listeners)} listeners
								</Text>
							)}
						</HStack>
					</VStack>
				</HStack>

				{tracks.length > 0 && (
					<VStack align="stretch" gap={4}>
						<Heading size="lg">Tracks</Heading>
						<VStack align="stretch" gap={1}>
							{tracks.map((track: Track, index: number) => (
								<Box
									key={track.url || track.name || index}
									p={3}
									borderRadius="md"
									borderWidth="1px"
									borderColor="border.emphasized"
									bg="bg.subtle"
									css={{
										_hover: {
											bg: "bg.muted",
										},
									}}
								>
									<HStack justify="space-between">
										<HStack gap={4} flex={1}>
											{track.rank && (
												<Text fontSize="sm" color="fg.muted" minW="30px">
													{track.rank}
												</Text>
											)}
											<VStack align="start" gap={0} flex={1}>
												<Text fontWeight="medium">{track.name}</Text>
												<Text fontSize="sm" color="fg.muted">
													{track.artist.name}
												</Text>
											</VStack>
										</HStack>
									</HStack>
								</Box>
							))}
						</VStack>
					</VStack>
				)}
			</VStack>
		</Container>
	);
}
