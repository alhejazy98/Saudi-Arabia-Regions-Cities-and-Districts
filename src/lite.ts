import regionsData from '../json/regions_lite.json';
import citiesData from '../json/cities_lite.json';
import districtsData from '../json/districts_lite.json';
import type {
  RegionLite,
  CityLite,
  DistrictLite,
  SearchOptions,
} from './types';

const regions = regionsData as RegionLite[];
const cities = citiesData as CityLite[];
const districts = districtsData as DistrictLite[];

/**
 * Get all regions (lite version - without geographic data)
 * @returns Array of all regions
 */
export function getAllRegions(): RegionLite[] {
  return regions;
}

/**
 * Get all cities (lite version - without geographic data)
 * @returns Array of all cities
 */
export function getAllCities(): CityLite[] {
  return cities;
}

/**
 * Get all districts (lite version - without geographic data)
 * @returns Array of all districts
 */
export function getAllDistricts(): DistrictLite[] {
  return districts;
}

/**
 * Get region by ID
 * @param id - Region ID
 * @returns Region object or undefined
 */
export function getRegionById(id: number): RegionLite | undefined {
  return regions.find((region) => region.region_id === id);
}

/**
 * Get city by ID
 * @param id - City ID
 * @returns City object or undefined
 */
export function getCityById(id: number): CityLite | undefined {
  return cities.find((city) => city.city_id === id);
}

/**
 * Get district by ID
 * @param id - District ID
 * @returns District object or undefined
 */
export function getDistrictById(id: number): DistrictLite | undefined {
  return districts.find((district) => district.district_id === id);
}

/**
 * Get region by code
 * @param code - Region code (e.g., 'RD', 'MQ')
 * @returns Region object or undefined
 */
export function getRegionByCode(code: string): RegionLite | undefined {
  return regions.find((region) => region.code === code);
}

/**
 * Get cities by region ID
 * @param regionId - Region ID
 * @returns Array of cities in the region
 */
export function getCitiesByRegion(regionId: number): CityLite[] {
  return cities.filter((city) => city.region_id === regionId);
}

/**
 * Get districts by city ID
 * @param cityId - City ID
 * @returns Array of districts in the city
 */
export function getDistrictsByCity(cityId: number): DistrictLite[] {
  return districts.filter((district) => district.city_id === cityId);
}

/**
 * Get districts by region ID
 * @param regionId - Region ID
 * @returns Array of districts in the region
 */
export function getDistrictsByRegion(regionId: number): DistrictLite[] {
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
): RegionLite[] {
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
): CityLite[] {
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
export function getCitiesByName(name: string): CityLite[] {
  return searchCities(name);
}

/**
 * Search districts by name (Arabic or English)
 * @param query - Search query
 * @param options - Search options
 * @returns Array of matching districts
 */
export function searchDistricts(
  query: string,
  options: SearchOptions = {}
): DistrictLite[] {
  const {
    searchInArabic = true,
    searchInEnglish = true,
    caseSensitive = false,
    exactMatch = false,
  } = options;

  const searchQuery = caseSensitive ? query : query.toLowerCase();

  return districts.filter((district) => {
    const nameAr = caseSensitive ? district.name_ar : district.name_ar.toLowerCase();
    const nameEn = caseSensitive ? district.name_en : district.name_en.toLowerCase();

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
export function getCapitalCity(regionId: number): CityLite | undefined {
  const region = getRegionById(regionId);
  if (!region) return undefined;
  return getCityById(region.capital_city_id);
}

/**
 * Get region of a city
 * @param cityId - City ID
 * @returns Region object or undefined
 */
export function getRegionOfCity(cityId: number): RegionLite | undefined {
  const city = getCityById(cityId);
  if (!city) return undefined;
  return getRegionById(city.region_id);
}

/**
 * Get region of a district
 * @param districtId - District ID
 * @returns Region object or undefined
 */
export function getRegionOfDistrict(districtId: number): RegionLite | undefined {
  const district = getDistrictById(districtId);
  if (!district) return undefined;
  return getRegionById(district.region_id);
}

/**
 * Get city of a district
 * @param districtId - District ID
 * @returns City object or undefined
 */
export function getCityOfDistrict(districtId: number): CityLite | undefined {
  const district = getDistrictById(districtId);
  if (!district) return undefined;
  return getCityById(district.city_id);
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
export function getRegionsByPopulation(ascending: boolean = false): RegionLite[] {
  const sorted = [...regions].sort((a, b) => b.population - a.population);
  return ascending ? sorted.reverse() : sorted;
}

// Export reverse geocoding functions (lite - uses only center points)
export {
  findNearestCity,
  findCitiesInRadius,
  isWithinSaudiArabia,
  resetSpatialCache,
} from './reverse-geocoding';

// Export geometry utilities
export {
  calculateDistance,
  getItemsWithinRadius,
  type Coordinate,
} from './geo-utils';

// Export types
export * from './types';
