import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Clock, Music, Play } from "lucide-react";

import { formatDuration } from "@/lib/utils";
import type { Track } from "@/types";

interface TrackListProps {
	tracks: Track[];
	totalDuration?: number;
}

interface TrackItemProps {
	track: Track;
	index: number;
}

function TrackItem({ track, index }: TrackItemProps) {
	const trackNumber = track.rank || index + 1;

	return (
		<Box
			p={4}
			borderRadius="lg"
			css={{
				"--stagger-delay": `${index * 30}ms`,
				animation: "trackSlideIn 0.4s ease-out forwards",
				animationDelay: "var(--stagger-delay)",
				opacity: 0,
				"@keyframes trackSlideIn": {
					"0%": {
						opacity: 0,
						transform: "translateX(-10px)",
					},
					"100%": {
						opacity: 1,
						transform: "translateX(0)",
					},
				},
				bg: index % 2 === 0 ? "bg.subtle" : "transparent",
				transition: "all 0.2s ease",
				cursor: "pointer",
				"&:hover": {
					bg: "bg.muted",
					"& .track-number": {
						display: "none",
					},
					"& .play-icon": {
						display: "flex",
					},
				},
			}}
		>
			<HStack justify="space-between" gap={4}>
				<HStack gap={4} flex={1} minW={0}>
					{/* Track Number / Play Icon */}
					<Box w="32px" textAlign="center" flexShrink={0}>
						<Text
							className="track-number"
							fontSize="sm"
							fontWeight="semibold"
							color="fg.muted"
						>
							{trackNumber}
						</Text>
						<Box
							className="play-icon"
							display="none"
							alignItems="center"
							justifyContent="center"
							color="primary.500"
						>
							<Play size={16} fill="currentColor" />
						</Box>
					</Box>

					{/* Track Info */}
					<VStack align="start" gap={0} flex={1} minW={0}>
						<Text
							fontWeight="semibold"
							fontSize="md"
							color="fg.default"
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
					</VStack>
				</HStack>

				{/* Duration */}
				{track.duration && track.duration > 0 && (
					<Text
						fontSize="sm"
						color="fg.muted"
						fontWeight="medium"
						flexShrink={0}
					>
						{formatDuration(track.duration)}
					</Text>
				)}
			</HStack>
		</Box>
	);
}

export function TrackList({ tracks, totalDuration }: TrackListProps) {
	if (tracks.length === 0) {
		return (
			<Box
				py={12}
				textAlign="center"
				css={{
					animation: "fadeIn 0.5s ease-out",
					"@keyframes fadeIn": {
						from: { opacity: 0 },
						to: { opacity: 1 },
					},
				}}
			>
				<Box
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
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

	// Calculate total duration if not provided
	const calculatedDuration =
		totalDuration ||
		tracks.reduce((sum, track) => sum + (track.duration || 0), 0);

	return (
		<VStack align="stretch" gap={0}>
			{/* Header */}
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

			{/* Track Items */}
			<VStack align="stretch" gap={0}>
				{tracks.map((track, index) => (
					<TrackItem
						key={track.url || `${track.name}-${index}`}
						track={track}
						index={index}
					/>
				))}
			</VStack>
		</VStack>
	);
}
