# Saudi Arabia Regions, Cities and Districts
# المناطق والمدن والأحياء في المملكة العربية السعودية

[![npm version](https://badge.fury.io/js/saudi-arabia-geodata.svg)](https://www.npmjs.com/package/saudi-arabia-geodata)
[![License: GPL-2.0](https://img.shields.io/badge/License-GPL--2.0-blue.svg)](https://opensource.org/licenses/GPL-2.0)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)]()

Raw data for Saudi Arabia's 13 regions, over 4580 cities and 3730 districts in both Arabic and English.

بيانات خام لمناطق المملكة العربية السعودية الـ 13، أكثر من 4580 مدينة و 3730 حي بالعربية والإنجليزية.

## 📦 NPM Package / حزمة NPM

You can now use this data easily in your JavaScript/TypeScript projects!

يمكنك الآن استخدام هذه البيانات بسهولة في مشاريع JavaScript/TypeScript الخاصة بك!

```bash
npm install saudi-arabia-geodata
```

### Quick Example / مثال سريع

```javascript
import { reverseGeocode, searchCities, getAllRegions } from 'saudi-arabia-geodata';

// Find location from GPS coordinates / إيجاد الموقع من إحداثيات GPS
const location = reverseGeocode(24.7136, 46.6753);
console.log(location.region?.name_ar);  // "منطقة الرياض"
console.log(location.nearestCity?.name_en);  // "Riyadh"

// Search cities / البحث عن المدن
const cities = searchCities('جدة');
console.log(cities[0].name_en);  // "Jeddah"

// Get all regions / الحصول على جميع المناطق
const regions = getAllRegions();  // 13 regions
```

### Key Features / المميزات الرئيسية

- 🌍 **Reverse Geocoding** - Convert coordinates to location names / تحويل الإحداثيات إلى أسماء المواقع
- 🔍 **Smart Search** - Search in Arabic & English / البحث بالعربية والإنجليزية
- 📍 **Point-in-Polygon** - Check if coordinates are within region boundaries / التحقق من وجود الإحداثيات ضمن حدود المنطقة
- 📦 **Two Versions** - Full (~45MB) and Lite (~2MB) / نسختان - كاملة وخفيفة
- ⚡ **Fast & Optimized** - Spatial indexing for performance / محسنة للأداء
- 🎨 **Framework Ready** - Vue, React, React Native, Angular / جاهز للأطر

See full documentation at [/docs/API.md](/docs/API.md)

راجع التوثيق الكامل في [/docs/API.md](/docs/API.md)

---

## 📊 Data Information / معلومات البيانات

* The data is public data collected from https://maps.address.gov.sa/
* All coordinates in (Lat, Lon) aka (Y, X) format and 8 decimal points, except for MySQL files
* Mysql files coordinates are reversed (Lon, Lat) aka (X, Y) due to the way MySQL expect it
* Data points include:
  - Regions, Cities and Districts.
  - Names (Arabic & English).
  - Regions capital city, population & center point.
  - Regions boundaries.
  - Districts boundaries.
* Lite version includes all data points except GIS data (center point & boundaries).


## Data Use Cases
This is a list of some of the open source projects based on this data:
* [KSA Covid-19 cases map](https://github.com/0x0Faisal/Covid19-Map) by [@0x0Faisal](https://github.com/0x0Faisal).
* [Saudi_geo_clickhouse](https://github.com/swarnkiran88/swarnkiran88) by [@swarnkiran88](https://github.com/swarnkiran88).
* [Saudi_GIS_Data](https://github.com/usefksa/Saudi_GIS_Data) by [@usef_ksa](https://github.com/usef_ksa).
* [Manateq - a handy library for searching and listing regions, cities and districts in Saudi Arabia](https://github.com/nuhamozaini/Manateq) by [@nuhamozaini](https://github.com/nuhamozaini).



## Contributing
All contributions are welcome! 😊
Please only send PRs that benefit most users or have a common use case. For special use cases, please publish them to a separate repo.

## Issues
If you find an issue with the data please open an issue. If you're looking for help in using the data in your own projects, please use the appropriate forums, such as StackOverflow.


## License
[GPL-2.0](https://github.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts/blob/master/LICENSE)