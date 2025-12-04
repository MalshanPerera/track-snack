import { Badge, Box, Card, Image, Text, VStack } from "@chakra-ui/react";

import type { Album } from "@/domain/entities/album";
import { getAlbumImage } from "@/lib/utils";

interface AlbumCardProps {
	album: Album;
	onClick?: () => void;
}

export function AlbumCard({ album, onClick }: AlbumCardProps) {
	const imageUrl = getAlbumImage(album.images);

	// Extract year from wiki.published date
	const year = album.wiki?.published
		? new Date(album.wiki.published).getFullYear()
		: null;

	return (
		<Card.Root
			cursor="pointer"
			onClick={onClick}
			layerStyle="albumCard"
			css={{
				_hover: {
					transform: "translateY(-4px)",
					boxShadow:
						"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
					borderColor: "primary.500",
				},
				transition: "all 0.2s ease-in-out",
			}}
		>
			<Card.Body p={0}>
				<Box position="relative" width="100%" aspectRatio="1">
					<Image
						src={imageUrl}
						alt={album.name}
						width="100%"
						height="100%"
						objectFit="cover"
						css={{
							width: "100%",
							height: "100%",
						}}
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.style.display = "none";
							const fallback = target.nextElementSibling as HTMLElement;
							if (fallback) fallback.style.display = "flex";
						}}
					/>
					<Box
						width="100%"
						height="100%"
						bg="bg.muted"
						display="none"
						alignItems="center"
						justifyContent="center"
						position="absolute"
						top={0}
						left={0}
					>
						<Text color="fg.muted" fontSize="sm">
							No Image
						</Text>
					</Box>
					{year && (
						<Badge
							position="absolute"
							top={2}
							right={2}
							colorPalette="primary"
							variant="solid"
							fontSize="xs"
							fontWeight="semibold"
						>
							{year}
						</Badge>
					)}
				</Box>
				<VStack align="start" p={4} gap={1}>
					<Text
						fontWeight="semibold"
						fontSize="md"
						lineHeight="1.4"
						css={{
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{album.name}
					</Text>
					<Text
						fontSize="sm"
						color="fg.muted"
						css={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{album.artist}
					</Text>
				</VStack>
			</Card.Body>
		</Card.Root>
	);
}
