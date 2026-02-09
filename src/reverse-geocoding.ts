/**
 * Reverse Geocoding functions
 * وظائف البحث العكسي الجغرافي
 */

import type { Region, City, Coordinate } from './types';
import {
  isPointInPolygon,
  isPointInBoundingBox,
  createBoundingBox,
  findNearestPoint,
  calculateDistance,
  getItemsWithinRadius,
  SpatialIndex,
  BoundingBox,
} from './geo-utils';

// Cache for bounding boxes
const boundingBoxCache = new Map<number, BoundingBox>();

// Spatial index for cities (initialized on first use)
let citySpatialIndex: SpatialIndex<City> | null = null;

/**
 * Find region by coordinates (lat, lon)
 * إيجاد المنطقة بناءً على الإحداثيات
 * 
 * @param lat Latitude (خط العرض)
 * @param lon Longitude (خط الطول)
 * @param regions Array of regions
 * @returns Region or undefined
 * 
 * @example
 * const region = findRegionByCoordinates(24.7, 46.7, regions);
 * console.log(region?.name_ar); // "منطقة الرياض"
 */
export function findRegionByCoordinates(
  lat: number,
  lon: number,
  regions: Region[]
): Region | undefined {
  const point: Coordinate = [lat, lon];

  for (const region of regions) {
    if (!region.boundaries) continue;

    // Quick check: bounding box
    let bbox = boundingBoxCache.get(region.region_id);
    if (!bbox) {
      bbox = createBoundingBox(region.boundaries);
      boundingBoxCache.set(region.region_id, bbox);
    }

    if (!isPointInBoundingBox(point, bbox)) continue;

    // Detailed check: point in polygon
    if (isPointInPolygon(point, region.boundaries)) {
      return region;
    }
  }

  return undefined;
}

/**
 * Find the nearest city to coordinates
 * إيجاد أقرب مدينة إلى الإحداثيات
 * 
 * @param lat Latitude
 * @param lon Longitude
 * @param cities Array of cities
 * @param maxRadiusKm Optional maximum search radius in kilometers
 * @returns Nearest city or undefined
 * 
 * @example
 * const city = findNearestCity(24.7, 46.7, cities);
 * console.log(city?.name_ar); // "الرياض"
 */
export function findNearestCity(
  lat: number,
  lon: number,
  cities: City[],
  maxRadiusKm?: number
): City | undefined {
  const point: Coordinate = [lat, lon];

  // Use spatial index for faster lookup
  if (!citySpatialIndex) {
    citySpatialIndex = new SpatialIndex<City>(1); // 1-degree grid
    cities.forEach((city) => citySpatialIndex!.add(city));
  }

  // Query nearby cells
  const nearbyCities = citySpatialIndex.query(point, 2);

  // If max radius specified, filter by distance
  if (maxRadiusKm !== undefined) {
    const citiesInRadius = getItemsWithinRadius(point, nearbyCities, maxRadiusKm);
    return findNearestPoint(point, citiesInRadius);
  }

  // Otherwise, find absolute nearest
  return findNearestPoint(point, nearbyCities.length > 0 ? nearbyCities : cities);
}

/**
 * Find cities within a radius from coordinates
 * إيجاد المدن ضمن نصف قطر من الإحداثيات
 * 
 * @param lat Latitude
 * @param lon Longitude
 * @param cities Array of cities
 * @param radiusKm Radius in kilometers
 * @returns Array of cities with distances
 * 
 * @example
 * const nearby = findCitiesInRadius(24.7, 46.7, cities, 50);
 * nearby.forEach(item => {
 *   console.log(`${item.city.name_ar}: ${item.distance.toFixed(2)} km`);
 * });
 */
export function findCitiesInRadius(
  lat: number,
  lon: number,
  cities: City[],
  radiusKm: number
): Array<{ city: City; distance: number }> {
  const point: Coordinate = [lat, lon];
  const results: Array<{ city: City; distance: number }> = [];

  for (const city of cities) {
    if (!city.center) continue;

    const distance = calculateDistance(point, city.center);
    if (distance <= radiusKm) {
      results.push({ city, distance });
    }
  }

  // Sort by distance
  results.sort((a, b) => a.distance - b.distance);

  return results;
}

/**
 * Reverse geocode: Get full location details from coordinates
 * البحث العكسي الكامل: الحصول على تفاصيل الموقع من الإحداثيات
 * 
 * @param lat Latitude
 * @param lon Longitude
 * @param regions Array of regions
 * @param cities Array of cities
 * @returns Location details or null
 * 
 * @example
 * const location = reverseGeocode(24.7, 46.7, regions, cities);
 * if (location) {
 *   console.log(`Region: ${location.region.name_ar}`);
 *   console.log(`Nearest City: ${location.nearestCity.name_ar}`);
 *   console.log(`Distance: ${location.distance.toFixed(2)} km`);
 * }
 */
export function reverseGeocode(
  lat: number,
  lon: number,
  regions: Region[],
  cities: City[]
): {
  region: Region | undefined;
  nearestCity: City | undefined;
  distance: number | undefined;
  coordinates: Coordinate;
} {
  const point: Coordinate = [lat, lon];

  // Find region
  const region = findRegionByCoordinates(lat, lon, regions);

  // Find nearest city
  const nearestCity = findNearestCity(lat, lon, cities);

  // Calculate distance to nearest city
  let distance: number | undefined;
  if (nearestCity?.center) {
    distance = calculateDistance(point, nearestCity.center);
  }

  return {
    region,
    nearestCity,
    distance,
    coordinates: point,
  };
}

/**
 * Check if coordinates are within Saudi Arabia bounds
 * التحقق من أن الإحداثيات داخل حدود المملكة
 * 
 * Approximate bounds of Saudi Arabia:
 * Lat: 16.0 to 32.5
 * Lon: 34.5 to 56.0
 */
export function isWithinSaudiArabia(lat: number, lon: number): boolean {
  return lat >= 16.0 && lat <= 32.5 && lon >= 34.5 && lon <= 56.0;
}

/**
 * Get the closest region even if point is outside boundaries
 * الحصول على أقرب منطقة حتى لو كانت النقطة خارج الحدود
 */
export function findClosestRegion(
  lat: number,
  lon: number,
  regions: Region[]
): Region | undefined {
  // First try exact match
  const exactMatch = findRegionByCoordinates(lat, lon, regions);
  if (exactMatch) return exactMatch;

  // If no exact match, find nearest by center point
  const point: Coordinate = [lat, lon];
  return findNearestPoint(point, regions);
}

/**
 * Reset spatial index cache (useful for testing or when data changes)
 * إعادة تعيين ذاكرة التخزين المؤقت
 */
export function resetSpatialCache(): void {
  boundingBoxCache.clear();
  citySpatialIndex = null;
}
