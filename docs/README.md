# 📚 Documentation Index | فهرس التوثيق

Welcome to Saudi Arabia Geodata documentation!  
مرحباً بكم في توثيق مكتبة البيانات الجغرافية للمملكة العربية السعودية!

## 📖 Documentation Files | ملفات التوثيق

### 1. [API Documentation](./API.md) | [توثيق API](./API.md)
Complete API reference with all available functions, parameters, and examples.  
المرجع الكامل لـ API مع جميع الدوال المتاحة والمعاملات والأمثلة.

**Contents:**
- Region Functions | دوال المناطق
- City Functions | دوال المدن
- District Functions | دوال الأحياء
- GeoJSON Functions | دوال GeoJSON
- Utility Functions | دوال مساعدة
- Type Definitions | تعريفات الأنواع

### 2. [Build Guide](./BUILD.md) | [دليل البناء](./BUILD.md)
Step-by-step guide for building and setting up the project.  
دليل خطوة بخطوة لبناء وإعداد المشروع.

**Contents:**
- Quick Setup | الإعداد السريع
- Development Workflow | سير العمل التطويري
- Build Configuration | إعدادات البناء
- Testing | الاختبار
- Troubleshooting | حل المشاكل

### 3. [Publishing Guide](./PUBLISHING.md) | [دليل النشر](./PUBLISHING.md)
Complete guide for publishing the package to npm.  
دليل كامل لنشر الحزمة على npm.

**Contents:**
- Publishing Prerequisites | متطلبات النشر
- Step-by-Step Publishing | النشر خطوة بخطوة
- Version Management | إدارة الإصدارات
- Best Practices | أفضل الممارسات
- CI/CD Integration | تكامل CI/CD

## 🎯 Quick Links | روابط سريعة

### For Users | للمستخدمين

- **Getting Started**: See [main README](../README.md)
- **Installation**: `npm install saudi-arabia-geodata`
- **Examples**: Check [examples](../examples) directory
- **TypeScript Support**: Full type definitions included

### For Contributors | للمساهمين

- **Build from Source**: Follow [Build Guide](./BUILD.md)
- **API Reference**: See [API Documentation](./API.md)
- **Publishing**: Read [Publishing Guide](./PUBLISHING.md)

## 📦 Package Versions | إصدارات الحزمة

### Full Version | النسخة الكاملة
```javascript
import { getAllRegions } from 'saudi-arabia-geodata';
```
- Size: ~45MB
- Includes: Geographic coordinates, boundaries, GeoJSON
- Best for: Web apps with maps, desktop apps

### Lite Version | النسخة الخفيفة
```javascript
import { getAllRegions } from 'saudi-arabia-geodata/lite';
```
- Size: ~2MB
- Includes: All data except geographic coordinates
- Best for: Mobile apps, lightweight projects

## 🚀 Quick Examples | أمثلة سريعة

### Basic Usage | الاستخدام الأساسي

```javascript
import { getAllRegions, searchCities } from 'saudi-arabia-geodata';

// Get all regions
const regions = getAllRegions();

// Search for cities
const results = searchCities('الرياض');
```

### Vue.js Integration | التكامل مع Vue.js

See [vue-example.vue](../examples/vue-example.vue)

### React Integration | التكامل مع React

See [react-example.jsx](../examples/react-example.jsx)

### React Native Integration | التكامل مع React Native

See [react-native-example.jsx](../examples/react-native-example.jsx)

## 📊 Data Coverage | تغطية البيانات

- **13 Regions** | 13 منطقة
- **1,800+ Cities** | أكثر من 1,800 مدينة
- **5,000+ Districts** | أكثر من 5,000 حي
- **Bilingual** | ثنائي اللغة (عربي - إنجليزي)
- **GeoJSON Support** | دعم GeoJSON

## 🗺️ Use Cases | حالات الاستخدام

1. **Location Selectors** - Build region/city/district dropdowns
2. **Map Visualization** - Display boundaries and locations on maps
3. **Address Forms** - Structured address input forms
4. **Data Analysis** - Population and demographic analysis
5. **Search Functionality** - Intelligent Arabic/English search

## 🔧 Technical Details | التفاصيل التقنية

### Technology Stack | المكدس التقني

- **Language**: TypeScript
- **Build Tool**: Rollup
- **Module Formats**: CommonJS, ES Modules
- **Type Definitions**: Included (.d.ts files)

### Browser Support | دعم المتصفحات

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: iOS Safari, Chrome Mobile

### Node.js Support | دعم Node.js

- Node.js >= 14.0.0

## 📝 Code Examples | أمثلة البرمجة

### Search with Options | البحث مع الخيارات

```javascript
import { searchCities } from 'saudi-arabia-geodata';

const results = searchCities('جدة', {
  searchInArabic: true,
  searchInEnglish: false,
  exactMatch: false,
  caseSensitive: false
});
```

### Get Cities by Region | الحصول على المدن حسب المنطقة

```javascript
import { getCitiesByRegion, getRegionByCode } from 'saudi-arabia-geodata';

const riyadhRegion = getRegionByCode('RD');
if (riyadhRegion) {
  const cities = getCitiesByRegion(riyadhRegion.region_id);
  console.log(`Found ${cities.length} cities in Riyadh`);
}
```

### Map Integration | التكامل مع الخرائط

```javascript
import { getRegionsGeoJSON } from 'saudi-arabia-geodata';
import L from 'leaflet';

const geoJSON = getRegionsGeoJSON();
if (geoJSON) {
  const map = L.map('map').setView([24.7, 46.7], 6);
  L.geoJSON(geoJSON, {
    style: { color: '#1a5f3a', weight: 2 }
  }).addTo(map);
}
```

## 🆘 Getting Help | الحصول على المساعدة

### Documentation | التوثيق

1. Read the [API Documentation](./API.md)
2. Check the [examples](../examples)
3. Review the [Build Guide](./BUILD.md)

### Issues | المشاكل

- Report bugs on [GitHub Issues](https://github.com/YOUR_USERNAME/Saudi-Arabia-Regions-Cities-and-Districts/issues)
- Include code samples and error messages
- Specify your environment (Node version, browser, etc.)

### Community | المجتمع

- Ask questions on Stack Overflow with tag `saudi-arabia-geodata`
- Check existing issues before creating new ones

## 🤝 Contributing | المساهمة

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Build and test locally
5. Submit a pull request

See [Build Guide](./BUILD.md) for development setup.

## 📄 License | الترخيص

MIT License - See [LICENSE](../LICENSE) file for details

## 🙏 Credits | الشكر والتقدير

Data sourced from official Saudi Arabian government sources.  
البيانات مستمدة من المصادر الحكومية الرسمية للمملكة العربية السعودية.

---

Made with ❤️ for Saudi Arabia | صُنع بـ ❤️ للمملكة العربية السعودية

**Last Updated**: February 2026
