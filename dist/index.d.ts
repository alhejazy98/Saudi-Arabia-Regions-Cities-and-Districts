import type { Region, City, SearchOptions, GeoJSONFeatureCollection } from './types';
/**
 * Get all regions
 * @returns Array of all regions
 */
export declare function getAllRegions(): Region[];
/**
 * Get all cities
 * @returns Array of all cities
 */
export declare function getAllCities(): City[];
/**
 * Get region by ID
 * @param id - Region ID
 * @returns Region object or undefined
 */
export declare function getRegionById(id: number): Region | undefined;
/**
 * Get city by ID
 * @param id - City ID
 * @returns City object or undefined
 */
export declare function getCityById(id: number): City | undefined;
/**
 * Get region by code
 * @param code - Region code (e.g., 'RD', 'MQ')
 * @returns Region object or undefined
 */
export declare function getRegionByCode(code: string): Region | undefined;
/**
 * Get cities by region ID
 * @param regionId - Region ID
 * @returns Array of cities in the region
 */
export declare function getCitiesByRegion(regionId: number): City[];
/**
 * Search regions by name (Arabic or English)
 * @param query - Search query
 * @param options - Search options
 * @returns Array of matching regions
 */
export declare function searchRegions(query: string, options?: SearchOptions): Region[];
/**
 * Search cities by name (Arabic or English)
 * @param query - Search query
 * @param options - Search options
 * @returns Array of matching cities
 */
export declare function searchCities(query: string, options?: SearchOptions): City[];
/**
 * Get capital city of a region
 * @param regionId - Region ID
 * @returns Capital city object or undefined
 */
export declare function getCapitalCity(regionId: number): City | undefined;
/**
 * Get region of a city
 * @param cityId - City ID
 * @returns Region object or undefined
 */
export declare function getRegionOfCity(cityId: number): Region | undefined;
/**
 * Get regions GeoJSON data
 * @returns GeoJSON FeatureCollection or null
 */
export declare function getRegionsGeoJSON(): GeoJSONFeatureCollection | null;
/**
 * Get cities GeoJSON data
 * @returns GeoJSON FeatureCollection or null
 */
export declare function getCitiesGeoJSON(): GeoJSONFeatureCollection | null;
/**
 * Get districts GeoJSON data
 * @returns GeoJSON FeatureCollection or null
 */
export declare function getDistrictsGeoJSON(): GeoJSONFeatureCollection | null;
/**
 * Get total population of all regions
 * @returns Total population
 */
export declare function getTotalPopulation(): number;
/**
 * Get regions sorted by population
 * @param ascending - Sort in ascending order (default: false)
 * @returns Array of regions sorted by population
 */
export declare function getRegionsByPopulation(ascending?: boolean): Region[];
export { findRegionByCoordinates, findNearestCity, findCitiesInRadius, reverseGeocode, isWithinSaudiArabia, findClosestRegion, resetSpatialCache, } from './reverse-geocoding';
export { calculateDistance, isPointInPolygon, isPointInBoundingBox, getItemsWithinRadius, type Coordinate, type BoundingBox, } from './geo-utils';
export * from './types';
