# How to Publish to npm | كيفية النشر على npm

## Prerequisites | المتطلبات

1. **Node.js and npm installed** | Node.js و npm مثبتان
2. **npm account** | حساب npm
   - Create at https://www.npmjs.com/signup
3. **Git repository** | مستودع Git

## Step-by-Step Guide | دليل خطوة بخطوة

### 1. Build the Package | بناء الحزمة

```bash
# Install dependencies | تثبيت المتطلبات
npm install

# Build the package | بناء الحزمة
npm run build
```

### 2. Update Package Information | تحديث معلومات الحزمة

Edit `package.json`:
```json
{
  "name": "saudi-arabia-geodata",
  "version": "1.0.0",
  "description": "A comprehensive JavaScript/TypeScript library for Saudi Arabia regions, cities, and districts data",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/Saudi-Arabia-Regions-Cities-and-Districts.git"
  }
}
```

### 3. Login to npm | تسجيل الدخول إلى npm

```bash
npm login
```

Enter your:
- Username | اسم المستخدم
- Password | كلمة المرور
- Email | البريد الإلكتروني

### 4. Test the Package Locally | اختبار الحزمة محلياً

```bash
# Create a test package
npm pack

# This creates a .tgz file you can test
npm install ./saudi-arabia-geodata-1.0.0.tgz
```

### 5. Publish to npm | النشر على npm

```bash
# Publish to npm
npm publish

# For first-time public packages
npm publish --access public
```

### 6. Verify Publication | التحقق من النشر

Visit: https://www.npmjs.com/package/saudi-arabia-geodata

### 7. Install Your Published Package | تثبيت الحزمة المنشورة

```bash
npm install saudi-arabia-geodata
```

## Updating the Package | تحديث الحزمة

### Update Version | تحديث الإصدار

```bash
# Patch release (1.0.0 -> 1.0.1) for bug fixes
npm version patch

# Minor release (1.0.0 -> 1.1.0) for new features
npm version minor

# Major release (1.0.0 -> 2.0.0) for breaking changes
npm version major
```

### Publish Update | نشر التحديث

```bash
npm run build
npm publish
```

## Best Practices | أفضل الممارسات

### 1. Semantic Versioning | الإصدارات الدلالية

- **Patch (1.0.x)**: Bug fixes | إصلاح الأخطاء
- **Minor (1.x.0)**: New features (backward compatible) | ميزات جديدة متوافقة
- **Major (x.0.0)**: Breaking changes | تغييرات جذرية

### 2. Keep README Updated | تحديث README

Always update the README with:
- New features | ميزات جديدة
- API changes | تغييرات API
- Examples | أمثلة

### 3. Changelog | سجل التغييرات

Create a CHANGELOG.md file:

```markdown
# Changelog

## [1.0.0] - 2026-02-09
### Added
- Initial release
- Support for regions, cities, and districts
- TypeScript support
- GeoJSON data
```

### 4. Testing | الاختبار

Before publishing:
```bash
# Check what files will be included
npm pack --dry-run

# Test in a new project
mkdir test-project
cd test-project
npm init -y
npm install ../saudi-arabia-geodata
```

### 5. Documentation | التوثيق

- Keep examples up to date | تحديث الأمثلة
- Document all public APIs | توثيق جميع APIs العامة
- Add usage examples | إضافة أمثلة الاستخدام

## npm Scripts | أوامر npm

```json
{
  "scripts": {
    "build": "rollup -c",
    "prepublishOnly": "npm run build",
    "test": "echo \"Error: no test specified\" && exit 0"
  }
}
```

- `prepublishOnly`: Runs automatically before `npm publish`

## Useful Commands | أوامر مفيدة

```bash
# Check package info
npm info saudi-arabia-geodata

# Check package versions
npm view saudi-arabia-geodata versions

# Unpublish (within 72 hours, not recommended)
npm unpublish saudi-arabia-geodata@1.0.0

# Deprecate a version
npm deprecate saudi-arabia-geodata@1.0.0 "Use version 1.0.1 instead"

# Check for outdated dependencies
npm outdated

# Update dependencies
npm update
```

## Scoped Packages | الحزم ذات النطاق

If you want to publish under your username:

```json
{
  "name": "@your-username/saudi-arabia-geodata"
}
```

```bash
npm publish --access public
```

## Private Packages | الحزم الخاصة

For private packages (requires npm Pro):

```bash
npm publish --access restricted
```

## CI/CD Integration | تكامل CI/CD

### GitHub Actions Example

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Troubleshooting | حل المشاكل

### Error: Package name taken

Change the package name in `package.json` or use a scoped package.

### Error: You do not have permission

Make sure you're logged in: `npm whoami`

### Error: Build files missing

Run `npm run build` before publishing.

### Large package size

- Check `.npmignore` to exclude unnecessary files
- Use the lite version for smaller bundle

## Support | الدعم

For issues:
- GitHub Issues: Create an issue
- npm Support: https://www.npmjs.com/support

---

Good luck with your package! 🚀

حظاً موفقاً مع حزمتك! 🚀
