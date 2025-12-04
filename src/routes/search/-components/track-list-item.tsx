import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { FavoriteButton } from "@/components/favorites-button";

import { formatDuration, getAlbumImage } from "@/lib/utils";
import type { FavoriteTrack, Track } from "@/types";

import styles from "./track-list-item.module.css";

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
			className={onClick ? styles.item : undefined}
			p={4}
			borderRadius="md"
			borderWidth="1px"
			borderColor="border.emphasized"
			bg="bg.subtle"
			cursor={onClick ? "pointer" : "default"}
			onClick={onClick}
			_hover={
				onClick
					? {
							bg: "bg.muted",
							borderColor: "primary.500",
						}
					: undefined
			}
		>
			<HStack gap={4} align="center">
				{imageUrl && (
					<Image
						className={styles.thumbnail}
						src={imageUrl}
						alt={track.name}
						width="60px"
						height="60px"
						borderRadius="md"
						objectFit="cover"
					/>
				)}
				<VStack align="start" gap={1} flex={1} minW={0}>
					<Text className={styles.truncate} fontWeight="semibold" fontSize="md">
						{track.name}
					</Text>
					<Text className={styles.truncate} fontSize="sm" color="fg.muted">
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
