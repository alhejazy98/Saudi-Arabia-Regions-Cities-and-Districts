# Quick Start Guide | دليل البدء السريع

Get started with saudi-arabia-geodata in 5 minutes!  
ابدأ مع مكتبة saudi-arabia-geodata في 5 دقائق!

## Installation | التثبيت

```bash
npm install saudi-arabia-geodata
```

## Basic Usage | الاستخدام الأساسي

### 1. Get All Regions | الحصول على جميع المناطق

```javascript
import { getAllRegions } from 'saudi-arabia-geodata';

const regions = getAllRegions();

console.log(`Total regions: ${regions.length}`); // 13

regions.forEach(region => {
  console.log(`${region.name_ar} - ${region.name_en}`);
});
```

**Output:**
```
منطقة الرياض - Riyadh
منطقة مكة المكرمة - Makkah
منطقة المدينة المنورة - Madinah
...
```

### 2. Search for Cities | البحث عن المدن

```javascript
import { searchCities } from 'saudi-arabia-geodata';

// Search in Arabic
const results = searchCities('جدة');

console.log(`Found ${results.length} cities`);
results.forEach(city => {
  console.log(`${city.name_ar} - ${city.name_en}`);
});
```

### 3. Get Cities by Region | الحصول على مدن المنطقة

```javascript
import { getCitiesByRegion, getRegionByCode } from 'saudi-arabia-geodata';

// Get Riyadh region
const riyadh = getRegionByCode('RD');

if (riyadh) {
  // Get all cities in Riyadh
  const cities = getCitiesByRegion(riyadh.region_id);
  
  console.log(`Cities in ${riyadh.name_ar}: ${cities.length}`);
}
```

### 4. Using with Vue.js | الاستخدام مع Vue.js

```vue
<template>
  <div>
    <select v-model="selectedRegion">
      <option v-for="region in regions" :key="region.region_id" :value="region.region_id">
        {{ region.name_ar }} - {{ region.name_en }}
      </option>
    </select>
    
    <ul v-if="cities.length">
      <li v-for="city in cities" :key="city.city_id">
        {{ city.name_ar }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getAllRegions, getCitiesByRegion } from 'saudi-arabia-geodata';

export default {
  data() {
    return {
      regions: [],
      cities: [],
      selectedRegion: null
    };
  },
  mounted() {
    this.regions = getAllRegions();
  },
  watch: {
    selectedRegion(regionId) {
      if (regionId) {
        this.cities = getCitiesByRegion(regionId);
      }
    }
  }
};
</script>
```

### 5. Using with React | الاستخدام مع React

```jsx
import React, { useState, useEffect } from 'react';
import { getAllRegions, getCitiesByRegion } from 'saudi-arabia-geodata';

function RegionSelector() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setRegions(getAllRegions());
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      setCities(getCitiesByRegion(Number(selectedRegion)));
    }
  }, [selectedRegion]);

  return (
    <div>
      <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
        <option value="">Select Region</option>
        {regions.map(region => (
          <option key={region.region_id} value={region.region_id}>
            {region.name_ar} - {region.name_en}
          </option>
        ))}
      </select>

      <ul>
        {cities.map(city => (
          <li key={city.city_id}>{city.name_ar}</li>
        ))}
      </ul>
    </div>
  );
}

export default RegionSelector;
```

### 6. Using Lite Version | استخدام النسخة الخفيفة

For smaller bundle size (recommended for mobile apps):

```javascript
// Import from /lite
import { 
  getAllRegions, 
  getAllCities,
  getAllDistricts,
  searchDistricts 
} from 'saudi-arabia-geodata/lite';

const regions = getAllRegions();
const cities = getAllCities();
const districts = getAllDistricts();

// Search districts
const results = searchDistricts('العليا');
console.log(`Found ${results.length} districts`);
```

## Common Patterns | الأنماط الشائعة

### Pattern 1: Region → Cities → Districts

