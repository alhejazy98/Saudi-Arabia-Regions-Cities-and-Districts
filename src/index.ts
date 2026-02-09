import regionsData from '../json/regions.json';
import citiesData from '../json/cities.json';
import type {
  Region,
  City,
  SearchOptions,
  GeoJSONFeatureCollection,
} from './types';

// Import GeoJSON data (these imports will only work if building with the geojson files)
let regionsGeoJSON: GeoJSONFeatureCollection | null = null;
let citiesGeoJSON: GeoJSONFeatureCollection | null = null;
let districtsGeoJSON: GeoJSONFeatureCollection | null = null;

// Lazy load GeoJSON data
try {
  regionsGeoJSON = require('../geojson/regions.geojson');
  citiesGeoJSON = require('../geojson/cities.geojson');
  districtsGeoJSON = require('../geojson/districts.geojson');
} catch (e) {
  // GeoJSON files not available
}

const regions = regionsData as Region[];
const cities = citiesData as City[];

/**
 * Get all regions
 * @returns Array of all regions
 */
export function getAllRegions(): Region[] {
  return regions;
}

/**
 * Get all cities
 * @returns Array of all cities
 */
export function getAllCities(): City[] {
  return cities;
}

/**
 * Get region by ID
 * @param id - Region ID
 * @returns Region object or undefined
 */
export function getRegionById(id: number): Region | undefined {
  return regions.find((region) => region.region_id === id);
}

/**
 * Get city by ID
 * @param id - City ID
 * @returns City object or undefined
 */
export function getCityById(id: number): City | undefined {
  return cities.find((city) => city.city_id === id);
}

/**
 * Get region by code
 * @param code - Region code (e.g., 'RD', 'MQ')
 * @returns Region object or undefined
 */
export function getRegionByCode(code: string): Region | undefined {
  return regions.find((region) => region.code === code);
}

/**
 * Get cities by region ID
 * @param regionId - Region ID
 * @returns Array of cities in the region
 */
export function getCitiesByRegion(regionId: number): City[] {
  return cities.filter((city) => city.region_id === regionId);
}

/**
 * Search regions by name (Arabic or English)
 * @param query - Search query
 * @param options - Search options
 * @returns Array of matching regions
 */
export function searchRegions(
  query: string,
  options: SearchOptions = {}
): Region[] {
  const {
    searchInArabic = true,
    searchInEnglish = true,
    caseSensitive = false,
    exactMatch = false,
  } = options;

  const searchQuery = caseSensitive ? query : query.toLowerCase();

  return regions.filter((region) => {
    const nameAr = caseSensitive ? region.name_ar : region.name_ar.toLowerCase();
    const nameEn = caseSensitive ? region.name_en : region.name_en.toLowerCase();

    if (exactMatch) {
      return (
        (searchInArabic && nameAr === searchQuery) ||
        (searchInEnglish && nameEn === searchQuery)
      );
    }

    return (
      (searchInArabic && nameAr.includes(searchQuery)) ||
      (searchInEnglish && nameEn.includes(searchQuery))
    );
  });
}

/**
 * Search cities by name (Arabic or English)
 * @param query - Search query
 * @param options - Search options
 * @returns Array of matching cities
 */
export function searchCities(
  query: string,
  options: SearchOptions = {}
): City[] {
  const {
    searchInArabic = true,
    searchInEnglish = true,
    caseSensitive = false,
    exactMatch = false,
  } = options;

  const searchQuery = caseSensitive ? query : query.toLowerCase();

  return cities.filter((city) => {
    const nameAr = caseSensitive ? city.name_ar : city.name_ar.toLowerCase();
    const nameEn = caseSensitive ? city.name_en : city.name_en.toLowerCase();

    if (exactMatch) {
      return (
        (searchInArabic && nameAr === searchQuery) ||
        (searchInEnglish && nameEn === searchQuery)
      );
    }

    return (
      (searchInArabic && nameAr.includes(searchQuery)) ||
      (searchInEnglish && nameEn.includes(searchQuery))
    );
  });
}

/**
 * Get capital city of a region
 * @param regionId - Region ID
 * @returns Capital city object or undefined
 */
export function getCapitalCity(regionId: number): City | undefined {
  const region = getRegionById(regionId);
  if (!region) return undefined;
  return getCityById(region.capital_city_id);
}

/**
 * Get region of a city
 * @param cityId - City ID
 * @returns Region object or undefined
 */
export function getRegionOfCity(cityId: number): Region | undefined {
  const city = getCityById(cityId);
  if (!city) return undefined;
  return getRegionById(city.region_id);
}

/**
 * Get regions GeoJSON data
 * @returns GeoJSON FeatureCollection or null
 */
export function getRegionsGeoJSON(): GeoJSONFeatureCollection | null {
  return regionsGeoJSON;
}

/**
 * Get cities GeoJSON data
 * @returns GeoJSON FeatureCollection or null
 */
export function getCitiesGeoJSON(): GeoJSONFeatureCollection | null {
  return citiesGeoJSON;
}

/**
 * Get districts GeoJSON data
 * @returns GeoJSON FeatureCollection or null
 */
export function getDistrictsGeoJSON(): GeoJSONFeatureCollection | null {
  return districtsGeoJSON;
}

/**
 * Get total population of all regions
 * @returns Total population
 */
export function getTotalPopulation(): number {
  return regions.reduce((sum, region) => sum + region.population, 0);
}

/**
 * Get regions sorted by population
 * @param ascending - Sort in ascending order (default: false)
 * @returns Array of regions sorted by population
 */
export function getRegionsByPopulation(ascending: boolean = false): Region[] {
  const sorted = [...regions].sort((a, b) => b.population - a.population);
  return ascending ? sorted.reverse() : sorted;
}

// Export reverse geocoding functions
export {
  findRegionByCoordinates,
  findNearestCity,
  findCitiesInRadius,
  reverseGeocode,
  isWithinSaudiArabia,
  findClosestRegion,
  resetSpatialCache,
} from './reverse-geocoding';

// Export geometry utilities
export {
  calculateDistance,
  isPointInPolygon,
  isPointInBoundingBox,
  getItemsWithinRadius,
  type Coordinate,
  type BoundingBox,
} from './geo-utils';

// Export types
export * from './types';
