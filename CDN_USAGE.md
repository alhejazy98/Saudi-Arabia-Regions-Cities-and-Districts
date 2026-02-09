# 🌐 استخدام المكتبة من CDN
# CDN Usage Guide

## 📦 نسختان متاحتان / Two Versions Available

### النسخة الكاملة / Full Version (~13MB)
تحتوي على جميع البيانات بما في ذلك الإحداثيات الجغرافية والحدود (GeoJSON)

**CDN Links:**
```html
<!-- UMD (للمتصفح) -->
<script src="https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@master/dist/index.js"></script>

<!-- ES Module -->
<script type="module">
  import * as SaudiGeodata from 'https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@master/dist/index.mjs';
</script>
```

**الوظائف المتاحة / Available Functions:**
- ✅ `getAllRegions()` - جميع المناطق
- ✅ `getAllCities()` - جميع المدن
- ✅ `getAllDistricts()` - جميع الأحياء
- ✅ `getCitiesByName(name)` - البحث عن المدن
- ✅ `getRegionById(id)` - منطقة حسب المعرف
- ✅ `getCityById(id)` - مدينة حسب المعرف
- ✅ `getDistrictById(id)` - حي حسب المعرف
- ✅ `getCitiesByRegion(regionId)` - مدن المنطقة
- ✅ `getDistrictsByCity(cityId)` - أحياء المدينة
- ✅ `getDistrictsByRegion(regionId)` - أحياء المنطقة
- ✅ `calculateDistance(lon1, lat1, lon2, lat2)` - حساب المسافة
- ✅ `reverseGeocode(lon, lat)` - تحديد الموقع من الإحداثيات
- ✅ `findNearestCities(lon, lat, count)` - أقرب المدن
- ✅ `findCitiesInRadius(lon, lat, radiusKm)` - المدن في نطاق معين
- ✅ `isWithinSaudiArabia(lon, lat)` - التحقق من الموقع داخل السعودية

---

### النسخة الخفيفة / Lite Version (~900KB)
تحتوي على البيانات الأساسية فقط (أسماء ومعرفات) بدون إحداثيات أو حدود

**CDN Links:**
```html
<!-- UMD (للمتصفح) -->
<script src="https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@master/dist/lite.js"></script>

<!-- ES Module -->
<script type="module">
  import * as SaudiGeodataLite from 'https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@master/dist/lite.mjs';
</script>
```

**الوظائف المتاحة / Available Functions:**
- ✅ `getAllRegions()` - جميع المناطق
- ✅ `getAllCities()` - جميع المدن
- ✅ `getAllDistricts()` - جميع الأحياء
- ✅ `getCitiesByName(name)` - البحث عن المدن
- ✅ `getRegionById(id)` - منطقة حسب المعرف
- ✅ `getCityById(id)` - مدينة حسب المعرف
- ✅ `getDistrictById(id)` - حي حسب المعرف
- ✅ `getCitiesByRegion(regionId)` - مدن المنطقة
- ✅ `getDistrictsByCity(cityId)` - أحياء المدينة
- ✅ `getDistrictsByRegion(regionId)` - أحياء المنطقة
- ❌ ~~`calculateDistance()`~~ - غير متاح (لا توجد إحداثيات)
- ❌ ~~`reverseGeocode()`~~ - غير متاح (لا توجد بيانات GeoJSON)
- ❌ ~~`findNearestCities()`~~ - غير متاح (لا توجد إحداثيات)
- ❌ ~~`findCitiesInRadius()`~~ - غير متاح (لا توجد إحداثيات)

---

## 🚀 أمثلة الاستخدام / Usage Examples

### مثال 1: النسخة الكاملة / Full Version Example

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Saudi Geodata - Full Version</title>
</head>
<body>
    <h1>مثال النسخة الكاملة</h1>
    <div id="result"></div>

    <script src="https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@master/dist/index.js"></script>
    <script>
        const geo = window.SaudiGeodata;
        
        // 1. جميع المناطق
        const regions = geo.getAllRegions();
        console.log('عدد المناطق:', regions.length);
        
        // 2. البحث عن مدينة
        const cities = geo.getCitiesByName('الرياض');
        console.log('مدن الرياض:', cities);
        
        // 3. تحديد الموقع من الإحداثيات
        const location = geo.reverseGeocode(46.6753, 24.7136);
        if (location) {
            console.log('المنطقة:', location.region.name_ar);
            console.log('أقرب مدينة:', location.nearestCity.name_ar);
            console.log('المسافة:', location.distance.toFixed(2), 'كم');
        }
        
        // 4. حساب المسافة بين مدينتين
        const riyadh = geo.getCityById(3);
        const jeddah = geo.getCityById(5);
        const distance = geo.calculateDistance(
            riyadh.center[0], riyadh.center[1],
            jeddah.center[0], jeddah.center[1]
        );
        console.log(`المسافة من ${riyadh.name_ar} إلى ${jeddah.name_ar}: ${distance.toFixed(2)} كم`);
        
        // 5. أقرب 5 مدن
        const nearest = geo.findNearestCities(46.6753, 24.7136, 5);
        nearest.forEach(item => {
            console.log(`${item.city.name_ar}: ${item.distance.toFixed(2)} كم`);
        });
        
        // عرض النتائج
        document.getElementById('result').innerHTML = `
            <p>عدد المناطق: ${regions.length}</p>
            <p>عدد المدن: ${geo.getAllCities().length}</p>
            <p>أقرب مدينة: ${nearest[0].city.name_ar}</p>
        `;
    </script>
