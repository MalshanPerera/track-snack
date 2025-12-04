import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Disc3 } from "lucide-react";

import { FavoriteButton } from "@/components/favorites-button";

import { formatDuration, getAlbumImage } from "@/lib/utils";
import type { FavoriteTrack } from "@/types";

import styles from "./favorite-item.module.css";

interface FavoriteItemProps {
	track: FavoriteTrack;
	onClick: () => void;
}

export function FavoriteItem({ track, onClick }: FavoriteItemProps) {
	const duration = track.duration ? formatDuration(track.duration) : null;
	const imageUrl = track.images?.length
		? getAlbumImage(track.images, "large")
		: null;

	return (
		<Box
			className={styles.item}
			p={4}
			borderRadius="lg"
			borderWidth="1px"
			borderColor="border.emphasized"
			bg="bg.subtle"
			_hover={{
				bg: "bg.muted",
				borderColor: "primary.500",
			}}
		>
			<HStack gap={4} align="center">
				<Box className={styles.thumbnail} onClick={onClick} bg="bg.muted">
					{imageUrl ? (
						<Image
							className={styles.thumbnailImage}
							src={imageUrl}
							alt={track.name}
						/>
					) : (
						<Disc3
							size={24}
							style={{ color: "var(--chakra-colors-fg-muted)" }}
						/>
					)}
				</Box>

				<VStack
					align="start"
					gap={1}
					flex={1}
					minW={0}
					onClick={onClick}
					cursor="pointer"
				>
					<Text className={styles.truncate} fontWeight="semibold" fontSize="md">
						{track.name}
					</Text>
					<Text className={styles.truncate} fontSize="sm" color="fg.muted">
						{track.artist.name}
					</Text>
					<Text className={styles.truncate} fontSize="xs" color="fg.subtle">
						{track.albumName}
					</Text>
				</VStack>

				<HStack gap={3} flexShrink={0}>
					{duration && (
						<Text fontSize="sm" color="fg.muted" whiteSpace="nowrap">
							{duration}
						</Text>
					)}
					<FavoriteButton track={track} />
				</HStack>
			</HStack>
		</Box>
	);
}
