// Last.fm API response types

export interface PaginatedResponse<T> {
	data: T[];
	page: number;
	perPage: number;
	totalPages: number;
	total: number;
	hasNextPage: boolean;
}

export interface LastFmSearchAttr {
	"opensearch:Query": {
		"#text": string;
		role: string;
		searchTerms: string;
		startPage: string;
	};
	"opensearch:totalResults": string;
	"opensearch:startIndex": string;
	"opensearch:itemsPerPage": string;
}

export interface LastFmResponse<T> {
	results?: {
		albummatches?: {
			album: T[];
		};
		trackmatches?: {
			track: T[];
		};
		album?: T;
		track?: T[];
		"@attr"?: LastFmSearchAttr;
	} & Partial<LastFmSearchAttr>;
	album?: T;
	error?: number;
	message?: string;
}

export interface LastFmAlbumDto {
	name: string;
	artist: string;
	mbid?: string;
	url: string;
	image: LastFmImageDto[];
	listeners?: string;
	playcount?: string;
	tracks?: {
		track: LastFmTrackDto | LastFmTrackDto[];
	};
	wiki?: {
		published: string;
		summary: string;
		content: string;
	};
}

export interface LastFmTrackDto {
	name: string;
	artist:
		| {
				name: string;
				mbid?: string;
				url: string;
		  }
		| string;
	duration?: string;
	listeners?: string;
	playcount?: string;
	url: string;
	streamable?: {
		"#text": string;
		fulltrack: string;
	};
	image?: LastFmImageDto[];
	"@attr"?: {
		rank: string;
	};
}

export interface LastFmImageDto {
	"#text": string;
	size: "small" | "medium" | "large" | "extralarge" | "mega" | "";
}

export interface LastFmTopAlbumsResponse {
	topalbums: {
		album: LastFmTopAlbumDto[];
		"@attr": {
			artist: string;
			page: string;
			perPage: string;
			totalPages: string;
			total: string;
		};
	};
	error?: number;
	message?: string;
}

export interface LastFmTopAlbumDto {
	name: string;
	playcount: number;
	mbid?: string;
	url: string;
	artist: {
		name: string;
		mbid?: string;
		url: string;
	};
	image: LastFmImageDto[];
}

export interface LastFmChartTopTracksResponse {
	tracks: {
		track: LastFmTrackDto[];
		"@attr": {
			page: string;
			perPage: string;
			totalPages: string;
			total: string;
		};
	};
	error?: number;
	message?: string;
}

export interface LastFmArtistTopTracksDto {
	name: string;
	playcount: string;
	listeners: string;
	mbid?: string;
	url: string;
	streamable: string;
	artist: {
		name: string;
		mbid?: string;
		url: string;
	};
	image: LastFmImageDto[];
	"@attr": {
		rank: string;
	};
}

export interface LastFmArtistTopTracksResponse {
	toptracks: {
		track: LastFmArtistTopTracksDto[];
		"@attr": {
			artist: string;
			page: string;
			perPage: string;
			totalPages: string;
			total: string;
		};
	};
	error?: number;
	message?: string;
}

export interface LastFmTrackInfoResponse {
	track: {
		name: string;
		mbid?: string;
		url: string;
		duration: string;
		listeners: string;
		playcount: string;
		artist: {
			name: string;
			mbid?: string;
			url: string;
		};
		album?: {
			artist: string;
			title: string;
			mbid?: string;
			url: string;
			image: LastFmImageDto[];
		};
		toptags?: {
			tag: { name: string; url: string }[];
		};
	};
	error?: number;
	message?: string;
}
