export interface PaginatedResponse<T> {
	data: T[];
	page: number;
	perPage: number;
	totalPages: number;
	total: number;
	hasNextPage: boolean;
}
