# Changelog | سجل التغييرات

All notable changes to this project will be documented in this file.  
سيتم توثيق جميع التغييرات المهمة في هذا الملف.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-02-XX

### Added | المضاف
- 🌍 **Reverse Geocoding** - Convert GPS coordinates to location details
  - `reverseGeocode(lat, lon)` - Complete location lookup from coordinates
  - `findRegionByCoordinates(lat, lon)` - Find region containing specific coordinates
  - `findNearestCity(lat, lon, cities, maxRadius?)` - Find closest city to coordinates
  - `findCitiesInRadius(lat, lon, cities, radius)` - Find all cities within specified radius
  - `isWithinSaudiArabia(lat, lon)` - Check if coordinates are within Saudi Arabia bounds
  - `findClosestRegion(lat, lon)` - Find nearest region by distance
  
- 🗺️ **Geometric Operations** - Advanced spatial calculations
  - Point-in-polygon detection for accurate region identification
  - Haversine distance formula for accurate distance calculations
  - Bounding box optimization for faster polygon checks
  - Ray casting algorithm for polygon containment
  
- 🎯 **Performance Optimizations** - Speed and efficiency improvements
  - `SpatialIndex` class with grid-based indexing (1-degree cells)
  - Bounding box caching for regions
  - Spatial cache for repeated queries
  - Grid-based city lookup for O(1) average case performance
  - Pre-filtering with bounding boxes before expensive polygon operations
  
- 🧪 **Comprehensive Testing** - Quality assurance
  - 79 test cases with 100% pass rate
  - Unit tests for geo-utils module (calculateDistance, isPointInPolygon, SpatialIndex)
  - Unit tests for reverse-geocoding module (all location finder functions)
  - Integration tests for main API
  - Lite version compatibility tests
  - Performance benchmarks included
  
- 📚 **Enhanced Documentation**
  - Updated API.md with reverse geocoding examples
  - Added coordinate format specifications [latitude, longitude]
  - Saudi Arabia bounding box documentation (16.0-32.5°N, 34.5-56.0°E)
  - Performance optimization guidelines
  - Real-world usage examples with GPS coordinates
  
### Changed | المتغير
- 📦 Updated TypeScript configuration for better compatibility
- 🎨 Improved code structure with separate geo-utils module
- 📖 Enhanced README with bilingual examples (Arabic & English)
- ⚡ Optimized bundle size through tree-shaking

### Technical Implementation | التنفيذ التقني
- TypeScript 5.3.3 with strict mode enabled
- Rollup bundler for optimized dual builds (CommonJS + ESM)
- Jest 29.7.0 testing framework with ts-jest integration
- Full type definitions for all new functions
- Modular architecture for better maintainability

## [1.0.0] - 2026-02-09

### Added | المضاف
- ✨ Initial release of saudi-arabia-geodata npm package
- 🗺️ Complete geographic data for Saudi Arabia
  - 13 Regions with population and boundaries
  - 1,800+ Cities with coordinates
  - 5,000+ Districts
- 📦 Two bundle versions:
  - Full version with GeoJSON support (~45MB)
  - Lite version without geographic data (~2MB)
- 🎯 TypeScript support with full type definitions
- 🔍 Search functionality with options:
  - Arabic/English name search
  - Case-sensitive/insensitive
  - Exact match support
- 📖 Comprehensive API functions:
  - `getAllRegions()`, `getRegionById()`, `getRegionByCode()`
  - `getAllCities()`, `getCityById()`, `getCitiesByRegion()`
  - `getAllDistricts()`, `getDistrictById()`, `getDistrictsByCity()`
  - `searchRegions()`, `searchCities()`, `searchDistricts()`
  - `getRegionsGeoJSON()`, `getCitiesGeoJSON()`, `getDistrictsGeoJSON()`
  - `getTotalPopulation()`, `getRegionsByPopulation()`
- 📝 Complete documentation:
  - API reference with examples
  - Build and setup guide
  - Publishing guide
- 🎨 Usage examples:
  - Vue.js integration example
  - React integration example
  - React Native integration example
- 🌐 Bilingual support (Arabic/English)
- 📍 GeoJSON format support for map integration

### Supported Frameworks | الأطر المدعومة
- ✅ Vue.js 2.x and 3.x
- ✅ React 16.x+
- ✅ React Native
- ✅ Next.js
- ✅ Nuxt.js
- ✅ Angular
- ✅ Node.js applications

### Data Sources | مصادر البيانات
- Data collected from official Saudi government sources (https://maps.address.gov.sa/)
- All coordinates in (Lat, Lon) format with 8 decimal points

---

## [Unreleased] | [قيد التطوير]

### Planned Features | الميزات المخططة
- 🔄 Real-time data updates
- 🌍 Multi-language support (beyond Arabic/English)
- 📱 React Native optimized builds
- 🗺️ Additional map provider integrations
- 🔍 Advanced search algorithms
- 📊 Population statistics and demographics
- 🏢 Government facilities data
- 🚗 Road network data

---

## Version History | تاريخ الإصدارات

### Release Notes Format | تنسيق ملاحظات الإصدار

Each version includes:
- **Added** | المضاف: New features
- **Changed** | المعدل: Changes in existing functionality
- **Deprecated** | المهمل: Soon-to-be removed features
- **Removed** | المحذوف: Removed features
- **Fixed** | المصلح: Bug fixes
- **Security** | الأمان: Security updates

---

## Contributing | المساهمة

When contributing, please update this changelog with your changes under the "Unreleased" section.

عند المساهمة، يرجى تحديث سجل التغييرات هذا بإضافة التغييرات الخاصة بك تحت قسم "قيد التطوير".

---

## Links | الروابط

- [npm package](https://www.npmjs.com/package/saudi-arabia-geodata)
- [GitHub Repository](https://github.com/YOUR_USERNAME/Saudi-Arabia-Regions-Cities-and-Districts)
- [Documentation](./docs/README.md)
- [API Reference](./docs/API.md)

---

Made with ❤️ for Saudi Arabia | صُنع بـ ❤️ للمملكة العربية السعودية
