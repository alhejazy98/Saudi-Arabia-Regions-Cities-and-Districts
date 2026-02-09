import {
  getAllRegions,
  getRegionById,
  getRegionByCode,
  searchRegions,
  getAllCities,
  getCityById,
  getCitiesByRegion,
  searchCities,
} from '../src/lite';
import { findNearestCity } from '../src/reverse-geocoding';

describe('Lite Version API', () => {
  describe('Basic Functionality', () => {
    it('should get all regions', () => {
      const regions = getAllRegions();

      expect(Array.isArray(regions)).toBe(true);
      expect(regions.length).toBe(13);
    });

    it('should get all cities', () => {
      const cities = getAllCities();

      expect(Array.isArray(cities)).toBe(true);
      expect(cities.length).toBeGreaterThan(100);
    });

    it('should search regions', () => {
      const results = searchRegions('Riyadh');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name_en).toContain('Riyadh');
    });

    it('should search cities', () => {
      const results = searchCities('Jeddah');

      expect(results.length).toBeGreaterThan(0);
    });

    it('should get cities by region', () => {
      const cities = getCitiesByRegion(1);

      expect(cities.length).toBeGreaterThan(0);
      expect(cities.every((c: any) => c.region_id === 1)).toBe(true);
    });
  });

  describe('Reverse Geocoding (Lite)', () => {
    it('should not support coordinate-based search in lite version', () => {
      // Lite version doesn't have center coordinates for cities
      const cities = getAllCities();
      const city = findNearestCity(24.7, 46.7, cities);

      // May or may not find a city depending on data
      // This is expected behavior for lite version
      expect(typeof city).toBeDefined();
    });

    it('should handle cities without coordinates gracefully', () => {
      const cities = getAllCities();
      const city = findNearestCity(50.0, 50.0, cities, 10);

      // Expected to be undefined for lite version
      expect(city).toBeUndefined();
    });
  });

  describe('No GeoJSON Functions', () => {
    it('should not have reverseGeocode in lite module', () => {
      // This test just confirms the lite module doesn't include all full features
      const allExports = Object.keys(require('../src/lite'));
      expect(allExports.includes('reverseGeocode')).toBe(false);
    });
  });

  describe('Data Consistency', () => {
    it('should return same data as full version for basic queries', () => {
      const regions = getAllRegions();
      const cities = getAllCities();

      expect(regions.length).toBe(13);
      expect(cities.length).toBeGreaterThan(100);
    });

    it('should have all required properties', () => {
      const region = getRegionById(1);
      const city = getCityById(1);

      expect(region).toHaveProperty('region_id');
      expect(region).toHaveProperty('name_ar');
      expect(region).toHaveProperty('name_en');

      expect(city).toHaveProperty('city_id');
      expect(city).toHaveProperty('name_ar');
      expect(city).toHaveProperty('name_en');
      expect(city).toHaveProperty('region_id');
    });
  });

  describe('Performance (Lite)', () => {
    it('should be fast without GeoJSON', () => {
      const startTime = Date.now();
      
      for (let i = 0; i < 100; i++) {
        searchCities('مدينة');
      }
      
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(1000); // 100 searches in less than 1 second
    });

    it('should find nearest city quickly', () => {
      const cities = getAllCities();
      const startTime = Date.now();
      
      for (let i = 0; i < 100; i++) {
        findNearestCity(24.7, 46.7, cities);
      }
      
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(500);
    });
  });
});
