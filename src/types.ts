/**
 * Coordinate type [latitude, longitude]
 */
export type Coordinate = [number, number];

/**
 * Region interface with full geographic data
 */
export interface Region {
  region_id: number;
  capital_city_id: number;
  code: string;
  name_ar: string;
  name_en: string;
  population: number;
  center?: [number, number];
  boundaries?: [number, number][][];
}

/**
 * Region interface without geographic data (lite version)
 */
export interface RegionLite {
  region_id: number;
  capital_city_id: number;
  code: string;
  name_ar: string;
  name_en: string;
  population: number;
}

/**
 * City interface with geographic data
 */
export interface City {
  city_id: number;
  region_id: number;
  name_ar: string;
  name_en: string;
  center?: [number, number];
}

/**
 * City interface without geographic data (lite version)
 */
export interface CityLite {
  city_id: number;
  region_id: number;
  name_ar: string;
  name_en: string;
}

/**
 * District interface with geographic data
 */
export interface District {
  district_id: number;
  city_id: number;
  region_id: number;
  name_ar: string;
  name_en: string;
  center?: [number, number];
}

/**
 * District interface without geographic data (lite version)
 */
export interface DistrictLite {
  district_id: number;
  city_id: number;
  region_id: number;
  name_ar: string;
  name_en: string;
}

/**
 * GeoJSON Feature interface
 */
export interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: any;
  };
}

/**
 * GeoJSON FeatureCollection interface
 */
export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

/**
 * Search options interface
 */
export interface SearchOptions {
  /** Search in Arabic names */
  searchInArabic?: boolean;
  /** Search in English names */
  searchInEnglish?: boolean;
  /** Case sensitive search */
  caseSensitive?: boolean;
  /** Exact match only */
  exactMatch?: boolean;
}

/**
 * Reverse geocoding result
 */
export interface ReverseGeocodeResult {
  region: Region | undefined;
  nearestCity: City | undefined;
  distance: number | undefined;
  coordinates: Coordinate;
}

/**
 * City with distance information
 */
export interface CityWithDistance {
  city: City;
  distance: number;
}
