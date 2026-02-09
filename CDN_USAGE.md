# 🌐 استخدام المكتبة من CDN
# CDN Usage Guide

## 📦 نسختان متاحتان / Two Versions Available

### النسخة الكاملة / Full Version (~17MB)
تحتوي على المناطق والمدن مع الإحداثيات الجغرافية والحدود (GeoJSON)
**ملاحظة:** بيانات الأحياء غير متوفرة في هذه النسخة (استخدم npm أو النسخة الخفيفة)

**CDN Links:**
```html
<!-- UMD (للمتصفح) -->
<script src="https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@v1.0.1/dist/index.js"></script>

<!-- ES Module -->
<script type="module">
  import * as SaudiGeodata from 'https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@v1.0.1/dist/index.mjs';
</script>
```

**الوظائف المتاحة / Available Functions:**
- ✅ `getAllRegions()` - جميع المناطق
- ✅ `getAllCities()` - جميع المدن
- ⚠️ `getAllDistricts()` - يعيد مصفوفة فارغة (استخدم النسخة الخفيفة أو npm)
- ✅ `getCitiesByName(name)` - البحث عن المدن
- ✅ `getRegionById(id)` - منطقة حسب المعرف
- ✅ `getCityById(id)` - مدينة حسب المعرف
- ✅ `getCitiesByRegion(regionId)` - مدن المنطقة
- ✅ `calculateDistance(lon1, lat1, lon2, lat2)` - حساب المسافة
- ✅ `reverseGeocode(lon, lat)` - تحديد الموقع من الإحداثيات
- ✅ `findNearestCities(lon, lat, count)` - أقرب المدن
- ✅ `findCitiesInRadius(lon, lat, radiusKm)` - المدن في نطاق معين
- ✅ `isWithinSaudiArabia(lon, lat)` - التحقق من الموقع داخل السعودية

---

### النسخة الخفيفة / Lite Version (~1MB) ⭐ موصى به
تحتوي على البيانات الأساسية (أسماء، معرفات، أحياء) بدون إحداثيات أو حدود

**CDN Links:**
```html
<!-- UMD (للمتصفح) -->
<script src="https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@v1.0.1/dist/lite.js"></script>

<!-- ES Module -->
<script type="module">
  import * as SaudiGeodataLite from 'https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@v1.0.1/dist/lite.mjs';
</script>
```

**الوظائف المتاحة / Available Functions:**
- ✅ `getAllRegions()` - جميع المناطق
- ✅ `getAllCities()` - جميع المدن
- ✅ `getAllDistricts()` - جميع الأحياء (البيانات الأساسية)
- ✅ `getCitiesByName(name)` - البحث عن المدن
- ✅ `getRegionById(id)` - منطقة حسب المعرف
- ✅ `getCityById(id)` - مدينة حسب المعرف
- ✅ `getDistrictById(id)` - حي حسب المعرف
- ✅ `getCitiesByRegion(regionId)` - مدن المنطقة
- ✅ `getDistrictsByCity(cityId)` - أحياء المدينة
- ✅ `getDistrictsByRegion(regionId)` - أحياء المنطقة
- ✅ `calculateDistance(lon1, lat1, lon2, lat2)` - حساب المسافة (إن وجدت الإحداثيات)
- ❌ ~~`reverseGeocode()`~~ - غير متاح (لا توجد بيانات GeoJSON)
- ❌ ~~`findNearestCities()`~~ - غير متاح (لا توجد إحداثيات في الأحياء)
- ❌ ~~`findCitiesInRadius()`~~ - غير متاح (لا توجد إحداثيات في الأحياء)

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

    <script src="https://cdn.jsdelivr.net/gh/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts@v1.0.1/dist/lite.js"></script>
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
- ✅ حجم الملف ليس مشكلة (~17MB)
- ❌ لا تحتاج لبيانات الأحياء

### استخدم النسخة الخفيفة / Use Lite Version When: ⭐ موصى به
- ✅ تحتاج للأسماء والمعرفات
- ✅ تحتاج لبيانات الأحياء (Districts)
- ✅ تبني قوائم منسدلة (Dropdowns)
- ✅ تحتاج لسرعة تحميل أعلى
- ✅ لا تحتاج للوظائف الجغرافية المتقدمة
- ✅ حجم الملف مهم (~1MB فقط)

### استخدم npm Package للحصول على كل شيء:
```bash
npm install alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts
```
- ✅ جميع البيانات (مناطق، مدن، أحياء)
- ✅ جميع الوظائف الجغرافية
- ✅ لا قيود على الحجم

---

## 📊 مقارنة الأداء / Performance Comparison

| المقارنة / Feature | النسخة الكاملة / Full | النسخة الخفيفة / Lite ⭐ |
|-------------------|-------------------|-------------------|
| **حجم الملف / Size** | ~17 MB | ~1 MB |
| **وقت التحميل / Load Time** | 3-7 ثواني | < 1 ثانية |
| **البيانات الجغرافية / Geodata** | ✅ متاح | ❌ غير متاح |
| **المناطق والمدن / Regions & Cities** | ✅ متاح | ✅ متاح |
| **الأحياء / Districts** | ❌ غير متاح* | ✅ متاح (5000+) |
| **حساب المسافات / Distance** | ✅ متاح | ❌ غير متاح |
| **Reverse Geocoding** | ✅ متاح | ❌ غير متاح |

> **ملاحظة هامة:** بيانات الأحياء (districts.json) كبيرة جداً (58MB) ولا يمكن تحميلها عبر CDN.  
> للحصول على جميع بيانات الأحياء الكاملة مع التفاصيل، يرجى استخدام npm package.

---

## 🔗 روابط إضافية / Additional Links

- **GitHub Repository**: https://github.com/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts
- **npm Installation**: `npm install github:alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts`
- **Documentation**: [README.md](README.md)
- **API Reference**: [docs/API.md](docs/API.md)

---

## 📝 ملاحظات / Notes

1. **التخزين المؤقت / Caching**: jsDelivr CDN يخزن الملفات تلقائياً لتحميل أسرع
2. **الإصدارات / Versioning**: استخدم `@v1.0.1` للإصدار الثابت أو `@master` للإصدار الأخير
3. **الأداء / Performance**: النسخة الخفيفة أسرع 10x في التحميل
4. **المتصفحات / Browsers**: يعمل على جميع المتصفحات الحديثة (Chrome, Firefox, Safari, Edge)
5. **حد الحجم / Size Limit**: jsDelivr يسمح بملفات حتى 20MB فقط، لذلك تم استبعاد الأحياء من النسخة الكاملة

---

## 🆘 المساعدة / Support

إذا واجهت أي مشاكل، يرجى فتح Issue في GitHub:
https://github.com/alhejazy98/Saudi-Arabia-Regions-Cities-and-Districts/issues
