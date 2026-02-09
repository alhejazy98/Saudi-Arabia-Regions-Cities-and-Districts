/**
 * Geometry utilities for spatial calculations
 * وظائف هندسية للحسابات المكانية
 */

export type Coordinate = [number, number]; // [lat, lon]
export type BoundingBox = {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * حساب المسافة بين نقطتين باستخدام معادلة Haversine
 * @param coord1 First coordinate [lat, lon]
 * @param coord2 Second coordinate [lat, lon]
 * @returns Distance in kilometers
 */
export function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371; // Earth's radius in km
  const lat1 = toRadians(coord1[0]);
  const lat2 = toRadians(coord2[0]);
  const deltaLat = toRadians(coord2[0] - coord1[0]);
  const deltaLon = toRadians(coord2[1] - coord1[1]);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Check if a point is inside a polygon using ray casting algorithm
 * التحقق من وجود نقطة داخل مضلع باستخدام خوارزمية ray casting
 */
export function isPointInPolygon(point: Coordinate, polygon: Coordinate[][]): boolean {
  // Use the first ring (exterior ring) of the polygon
  const ring = polygon[0];
  if (!ring || ring.length < 3) return false;

  let inside = false;
  const [lat, lon] = point;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [lat1, lon1] = ring[i];
    const [lat2, lon2] = ring[j];

    const intersect =
      lon1 > lon !== lon2 > lon &&
      lat < ((lat2 - lat1) * (lon - lon1)) / (lon2 - lon1) + lat1;

    if (intersect) inside = !inside;
  }

  return inside;
}

/**
 * Check if a point is inside a bounding box
 * التحقق من وجود نقطة داخل صندوق حدود
 */
export function isPointInBoundingBox(point: Coordinate, bbox: BoundingBox): boolean {
  const [lat, lon] = point;
  return (
    lat >= bbox.minLat &&
    lat <= bbox.maxLat &&
    lon >= bbox.minLon &&
    lon <= bbox.maxLon
  );
}

/**
 * Create a bounding box from polygon coordinates
 * إنشاء صندوق حدود من إحداثيات المضلع
 */
export function createBoundingBox(polygon: Coordinate[][]): BoundingBox {
  const ring = polygon[0];
  if (!ring || ring.length === 0) {
    return { minLat: 0, maxLat: 0, minLon: 0, maxLon: 0 };
  }

  let minLat = ring[0][0];
  let maxLat = ring[0][0];
  let minLon = ring[0][1];
  let maxLon = ring[0][1];

  for (const [lat, lon] of ring) {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
  }

  return { minLat, maxLat, minLon, maxLon };
}

/**
 * Find the nearest point from a list of coordinates
 * إيجاد أقرب نقطة من قائمة الإحداثيات
 */
export function findNearestPoint<T extends { center?: Coordinate }>(
  point: Coordinate,
  items: T[]
): T | undefined {
  if (items.length === 0) return undefined;

  let nearest = items[0];
  let minDistance = nearest.center
    ? calculateDistance(point, nearest.center)
    : Infinity;

  for (const item of items) {
    if (item.center) {
      const distance = calculateDistance(point, item.center);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = item;
      }
    }
  }

  return nearest;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Get items within a radius from a point
 * الحصول على العناصر ضمن نصف قطر من نقطة
 */
export function getItemsWithinRadius<T extends { center?: Coordinate }>(
  point: Coordinate,
  items: T[],
  radiusKm: number
): T[] {
  return items.filter((item) => {
    if (!item.center) return false;
    return calculateDistance(point, item.center) <= radiusKm;
  });
}

/**
 * Create a simple spatial index for faster lookups
 * إنشاء فهرس مكاني بسيط للبحث الأسرع
 */
export class SpatialIndex<T extends { center?: Coordinate }> {
  private gridSize: number;
  private grid: Map<string, T[]>;

  constructor(gridSize: number = 1) {
    this.gridSize = gridSize;
    this.grid = new Map();
  }

  /**
   * Add an item to the spatial index
   */
  add(item: T): void {
    if (!item.center) return;
    const key = this.getGridKey(item.center);
    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(item);
  }

  /**
   * Query items near a coordinate
   */
  query(coord: Coordinate, radiusCells: number = 1): T[] {
    const [lat, lon] = coord;
    const results: T[] = [];
    const centerCell = this.getCellCoords(coord);

    for (
      let latCell = centerCell.lat - radiusCells;
      latCell <= centerCell.lat + radiusCells;
      latCell++
    ) {
      for (
        let lonCell = centerCell.lon - radiusCells;
        lonCell <= centerCell.lon + radiusCells;
        lonCell++
      ) {
        const key = `${latCell},${lonCell}`;
        const items = this.grid.get(key);
        if (items) {
          results.push(...items);
        }
      }
    }

    return results;
  }

  private getGridKey(coord: Coordinate): string {
    const { lat, lon } = this.getCellCoords(coord);
    return `${lat},${lon}`;
  }

  private getCellCoords(coord: Coordinate): { lat: number; lon: number } {
    const [lat, lon] = coord;
    return {
      lat: Math.floor(lat / this.gridSize),
      lon: Math.floor(lon / this.gridSize),
    };
  }
}
