import { useState } from "react";

import { Link, useRouterState } from "@tanstack/react-router";

import {
	Box,
	Button,
	Container,
	HStack,
	IconButton,
	Text,
	VStack,
} from "@chakra-ui/react";
import { BarChart3, Heart, Home, Menu, Music, X } from "lucide-react";

const navItems = [
	{ to: "/", label: "Home", icon: Home },
	{ to: "/best-played", label: "Best Played", icon: BarChart3 },
	{ to: "/favorites", label: "Favorites", icon: Heart },
] as const;

export function Navigation() {
	const router = useRouterState();
	const currentPath = router.location.pathname;
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
	const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
					{/* Logo */}
					<Link to="/" onClick={closeMobileMenu}>
						<HStack gap={2} align="center">
							<Box
								p={1.5}
								borderRadius="lg"
								bg="primary.500"
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<Music size={20} color="white" />
							</Box>
							<Text fontWeight="bold" fontSize="lg">
								Track Snack
							</Text>
						</HStack>
					</Link>

					{/* Desktop Navigation */}
					<HStack gap={2} display={{ base: "none", md: "flex" }}>
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

					{/* Mobile Menu Button */}
					<IconButton
						aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
						display={{ base: "flex", md: "none" }}
						variant="ghost"
						size="md"
						onClick={toggleMobileMenu}
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</IconButton>
				</HStack>
			</Container>

			{/* Mobile Menu Dropdown */}
			<Box
				display={{ base: "block", md: "none" }}
				overflow="hidden"
				css={{
					maxHeight: isMobileMenuOpen ? "400px" : "0",
					opacity: isMobileMenuOpen ? 1 : 0,
					transition: "all 0.3s ease-in-out",
				}}
			>
				<Container maxW="container.xl" pb={4}>
					<VStack gap={2} align="stretch">
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive =
								item.to === "/"
									? currentPath === "/"
									: currentPath.includes(item.to);
							return (
								<Link key={item.to} to={item.to} onClick={closeMobileMenu}>
									<Button
										variant={isActive ? "solid" : "ghost"}
										colorPalette={isActive ? "primary" : "gray"}
										size="lg"
										width="100%"
										justifyContent="flex-start"
									>
										<HStack gap={3}>
											<Icon size={20} />
											<Text fontSize="md">{item.label}</Text>
										</HStack>
									</Button>
								</Link>
							);
						})}
					</VStack>
				</Container>
			</Box>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<Box
					position="fixed"
					inset={0}
					top="73px"
					bg="blackAlpha.500"
					zIndex={-1}
					onClick={closeMobileMenu}
					display={{ base: "block", md: "none" }}
					css={{
						animation: "fadeIn 0.2s ease-out",
						"@keyframes fadeIn": {
							from: { opacity: 0 },
							to: { opacity: 1 },
						},
					}}
				/>
			)}
		</Box>
	);
}
