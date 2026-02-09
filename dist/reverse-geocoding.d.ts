/**
 * Reverse Geocoding functions
 * وظائف البحث العكسي الجغرافي
 */
import type { Region, City, Coordinate } from './types';
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
export declare function findRegionByCoordinates(lat: number, lon: number, regions: Region[]): Region | undefined;
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
export declare function findNearestCity(lat: number, lon: number, cities: City[], maxRadiusKm?: number): City | undefined;
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
export declare function findCitiesInRadius(lat: number, lon: number, cities: City[], radiusKm: number): Array<{
    city: City;
    distance: number;
}>;
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
export declare function reverseGeocode(lat: number, lon: number, regions: Region[], cities: City[]): {
    region: Region | undefined;
    nearestCity: City | undefined;
    distance: number | undefined;
    coordinates: Coordinate;
};
/**
 * Check if coordinates are within Saudi Arabia bounds
 * التحقق من أن الإحداثيات داخل حدود المملكة
 *
 * Approximate bounds of Saudi Arabia:
 * Lat: 16.0 to 32.5
 * Lon: 34.5 to 56.0
 */
export declare function isWithinSaudiArabia(lat: number, lon: number): boolean;
/**
 * Get the closest region even if point is outside boundaries
 * الحصول على أقرب منطقة حتى لو كانت النقطة خارج الحدود
 */
export declare function findClosestRegion(lat: number, lon: number, regions: Region[]): Region | undefined;
/**
 * Reset spatial index cache (useful for testing or when data changes)
 * إعادة تعيين ذاكرة التخزين المؤقت
 */
export declare function resetSpatialCache(): void;
