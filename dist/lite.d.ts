import type { RegionLite, CityLite, DistrictLite, SearchOptions } from './types';
/**
 * Get all regions (lite version - without geographic data)
 * @returns Array of all regions
 */
export declare function getAllRegions(): RegionLite[];
/**
 * Get all cities (lite version - without geographic data)
 * @returns Array of all cities
 */
export declare function getAllCities(): CityLite[];
/**
 * Get all districts (lite version - without geographic data)
 * @returns Array of all districts
 */
export declare function getAllDistricts(): DistrictLite[];
/**
 * Get region by ID
 * @param id - Region ID
 * @returns Region object or undefined
 */
export declare function getRegionById(id: number): RegionLite | undefined;
/**
 * Get city by ID
 * @param id - City ID
 * @returns City object or undefined
 */
export declare function getCityById(id: number): CityLite | undefined;
/**
 * Get district by ID
 * @param id - District ID
 * @returns District object or undefined
 */
export declare function getDistrictById(id: number): DistrictLite | undefined;
/**
 * Get region by code
 * @param code - Region code (e.g., 'RD', 'MQ')
 * @returns Region object or undefined
 */
export declare function getRegionByCode(code: string): RegionLite | undefined;
/**
 * Get cities by region ID
 * @param regionId - Region ID
 * @returns Array of cities in the region
 */
export declare function getCitiesByRegion(regionId: number): CityLite[];
/**
 * Get districts by city ID
 * @param cityId - City ID
 * @returns Array of districts in the city
 */
export declare function getDistrictsByCity(cityId: number): DistrictLite[];
/**
 * Get districts by region ID
 * @param regionId - Region ID
 * @returns Array of districts in the region
 */
export declare function getDistrictsByRegion(regionId: number): DistrictLite[];
/**
 * Search regions by name (Arabic or English)
 * @param query - Search query
 * @param options - Search options
 * @returns Array of matching regions
 */
export declare function searchRegions(query: string, options?: SearchOptions): RegionLite[];
/**
 * Search cities by name (Arabic or English)
 * @param query - Search query
 * @param options - Search options
 * @returns Array of matching cities
 */
export declare function searchCities(query: string, options?: SearchOptions): CityLite[];
/**
 * Search districts by name (Arabic or English)
 * @param query - Search query
 * @param options - Search options
 * @returns Array of matching districts
 */
export declare function searchDistricts(query: string, options?: SearchOptions): DistrictLite[];
/**
 * Get capital city of a region
 * @param regionId - Region ID
 * @returns Capital city object or undefined
 */
export declare function getCapitalCity(regionId: number): CityLite | undefined;
/**
 * Get region of a city
 * @param cityId - City ID
 * @returns Region object or undefined
 */
export declare function getRegionOfCity(cityId: number): RegionLite | undefined;
/**
 * Get region of a district
 * @param districtId - District ID
 * @returns Region object or undefined
 */
export declare function getRegionOfDistrict(districtId: number): RegionLite | undefined;
/**
 * Get city of a district
 * @param districtId - District ID
 * @returns City object or undefined
 */
export declare function getCityOfDistrict(districtId: number): CityLite | undefined;
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
export declare function getRegionsByPopulation(ascending?: boolean): RegionLite[];
export { findNearestCity, findCitiesInRadius, isWithinSaudiArabia, resetSpatialCache, } from './reverse-geocoding';
export { calculateDistance, getItemsWithinRadius, type Coordinate, } from './geo-utils';
export * from './types';
