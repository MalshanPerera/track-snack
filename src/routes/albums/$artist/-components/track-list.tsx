import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Clock, Music, Play } from "lucide-react";

import { FavoriteButton } from "@/components/favorites-button";

import { formatDuration } from "@/lib/utils";
import type { FavoriteTrack, Track } from "@/types";

import styles from "./track-list.module.css";

interface TrackListProps {
	tracks: Track[];
	albumName: string;
	albumArtist: string;
	totalDuration?: number;
}

interface TrackItemProps {
	track: Track;
	index: number;
	albumName: string;
	albumArtist: string;
}

function TrackItem({ track, index, albumName, albumArtist }: TrackItemProps) {
	const trackNumber = track.rank || index + 1;

	const favoriteTrack: FavoriteTrack = {
		name: track.name,
		artist: track.artist,
		duration: track.duration,
		url: track.url,
		albumName,
		albumArtist,
		images: track.images,
		addedAt: 0,
	};

	return (
		<Box
			className={styles.trackItem}
			style={{ "--stagger-delay": `${index * 30}ms` } as React.CSSProperties}
			p={4}
			borderRadius="lg"
			bg={index % 2 === 0 ? "bg.subtle" : "transparent"}
		>
			<HStack justify="space-between" gap={4}>
				<HStack gap={4} flex={1} minW={0}>
					<Box w="32px" textAlign="center" flexShrink={0}>
						<Text className={styles.trackNumber} color="fg.muted">
							{trackNumber}
						</Text>
						<Box className={styles.playIcon} color="primary.500">
							<Play size={16} fill="currentColor" />
						</Box>
					</Box>

					<VStack align="start" gap={0} flex={1} minW={0}>
						<Text
							className={styles.truncate}
							fontWeight="semibold"
							fontSize="md"
							color="fg.default"
						>
							{track.name}
						</Text>
						<Text className={styles.truncate} fontSize="sm" color="fg.muted">
							{track.artist.name}
						</Text>
					</VStack>
				</HStack>

				<HStack gap={2} flexShrink={0}>
					{track.duration && track.duration > 0 && (
						<Text fontSize="sm" color="fg.muted" fontWeight="medium">
							{formatDuration(track.duration)}
						</Text>
					)}
					<FavoriteButton track={favoriteTrack} size={16} />
				</HStack>
			</HStack>
		</Box>
	);
}

export function TrackList({
	tracks,
	albumName,
	albumArtist,
	totalDuration,
}: TrackListProps) {
	if (tracks.length === 0) {
		return (
			<Box className={styles.emptyState} py={12} textAlign="center">
				<Box
					className={styles.emptyIcon}
					w={16}
					h={16}
					borderRadius="full"
					bg="bg.muted"
					mb={4}
				>
					<Music size={32} style={{ color: "var(--chakra-colors-fg-muted)" }} />
				</Box>
				<Text color="fg.muted" fontSize="lg" fontWeight="medium">
					No tracks available
				</Text>
			</Box>
		);
	}

	const calculatedDuration =
		totalDuration ||
		tracks.reduce((sum, track) => sum + (track.duration || 0), 0);

	return (
		<VStack align="stretch" gap={0}>
			<HStack
				justify="space-between"
				px={4}
				py={3}
				borderBottom="1px solid"
				borderColor="border.muted"
				mb={2}
			>
				<HStack gap={2} align="center">
					<Music
						size={20}
						style={{ color: "var(--chakra-colors-primary-500)" }}
					/>
					<Text fontWeight="bold" fontSize="lg" color="fg.default">
						{tracks.length} Track{tracks.length !== 1 ? "s" : ""}
					</Text>
				</HStack>
				{calculatedDuration > 0 && (
					<HStack gap={2} align="center" color="fg.muted">
						<Clock size={16} />
						<Text fontSize="sm" fontWeight="medium">
							{Math.floor(calculatedDuration / 60)} min
						</Text>
					</HStack>
				)}
			</HStack>

			<VStack align="stretch" gap={0}>
				{tracks.map((track, index) => (
					<TrackItem
						key={track.url || `${track.name}-${index}`}
						track={track}
						index={index}
						albumName={albumName}
						albumArtist={albumArtist}
					/>
				))}
			</VStack>
		</VStack>
	);
}
