import {
	ChakraProvider,
	createSystem,
	defaultConfig,
	defineConfig,
} from "@chakra-ui/react";

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

const config = defineConfig({
	theme: {
		// Typography - Music-focused font system
		tokens: {
			colors: {
				// Base color palette
				primary: {
					50: { value: "#f0f4ff" },
					100: { value: "#e0e9ff" },
					200: { value: "#c7d6ff" },
					300: { value: "#a4b8ff" },
					400: { value: "#8190ff" },
					500: { value: "#6366f1" }, // Indigo primary
					600: { value: "#4f46e5" },
					700: { value: "#4338ca" },
					800: { value: "#3730a3" },
					900: { value: "#312e81" },
					950: { value: "#1e1b4b" },
				},
				accent: {
					50: { value: "#fdf2f8" },
					100: { value: "#fce7f3" },
					200: { value: "#fbcfe8" },
					300: { value: "#f9a8d4" },
					400: { value: "#f472b6" },
					500: { value: "#ec4899" }, // Pink accent
					600: { value: "#db2777" },
					700: { value: "#be185d" },
					800: { value: "#9f1239" },
					900: { value: "#831843" },
					950: { value: "#500724" },
				},
				success: {
					50: { value: "#f0fdf4" },
					100: { value: "#dcfce7" },
					200: { value: "#bbf7d0" },
					300: { value: "#86efac" },
					400: { value: "#4ade80" },
					500: { value: "#22c55e" },
					600: { value: "#16a34a" },
					700: { value: "#15803d" },
					800: { value: "#166534" },
					900: { value: "#14532d" },
					950: { value: "#052e16" },
				},
				warning: {
					50: { value: "#fffbeb" },
					100: { value: "#fef3c7" },
					200: { value: "#fde68a" },
					300: { value: "#fcd34d" },
					400: { value: "#fbbf24" },
					500: { value: "#f59e0b" },
					600: { value: "#d97706" },
					700: { value: "#b45309" },
					800: { value: "#92400e" },
					900: { value: "#78350f" },
					950: { value: "#451a03" },
				},
				error: {
					50: { value: "#fef2f2" },
					100: { value: "#fee2e2" },
					200: { value: "#fecaca" },
					300: { value: "#fca5a5" },
					400: { value: "#f87171" },
					500: { value: "#ef4444" },
					600: { value: "#dc2626" },
					700: { value: "#b91c1c" },
					800: { value: "#991b1b" },
					900: { value: "#7f1d1d" },
					950: { value: "#450a0a" },
				},
			},
			fonts: {
				heading: {
					value:
						"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Display', system-ui, sans-serif",
				},
				body: {
					value:
						"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'SF Pro Text', system-ui, sans-serif",
				},
				mono: {
					value:
						"'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace",
				},
			},
			fontSizes: {
				xs: { value: "0.75rem" }, // 12px
				sm: { value: "0.875rem" }, // 14px
				md: { value: "1rem" }, // 16px
				lg: { value: "1.125rem" }, // 18px
				xl: { value: "1.25rem" }, // 20px
				"2xl": { value: "1.5rem" }, // 24px
				"3xl": { value: "1.875rem" }, // 30px
				"4xl": { value: "2.25rem" }, // 36px
				"5xl": { value: "3rem" }, // 48px
				"6xl": { value: "3.75rem" }, // 60px
				"7xl": { value: "4.5rem" }, // 72px
				"8xl": { value: "6rem" }, // 96px
				"9xl": { value: "8rem" }, // 128px
			},
			fontWeights: {
				thin: { value: "100" },
				extralight: { value: "200" },
				light: { value: "300" },
				normal: { value: "400" },
				medium: { value: "500" },
				semibold: { value: "600" },
				bold: { value: "700" },
				extrabold: { value: "800" },
				black: { value: "900" },
			},
			lineHeights: {
				none: { value: "1" },
				tight: { value: "1.25" },
				snug: { value: "1.375" },
				normal: { value: "1.5" },
				relaxed: { value: "1.625" },
				loose: { value: "2" },
			},
			letterSpacings: {
				tighter: { value: "-0.05em" },
				tight: { value: "-0.025em" },
				normal: { value: "0" },
				wide: { value: "0.025em" },
				wider: { value: "0.05em" },
				widest: { value: "0.1em" },
			},
			radii: {
				none: { value: "0" },
				sm: { value: "0.125rem" },
				md: { value: "0.375rem" },
				lg: { value: "0.5rem" },
				xl: { value: "0.75rem" },
				"2xl": { value: "1rem" },
				"3xl": { value: "1.5rem" },
				full: { value: "9999px" },
			},
			spacing: {
				0: { value: "0" },
				1: { value: "0.25rem" },
				2: { value: "0.5rem" },
				3: { value: "0.75rem" },
				4: { value: "1rem" },
				5: { value: "1.25rem" },
				6: { value: "1.5rem" },
				7: { value: "1.75rem" },
				8: { value: "2rem" },
				9: { value: "2.25rem" },
				10: { value: "2.5rem" },
				12: { value: "3rem" },
				14: { value: "3.5rem" },
				16: { value: "4rem" },
				20: { value: "5rem" },
				24: { value: "6rem" },
				28: { value: "7rem" },
				32: { value: "8rem" },
			},
		},
		// Semantic tokens for dark/light mode
		semanticTokens: {
			colors: {
				// Background colors
				bg: {
					value: {
						_light: "{colors.gray.50}",
						_dark: "{colors.gray.950}",
					},
				},
				"bg.subtle": {
					value: {
						_light: "{colors.white}",
						_dark: "{colors.gray.900}",
					},
				},
				"bg.muted": {
					value: {
						_light: "{colors.gray.100}",
						_dark: "{colors.gray.800}",
					},
				},
				"bg.emphasized": {
					value: {
						_light: "{colors.gray.200}",
						_dark: "{colors.gray.700}",
					},
				},
				// Foreground/text colors
				fg: {
					value: {
						_light: "{colors.gray.950}",
						_dark: "{colors.gray.50}",
					},
				},
				"fg.muted": {
					value: {
						_light: "{colors.gray.600}",
						_dark: "{colors.gray.400}",
					},
				},
				"fg.subtle": {
					value: {
						_light: "{colors.gray.500}",
						_dark: "{colors.gray.500}",
					},
				},
				"fg.disabled": {
					value: {
						_light: "{colors.gray.400}",
						_dark: "{colors.gray.600}",
					},
				},
				// Border colors
				border: {
					value: {
						_light: "{colors.gray.200}",
						_dark: "{colors.gray.800}",
					},
				},
				"border.emphasized": {
					value: {
						_light: "{colors.gray.300}",
						_dark: "{colors.gray.700}",
					},
				},
				// Brand colors
				brand: {
					value: {
						_light: "{colors.primary.600}",
						_dark: "{colors.primary.400}",
					},
				},
				"brand.emphasized": {
					value: {
						_light: "{colors.primary.700}",
						_dark: "{colors.primary.300}",
					},
				},
				"brand.muted": {
					value: {
						_light: "{colors.primary.50}",
						_dark: "{colors.primary.950}",
					},
				},
				// Accent colors
				accent: {
					value: {
						_light: "{colors.accent.600}",
						_dark: "{colors.accent.400}",
					},
				},
				// Status colors
				success: {
					value: {
						_light: "{colors.success.600}",
						_dark: "{colors.success.400}",
					},
				},
				warning: {
					value: {
						_light: "{colors.warning.600}",
						_dark: "{colors.warning.400}",
					},
				},
				error: {
					value: {
						_light: "{colors.error.600}",
						_dark: "{colors.error.400}",
					},
				},
			},
		},
		// Typography text styles
		textStyles: {
			// Display styles for hero sections
			display: {
				"2xl": {
					value: {
						fontSize: "{fontSizes.7xl}",
						fontWeight: "{fontWeights.bold}",
						lineHeight: "{lineHeights.tight}",
						letterSpacing: "{letterSpacings.tight}",
					},
				},
				xl: {
					value: {
						fontSize: "{fontSizes.6xl}",
						fontWeight: "{fontWeights.bold}",
						lineHeight: "{lineHeights.tight}",
						letterSpacing: "{letterSpacings.tight}",
					},
				},
				lg: {
					value: {
						fontSize: "{fontSizes.5xl}",
						fontWeight: "{fontWeights.bold}",
						lineHeight: "{lineHeights.tight}",
					},
				},
			},
			// Heading styles
			heading: {
				"2xl": {
					value: {
						fontSize: "{fontSizes.4xl}",
						fontWeight: "{fontWeights.bold}",
						lineHeight: "{lineHeights.tight}",
						letterSpacing: "{letterSpacings.tight}",
					},
				},
				xl: {
					value: {
						fontSize: "{fontSizes.3xl}",
						fontWeight: "{fontWeights.bold}",
						lineHeight: "{lineHeights.snug}",
					},
				},
				lg: {
					value: {
						fontSize: "{fontSizes.2xl}",
						fontWeight: "{fontWeights.semibold}",
						lineHeight: "{lineHeights.snug}",
					},
				},
				md: {
					value: {
						fontSize: "{fontSizes.xl}",
						fontWeight: "{fontWeights.semibold}",
						lineHeight: "{lineHeights.normal}",
					},
				},
				sm: {
					value: {
						fontSize: "{fontSizes.lg}",
						fontWeight: "{fontWeights.semibold}",
						lineHeight: "{lineHeights.normal}",
					},
				},
				xs: {
					value: {
						fontSize: "{fontSizes.md}",
						fontWeight: "{fontWeights.semibold}",
						lineHeight: "{lineHeights.normal}",
					},
				},
			},
			// Body text styles
			body: {
				xl: {
					value: {
						fontSize: "{fontSizes.xl}",
						fontWeight: "{fontWeights.normal}",
						lineHeight: "{lineHeights.relaxed}",
					},
				},
				lg: {
					value: {
						fontSize: "{fontSizes.lg}",
						fontWeight: "{fontWeights.normal}",
						lineHeight: "{lineHeights.relaxed}",
					},
				},
				md: {
					value: {
						fontSize: "{fontSizes.md}",
						fontWeight: "{fontWeights.normal}",
						lineHeight: "{lineHeights.normal}",
					},
				},
				sm: {
					value: {
						fontSize: "{fontSizes.sm}",
						fontWeight: "{fontWeights.normal}",
						lineHeight: "{lineHeights.normal}",
					},
				},
				xs: {
					value: {
						fontSize: "{fontSizes.xs}",
						fontWeight: "{fontWeights.normal}",
						lineHeight: "{lineHeights.normal}",
					},
				},
			},
			// Specialized styles for music app
			artist: {
				value: {
					fontSize: "{fontSizes.2xl}",
					fontWeight: "{fontWeights.bold}",
					lineHeight: "{lineHeights.tight}",
					letterSpacing: "{letterSpacings.tight}",
				},
			},
			album: {
				value: {
					fontSize: "{fontSizes.xl}",
					fontWeight: "{fontWeights.semibold}",
					lineHeight: "{lineHeights.snug}",
				},
			},
			track: {
				value: {
					fontSize: "{fontSizes.md}",
					fontWeight: "{fontWeights.medium}",
					lineHeight: "{lineHeights.normal}",
				},
			},
			metadata: {
				value: {
					fontSize: "{fontSizes.sm}",
					fontWeight: "{fontWeights.normal}",
					lineHeight: "{lineHeights.normal}",
					color: "{colors.fg.muted}",
				},
			},
			caption: {
				value: {
					fontSize: "{fontSizes.xs}",
					fontWeight: "{fontWeights.normal}",
					lineHeight: "{lineHeights.normal}",
					color: "{colors.fg.subtle}",
				},
			},
		},
		// Layer styles for common UI patterns
		layerStyles: {
			card: {
				value: {
					bg: "{colors.bg.subtle}",
					borderRadius: "{radii.xl}",
					borderWidth: "1px",
					borderColor: "{colors.border}",
					padding: "{spacing.6}",
					boxShadow:
						"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
				},
			},
			"card.hover": {
				value: {
					bg: "{colors.bg.subtle}",
					borderRadius: "{radii.xl}",
					borderWidth: "1px",
					borderColor: "{colors.border}",
					padding: "{spacing.6}",
					boxShadow:
						"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
					transition: "all 0.2s ease-in-out",
					cursor: "pointer",
				},
			},
			albumCard: {
				value: {
					bg: "{colors.bg.subtle}",
					borderRadius: "{radii.lg}",
					overflow: "hidden",
					borderWidth: "1px",
					borderColor: "{colors.border}",
					transition: "all 0.2s ease-in-out",
				},
			},
		},
		// Breakpoints
		breakpoints: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
	},
	// Global CSS
	globalCss: {
		"html, body": {
			margin: 0,
			padding: 0,
			fontFamily: "{fonts.body}",
			color: "{colors.fg}",
			backgroundColor: "{colors.bg}",
		},
		"*": {
			borderColor: "{colors.border}",
		},
	},
});

const system = createSystem(defaultConfig, config);

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={system}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
	);
}
