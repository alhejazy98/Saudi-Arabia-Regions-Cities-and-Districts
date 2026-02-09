# Publishing Checklist | قائمة النشر

استخدم هذه القائمة قبل النشر على npm

Use this checklist before publishing to npm

## Pre-Publishing Checklist | قائمة ما قبل النشر

### 1. Code Quality | جودة الكود

- [ ] All TypeScript files compile without errors
      جميع ملفات TypeScript تُترجم بدون أخطاء
- [ ] No console.log statements in production code
      لا توجد console.log في الكود الإنتاجي
- [ ] Code is properly formatted
      الكود منسق بشكل صحيح
- [ ] All functions have JSDoc comments
      جميع الدوال موثقة بـ JSDoc

### 2. Documentation | التوثيق

- [ ] README.md is up to date
      README.md محدث
- [ ] API documentation is complete
      توثيق API كامل
- [ ] Examples are working and tested
      الأمثلة تعمل ومختبرة
- [ ] CHANGELOG.md is updated with new version
      CHANGELOG.md محدث بالإصدار الجديد

### 3. Package Configuration | إعدادات الحزمة

- [ ] Version number is incremented in package.json
      رقم الإصدار محدث في package.json
- [ ] All dependencies are listed correctly
      جميع المتطلبات مدرجة بشكل صحيح
- [ ] Repository URL is correct
      رابط المستودع صحيح
- [ ] Author information is filled
      معلومات المؤلف مكتملة
- [ ] Keywords are relevant
      الكلمات المفتاحية مناسبة
- [ ] License is specified
      الترخيص محدد

### 4. Build & Test | البناء والاختبار

- [ ] `npm install` works without errors
      npm install يعمل بدون أخطاء
- [ ] `npm run build` completes successfully
      npm run build يكتمل بنجاح
- [ ] dist/ folder contains all necessary files
      مجلد dist/ يحتوي على جميع الملفات الضرورية
- [ ] Test the package locally with `npm pack`
      اختبر الحزمة محلياً بـ npm pack
- [ ] Install and test in a fresh project
      ثبت واختبر في مشروع جديد

### 5. Files to Include | الملفات المطلوبة

- [ ] dist/ (built files)
- [ ] json/ (data files)
- [ ] geojson/ (optional, for full version)
- [ ] README.md
- [ ] LICENSE
- [ ] package.json
- [ ] CHANGELOG.md

### 6. Files to Exclude | الملفات المستبعدة

Make sure .npmignore includes:
- [ ] src/ (source files)
- [ ] node_modules/
- [ ] .git/
- [ ] .github/
- [ ] examples/ (optional, can be included)
- [ ] docs/ (optional, can be included)
- [ ] *.log
- [ ] .vscode/
- [ ] .idea/

### 7. Final Checks | الفحوصات النهائية

- [ ] Test both full and lite versions
      اختبر النسخة الكاملة والخفيفة
- [ ] Check bundle sizes
      تحقق من أحجام الحزم
- [ ] Verify TypeScript types work
      تأكد من عمل أنواع TypeScript
- [ ] Test in different frameworks (Vue, React)
      اختبر في أطر مختلفة (Vue، React)
- [ ] npm login is successful
      npm login ناجح

## Publishing Commands | أوامر النشر

```bash
# 1. Update version
npm version patch  # or minor, or major

# 2. Build the package
npm run build

# 3. Test locally
npm pack
npm install ./saudi-arabia-geodata-1.0.0.tgz

# 4. Publish
npm publish --access public

# 5. Verify
npm info saudi-arabia-geodata
```

## Post-Publishing Checklist | قائمة ما بعد النشر

### 1. Verification | التحقق

- [ ] Package appears on npm
      الحزمة ظاهرة على npm
- [ ] Installation works: `npm install saudi-arabia-geodata`
      التثبيت يعمل
- [ ] Test installation in a new project
      اختبر التثبيت في مشروع جديد
- [ ] TypeScript types are available
      أنواع TypeScript متاحة

### 2. Documentation | التوثيق

- [ ] Update GitHub README with npm badge
      حدث README على GitHub مع شارة npm
- [ ] Create a GitHub release/tag
      أنشئ إصداراً/وساماً على GitHub
- [ ] Announce on social media (optional)
      أعلن على وسائل التواصل (اختياري)

### 3. Monitoring | المراقبة

- [ ] Check npm downloads
      تحقق من تحميلات npm
- [ ] Monitor GitHub issues
      راقب المشاكل على GitHub
- [ ] Respond to user feedback
      رد على ملاحظات المستخدمين

## Version Numbering Guide | دليل ترقيم الإصدارات

### Semantic Versioning (MAJOR.MINOR.PATCH)

```
1.0.0 → 1.0.1  (Patch: Bug fixes)
1.0.0 → 1.1.0  (Minor: New features, backward compatible)
1.0.0 → 2.0.0  (Major: Breaking changes)
```

### Examples | أمثلة

**Patch (1.0.0 → 1.0.1)**
- Bug fixes
- Documentation updates
- Performance improvements

```bash
npm version patch
```

**Minor (1.0.0 → 1.1.0)**
- New features
- New API functions
- Backward compatible changes

```bash
npm version minor
```

**Major (1.0.0 → 2.0.0)**
- Breaking API changes
- Removal of deprecated features
- Major refactoring

```bash
npm version major
```

## Common Issues | المشاكل الشائعة

### Issue: "You do not have permission to publish"

**Solution:**
```bash
npm login
npm whoami  # Verify you're logged in
```

### Issue: "Package name taken"

**Solution:**
- Use a scoped package: `@your-username/saudi-arabia-geodata`
- Choose a different name

### Issue: "Build files missing"

**Solution:**
```bash
npm run build
# Check that dist/ folder exists
ls dist/
```

### Issue: "Large package size warning"

**Solution:**
- Ensure .npmignore is configured correctly
- Consider publishing only the lite version initially
- Use `npm pack --dry-run` to see what files will be included

## Emergency Unpublish | إلغاء النشر الطارئ

⚠️ **Warning:** Only use within 72 hours of publishing

```bash
# Unpublish specific version
npm unpublish saudi-arabia-geodata@1.0.0

# Unpublish entire package (use with caution!)
npm unpublish saudi-arabia-geodata --force
```

**Better alternative:** Deprecate instead

```bash
npm deprecate saudi-arabia-geodata@1.0.0 "Please use version 1.0.1 instead"
```

## Support | الدعم

Need help? | تحتاج مساعدة؟

- 📖 [Documentation](./docs/README.md)
- 🐛 [Report Issues](https://github.com/YOUR_USERNAME/Saudi-Arabia-Regions-Cities-and-Districts/issues)
- 💬 [Discussions](https://github.com/YOUR_USERNAME/Saudi-Arabia-Regions-Cities-and-Districts/discussions)

---

Good luck! 🚀 | حظاً موفقاً!
