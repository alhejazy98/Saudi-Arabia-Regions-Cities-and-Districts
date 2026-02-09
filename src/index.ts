import regionsData from '../json/regions.json';
import citiesData from '../json/cities.json';
// Districts removed to reduce bundle size - use lite version or load separately
import type {
  Region,
  City,
  District,
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
const districts: District[] = []; // Empty array - districts too large for CDN

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
 * Get all districts (not available in CDN version due to size)
 * Use lite version or npm package for districts
 * @returns Empty array in CDN version
 */
export function getAllDistricts(): District[] {
  console.warn('Districts not available in CDN full version (too large). Use npm package or lite version.');
  return districts;
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
 * Get district by ID
 * @param id - District ID
 * @returns District object or undefined
 */
export function getDistrictById(id: number): District | undefined {
  return districts.find((district) => district.district_id === id);
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
 * Get districts by city ID
 * @param cityId - City ID
 * @returns Array of districts in the city
 */
export function getDistrictsByCity(cityId: number): District[] {
  return districts.filter((district) => district.city_id === cityId);
}

/**
 * Get districts by region ID
 * @param regionId - Region ID
 * @returns Array of districts in the region
 */
export function getDistrictsByRegion(regionId: number): District[] {
  return districts.filter((district) => district.region_id === regionId);
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
 * Get cities by name (alias for searchCities for backward compatibility)
 * @param name - City name (Arabic or English)
 * @returns Array of matching cities
 */
export function getCitiesByName(name: string): City[] {
  return searchCities(name);
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

// Import reverse geocoding functions for wrapping
import {
  findRegionByCoordinates as _findRegionByCoordinates,
  findNearestCity as _findNearestCity,
  findCitiesInRadius as _findCitiesInRadius,
  reverseGeocode as _reverseGeocode,
  isWithinSaudiArabia as _isWithinSaudiArabia,
  findClosestRegion as _findClosestRegion,
  resetSpatialCache,
} from './reverse-geocoding';

/**
 * Find region by coordinates
 * @param lon - Longitude
 * @param lat - Latitude
 * @returns Region or undefined
 */
export function findRegionByCoordinates(lon: number, lat: number): Region | undefined {
  return _findRegionByCoordinates(lat, lon, regions);
}

/**
 * Find nearest city to coordinates
 * @param lon - Longitude
 * @param lat - Latitude
 * @param maxRadiusKm - Optional maximum search radius in kilometers
 * @returns Nearest city or undefined
 */
export function findNearestCity(lon: number, lat: number, maxRadiusKm?: number): City | undefined {
  return _findNearestCity(lat, lon, cities, maxRadiusKm);
}

/**
 * Find cities within radius
 * @param lon - Longitude
 * @param lat - Latitude
 * @param radiusKm - Radius in kilometers
 * @returns Array of cities with distances
 */
export function findCitiesInRadius(
  lon: number,
  lat: number,
  radiusKm: number
): Array<{ city: City; distance: number }> {
  return _findCitiesInRadius(lat, lon, cities, radiusKm);
}

/**
 * Find nearest cities to coordinates
 * @param lon - Longitude
 * @param lat - Latitude
 * @param count - Number of cities to return (default: 5)
 * @returns Array of nearest cities with distances
 */
export function findNearestCities(
  lon: number,
  lat: number,
  count: number = 5
): Array<{ city: City; distance: number }> {
  const allCities = _findCitiesInRadius(lat, lon, cities, 10000);
  return allCities.slice(0, count);
}

/**
 * Reverse geocode coordinates to location details
 * @param lon - Longitude
 * @param lat - Latitude
 * @returns Location details including region, nearest city, and distance
 */
export function reverseGeocode(lon: number, lat: number): {
  region: Region | undefined;
  nearestCity: City | undefined;
  distance: number | undefined;
  coordinates: [number, number];
} | null {
  const result = _reverseGeocode(lat, lon, regions, cities);
  if (!result.region && !result.nearestCity) {
    return null;
  }
  return result;
}

/**
 * Check if coordinates are within Saudi Arabia
 * @param lon - Longitude
 * @param lat - Latitude
 * @returns True if within Saudi Arabia bounds
 */
export function isWithinSaudiArabia(lon: number, lat: number): boolean {
  return _isWithinSaudiArabia(lat, lon);
}

/**
 * Find closest region to coordinates (even if outside boundaries)
 * @param lon - Longitude
 * @param lat - Latitude
 * @returns Closest region or undefined
 */
export function findClosestRegion(lon: number, lat: number): Region | undefined {
  return _findClosestRegion(lat, lon, regions);
}

// Export spatial cache reset
export { resetSpatialCache };

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