</body>
</html>
```

### مثال 2: النسخة الخفيفة / Lite Version Example

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Saudi Geodata - Lite Version</title>
</head>
<body>
    <h1>مثال النسخة الخفيفة</h1>
    <div id="result"></div>

    <script src="https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@master/dist/lite.js"></script>
    <script>
        const geo = window.SaudiGeodataLite;
        
        // 1. جميع المناطق
        const regions = geo.getAllRegions();
        console.log('عدد المناطق:', regions.length);
        
        // 2. جميع المدن
        const cities = geo.getAllCities();
        console.log('عدد المدن:', cities.length);
        
        // 3. البحث عن مدينة
        const riyadhCities = geo.getCitiesByName('الرياض');
        console.log('نتائج البحث:', riyadhCities);
        
        // 4. مدن منطقة الرياض
        const riyadhRegionCities = geo.getCitiesByRegion(1);
        console.log('مدن منطقة الرياض:', riyadhRegionCities.length);
        
        // 5. أحياء مدينة الرياض
        const districts = geo.getDistrictsByCity(3);
        console.log('عدد أحياء الرياض:', districts.length);
        
        // عرض النتائج
        document.getElementById('result').innerHTML = `
            <p>عدد المناطق: ${regions.length}</p>
            <p>عدد المدن: ${cities.length}</p>
            <p>مدن منطقة الرياض: ${riyadhRegionCities.length}</p>
            <p>أحياء مدينة الرياض: ${districts.length}</p>
        `;
    </script>
</body>
</html>
```

### مثال 3: ES Modules (للمشاريع الحديثة)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ES Modules Example</title>
</head>
<body>
    <h1>مثال ES Modules</h1>
    <div id="result"></div>

    <script type="module">
        // استيراد النسخة الكاملة
        import * as SaudiGeodata from 'https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@master/dist/index.mjs';
        
        // استخدام المكتبة
        const regions = SaudiGeodata.getAllRegions();
        const cities = SaudiGeodata.getAllCities();
        
        const location = SaudiGeodata.reverseGeocode(46.6753, 24.7136);
        
        document.getElementById('result').innerHTML = `
            <h2>معلومات الموقع</h2>
            <p>المنطقة: ${location.region.name_ar}</p>
            <p>أقرب مدينة: ${location.nearestCity.name_ar}</p>
            <p>المسافة: ${location.distance.toFixed(2)} كم</p>
        `;
    </script>
</body>
</html>
```

---

## 🎯 متى تستخدم أي نسخة؟ / When to Use Which Version?

### استخدم النسخة الكاملة / Use Full Version When:
- ✅ تحتاج لحساب المسافات بين المدن
- ✅ تحتاج لتحديد الموقع من الإحداثيات (Reverse Geocoding)
- ✅ تحتاج للبحث عن أقرب المدن
- ✅ تعمل مع خرائط (Maps) وبيانات جغرافية
- ✅ حجم الملف ليس مشكلة (~13MB)

### استخدم النسخة الخفيفة / Use Lite Version When:
- ✅ تحتاج فقط للأسماء والمعرفات
- ✅ تبني قوائم منسدلة (Dropdowns)
- ✅ تحتاج لسرعة تحميل أعلى
- ✅ لا تحتاج للوظائف الجغرافية
- ✅ حجم الملف مهم (~900KB فقط)

---

## 📊 مقارنة الأداء / Performance Comparison

| المقارنة / Feature | النسخة الكاملة / Full | النسخة الخفيفة / Lite |
|-------------------|-------------------|-------------------|
| **حجم الملف / Size** | ~13 MB | ~900 KB |
| **وقت التحميل / Load Time** | 2-5 ثواني | < 1 ثانية |
| **البيانات الجغرافية / Geodata** | ✅ متاح | ❌ غير متاح |
| **البيانات الأساسية / Basic Data** | ✅ متاح | ✅ متاح |
| **حساب المسافات / Distance** | ✅ متاح | ❌ غير متاح |
| **Reverse Geocoding** | ✅ متاح | ❌ غير متاح |

---

## 🔗 روابط إضافية / Additional Links

- **GitHub Repository**: https://github.com/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts
- **npm Package**: `npm install saudi-arabia-geodata`
- **Documentation**: [README.md](README.md)
- **API Reference**: [docs/API.md](docs/API.md)

---

## 📝 ملاحظات / Notes

1. **التخزين المؤقت / Caching**: jsDelivr CDN يخزن الملفات تلقائياً لتحميل أسرع
2. **الإصدارات / Versioning**: استخدم `@master` للإصدار الأخير أو حدد إصدار معين
3. **الأداء / Performance**: النسخة الخفيفة أسرع 10x في التحميل
4. **المتصفحات / Browsers**: يعمل على جميع المتصفحات الحديثة (Chrome, Firefox, Safari, Edge)

---

## 🆘 المساعدة / Support

إذا واجهت أي مشاكل، يرجى فتح Issue في GitHub:
https://github.com/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts/issues
