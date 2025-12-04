import { createContext, type ReactNode, useContext } from "react";

import type { Dependencies } from "./types";

/**
 * Dependency Injection Context
 * Provides dependencies throughout the React component tree
 */
const DIContext = createContext<Dependencies | null>(null);

interface DIProviderProps {
	dependencies: Dependencies;
	children: ReactNode;
}

export function DIProvider({ dependencies, children }: DIProviderProps) {
	return (
		<DIContext.Provider value={dependencies}>{children}</DIContext.Provider>
	);
}

/**
 * Hook to access dependencies
 * @throws Error if used outside of DIProvider
 */
export function useDI(): Dependencies {
	const context = useContext(DIContext);

	if (!context) {
		throw new Error("useDI must be used within a DIProvider");
	}

	return context;
}

/**
 * Hook to access a specific dependency
 * Provides better tree-shaking and explicit dependency declaration
 */
export function useUseCase<K extends keyof Dependencies>(
	key: K,
): Dependencies[K] {
	const deps = useDI();
	return deps[key];
}
