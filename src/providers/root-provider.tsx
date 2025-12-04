import type { QueryClient } from "@tanstack/react-query";

import { createContainer, DIProvider } from "@/di";

import { Provider as QueryProvider } from "./query-provider";

interface RootProviderProps {
	children: React.ReactNode;
	queryClient: QueryClient;
}

// Create dependencies once at app initialization
const dependencies = createContainer();

export function RootProvider({ children, queryClient }: RootProviderProps) {
	return (
		<DIProvider dependencies={dependencies}>
			<QueryProvider queryClient={queryClient}>{children}</QueryProvider>
		</DIProvider>
	);
}
