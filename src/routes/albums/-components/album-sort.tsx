import { createListCollection, HStack, Select, Text } from "@chakra-ui/react";
import { ArrowUpDown } from "lucide-react";

import {
	type SortOption,
	SortOptions,
} from "@/domain/value-objects/sort-option";

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
			<HStack gap={1.5} align="center">
				<ArrowUpDown
					size={16}
					style={{ color: "var(--chakra-colors-fg-muted)" }}
				/>
				<Text
					fontSize="sm"
					color="fg.muted"
					whiteSpace="nowrap"
					fontWeight="medium"
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
				size="md"
				width="220px"
			>
				<Select.Trigger
					css={{
						bg: "bg.subtle",
						borderColor: "border.emphasized",
						_hover: {
							bg: "bg.muted",
							borderColor: "primary.500",
						},
						_focus: {
							borderColor: "primary.500",
							boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
						},
					}}
				>
					<Select.ValueText>
						{selectedItem?.label ?? "Select sort option"}
					</Select.ValueText>
					<Select.Indicator />
				</Select.Trigger>
				<Select.Content
					css={{
						bg: "bg.surface",
						borderColor: "border.emphasized",
						boxShadow: "lg",
					}}
				>
					{sortOptions.map((option) => (
						<Select.Item
							key={option.value}
							item={option}
							css={{
								_selected: {
									bg: "primary.500",
									color: "white",
								},
								_highlighted: {
									bg: "primary.100",
								},
							}}
						>
							<Select.ItemText>{option.label}</Select.ItemText>
							<Select.ItemIndicator />
						</Select.Item>
					))}
				</Select.Content>
			</Select.Root>
		</HStack>
	);
}
