import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { FavoriteButton } from "@/components/favorites-button";

import { formatDuration, getAlbumImage } from "@/lib/utils";
import type { FavoriteTrack, Track } from "@/types";

interface TrackListItemProps {
	track: Track;
	onClick?: () => void;
}

export function TrackListItem({ track, onClick }: TrackListItemProps) {
	const artistName = track.artist.name;
	const duration = track.duration ? formatDuration(track.duration) : null;
	const imageUrl = track.images?.length
		? getAlbumImage(track.images, "large")
		: null;

	const favoriteTrack: FavoriteTrack = {
		name: track.name,
		artist: track.artist,
		duration: track.duration,
		url: track.url,
		albumName: "Unknown Album",
		albumArtist: artistName,
		images: track.images,
		addedAt: 0,
	};

	return (
		<Box
			p={4}
			borderRadius="md"
			borderWidth="1px"
			borderColor="border.emphasized"
			bg="bg.subtle"
			cursor={onClick ? "pointer" : "default"}
			onClick={onClick}
			css={{
				_hover: onClick
					? {
							bg: "bg.muted",
							borderColor: "primary.500",
							transform: "translateX(4px)",
							transition: "all 0.2s ease-in-out",
						}
					: {},
			}}
		>
			<HStack gap={4} align="center">
				{imageUrl && (
					<Image
						src={imageUrl}
						alt={track.name}
						width="60px"
						height="60px"
						borderRadius="md"
						objectFit="cover"
						flexShrink={0}
					/>
				)}
				<VStack align="start" gap={1} flex={1} minW={0}>
					<Text
						fontWeight="semibold"
						fontSize="md"
						css={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							width: "100%",
						}}
					>
						{track.name}
					</Text>
					<Text
						fontSize="sm"
						color="fg.muted"
						css={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							width: "100%",
						}}
					>
						{artistName}
					</Text>
				</VStack>
				<HStack gap={2} flexShrink={0}>
					{duration && (
						<Text fontSize="sm" color="fg.muted" whiteSpace="nowrap">
							{duration}
						</Text>
					)}
					<FavoriteButton track={favoriteTrack} />
				</HStack>
			</HStack>
		</Box>
	);
}
