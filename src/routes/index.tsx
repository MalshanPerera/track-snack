import { type FormEvent, useState } from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import {
	Box,
	Button,
	Container,
	Heading,
	HStack,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Music, Search } from "lucide-react";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const navigate = useNavigate();
	const [artistQuery, setArtistQuery] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (artistQuery.trim()) {
			navigate({
				to: "/albums/$artist",
				params: { artist: encodeURIComponent(artistQuery.trim()) },
			});
		}
	};

	return (
		<Container maxW="container.lg" py={16}>
			<VStack gap={8} alignItems="center" textAlign="center">
				<VStack gap={4}>
					<Box
						css={{
							width: "80px",
							height: "80px",
							borderRadius: "full",
							bg: "primary.500",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							mb: 4,
						}}
					>
						<Music size={40} color="white" />
					</Box>
					<Heading
						size="3xl"
						css={{
							background:
								"linear-gradient(to right, var(--chakra-colors-primary-500), var(--chakra-colors-accent-500))",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
						}}
					>
						Track Snack
					</Heading>
					<Text fontSize="xl" color="fg.muted" maxW="600px">
						Discover albums and songs from your favorite artists. Search for an
						artist to explore their discography.
					</Text>
				</VStack>

				<Box as="form" onSubmit={handleSubmit} width="100%" maxW="600px">
					<Box position="relative">
						<Box
							position="absolute"
							left={3}
							top="50%"
							transform="translateY(-50%)"
							zIndex={1}
							pointerEvents="none"
							css={{
								color: "fg.muted",
							}}
						>
							<Search size={20} />
						</Box>
						<Input
							value={artistQuery}
							onChange={(e) => setArtistQuery(e.target.value)}
							placeholder="Search for an artist (e.g., The Beatles, Taylor Swift, Radiohead)"
							bg="bg.subtle"
							borderColor="border.emphasized"
							pl={10}
							size="lg"
							css={{
								_focus: {
									borderColor: "primary.500",
									boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
								},
							}}
						/>
					</Box>
					<HStack gap={2} mt={4}>
						<Button
							type="submit"
							size="lg"
							colorPalette="primary"
							flex={1}
							disabled={!artistQuery.trim()}
						>
							Search Albums
						</Button>
						<Button
							type="button"
							size="lg"
							variant="outline"
							onClick={() => navigate({ to: "/search", search: { q: "" } })}
						>
							Advanced Search
						</Button>
					</HStack>
				</Box>

				<HStack gap={4} mt={8} flexWrap="wrap" justify="center">
					<Text fontSize="sm" color="fg.muted">
						Try searching for:
					</Text>
					{["The Beatles", "Taylor Swift", "Radiohead", "Pink Floyd"].map(
						(artist) => (
							<Button
								key={artist}
								variant="ghost"
								size="sm"
								onClick={() => {
									setArtistQuery(artist);
									navigate({
										to: "/albums/$artist",
										params: { artist: encodeURIComponent(artist) },
									});
								}}
							>
								{artist}
							</Button>
						),
					)}
				</HStack>
			</VStack>
		</Container>
	);
}
