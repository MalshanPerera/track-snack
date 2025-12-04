import { useCallback, useEffect, useRef } from "react";

import { Box, Text } from "@chakra-ui/react";

interface InfiniteScrollProps {
	children: React.ReactNode;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	onApproachEnd?: () => void;
	threshold?: number;
	rootMargin?: string;
}

export function InfiniteScroll({
	children,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	onApproachEnd,
	threshold = 0.1,
	rootMargin = "200px",
}: InfiniteScrollProps) {
	const sentinelRef = useRef<HTMLDivElement>(null);
	const prefetchSentinelRef = useRef<HTMLDivElement>(null);

	// Main intersection observer for fetching next page
	const handleIntersection = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
				fetchNextPage();
			}
		},
		[hasNextPage, isFetchingNextPage, fetchNextPage],
	);

	// Prefetch intersection observer - triggers earlier for smoother UX
	const handlePrefetchIntersection = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
				onApproachEnd?.();
			}
		},
		[hasNextPage, isFetchingNextPage, onApproachEnd],
	);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		const observer = new IntersectionObserver(handleIntersection, {
			threshold,
			rootMargin,
		});

		observer.observe(sentinel);

		return () => observer.disconnect();
	}, [handleIntersection, threshold, rootMargin]);

	// Prefetch observer with larger margin to trigger earlier
	useEffect(() => {
		if (!onApproachEnd) return;

		const prefetchSentinel = prefetchSentinelRef.current;
		if (!prefetchSentinel) return;

		const observer = new IntersectionObserver(handlePrefetchIntersection, {
			threshold: 0,
			rootMargin: "600px", // Trigger prefetch earlier
		});

		observer.observe(prefetchSentinel);

		return () => observer.disconnect();
	}, [handlePrefetchIntersection, onApproachEnd]);

	return (
		<Box display="flex" flexDirection="column" width="100%">
			{children}

			{/* Prefetch sentinel - positioned earlier in the scroll */}
			{onApproachEnd && hasNextPage && (
				<Box
					ref={prefetchSentinelRef}
					height="1px"
					aria-hidden="true"
					position="relative"
					css={{ marginTop: "-400px", pointerEvents: "none" }}
				/>
			)}

			{/* Main sentinel for triggering fetch */}
			<Box ref={sentinelRef} height="1px" aria-hidden="true" />

			{/* End of results indicator */}
			{!hasNextPage && !isFetchingNextPage && (
				<Box
					py={10}
					textAlign="center"
					width="100%"
					borderTop="1px solid"
					borderColor="border.muted"
					mt={8}
				>
					<Text color="fg.subtle" fontSize="sm">
						You've reached the end
					</Text>
				</Box>
			)}
		</Box>
	);
}
