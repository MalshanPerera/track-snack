import { Box, IconButton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";

import { useColorMode } from "@/components/ui/color-mode";

import styles from "./theme-toggle.module.css";

export function ThemeToggle() {
	const { toggleColorMode, colorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<IconButton
			className={styles.toggleButton}
			onClick={toggleColorMode}
			variant="ghost"
			aria-label="Toggle color mode"
			size="md"
			borderWidth="1px"
			borderColor="border"
			borderRadius="md"
			_hover={{
				bg: "bg.muted",
				borderColor: "primary.500",
			}}
		>
			<Box
				className={`${styles.sunIcon} ${isDark ? styles.sunIconHidden : styles.sunIconVisible}`}
			>
				<LuSun />
			</Box>
			<Box
				className={`${styles.moonIcon} ${isDark ? styles.moonIconVisible : styles.moonIconHidden}`}
			>
				<LuMoon />
			</Box>
		</IconButton>
	);
}
