export interface ConfigurationData {
    images: Images;
    change_keys: string[];
}

export interface Images {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
}

export type Countries = Country[]

export interface Country{
  iso_3166_1: string
  english_name: string
  native_name: string
}

export type Languages = Language[]

export interface Language {
  iso_639_1: string
  english_name: string
  name: string
}