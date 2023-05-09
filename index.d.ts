
export type TorrentProviderConfigInfo = {
	[key: string]: {
		description?: string;
		friendlyName: string;
		type: "number" | "string" | "boolean" | "password";
		default?: number | string | boolean;
		required?: boolean
	}
}

export type Resolution = "uhd" | "fhd" | "hd" | "low";

export interface MovieDetails {
	imdbId: number;
	title: string;
	resolution?: "uhd" | "fhd" | "hd" | "low";
	year: number;
}

export interface MovieTorrentInfo {
	id: string;
	size: number;
	resolution?: Resolution;
	torrentName: string;
	peers: number;
	year: number;
	_props: {
		[key: string]: any
	}
}

export interface MagnetTorrent {
	magnet: string;
}

export interface FileTorrent {
	file: Buffer;
}

export type Torrent = FileTorrent | MagnetTorrent;


export type ProviderConfig = {
	[key: string]: number | string | boolean;
}

export interface ProviderInfo {
	config: TorrentProviderConfigInfo;
	name: string;
	description?: string;
}

export abstract class TorrentProvider {
	public static requiredProperties: TorrentProviderConfigInfo;

	public abstract searchMovie(movie: MovieDetails): Promise<MovieTorrentInfo[]>;
	public abstract getTorrentFor(movie: MovieTorrentInfo): Promise<Torrent>;
	public abstract init(config: ProviderConfig): Promise<void>;
}
