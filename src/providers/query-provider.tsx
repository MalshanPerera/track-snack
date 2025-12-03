import {
	defaultShouldDehydrateQuery,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

export function getContext() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn(queryKey) {
					return JSON.stringify(queryKey);
				},
				staleTime: 60 * 1000, // 1 minute
				refetchOnWindowFocus: false,
			},
			dehydrate: {
				serializeData(data) {
					return data;
				},
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
			hydrate: {
				deserializeData(data) {
					return data;
				},
			},
		},
	});

	return {
		queryClient,
	};
}

export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
