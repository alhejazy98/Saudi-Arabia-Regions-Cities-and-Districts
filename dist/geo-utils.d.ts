/**
 * Geometry utilities for spatial calculations
 * وظائف هندسية للحسابات المكانية
 */
export type Coordinate = [number, number];
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
export declare function calculateDistance(coord1: Coordinate, coord2: Coordinate): number;
/**
 * Check if a point is inside a polygon using ray casting algorithm
 * التحقق من وجود نقطة داخل مضلع باستخدام خوارزمية ray casting
 */
export declare function isPointInPolygon(point: Coordinate, polygon: Coordinate[][]): boolean;
/**
 * Check if a point is inside a bounding box
 * التحقق من وجود نقطة داخل صندوق حدود
 */
export declare function isPointInBoundingBox(point: Coordinate, bbox: BoundingBox): boolean;
/**
 * Create a bounding box from polygon coordinates
 * إنشاء صندوق حدود من إحداثيات المضلع
 */
export declare function createBoundingBox(polygon: Coordinate[][]): BoundingBox;
/**
 * Find the nearest point from a list of coordinates
 * إيجاد أقرب نقطة من قائمة الإحداثيات
 */
export declare function findNearestPoint<T extends {
    center?: Coordinate;
}>(point: Coordinate, items: T[]): T | undefined;
/**
 * Get items within a radius from a point
 * الحصول على العناصر ضمن نصف قطر من نقطة
 */
export declare function getItemsWithinRadius<T extends {
    center?: Coordinate;
}>(point: Coordinate, items: T[], radiusKm: number): T[];
/**
 * Create a simple spatial index for faster lookups
 * إنشاء فهرس مكاني بسيط للبحث الأسرع
 */
export declare class SpatialIndex<T extends {
    center?: Coordinate;
}> {
    private gridSize;
    private grid;
    constructor(gridSize?: number);
    /**
     * Add an item to the spatial index
     */
    add(item: T): void;
    /**
     * Query items near a coordinate
     */
    query(coord: Coordinate, radiusCells?: number): T[];
    private getGridKey;
    private getCellCoords;
}
