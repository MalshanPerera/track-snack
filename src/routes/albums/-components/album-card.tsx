import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Badge, Box, Card, Image, Text, VStack } from "@chakra-ui/react";
import { Disc3, Play } from "lucide-react";

import { getAlbumInfo } from "@/api/lastfm";
import { albumInfoKeys } from "@/hooks/use-album-info";
import { formatPlayCount, getAlbumImage } from "@/lib/utils";
import type { Album } from "@/types";

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
			cursor="pointer"
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			overflow="hidden"
			bg="transparent"
			border="none"
			boxShadow="none"
			css={{
				"--stagger-delay": `${index * 50}ms`,
				animation: "fadeSlideUp 0.5s ease-out forwards",
				animationDelay: "var(--stagger-delay)",
				opacity: 0,
				"@keyframes fadeSlideUp": {
					"0%": {
						opacity: 0,
						transform: "translateY(20px) scale(0.95)",
					},
					"100%": {
						opacity: 1,
						transform: "translateY(0) scale(1)",
					},
				},
			}}
		>
			<Card.Body p={0}>
				{/* Image Container with Overlay Effects */}
				<Box
					position="relative"
					width="100%"
					aspectRatio="1"
					borderRadius="xl"
					overflow="hidden"
					bg="bg.muted"
					css={{
						transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
						boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
						"&:hover": {
							transform: "scale(1.03) translateY(-4px)",
							boxShadow:
								"0 20px 40px rgba(0, 0, 0, 0.25), 0 0 0 2px var(--chakra-colors-primary-500)",
						},
						"&:hover .play-overlay": {
							opacity: 1,
						},
						"&:hover .gradient-overlay": {
							opacity: 0.7,
						},
						"&:hover .album-image": {
							transform: "scale(1.08)",
						},
					}}
				>
					<Image
						className="album-image"
						src={imageUrl}
						alt={album.name}
						width="100%"
						height="100%"
						objectFit="cover"
						css={{
							transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
						}}
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.style.display = "none";
							const fallback = target.nextElementSibling as HTMLElement;
							if (fallback) fallback.style.display = "flex";
						}}
					/>

					{/* Fallback placeholder */}
					<Box
						width="100%"
						height="100%"
						bg="linear-gradient(135deg, var(--chakra-colors-bg-muted) 0%, var(--chakra-colors-bg-subtle) 100%)"
						display="none"
						alignItems="center"
						justifyContent="center"
						position="absolute"
						top={0}
						left={0}
					>
						<Disc3
							size={48}
							style={{ color: "var(--chakra-colors-fg-muted)" }}
						/>
					</Box>

					{/* Gradient overlay for hover */}
					<Box
						className="gradient-overlay"
						position="absolute"
						inset={0}
						bg="linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
						opacity={0}
						css={{
							transition: "opacity 0.3s ease",
						}}
					/>

					{/* Play button overlay */}
					<Box
						className="play-overlay"
						position="absolute"
						inset={0}
						display="flex"
						alignItems="center"
						justifyContent="center"
						opacity={0}
						css={{
							transition: "opacity 0.3s ease",
						}}
					>
						<Box
							bg="primary.500"
							borderRadius="full"
							p={4}
							css={{
								boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
								animation: "pulse 2s infinite",
								"@keyframes pulse": {
									"0%, 100%": {
										transform: "scale(1)",
									},
									"50%": {
										transform: "scale(1.05)",
									},
								},
							}}
						>
							<Play size={28} fill="white" color="white" />
						</Box>
					</Box>

					{/* Year badge */}
					{year && (
						<Badge
							position="absolute"
							top={3}
							right={3}
							bg="rgba(0,0,0,0.7)"
							backdropFilter="blur(8px)"
							color="white"
							px={3}
							py={1}
							borderRadius="full"
							fontSize="xs"
							fontWeight="bold"
							letterSpacing="wide"
							css={{
								boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
							}}
						>
							{year}
						</Badge>
					)}

					{/* Playcount badge */}
					{album.playcount && album.playcount > 0 && (
						<Badge
							position="absolute"
							bottom={3}
							left={3}
							bg="primary.500"
							color="white"
							px={2}
							py={1}
							borderRadius="md"
							fontSize="2xs"
							fontWeight="semibold"
							css={{
								boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
							}}
						>
							{formatPlayCount(album.playcount)} plays
						</Badge>
					)}
				</Box>

				{/* Album Info */}
				<VStack align="start" pt={4} pb={2} gap={1}>
					<Text
						fontWeight="bold"
						fontSize="md"
						lineHeight="1.3"
						color="fg.default"
						css={{
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							transition: "color 0.2s ease",
							"&:hover": {
								color: "var(--chakra-colors-primary-500)",
							},
						}}
					>
						{album.name}
					</Text>
					<Text
						fontSize="sm"
						color="fg.muted"
						fontWeight="medium"
						css={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							width: "100%",
						}}
					>
						{album.artist}
					</Text>
				</VStack>
			</Card.Body>
		</Card.Root>
	);
}
