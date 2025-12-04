import { createFileRoute, useNavigate } from "@tanstack/react-router";

import {
	Box,
	Button,
	Container,
	Heading,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Music } from "lucide-react";

import { SearchBar } from "./search/-components/search-bar";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const navigate = useNavigate();

	const handleSearch = (query: string) => {
		if (query.trim()) {
			navigate({
				to: "/search",
				search: { q: query.trim() },
			});
		}
	};

	return (
		<Container maxW="container.xl" py={16}>
			<VStack gap={8} alignItems="center" textAlign="center">
				{/* Hero Section */}
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
						artist, album, or track to explore.
					</Text>
				</VStack>

				{/* Search Bar */}
				<Box width="100%" maxW="700px">
					<SearchBar
						onSearch={handleSearch}
						placeholder="Search for artists, albums, or tracks..."
					/>
				</Box>

				{/* Quick Search Suggestions */}
				<HStack gap={4} flexWrap="wrap" justify="center">
					<Text fontSize="sm" color="fg.muted">
						Try searching for:
					</Text>
					{["The Beatles", "Taylor Swift", "Radiohead", "Pink Floyd"].map(
						(artist) => (
							<Button
								key={artist}
								variant="ghost"
								size="sm"
								onClick={() => handleSearch(artist)}
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
