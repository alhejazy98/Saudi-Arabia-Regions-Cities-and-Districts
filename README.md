# Saudi Arabia Geodata Library 🇸🇦
# مكتبة البيانات الجغرافية للمملكة العربية السعودية

[![License: GPL-2.0](https://img.shields.io/badge/License-GPL--2.0-blue.svg)](https://opensource.org/licenses/GPL-2.0)
[![Tests](https://img.shields.io/badge/tests-79%20passing-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)]()

A comprehensive TypeScript/JavaScript library for Saudi Arabia's geographic data with advanced reverse geocoding capabilities.

مكتبة شاملة بلغة TypeScript/JavaScript للبيانات الجغرافية للمملكة العربية السعودية مع قدرات متقدمة للبحث الجغرافي العكسي.

---

## ✨ Features / المميزات

- 🗺️ **Complete Data** - 13 regions, 1800+ cities, 5000+ districts
- 🌍 **Reverse Geocoding** - GPS coordinates → location details
- 📍 **Point-in-Polygon** - Region boundary detection
- 🎯 **Spatial Indexing** - Fast nearest city search
- 🔍 **Smart Search** - Arabic & English with flexible options
- 📦 **Dual Versions** - Full (45MB) + Lite (2MB)
- ⚡ **Optimized** - Spatial caching & tree-shaking
- 🎨 **Framework Ready** - Vue, React, React Native, Angular
- 💪 **TypeScript** - Full type safety
- 🧪 **Well Tested** - 79 tests, 100% pass rate

## 📦 Installation / التثبيت

```bash
# From GitHub
npm install alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts

# Local development
git clone https://github.com/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts.git
cd Saudi-Arabia-Regions-Cities-and-Districts
npm install
npm run build
```

## 🚀 Quick Start / البداية السريعة

## 🚀 Quick Start / البداية السريعة

```javascript
import { reverseGeocode, searchCities, getAllRegions } from 'saudi-arabia-geodata';

// Reverse geocoding from GPS coordinates
const location = reverseGeocode(24.7136, 46.6753);
console.log(location.region?.name_ar);      // "منطقة الرياض"
console.log(location.nearestCity?.name_en); // "Riyadh"
console.log(location.distance);             // Distance in km

// Search cities
const cities = searchCities('جدة');
console.log(cities[0].name_en);  // "Jeddah"

// Get all regions
const regions = getAllRegions();  // 13 regions
```

## 📚 Documentation / التوثيق

- **[API Reference](./docs/API.md)** - Complete API documentation
- **[Build Guide](./docs/BUILD.md)** - Development setup
- **[Quick Start](./QUICKSTART.md)** - Beginner's guide
- **[Examples](./examples/)** - Vue.js, React, React Native

## 🎯 Use Cases / حالات الاستخدام

- 📍 Location-based services (GPS → address)
- 🗺️ Interactive maps
- 📱 Mobile apps (Lite version: 2MB)
- 🚗 Navigation & routing
- 📊 Data visualization
- 🏢 Address validation
- 🛒 E-commerce shipping zones

## 🙏 Acknowledgments / الشكر والتقدير

This project builds upon the excellent work of **[@homaily](https://github.com/homaily)'s** original repository: [Saudi-Arabia-Regions-Cities-and-Districts](https://github.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts)

**Original Data Source:** [Saudi Address Database](https://maps.address.gov.sa/)

### What's New in This Version / ما الجديد

- ✨ Complete TypeScript/JavaScript library
- 🌍 Advanced reverse geocoding
- 📍 Point-in-polygon detection
- ⚡ Spatial indexing & caching
- 🧪 79 comprehensive tests
- 📚 Bilingual documentation
- 🎨 Framework examples
- 📦 Dual bundle (Full + Lite)

نشكر المستودع الأصلي على توفير البيانات الجغرافية القيمة.

## 📊 Data Information / معلومات البيانات

## 📊 Data Information / معلومات البيانات

- **13 Regions** - With population, capitals, and boundaries
- **1,800+ Cities** - With coordinates and region mapping
- **5,000+ Districts** - With city associations
- **Bilingual** - Arabic and English names
- **Formats** - JSON, GeoJSON, MySQL, TypeScript

## 🔗 Related Projects / مشاريع ذات صلة

- [KSA Covid-19 Map](https://github.com/0x0Faisal/Covid19-Map) by [@0x0Faisal](https://github.com/0x0Faisal)
- [Manateq](https://github.com/nuhamozaini/Manateq) by [@nuhamozaini](https://github.com/nuhamozaini)
- [Saudi_GIS_Data](https://github.com/usefksa/Saudi_GIS_Data) by [@usef_ksa](https://github.com/usef_ksa)

## 🤝 Contributing / المساهمة

Contributions welcome! Please submit a Pull Request.

```bash
git clone https://github.com/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts.git
cd Saudi-Arabia-Regions-Cities-and-Districts
npm install
npm test
npm run build
```

## 📄 License / الرخصة

[GPL-2.0](./LICENSE) - Inherited from the original repository

---

**Made with ❤️ for Saudi Arabia / صنع بـ ❤️ للمملكة العربية السعودية**

