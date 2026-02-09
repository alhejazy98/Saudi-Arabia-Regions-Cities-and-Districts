# Saudi Arabia Geodata 🇸🇦 - npm Package Documentation

[![npm version](https://badge.fury.io/js/saudi-arabia-geodata.svg)](https://www.npmjs.com/package/saudi-arabia-geodata)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

مكتبة شاملة للبيانات الجغرافية للمملكة العربية السعودية (المناطق، المدن، والأحياء) مع دعم TypeScript و GeoJSON.

A comprehensive JavaScript/TypeScript library for Saudi Arabia geographic data (regions, cities, and districts) with GeoJSON support.

## ✨ Features | المميزات

- 🗺️ **Complete geographic data** | بيانات جغرافية كاملة
  - 13 Regions | 13 منطقة
  - 1,800+ Cities | أكثر من 1,800 مدينة
  - 5,000+ Districts | أكثر من 5,000 حي
- 📍 **GeoJSON support** | دعم GeoJSON للخرائط
- 🔍 **Search functionality** | وظائف البحث بالعربية والإنجليزية
- 📦 **Multiple bundle options** | خيارات متعددة (كامل وخفيف)
- 🎯 **TypeScript support** | دعم TypeScript
- ⚡ **Lightweight** | خفيف الحجم
- 🔄 **Compatible with Vue.js, React, React Native** | متوافق مع Vue.js و React و React Native

## 📦 Installation | التثبيت

```bash
npm install saudi-arabia-geodata
```

or | أو

```bash
yarn add saudi-arabia-geodata
```

## 🚀 Quick Start | البدء السريع

### Full Version | النسخة الكاملة

```javascript
import {
  getAllRegions,
  getAllCities,
  getRegionById,
  searchCities,
  getCitiesByRegion
} from 'saudi-arabia-geodata';

// Get all regions | الحصول على جميع المناطق
const regions = getAllRegions();
console.log(regions);

// Get specific region | الحصول على منطقة معينة
const riyadh = getRegionById(1);
console.log(riyadh.name_ar); // منطقة الرياض

// Search cities | البحث عن مدن
const cities = searchCities('جدة');
console.log(cities);

// Get cities in a region | الحصول على مدن المنطقة
const riyadhCities = getCitiesByRegion(1);
console.log(riyadhCities);
```

### Lite Version | النسخة الخفيفة

For smaller bundle size (without geographic coordinates):  
للحصول على حجم أصغر (بدون الإحداثيات الجغرافية):

```javascript
import {
  getAllRegions,
  getAllCities,
  getAllDistricts,
  searchDistricts
} from 'saudi-arabia-geodata/lite';

// Get all regions | الحصول على جميع المناطق
const regions = getAllRegions();

// Get all districts | الحصول على جميع الأحياء
const districts = getAllDistricts();

// Search districts | البحث عن أحياء
const results = searchDistricts('العليا');
```

## 📖 Complete API Documentation

See [DOCS.md](./docs/DOCS.md) for complete API documentation with all available functions.

راجع [DOCS.md](./docs/DOCS.md) للحصول على التوثيق الكامل لجميع الدوال المتاحة.

## 🎯 Usage Examples | أمثلة الاستخدام

### Vue.js Example

See [examples/vue-example.vue](./examples/vue-example.vue) for complete Vue.js integration example.

### React Example

See [examples/react-example.jsx](./examples/react-example.jsx) for complete React integration example.

### React Native Example

See [examples/react-native-example.jsx](./examples/react-native-example.jsx) for complete React Native integration example.

## 📊 Data Structure | هيكل البيانات

### Region | منطقة

```typescript
interface Region {
  region_id: number;          // معرّف المنطقة
  capital_city_id: number;    // معرّف المدينة الرئيسية
  code: string;               // رمز المنطقة
  name_ar: string;            // الاسم بالعربية
  name_en: string;            // الاسم بالإنجليزية
  population: number;         // عدد السكان
  center?: [number, number];  // الإحداثيات المركزية
  boundaries?: [number, number][][]; // الحدود الجغرافية
}
```

### City | مدينة

```typescript
interface City {
  city_id: number;           // معرّف المدينة
  region_id: number;         // معرّف المنطقة
  name_ar: string;           // الاسم بالعربية
  name_en: string;           // الاسم بالإنجليزية
  center?: [number, number]; // الإحداثيات المركزية
}
```

### District | حي

```typescript
interface District {
  district_id: number;       // معرّف الحي
  city_id: number;           // معرّف المدينة
  region_id: number;         // معرّف المنطقة
  name_ar: string;           // الاسم بالعربية
  name_en: string;           // الاسم بالإنجليزية
  center?: [number, number]; // الإحداثيات المركزية
}
```

## 📦 Bundle Sizes | أحجام الحزم

- **Full version**: ~45MB (includes geographic coordinates and boundaries)
- **Lite version**: ~2MB (without geographic data)

For most use cases, we recommend using the lite version.

## 🗺️ Map Integration | التكامل مع الخرائط

The library includes GeoJSON data that can be used with mapping libraries like:
- Leaflet
- Mapbox GL JS
- Google Maps
- OpenLayers

```javascript
import { getRegionsGeoJSON } from 'saudi-arabia-geodata';
import L from 'leaflet';

const map = L.map('map').setView([24.7136, 46.6753], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const regionsGeoJSON = getRegionsGeoJSON();
if (regionsGeoJSON) {
  L.geoJSON(regionsGeoJSON).addTo(map);
}
```

## 🤝 Contributing | المساهمة

Contributions are welcome! Please feel free to submit a Pull Request.

المساهمات مرحب بها! لا تتردد في إرسال طلب Pull Request.

## 📄 License | الترخيص

MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments | شكر وتقدير

Data sourced from official Saudi Arabian government sources (https://maps.address.gov.sa/).

البيانات مستمدة من المصادر الحكومية الرسمية للمملكة العربية السعودية.

## 📞 Support | الدعم

If you have any questions or need help, please open an issue on GitHub.

إذا كان لديك أي أسئلة أو تحتاج إلى مساعدة، يرجى فتح issue على GitHub.

---

Made with ❤️ for Saudi Arabia | صُنع بـ ❤️ للمملكة العربية السعودية
