import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useBestPlayedStore } from "@/stores/best-played-store";

describe("best-played-store", () => {
	beforeEach(() => {
		// Reset the store before each test
		act(() => {
			useBestPlayedStore.getState().reset();
		});
	});

	describe("initial state", () => {
		it("should have empty search query initially", () => {
			expect(useBestPlayedStore.getState().searchQuery).toBe("");
		});

		it("should have page 1 initially", () => {
			expect(useBestPlayedStore.getState().currentPage).toBe(1);
		});
	});

	describe("setSearchQuery", () => {
		it("should update the search query", () => {
			act(() => {
				useBestPlayedStore.getState().setSearchQuery("The Beatles");
			});

			expect(useBestPlayedStore.getState().searchQuery).toBe("The Beatles");
		});

		it("should reset page to 1 when search query changes", () => {
			act(() => {
				useBestPlayedStore.getState().setCurrentPage(5);
			});

			expect(useBestPlayedStore.getState().currentPage).toBe(5);

			act(() => {
				useBestPlayedStore.getState().setSearchQuery("New Artist");
			});

			expect(useBestPlayedStore.getState().currentPage).toBe(1);
		});

		it("should handle empty search query", () => {
			act(() => {
				useBestPlayedStore.getState().setSearchQuery("Test");
				useBestPlayedStore.getState().setSearchQuery("");
			});

			expect(useBestPlayedStore.getState().searchQuery).toBe("");
		});
	});

	describe("setCurrentPage", () => {
		it("should update the current page", () => {
			act(() => {
				useBestPlayedStore.getState().setCurrentPage(3);
			});

			expect(useBestPlayedStore.getState().currentPage).toBe(3);
		});

		it("should not affect search query when page changes", () => {
			act(() => {
				useBestPlayedStore.getState().setSearchQuery("Artist");
				useBestPlayedStore.getState().setCurrentPage(2);
			});

			expect(useBestPlayedStore.getState().searchQuery).toBe("Artist");
			expect(useBestPlayedStore.getState().currentPage).toBe(2);
		});
	});

	describe("reset", () => {
		it("should reset all state to initial values", () => {
			act(() => {
				useBestPlayedStore.getState().setSearchQuery("Test Artist");
				useBestPlayedStore.getState().setCurrentPage(5);
			});

			expect(useBestPlayedStore.getState().searchQuery).toBe("Test Artist");
			expect(useBestPlayedStore.getState().currentPage).toBe(5);

			act(() => {
				useBestPlayedStore.getState().reset();
			});

			expect(useBestPlayedStore.getState().searchQuery).toBe("");
			expect(useBestPlayedStore.getState().currentPage).toBe(1);
		});
	});
});
