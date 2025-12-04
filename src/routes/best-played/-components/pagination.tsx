import { Button, HStack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const maxVisiblePages = 5;
	const displayedTotalPages = Math.min(totalPages, 10);

	const getPageNumbers = (): number[] => {
		if (displayedTotalPages <= maxVisiblePages) {
			return Array.from({ length: displayedTotalPages }, (_, i) => i + 1);
		}

		const half = Math.floor(maxVisiblePages / 2);
		let start = currentPage - half;
		let end = currentPage + half;

		if (start < 1) {
			start = 1;
			end = maxVisiblePages;
		}

		if (end > displayedTotalPages) {
			end = displayedTotalPages;
			start = displayedTotalPages - maxVisiblePages + 1;
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	const pageNumbers = getPageNumbers();

	return (
		<HStack gap={2} justify="center" flexWrap="wrap">
			<Button
				variant="ghost"
				size="sm"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<ChevronLeft size={18} />
				Previous
			</Button>

			{pageNumbers[0] > 1 && (
				<>
					<Button
						variant={currentPage === 1 ? "solid" : "ghost"}
						colorPalette={currentPage === 1 ? "primary" : "gray"}
						size="sm"
						onClick={() => onPageChange(1)}
					>
						1
					</Button>
					{pageNumbers[0] > 2 && (
						<Text color="fg.muted" px={1}>
							...
						</Text>
					)}
				</>
			)}

			{pageNumbers.map((page) => (
				<Button
					key={page}
					variant={currentPage === page ? "solid" : "ghost"}
					colorPalette={currentPage === page ? "primary" : "gray"}
					size="sm"
					onClick={() => onPageChange(page)}
				>
					{page}
				</Button>
			))}

			{pageNumbers[pageNumbers.length - 1] < displayedTotalPages && (
				<>
					{pageNumbers[pageNumbers.length - 1] < displayedTotalPages - 1 && (
						<Text color="fg.muted" px={1}>
							...
						</Text>
					)}
					<Button
						variant={currentPage === displayedTotalPages ? "solid" : "ghost"}
						colorPalette={
							currentPage === displayedTotalPages ? "primary" : "gray"
						}
						size="sm"
						onClick={() => onPageChange(displayedTotalPages)}
					>
						{displayedTotalPages}
					</Button>
				</>
			)}

			<Button
				variant="ghost"
				size="sm"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage >= displayedTotalPages}
			>
				Next
				<ChevronRight size={18} />
			</Button>
		</HStack>
	);
}
