import { create } from "zustand";

interface BestPlayedState {
	searchQuery: string;
	currentPage: number;
	setSearchQuery: (query: string) => void;
	setCurrentPage: (page: number) => void;
	reset: () => void;
}

export const useBestPlayedStore = create<BestPlayedState>()((set) => ({
	searchQuery: "",
	currentPage: 1,

	setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

	setCurrentPage: (page) => set({ currentPage: page }),

	reset: () => set({ searchQuery: "", currentPage: 1 }),
}));
