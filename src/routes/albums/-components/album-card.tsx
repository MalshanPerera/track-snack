import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Badge, Box, Card, Image, Text, VStack } from "@chakra-ui/react";
import { Disc3, Play } from "lucide-react";

import { getAlbumInfo } from "@/api/lastfm";
import { albumInfoKeys } from "@/hooks/use-album-info";
import { formatPlayCount, getAlbumImage } from "@/lib/utils";
import type { Album } from "@/types";

import styles from "./album-card.module.css";

interface AlbumCardProps {
	album: Album;
	onClick?: () => void;
	index?: number;
}

export function AlbumCard({ album, onClick, index = 0 }: AlbumCardProps) {
	const queryClient = useQueryClient();
	const imageUrl = getAlbumImage(album.images, "extralarge");

	const year = album.wiki?.published
		? new Date(album.wiki.published).getFullYear()
		: null;

	const handleMouseEnter = useCallback(() => {
		queryClient.prefetchQuery({
			queryKey: albumInfoKeys.detail(album.artist, album.name),
			queryFn: () => getAlbumInfo(album.artist, album.name),
			staleTime: 10 * 60 * 1000,
		});
	}, [queryClient, album.artist, album.name]);

	return (
		<Card.Root
			className={styles.card}
			style={{ "--stagger-delay": `${index * 50}ms` } as React.CSSProperties}
			cursor="pointer"
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			overflow="hidden"
			bg="transparent"
			border="none"
			boxShadow="none"
		>
			<Card.Body p={0}>
				{/* Image Container with Overlay Effects */}
				<Box className={styles.imageContainer} bg="bg.muted">
					<Image
						className={styles.albumImage}
						src={imageUrl}
						alt={album.name}
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.style.display = "none";
							const fallback = target.nextElementSibling as HTMLElement;
							if (fallback) fallback.style.display = "flex";
						}}
					/>

					{/* Fallback placeholder */}
					<Box
						className={styles.fallbackPlaceholder}
						bg="linear-gradient(135deg, var(--chakra-colors-bg-muted) 0%, var(--chakra-colors-bg-subtle) 100%)"
					>
						<Disc3
							size={48}
							style={{ color: "var(--chakra-colors-fg-muted)" }}
						/>
					</Box>

					{/* Gradient overlay for hover */}
					<Box className={styles.gradientOverlay} />

					{/* Play button overlay */}
					<Box className={styles.playOverlay}>
						<Box className={styles.playButton} bg="primary.500">
							<Play size={28} fill="white" color="white" />
						</Box>
					</Box>

					{/* Year badge */}
					{year && <Badge className={styles.yearBadge}>{year}</Badge>}

					{/* Playcount badge */}
					{album.playcount && album.playcount > 0 && (
						<Badge
							className={styles.playcountBadge}
							bg="primary.500"
							color="white"
						>
							{formatPlayCount(album.playcount)} plays
						</Badge>
					)}
				</Box>

				{/* Album Info */}
				<VStack align="start" pt={4} pb={2} gap={1}>
					<Text
						className={styles.albumName}
						fontWeight="bold"
						fontSize="md"
						lineHeight="1.3"
						color="fg.default"
					>
						{album.name}
					</Text>
					<Text
						className={styles.artistName}
						fontSize="sm"
						color="fg.muted"
						fontWeight="medium"
					>
						{album.artist}
					</Text>
				</VStack>
			</Card.Body>
		</Card.Root>
	);
}
