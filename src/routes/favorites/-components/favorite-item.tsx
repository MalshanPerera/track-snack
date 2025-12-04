import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Disc3 } from "lucide-react";

import { FavoriteButton } from "@/components/favorites-button";

import { formatDuration, getAlbumImage } from "@/lib/utils";
import type { FavoriteTrack } from "@/types";

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
			p={4}
			borderRadius="lg"
			borderWidth="1px"
			borderColor="border.emphasized"
			bg="bg.subtle"
			css={{
				transition: "all 0.2s ease",
				"&:hover": {
					bg: "bg.muted",
					borderColor: "primary.500",
					transform: "translateX(4px)",
				},
			}}
		>
			<HStack gap={4} align="center">
				<Box
					onClick={onClick}
					cursor="pointer"
					flexShrink={0}
					width="60px"
					height="60px"
					borderRadius="md"
					overflow="hidden"
					bg="bg.muted"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					{imageUrl ? (
						<Image
							src={imageUrl}
							alt={track.name}
							width="100%"
							height="100%"
							objectFit="cover"
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
						{track.artist.name}
					</Text>
					<Text
						fontSize="xs"
						color="fg.subtle"
						css={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							width: "100%",
						}}
					>
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
