/**
 * Last.fm API Response Types
 * These are infrastructure-specific DTOs that match the Last.fm API format
 */

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
	};
	album?: T;
	error?: number;
	message?: string;
}

/**
 * Last.fm API Album DTO
 * Raw format from the API with "#text" and other API-specific structures
 */
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

/**
 * Last.fm API Track DTO
 */
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

/**
 * Last.fm API Image DTO
 */
export interface LastFmImageDto {
	"#text": string;
	size: "small" | "medium" | "large" | "extralarge" | "mega" | "";
}

/**
 * Last.fm API Top Albums Response
 * Response format for artist.gettopalbums endpoint
 */
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

/**
 * Last.fm API Top Album DTO
 * Format returned by artist.gettopalbums endpoint
 */
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
