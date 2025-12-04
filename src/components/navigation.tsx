import { Link, useRouterState } from "@tanstack/react-router";

import { Box, Button, Container, HStack, Text } from "@chakra-ui/react";
import { Heart, Home, Music } from "lucide-react";

export function Navigation() {
	const router = useRouterState();
	const currentPath = router.location.pathname;

	const navItems = [
		{ to: "/", label: "Home", icon: Home },
		{ to: "/favorites", label: "Favorites", icon: Heart },
	];

	return (
		<Box
			as="nav"
			borderBottom="1px solid"
			borderColor="border.emphasized"
			bg="bg.surface"
			position="sticky"
			top={0}
			zIndex={100}
			css={{
				backdropFilter: "blur(10px)",
				bg: "bg.surface / 80",
			}}
		>
			<Container maxW="container.xl">
				<HStack justify="space-between" py={4} gap={6}>
					<Link to="/">
						<HStack gap={2} align="center">
							<Music size={24} />
							<Text fontWeight="bold" fontSize="lg">
								Track Snack
							</Text>
						</HStack>
					</Link>
					<HStack gap={2}>
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive =
								item.to === "/"
									? currentPath === "/"
									: currentPath.includes(item.to);
							return (
								<Link key={item.to} to={item.to}>
									<Button
										variant={isActive ? "solid" : "ghost"}
										colorPalette={isActive ? "primary" : "gray"}
										size="md"
									>
										<HStack gap={2}>
											<Icon size={18} />
											<Text>{item.label}</Text>
										</HStack>
									</Button>
								</Link>
							);
						})}
					</HStack>
				</HStack>
			</Container>
		</Box>
	);
}
