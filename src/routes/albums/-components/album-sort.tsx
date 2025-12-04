import { createListCollection, HStack, Select, Text } from "@chakra-ui/react";
import { ArrowUpDown, Check } from "lucide-react";

import type { SortOption } from "@/types";
import { SortOptions } from "@/types";

import styles from "./album-sort.module.css";

interface AlbumSortProps {
	value: SortOption;
	onChange: (value: SortOption) => void;
}

const sortOptions = [
	{ value: SortOptions.NAME_ASC, label: "Name (A-Z)" },
	{ value: SortOptions.NAME_DESC, label: "Name (Z-A)" },
	{ value: SortOptions.YEAR_ASC, label: "Year (Oldest)" },
	{ value: SortOptions.YEAR_DESC, label: "Year (Newest)" },
] as const;

const collection = createListCollection({
	items: sortOptions,
	itemToString: (item) => item?.label ?? "",
	itemToValue: (item) => item?.value ?? "",
});

export function AlbumSort({ value, onChange }: AlbumSortProps) {
	const selectedItem = sortOptions.find((option) => option.value === value);

	return (
		<HStack gap={3} align="center">
			<HStack gap={2} align="center">
				<ArrowUpDown size={16} color="var(--chakra-colors-primary-400)" />
				<Text
					fontSize="sm"
					color="fg.muted"
					whiteSpace="nowrap"
					fontWeight="semibold"
				>
					Sort by:
				</Text>
			</HStack>
			<Select.Root
				collection={collection}
				value={value ? [value] : []}
				onValueChange={(e) => {
					const selectedValue = e.value[0] as SortOption;
					if (selectedValue) {
						onChange(selectedValue);
					}
				}}
				size="sm"
				width="180px"
			>
				<Select.Trigger
					className={styles.selectTrigger}
					borderRadius="lg"
					bg="bg.subtle"
					border="1px solid"
					borderColor="border.muted"
					_hover={{ bg: "bg.muted", borderColor: "primary.400" }}
					_focus={{ borderColor: "primary.500", boxShadow: "0 0 0 2px var(--chakra-colors-primary-500 / 20%)", outline: "none" }}
					_expanded={{ borderColor: "primary.500", bg: "bg.muted" }}
				>
					<Select.ValueText fontWeight="medium">
						{selectedItem?.label ?? "Select"}
					</Select.ValueText>
					<Select.Indicator />
				</Select.Trigger>
				<Select.Positioner>
					<Select.Content
						className={styles.selectContent}
						borderRadius="lg"
						bg="bg.subtle"
						border="1px solid"
						borderColor="border.muted"
						boxShadow="0 10px 40px -10px rgba(0, 0, 0, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.1)"
					>
						{sortOptions.map((option) => (
							<Select.Item
								key={option.value}
								item={option}
								className={styles.selectItem}
								borderRadius="md"
								_highlighted={{ bg: "bg.muted" }}
								_selected={{ bg: "primary.500", color: "white", _highlighted: { bg: "primary.600" } }}
							>
								<Select.ItemText>{option.label}</Select.ItemText>
								<Select.ItemIndicator>
									<Check size={14} />
								</Select.ItemIndicator>
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Select.Root>
		</HStack>
	);
}
