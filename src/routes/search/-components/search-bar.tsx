import { type FormEvent, useState } from "react";

import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	defaultValue?: string;
	showClearButton?: boolean;
}

export function SearchBar({
	onSearch,
	placeholder = "Search albums or tracks...",
	defaultValue = "",
	showClearButton = true,
}: SearchBarProps) {
	const [query, setQuery] = useState(defaultValue);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	const handleClear = () => {
		setQuery("");
		onSearch("");
	};

	return (
		<Box as="form" onSubmit={handleSubmit} width="100%">
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
				<HStack gap={2}>
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={placeholder}
						bg="bg.subtle"
						borderColor="border.emphasized"
						pl={10}
						pr={query && showClearButton ? 10 : 3}
						size="lg"
						css={{
							_focus: {
								borderColor: "primary.500",
								boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
							},
						}}
					/>
					{query && showClearButton && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={handleClear}
							aria-label="Clear search"
							css={{
								minW: "auto",
								px: 2,
							}}
						>
							<X size={18} />
						</Button>
					)}
					<Button
						type="submit"
						colorPalette="primary"
						size="lg"
						disabled={!query.trim()}
					>
						Search
					</Button>
				</HStack>
			</Box>
		</Box>
	);
}
