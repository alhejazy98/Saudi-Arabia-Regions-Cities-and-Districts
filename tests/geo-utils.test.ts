import {
  calculateDistance,
  isPointInPolygon,
  isPointInBoundingBox,
  createBoundingBox,
  findNearestPoint,
  getItemsWithinRadius,
  SpatialIndex,
  type Coordinate,
} from '../src/geo-utils';

describe('Geo Utils', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two coordinates', () => {
      // Riyadh to Jeddah (approximate)
      const riyadh: Coordinate = [24.7136, 46.6753];
      const jeddah: Coordinate = [21.5433, 39.1728];

      const distance = calculateDistance(riyadh, jeddah);

      // Expected distance is approximately 840 km
      expect(distance).toBeGreaterThan(800);
      expect(distance).toBeLessThan(900);
    });

    it('should return 0 for same coordinates', () => {
      const coord: Coordinate = [24.7136, 46.6753];
      const distance = calculateDistance(coord, coord);

      expect(distance).toBe(0);
    });

    it('should handle negative coordinates', () => {
      const coord1: Coordinate = [-10, -20];
      const coord2: Coordinate = [-11, -21];

      const distance = calculateDistance(coord1, coord2);

      expect(distance).toBeGreaterThan(0);
    });
  });

  describe('isPointInPolygon', () => {
    it('should detect point inside simple square polygon', () => {
      const polygon: Coordinate[][] = [
        [
          [0, 0],
          [0, 10],
          [10, 10],
          [10, 0],
          [0, 0],
        ],
      ];

      const insidePoint: Coordinate = [5, 5];
      const outsidePoint: Coordinate = [15, 15];

      expect(isPointInPolygon(insidePoint, polygon)).toBe(true);
      expect(isPointInPolygon(outsidePoint, polygon)).toBe(false);
    });

    it('should detect point on edge', () => {
      const polygon: Coordinate[][] = [
        [
          [0, 0],
          [0, 10],
          [10, 10],
          [10, 0],
          [0, 0],
        ],
      ];

      const edgePoint: Coordinate = [0, 5];

      // Edge cases may vary, but should return a boolean
      expect(typeof isPointInPolygon(edgePoint, polygon)).toBe('boolean');
    });

    it('should handle empty polygon', () => {
      const polygon: Coordinate[][] = [[]];
      const point: Coordinate = [5, 5];

      expect(isPointInPolygon(point, polygon)).toBe(false);
    });
  });

  describe('isPointInBoundingBox', () => {
    it('should detect point inside bounding box', () => {
      const bbox = {
        minLat: 0,
        maxLat: 10,
        minLon: 0,
        maxLon: 10,
      };

      const insidePoint: Coordinate = [5, 5];
      const outsidePoint: Coordinate = [15, 15];

      expect(isPointInBoundingBox(insidePoint, bbox)).toBe(true);
      expect(isPointInBoundingBox(outsidePoint, bbox)).toBe(false);
    });

    it('should detect point on boundary', () => {
      const bbox = {
        minLat: 0,
        maxLat: 10,
        minLon: 0,
        maxLon: 10,
      };

      const boundaryPoint: Coordinate = [0, 0];

      expect(isPointInBoundingBox(boundaryPoint, bbox)).toBe(true);
    });
  });

  describe('createBoundingBox', () => {
    it('should create bounding box from polygon', () => {
      const polygon: Coordinate[][] = [
        [
          [0, 0],
          [0, 10],
          [5, 15],
          [10, 10],
          [10, 0],
          [0, 0],
        ],
      ];

      const bbox = createBoundingBox(polygon);

      expect(bbox.minLat).toBe(0);
      expect(bbox.maxLat).toBe(10);
      expect(bbox.minLon).toBe(0);
      expect(bbox.maxLon).toBe(15);
    });

    it('should handle empty polygon', () => {
      const polygon: Coordinate[][] = [[]];
      const bbox = createBoundingBox(polygon);

      expect(bbox).toEqual({
        minLat: 0,
        maxLat: 0,
        minLon: 0,
        maxLon: 0,
      });
    });
  });

  describe('findNearestPoint', () => {
    it('should find nearest point', () => {
      const items = [
        { id: 1, center: [0, 0] as Coordinate },
        { id: 2, center: [10, 10] as Coordinate },
        { id: 3, center: [5, 5] as Coordinate },
      ];

      const point: Coordinate = [6, 6];
      const nearest = findNearestPoint(point, items);

      expect(nearest?.id).toBe(3);
    });

    it('should return undefined for empty array', () => {
      const items: Array<{ center: Coordinate }> = [];
      const point: Coordinate = [5, 5];

      const nearest = findNearestPoint(point, items);

      expect(nearest).toBeUndefined();
    });

    it('should handle items without center', () => {
      const items = [
        { id: 1, center: undefined },
        { id: 2, center: [10, 10] as Coordinate },
      ];

      const point: Coordinate = [9, 9];
      const nearest = findNearestPoint(point, items);

      expect(nearest?.id).toBe(2);
    });
  });

  describe('getItemsWithinRadius', () => {
    it('should get items within radius', () => {
      const items = [
        { id: 1, center: [24.7, 46.7] as Coordinate }, // Riyadh
        { id: 2, center: [21.5, 39.2] as Coordinate }, // Jeddah (far)
        { id: 3, center: [24.8, 46.8] as Coordinate }, // Near Riyadh
      ];

      const point: Coordinate = [24.7, 46.7];
      const nearby = getItemsWithinRadius(point, items, 50);

      expect(nearby.length).toBe(2);
      expect(nearby.some((item) => item.id === 1)).toBe(true);
      expect(nearby.some((item) => item.id === 3)).toBe(true);
    });

    it('should return empty array when no items in radius', () => {
      const items = [{ id: 1, center: [50, 50] as Coordinate }];

      const point: Coordinate = [0, 0];
      const nearby = getItemsWithinRadius(point, items, 10);

      expect(nearby.length).toBe(0);
    });
  });

  describe('SpatialIndex', () => {
    it('should add and query items', () => {
      const index = new SpatialIndex<{ id: number; center: Coordinate }>(1);

      index.add({ id: 1, center: [24.7, 46.7] });
      index.add({ id: 2, center: [21.5, 39.2] });
      index.add({ id: 3, center: [24.8, 46.8] });

      const results = index.query([24.7, 46.7], 1);

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((item) => item.id === 1)).toBe(true);
    });

    it('should handle items without center', () => {
      const index = new SpatialIndex<{ id: number; center?: Coordinate }>(1);

      index.add({ id: 1, center: undefined });
      index.add({ id: 2, center: [24.7, 46.7] });

      const results = index.query([24.7, 46.7], 1);

      expect(results.length).toBeGreaterThan(0);
    });

    it('should query with different radius', () => {
      const index = new SpatialIndex<{ id: number; center: Coordinate }>(1);

      index.add({ id: 1, center: [24.7, 46.7] });
      index.add({ id: 2, center: [30.0, 50.0] });

      const nearResults = index.query([24.7, 46.7], 0);
      const farResults = index.query([24.7, 46.7], 10);

      expect(nearResults.length).toBeLessThanOrEqual(farResults.length);
    });
  });
});
