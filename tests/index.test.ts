import {
  getAllRegions,
  getRegionById,
  getRegionByCode,
  searchRegions,
  getAllCities,
  getCityById,
  getCitiesByRegion,
  searchCities,
  getTotalPopulation,
  getRegionsByPopulation,
} from '../src/index';

describe('Library Main API', () => {
  describe('Regions', () => {
    it('should get all regions', () => {
      const regions = getAllRegions();

      expect(Array.isArray(regions)).toBe(true);
      expect(regions.length).toBe(13);
      expect(regions[0]).toHaveProperty('name_ar');
      expect(regions[0]).toHaveProperty('name_en');
      expect(regions[0]).toHaveProperty('code');
    });

    it('should get region by ID', () => {
      const region = getRegionById(1);

      expect(region).toBeDefined();
      expect(region?.region_id).toBe(1);
      expect(region?.name_en).toBe('Riyadh');
    });

    it('should return undefined for invalid region ID', () => {
      const region = getRegionById(999);

      expect(region).toBeUndefined();
    });

    it('should get region by code', () => {
      const region = getRegionByCode('RD');

      expect(region).toBeDefined();
      expect(region?.code).toBe('RD');
      expect(region?.name_en).toBe('Riyadh');
    });

    it('should search regions in English', () => {
      const results = searchRegions('Riy', { searchInEnglish: true, searchInArabic: false });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name_en).toContain('Riyadh');
    });

    it('should search regions in Arabic', () => {
      const results = searchRegions('الرياض', { searchInArabic: true, searchInEnglish: false });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name_ar).toContain('الرياض');
    });

    it('should search regions in both languages', () => {
      const results = searchRegions('مكة', { searchInArabic: true, searchInEnglish: true });

      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('Cities', () => {
    it('should get all cities', () => {
      const cities = getAllCities();

      expect(Array.isArray(cities)).toBe(true);
      expect(cities.length).toBeGreaterThan(100);
      expect(cities[0]).toHaveProperty('name_ar');
      expect(cities[0]).toHaveProperty('name_en');
      expect(cities[0]).toHaveProperty('region_id');
    });

    it('should get city by ID', () => {
      const city = getCityById(1);

      expect(city).toBeDefined();
      expect(city?.city_id).toBe(1);
    });

    it('should get cities by region ID', () => {
      const cities = getCitiesByRegion(1); // Riyadh region

      expect(cities.length).toBeGreaterThan(0);
      expect(cities.every((c: any) => c.region_id === 1)).toBe(true);
    });

    it('should search cities', () => {
      const results = searchCities('Al');

      expect(results.length).toBeGreaterThan(0);
    });

    it('should search cities case-insensitive', () => {
      const results1 = searchCities('RIYADH');
      const results2 = searchCities('riyadh');
      const results3 = searchCities('Riyadh');

      expect(results1.length).toBe(results2.length);
      expect(results2.length).toBe(results3.length);
    });
  });

  describe('Additional Features', () => {
    it('should get total population', () => {
      const total = getTotalPopulation();

      expect(total).toBeGreaterThan(0);
      expect(typeof total).toBe('number');
    });

    it('should get regions sorted by population', () => {
      const regions = getRegionsByPopulation();

      expect(regions.length).toBe(13);
      // Check descending order
      for (let i = 1; i < regions.length; i++) {
        expect(regions[i].population).toBeLessThanOrEqual(regions[i - 1].population);
      }
    });

    it('should get regions sorted by population ascending', () => {
      const regions = getRegionsByPopulation(true);

      expect(regions.length).toBe(13);
      // Check ascending order
      for (let i = 1; i < regions.length; i++) {
        expect(regions[i].population).toBeGreaterThanOrEqual(regions[i - 1].population);
      }
    });
  });

  describe('Data Integrity', () => {
    it('should have consistent region references', () => {
      const regions = getAllRegions();
      const cities = getAllCities();

      cities.forEach((city) => {
        const region = regions.find((r) => r.region_id === city.region_id);
        expect(region).toBeDefined();
      });
    });

    it('should have unique region IDs', () => {
      const regions = getAllRegions();
      const ids = regions.map((r) => r.region_id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique city IDs', () => {
      const cities = getAllCities();
      const ids = cities.map((c) => c.city_id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid coordinates for regions', () => {
      const regions = getAllRegions();

      regions.forEach((region) => {
        if (region.center) {
          expect(region.center[0]).toBeGreaterThan(15); // Min latitude
          expect(region.center[0]).toBeLessThan(33); // Max latitude
          expect(region.center[1]).toBeGreaterThan(34); // Min longitude
          expect(region.center[1]).toBeLessThan(57); // Max longitude
        }
      });
    });

    it('should have valid coordinates for cities', () => {
      const cities = getAllCities();

      cities.forEach((city) => {
        if (city.center) {
          expect(city.center[0]).toBeGreaterThan(15); // Min latitude
          expect(city.center[0]).toBeLessThan(33); // Max latitude
          expect(city.center[1]).toBeGreaterThan(34); // Min longitude
          expect(city.center[1]).toBeLessThan(57); // Max longitude
        }
      });
    });
  });

  describe('Performance', () => {
    it('should search cities efficiently', () => {
      const startTime = Date.now();
      searchCities('مدينة');
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(100); // Should complete in less than 100ms
    });

    it('should get cities by region efficiently', () => {
      const startTime = Date.now();
      getCitiesByRegion(1);
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(50);
    });
  });
});
