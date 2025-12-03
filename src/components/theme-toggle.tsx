import { Box, IconButton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";

import { useColorMode } from "@/components/ui/color-mode";

export function ThemeToggle() {
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<IconButton
			onClick={toggleColorMode}
			variant="ghost"
			aria-label="Toggle color mode"
			size="md"
			css={{
				position: "relative",
				transition: "all 0.3s ease",
				borderWidth: "1px",
				borderColor: "border",
				borderRadius: "md",
				_hover: {
					bg: "bg.muted",
					transform: "scale(1.1)",
					borderColor: "primary.500",
				},
				_active: {
					transform: "scale(0.95)",
				},
			}}
		>
			<Box
				css={{
					position: "absolute",
					transition: "opacity 0.3s ease, transform 0.3s ease",
					opacity: colorMode === "dark" ? 0 : 1,
					transform: colorMode === "dark" ? "rotate(90deg)" : "rotate(0deg)",
				}}
			>
				<LuSun />
			</Box>
			<Box
				css={{
					position: "absolute",
					transition: "opacity 0.3s ease, transform 0.3s ease",
					opacity: colorMode === "dark" ? 1 : 0,
					transform: colorMode === "dark" ? "rotate(0deg)" : "rotate(-90deg)",
				}}
			>
				<LuMoon />
			</Box>
		</IconButton>
	);
}
