import type { QueryClient } from "@tanstack/react-query";

import { Provider as QueryProvider } from "./query-provider";

interface RootProviderProps {
	children: React.ReactNode;
	queryClient: QueryClient;
}

export function RootProvider({ children, queryClient }: RootProviderProps) {
	return <QueryProvider queryClient={queryClient}>{children}</QueryProvider>;
}
