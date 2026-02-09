# Complete API Documentation | التوثيق الكامل لـ API

## Table of Contents | جدول المحتويات

- [Region Functions](#region-functions--دوال-المناطق)
- [City Functions](#city-functions--دوال-المدن)
- [District Functions](#district-functions--دوال-الأحياء)
- [GeoJSON Functions](#geojson-functions--دوال-geojson)
- [Utility Functions](#utility-functions--دوال-مساعدة)
- [Types](#types--الأنواع)

---

## Region Functions | دوال المناطق

### `getAllRegions()`

Returns all regions with complete data including population and geographic information.  
تُرجع جميع المناطق مع البيانات الكاملة بما في ذلك السكان والمعلومات الجغرافية.

**Returns:** `Region[]` | `RegionLite[]`

**Example:**
```typescript
import { getAllRegions } from 'saudi-arabia-geodata';

const regions = getAllRegions();
console.log(regions.length); // 13

regions.forEach(region => {
  console.log(`${region.name_ar} - ${region.name_en}`);
  console.log(`Population: ${region.population.toLocaleString()}`);
});
```

**Output:**
```javascript
[
  {
    region_id: 1,
    capital_city_id: 3,
    code: "RD",
    name_ar: "منطقة الرياض",
    name_en: "Riyadh",
    population: 6777146,
    center: [24.69999996, 46.73333003],
    boundaries: [[...]]
  },
  // ... more regions
]
```

---

### `getRegionById(id: number)`

Get a specific region by its ID.  
الحصول على منطقة معينة بالمعرّف.

**Parameters:**
- `id` (number): Region ID | معرّف المنطقة

**Returns:** `Region | undefined` | `RegionLite | undefined`

**Example:**
```typescript
import { getRegionById } from 'saudi-arabia-geodata';

const riyadh = getRegionById(1);
if (riyadh) {
  console.log(riyadh.name_ar); // "منطقة الرياض"
  console.log(riyadh.code);    // "RD"
  console.log(riyadh.population); // 6777146
}
```

---

### `getRegionByCode(code: string)`

Get a region by its code.  
الحصول على منطقة بالرمز الخاص بها.

**Parameters:**
- `code` (string): Region code (e.g., 'RD', 'MQ') | رمز المنطقة

**Returns:** `Region | undefined` | `RegionLite | undefined`

**Example:**
```typescript
import { getRegionByCode } from 'saudi-arabia-geodata';

const riyadh = getRegionByCode('RD');
const makkah = getRegionByCode('MQ');

console.log(riyadh?.name_en);  // "Riyadh"
console.log(makkah?.name_en);  // "Makkah"
```

**Region Codes:**
- `RD` - Riyadh | الرياض
- `MQ` - Makkah | مكة المكرمة
- `MN` - Madinah | المدينة المنورة
- `QA` - Qassim | القصيم
- `SQ` - Eastern Province | الشرقية
- `AS` - Asir | عسير
- `TB` - Tabuk | تبوك
- `HL` - Hail | حائل
- `NG` - Najran | نجران
- `JZ` - Jazan | جازان
- `BH` - Al Bahah | الباحة
- `JF` - Al Jouf | الجوف
- `NB` - Northern Borders | الحدود الشمالية

---

### `searchRegions(query: string, options?: SearchOptions)`

Search regions by name (Arabic or English).  
البحث في المناطق بالاسم (عربي أو إنجليزي).

**Parameters:**
- `query` (string): Search query | نص البحث
- `options` (SearchOptions, optional): Search options | خيارات البحث

**Returns:** `Region[]` | `RegionLite[]`

**Example:**
```typescript
import { searchRegions } from 'saudi-arabia-geodata';

// Search in Arabic
const results1 = searchRegions('الرياض');

// Search in English
const results2 = searchRegions('riyadh');

// Case-sensitive search
const results3 = searchRegions('RIYADH', { caseSensitive: true });

// Exact match only
const results4 = searchRegions('Riyadh', { exactMatch: true });

// Search only in Arabic names
const results5 = searchRegions('مكة', { 
  searchInArabic: true, 
  searchInEnglish: false 
});
```

---

### `getRegionsByPopulation(ascending?: boolean)`

Get regions sorted by population.  
الحصول على المناطق مرتبة حسب عدد السكان.

**Parameters:**
- `ascending` (boolean, optional): Sort in ascending order. Default: false | ترتيب تصاعدي

**Returns:** `Region[]` | `RegionLite[]`

**Example:**
```typescript
import { getRegionsByPopulation } from 'saudi-arabia-geodata';

// Highest population first
const mostPopulated = getRegionsByPopulation();
console.log(mostPopulated[0].name_ar); // Most populated region

// Lowest population first
const leastPopulated = getRegionsByPopulation(true);
console.log(leastPopulated[0].name_ar); // Least populated region
```

---

## City Functions | دوال المدن

### `getAllCities()`

Returns all cities.  
تُرجع جميع المدن.

**Returns:** `City[]` | `CityLite[]`

**Example:**
```typescript
import { getAllCities } from 'saudi-arabia-geodata';

const cities = getAllCities();
console.log(`Total cities: ${cities.length}`);

// Find specific city
const jeddah = cities.find(city => city.name_en === 'Jeddah');
```

---

### `getCityById(id: number)`

Get a specific city by ID.  
الحصول على مدينة معينة بالمعرّف.

**Parameters:**
- `id` (number): City ID | معرّف المدينة

**Returns:** `City | undefined` | `CityLite | undefined`

**Example:**
```typescript
import { getCityById } from 'saudi-arabia-geodata';

const city = getCityById(3);
if (city) {
  console.log(city.name_ar);     // "الرياض"
  console.log(city.name_en);     // "Riyadh"
  console.log(city.region_id);   // 1
  console.log(city.center);      // [24.69999996, 46.73333003]
}
```

---

### `getCitiesByRegion(regionId: number)`

Get all cities in a specific region.  
الحصول على جميع مدن منطقة معينة.

**Parameters:**
- `regionId` (number): Region ID | معرّف المنطقة

**Returns:** `City[]` | `CityLite[]`

**Example:**
```typescript
import { getCitiesByRegion } from 'saudi-arabia-geodata';

// Get all cities in Riyadh region
const riyadhCities = getCitiesByRegion(1);
console.log(`Cities in Riyadh: ${riyadhCities.length}`);

riyadhCities.forEach(city => {
  console.log(`- ${city.name_ar} (${city.name_en})`);
});
```

---

### `searchCities(query: string, options?: SearchOptions)`

Search cities by name.  
البحث في المدن بالاسم.

**Parameters:**
- `query` (string): Search query | نص البحث
- `options` (SearchOptions, optional): Search options | خيارات البحث

**Returns:** `City[]` | `CityLite[]`

**Example:**
```typescript
import { searchCities } from 'saudi-arabia-geodata';

// Search for cities containing "جدة"
const results = searchCities('جدة');

// Search with options
const exactResults = searchCities('Jeddah', {
  searchInEnglish: true,
  searchInArabic: false,
  exactMatch: true
});

// Partial search
const partialResults = searchCities('دم', {
  searchInArabic: true
}); // Finds "الدمام", "الدمادم", etc.
```

---

### `getCapitalCity(regionId: number)`

Get the capital city of a region.  
الحصول على المدينة الرئيسية للمنطقة.

**Parameters:**
- `regionId` (number): Region ID | معرّف المنطقة

**Returns:** `City | undefined` | `CityLite | undefined`

**Example:**
```typescript
import { getCapitalCity } from 'saudi-arabia-geodata';

const capitalOfRiyadh = getCapitalCity(1);
console.log(capitalOfRiyadh?.name_ar); // "الرياض"

const capitalOfMakkah = getCapitalCity(2);
console.log(capitalOfMakkah?.name_ar); // "مكة المكرمة"
```

---

### `getRegionOfCity(cityId: number)`

Get the region that contains a specific city.  
الحصول على المنطقة التي تحتوي على مدينة معينة.

**Parameters:**
- `cityId` (number): City ID | معرّف المدينة

**Returns:** `Region | undefined` | `RegionLite | undefined`

**Example:**
```typescript
import { getRegionOfCity } from 'saudi-arabia-geodata';

const region = getRegionOfCity(3); // Riyadh city
console.log(region?.name_ar); // "منطقة الرياض"
```

---

## District Functions | دوال الأحياء

**Note:** District functions are only available in the **lite** version.  
**ملاحظة:** دوال الأحياء متاحة فقط في **النسخة الخفيفة**.

```typescript
import { getAllDistricts } from 'saudi-arabia-geodata/lite';
```

---

### `getAllDistricts()`

Returns all districts.  
تُرجع جميع الأحياء.

**Returns:** `DistrictLite[]`

**Example:**
```typescript
import { getAllDistricts } from 'saudi-arabia-geodata/lite';

const districts = getAllDistricts();
console.log(`Total districts: ${districts.length}`); // ~5000+
```

---

### `getDistrictById(id: number)`

Get a specific district by ID.  
الحصول على حي معين بالمعرّف.

**Parameters:**
- `id` (number): District ID | معرّف الحي

**Returns:** `DistrictLite | undefined`

**Example:**
```typescript
import { getDistrictById } from 'saudi-arabia-geodata/lite';

const district = getDistrictById(10100003001);
if (district) {
  console.log(district.name_ar);   // "حي العمل"
  console.log(district.name_en);   // "Al Amal Dist."
  console.log(district.city_id);   // 3
  console.log(district.region_id); // 1
}
```

---

### `getDistrictsByCity(cityId: number)`

Get all districts in a specific city.  
الحصول على جميع أحياء مدينة معينة.

**Parameters:**
- `cityId` (number): City ID | معرّف المدينة

**Returns:** `DistrictLite[]`

**Example:**
```typescript
import { getDistrictsByCity } from 'saudi-arabia-geodata/lite';

// Get all districts in Riyadh city
const riyadhDistricts = getDistrictsByCity(3);
console.log(`Districts in Riyadh: ${riyadhDistricts.length}`);

riyadhDistricts.slice(0, 5).forEach(district => {
  console.log(`- ${district.name_ar}`);
});
```

---

### `getDistrictsByRegion(regionId: number)`

Get all districts in a specific region.  
الحصول على جميع أحياء منطقة معينة.

**Parameters:**
- `regionId` (number): Region ID | معرّف المنطقة

**Returns:** `DistrictLite[]`

**Example:**
```typescript
import { getDistrictsByRegion } from 'saudi-arabia-geodata/lite';

const riyadhRegionDistricts = getDistrictsByRegion(1);
console.log(`Districts in Riyadh Region: ${riyadhRegionDistricts.length}`);
```

---

### `searchDistricts(query: string, options?: SearchOptions)`

Search districts by name.  
البحث في الأحياء بالاسم.

**Parameters:**
- `query` (string): Search query | نص البحث
- `options` (SearchOptions, optional): Search options | خيارات البحث

**Returns:** `DistrictLite[]`

**Example:**
```typescript
import { searchDistricts } from 'saudi-arabia-geodata/lite';

// Search for districts
const results = searchDistricts('العليا');
console.log(`Found ${results.length} districts`);

results.forEach(district => {
  console.log(`${district.name_ar} - ${district.name_en}`);
});
```

---

### `getCityOfDistrict(districtId: number)`

Get the city that contains a specific district.  
الحصول على المدينة التي تحتوي على حي معين.

**Parameters:**
- `districtId` (number): District ID | معرّف الحي

**Returns:** `CityLite | undefined`

**Example:**
```typescript
import { getCityOfDistrict } from 'saudi-arabia-geodata/lite';

const city = getCityOfDistrict(10100003001);
console.log(city?.name_ar); // "الرياض"
```

---

### `getRegionOfDistrict(districtId: number)`

Get the region that contains a specific district.  
الحصول على المنطقة التي تحتوي على حي معين.

**Parameters:**
- `districtId` (number): District ID | معرّف الحي

**Returns:** `RegionLite | undefined`

**Example:**
```typescript
import { getRegionOfDistrict } from 'saudi-arabia-geodata/lite';

const region = getRegionOfDistrict(10100003001);
console.log(region?.name_ar); // "منطقة الرياض"
```

---

## GeoJSON Functions | دوال GeoJSON

**Note:** GeoJSON functions are only available in the **full** version.  
**ملاحظة:** دوال GeoJSON متاحة فقط في **النسخة الكاملة**.

---

### `getRegionsGeoJSON()`

Get regions data in GeoJSON format.  
الحصول على بيانات المناطق بصيغة GeoJSON.

**Returns:** `GeoJSONFeatureCollection | null`

**Example:**
```typescript
import { getRegionsGeoJSON } from 'saudi-arabia-geodata';
import L from 'leaflet';

const regionsGeoJSON = getRegionsGeoJSON();

if (regionsGeoJSON) {
  const map = L.map('map').setView([24.7136, 46.6753], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.geoJSON(regionsGeoJSON).addTo(map);
}
```

---

### `getCitiesGeoJSON()`

Get cities data in GeoJSON format.  
الحصول على بيانات المدن بصيغة GeoJSON.

**Returns:** `GeoJSONFeatureCollection | null`

**Example:**
```typescript
import { getCitiesGeoJSON } from 'saudi-arabia-geodata';

const citiesGeoJSON = getCitiesGeoJSON();
// Use with mapping libraries like Leaflet, Mapbox, etc.
```

---

### `getDistrictsGeoJSON()`

Get districts data in GeoJSON format.  
الحصول على بيانات الأحياء بصيغة GeoJSON.

**Returns:** `GeoJSONFeatureCollection | null`

**Example:**
```typescript
import { getDistrictsGeoJSON } from 'saudi-arabia-geodata';

const districtsGeoJSON = getDistrictsGeoJSON();
// Use with mapping libraries
```

---

## Utility Functions | دوال مساعدة

### `getTotalPopulation()`

Get the total population of Saudi Arabia.  
الحصول على إجمالي عدد سكان المملكة.

**Returns:** `number`

**Example:**
```typescript
import { getTotalPopulation } from 'saudi-arabia-geodata';

const totalPop = getTotalPopulation();
console.log(`Total Population: ${totalPop.toLocaleString()}`);
// Output: Total Population: 32,552,336
```

---

## Types | الأنواع

### `Region`

```typescript
interface Region {
  region_id: number;              // معرّف المنطقة
  capital_city_id: number;        // معرّف المدينة الرئيسية
  code: string;                   // رمز المنطقة
  name_ar: string;                // الاسم بالعربية
  name_en: string;                // الاسم بالإنجليزية
  population: number;             // عدد السكان
  center?: [number, number];      // الإحداثيات المركزية [latitude, longitude]
  boundaries?: [number, number][][]; // الحدود الجغرافية
}
```

### `RegionLite`

```typescript
interface RegionLite {
  region_id: number;
  capital_city_id: number;
  code: string;
  name_ar: string;
  name_en: string;
  population: number;
}
```

### `City`

```typescript
interface City {
  city_id: number;               // معرّف المدينة
  region_id: number;             // معرّف المنطقة
  name_ar: string;               // الاسم بالعربية
  name_en: string;               // الاسم بالإنجليزية
  center?: [number, number];     // الإحداثيات المركزية [latitude, longitude]
}
```

### `CityLite`

```typescript
interface CityLite {
  city_id: number;
  region_id: number;
  name_ar: string;
  name_en: string;
}
```

### `DistrictLite`

```typescript
interface DistrictLite {
  district_id: number;           // معرّف الحي
  city_id: number;               // معرّف المدينة
  region_id: number;             // معرّف المنطقة
  name_ar: string;               // الاسم بالعربية
  name_en: string;               // الاسم بالإنجليزية
}
```

### `SearchOptions`

```typescript
interface SearchOptions {
  searchInArabic?: boolean;      // البحث في الأسماء العربية (default: true)
  searchInEnglish?: boolean;     // البحث في الأسماء الإنجليزية (default: true)
  caseSensitive?: boolean;       // حساس لحالة الأحرف (default: false)
  exactMatch?: boolean;          // تطابق تام (default: false)
}
```

---

## Complete Usage Example | مثال كامل للاستخدام

```typescript
import {
  getAllRegions,
  getRegionById,
  getCitiesByRegion,
  searchCities,
  getTotalPopulation,
  getCapitalCity
} from 'saudi-arabia-geodata';

// Get all regions
const regions = getAllRegions();
console.log(`Total regions: ${regions.length}`);

// Get a specific region
const riyadhRegion = getRegionById(1);
console.log(`Region: ${riyadhRegion?.name_ar}`);
console.log(`Population: ${riyadhRegion?.population.toLocaleString()}`);

// Get capital city
const capital = getCapitalCity(1);
console.log(`Capital: ${capital?.name_ar}`);

// Get all cities in a region
const cities = getCitiesByRegion(1);
console.log(`Cities in Riyadh region: ${cities.length}`);

// Search for cities
const searchResults = searchCities('جدة');
console.log(`Found ${searchResults.length} cities matching "جدة"`);

// Get total population
const totalPop = getTotalPopulation();
console.log(`Total KSA Population: ${totalPop.toLocaleString()}`);

// Advanced search
const advancedResults = searchCities('Al', {
  searchInEnglish: true,
  searchInArabic: false,
  caseSensitive: false
});
console.log(`Found ${advancedResults.length} cities starting with "Al"`);
```

---

For more examples, see the [examples](../examples) directory.

لمزيد من الأمثلة، راجع مجلد [examples](../examples).