```javascript
import { 
  getRegionById,
  getCitiesByRegion,
  getDistrictsByCity 
} from 'saudi-arabia-geodata/lite';

// Get region
const region = getRegionById(1);

// Get cities in region
const cities = getCitiesByRegion(region.region_id);

// Get districts in first city
const districts = getDistrictsByCity(cities[0].city_id);

console.log(`Region: ${region.name_ar}`);
console.log(`Cities: ${cities.length}`);
console.log(`Districts in ${cities[0].name_ar}: ${districts.length}`);
```

### Pattern 2: Search with Auto-complete

```javascript
import { searchCities } from 'saudi-arabia-geodata';

function handleSearchInput(query) {
  if (query.length >= 2) {
    const results = searchCities(query, {
      searchInArabic: true,
      searchInEnglish: true,
      caseSensitive: false
    });
    
    // Display results in dropdown
    displaySuggestions(results);
  }
}
```

### Pattern 3: Map Integration

```javascript
import { getRegionsGeoJSON } from 'saudi-arabia-geodata';
import L from 'leaflet';

// Create map
const map = L.map('map').setView([24.7136, 46.6753], 6);

// Add base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Add regions
const geoJSON = getRegionsGeoJSON();
if (geoJSON) {
  L.geoJSON(geoJSON, {
    style: { color: '#1a5f3a', weight: 2 },
    onEachFeature: (feature, layer) => {
      layer.bindPopup(feature.properties.name_ar);
    }
  }).addTo(map);
}
```

## Tips & Best Practices | نصائح وأفضل الممارسات

### 1. Choose the Right Version | اختر الإصدار المناسب

- **Full Version**: Use when you need GeoJSON/coordinates
- **Lite Version**: Use for mobile apps or when bundle size matters

### 2. Cache Results | احفظ النتائج مؤقتاً

```javascript
// ✅ Good - call once
const regions = getAllRegions();

// ❌ Avoid - calling multiple times
regions.forEach(() => {
  getAllRegions(); // Don't do this!
});
```

### 3. Use Search Options | استخدم خيارات البحث

```javascript
// Search only in Arabic
searchCities('مكة', { searchInEnglish: false });

// Exact match
searchCities('Riyadh', { exactMatch: true });

// Case sensitive
searchCities('RIYADH', { caseSensitive: true });
```

### 4. TypeScript Support | دعم TypeScript

```typescript
import { 
  Region, 
  City, 
  getAllRegions 
} from 'saudi-arabia-geodata';

const regions: Region[] = getAllRegions();
const region: Region | undefined = regions[0];
```

## Troubleshooting | حل المشاكل

### Issue: Module not found

```bash
# Make sure it's installed
npm install saudi-arabia-geodata

# Check package.json
cat package.json | grep saudi-arabia-geodata
```

### Issue: TypeScript types not working

```typescript
// Make sure you're importing correctly
import { getAllRegions } from 'saudi-arabia-geodata'; // ✅
import { getAllRegions } from 'saudi-arabia-geodata/lite'; // ✅
```

### Issue: Large bundle size

```javascript
// Use lite version
import { getAllRegions } from 'saudi-arabia-geodata/lite';

// Or use dynamic imports
async function loadGeoJSON() {
  const { getRegionsGeoJSON } = await import('saudi-arabia-geodata');
  return getRegionsGeoJSON();
}
```

## Next Steps | الخطوات التالية

1. 📖 Read the [Complete API Documentation](./docs/API.md)
2. 🎨 Check out [Full Examples](./examples)
3. 🗺️ Learn about [Map Integration](./docs/API.md#geojson-functions)
4. 🔧 See the [Build Guide](./docs/BUILD.md)

## Need Help? | تحتاج مساعدة؟

- 📚 [Full Documentation](./docs/README.md)
- 💬 [GitHub Discussions](https://github.com/YOUR_USERNAME/Saudi-Arabia-Regions-Cities-and-Districts/discussions)
- 🐛 [Report Issues](https://github.com/YOUR_USERNAME/Saudi-Arabia-Regions-Cities-and-Districts/issues)

---

Happy Coding! 🚀 | برمجة سعيدة!
