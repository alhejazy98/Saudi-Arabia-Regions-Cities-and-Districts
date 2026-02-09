import {
  findRegionByCoordinates,
  findNearestCity,
  findCitiesInRadius,
  reverseGeocode,
  isWithinSaudiArabia,
  findClosestRegion,
  resetSpatialCache,
} from '../src/reverse-geocoding';
import type { Region, City, Coordinate } from '../src/types';

describe('Reverse Geocoding', () => {
  // Mock data
  const mockRegions: Region[] = [
    {
      region_id: 1,
      capital_city_id: 1,
      code: 'RD',
      name_ar: 'منطقة الرياض',
      name_en: 'Riyadh',
      population: 6777146,
      center: [24.7, 46.7],
      boundaries: [
        [
          [23.0, 45.0],
          [23.0, 48.0],
          [26.0, 48.0],
          [26.0, 45.0],
          [23.0, 45.0],
        ],
      ],
    },
    {
      region_id: 2,
      capital_city_id: 2,
      code: 'MQ',
      name_ar: 'منطقة مكة المكرمة',
      name_en: 'Makkah',
      population: 6915006,
      center: [21.5, 39.2],
      boundaries: [
        [
          [19.0, 38.0],
          [19.0, 42.0],
          [23.0, 42.0],
          [23.0, 38.0],
          [19.0, 38.0],
        ],
      ],
    },
  ];

  const mockCities: City[] = [
    {
      city_id: 1,
      region_id: 1,
      name_ar: 'الرياض',
      name_en: 'Riyadh',
      center: [24.7136, 46.6753],
    },
    {
      city_id: 2,
      region_id: 2,
      name_ar: 'جدة',
      name_en: 'Jeddah',
      center: [21.5433, 39.1728],
    },
    {
      city_id: 3,
      region_id: 1,
      name_ar: 'الخرج',
      name_en: 'Al Kharj',
      center: [24.15, 47.3],
    },
  ];

  beforeEach(() => {
    resetSpatialCache();
  });

  describe('findRegionByCoordinates', () => {
    it('should find region by coordinates', () => {
      const region = findRegionByCoordinates(24.7, 46.7, mockRegions);

      expect(region).toBeDefined();
      expect(region?.code).toBe('RD');
      expect(region?.name_en).toBe('Riyadh');
    });

    it('should return undefined for coordinates outside regions', () => {
      const region = findRegionByCoordinates(50.0, 50.0, mockRegions);

      expect(region).toBeUndefined();
    });

    it('should find Makkah region by coordinates', () => {
      const region = findRegionByCoordinates(21.5, 39.2, mockRegions);

      expect(region).toBeDefined();
      expect(region?.code).toBe('MQ');
      expect(region?.name_en).toBe('Makkah');
    });

    it('should handle regions without boundaries', () => {
      const regionsWithoutBoundaries: Region[] = [
        {
          ...mockRegions[0],
          boundaries: undefined,
        },
      ];

      const region = findRegionByCoordinates(24.7, 46.7, regionsWithoutBoundaries);

      expect(region).toBeUndefined();
    });
  });

  describe('findNearestCity', () => {
    it('should find nearest city', () => {
      const city = findNearestCity(24.7, 46.7, mockCities);

      expect(city).toBeDefined();
      expect(city?.name_en).toBe('Riyadh');
    });

    it('should find nearest city with max radius', () => {
      const city = findNearestCity(24.7, 46.7, mockCities, 100);

      expect(city).toBeDefined();
      expect(city?.name_en).toBe('Riyadh');
    });

    it('should return undefined if no cities within max radius', () => {
      const city = findNearestCity(50.0, 50.0, mockCities, 10);

      expect(city).toBeUndefined();
    });

    it('should find Jeddah when closer to it', () => {
      const city = findNearestCity(21.5, 39.2, mockCities);

      expect(city).toBeDefined();
      expect(city?.name_en).toBe('Jeddah');
    });

    it('should handle empty cities array', () => {
      const city = findNearestCity(24.7, 46.7, []);

      expect(city).toBeUndefined();
    });
  });

  describe('findCitiesInRadius', () => {
    it('should find cities within radius', () => {
      const results = findCitiesInRadius(24.7, 46.7, mockCities, 100);

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].city.name_en).toBe('Riyadh');
      expect(results[0].distance).toBeLessThan(100);
    });

    it('should sort results by distance', () => {
      const results = findCitiesInRadius(24.5, 47.0, mockCities, 200);

      for (let i = 1; i < results.length; i++) {
        expect(results[i].distance).toBeGreaterThanOrEqual(results[i - 1].distance);
      }
    });

    it('should return empty array if no cities in radius', () => {
      const results = findCitiesInRadius(50.0, 50.0, mockCities, 10);

      expect(results.length).toBe(0);
    });

    it('should find multiple cities in large radius', () => {
      const results = findCitiesInRadius(24.0, 46.0, mockCities, 500);

      expect(results.length).toBeGreaterThan(1);
    });

    it('should skip cities without center', () => {
      const citiesWithoutCenter: City[] = [
        { ...mockCities[0], center: undefined },
        mockCities[1],
      ];

      const results = findCitiesInRadius(21.5, 39.2, citiesWithoutCenter, 100);

      expect(results.length).toBe(1);
      expect(results[0].city.name_en).toBe('Jeddah');
    });
  });

  describe('reverseGeocode', () => {
    it('should get full location details', () => {
      const result = reverseGeocode(24.7, 46.7, mockRegions, mockCities);

      expect(result.region).toBeDefined();
      expect(result.region?.code).toBe('RD');
      expect(result.nearestCity).toBeDefined();
      expect(result.nearestCity?.name_en).toBe('Riyadh');
      expect(result.distance).toBeDefined();
      expect(result.distance).toBeLessThan(10);
      expect(result.coordinates).toEqual([24.7, 46.7]);
    });

    it('should handle location outside all regions', () => {
      const result = reverseGeocode(50.0, 50.0, mockRegions, mockCities);

      expect(result.region).toBeUndefined();
      expect(result.nearestCity).toBeDefined(); // Still finds nearest city
    });

    it('should work with Jeddah coordinates', () => {
      const result = reverseGeocode(21.5433, 39.1728, mockRegions, mockCities);

      expect(result.region?.code).toBe('MQ');
      expect(result.nearestCity?.name_en).toBe('Jeddah');
      expect(result.distance).toBeLessThan(1); // Very close to Jeddah center
    });
  });

  describe('isWithinSaudiArabia', () => {
    it('should return true for Riyadh coordinates', () => {
      expect(isWithinSaudiArabia(24.7, 46.7)).toBe(true);
    });

    it('should return true for Jeddah coordinates', () => {
      expect(isWithinSaudiArabia(21.5, 39.2)).toBe(true);
    });

    it('should return false for coordinates outside Saudi Arabia', () => {
      expect(isWithinSaudiArabia(50.0, 50.0)).toBe(false);
      expect(isWithinSaudiArabia(0.0, 0.0)).toBe(false);
      expect(isWithinSaudiArabia(10.0, 40.0)).toBe(false);
    });

    it('should return true for coordinates on borders', () => {
      expect(isWithinSaudiArabia(16.0, 40.0)).toBe(true);
      expect(isWithinSaudiArabia(32.5, 40.0)).toBe(true);
      expect(isWithinSaudiArabia(25.0, 34.5)).toBe(true);
      expect(isWithinSaudiArabia(25.0, 56.0)).toBe(true);
    });
  });

  describe('findClosestRegion', () => {
    it('should find exact match first', () => {
      const region = findClosestRegion(24.7, 46.7, mockRegions);

      expect(region).toBeDefined();
      expect(region?.code).toBe('RD');
    });

    it('should find nearest region when outside boundaries', () => {
      const region = findClosestRegion(50.0, 50.0, mockRegions);

      expect(region).toBeDefined();
      // Should find one of the regions
      expect(['RD', 'MQ']).toContain(region?.code);
    });

    it('should handle empty regions array', () => {
      const region = findClosestRegion(24.7, 46.7, []);

      expect(region).toBeUndefined();
    });
  });

  describe('resetSpatialCache', () => {
    it('should reset cache without errors', () => {
      // Build cache
      findNearestCity(24.7, 46.7, mockCities);
      findRegionByCoordinates(24.7, 46.7, mockRegions);

      // Reset
      expect(() => resetSpatialCache()).not.toThrow();

      // Should still work after reset
      const city = findNearestCity(24.7, 46.7, mockCities);
      expect(city).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('should handle large number of cities efficiently', () => {
      const largeCityArray: City[] = [];
      for (let i = 0; i < 1000; i++) {
        largeCityArray.push({
          city_id: i,
          region_id: 1,
          name_ar: `مدينة ${i}`,
          name_en: `City ${i}`,
          center: [20 + Math.random() * 10, 35 + Math.random() * 10],
        });
      }

      const startTime = Date.now();
      const city = findNearestCity(24.7, 46.7, largeCityArray);
      const endTime = Date.now();

      expect(city).toBeDefined();
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in less than 1 second
    });

    it('should cache spatial index for repeated queries', () => {
      const startTime1 = Date.now();
      findNearestCity(24.7, 46.7, mockCities);
      const time1 = Date.now() - startTime1;

      const startTime2 = Date.now();
      findNearestCity(24.8, 46.8, mockCities);
      const time2 = Date.now() - startTime2;

      // Second query should be faster or equal (due to caching)
      expect(time2).toBeLessThanOrEqual(time1 + 10);
    });
  });
});
