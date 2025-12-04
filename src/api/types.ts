// Last.fm API response types

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
