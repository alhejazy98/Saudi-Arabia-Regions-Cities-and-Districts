# Build and Setup Guide | دليل البناء والإعداد

## Quick Setup | الإعداد السريع

```bash
# 1. Install dependencies | تثبيت المتطلبات
npm install

# 2. Build the package | بناء الحزمة
npm run build

# 3. The package is ready! | الحزمة جاهزة!
```

## Detailed Setup | الإعداد التفصيلي

### Prerequisites | المتطلبات الأساسية

- Node.js >= 14.0.0
- npm >= 6.0.0

### Installation | التثبيت

```bash
# Clone the repository | استنساخ المستودع
git clone https://github.com/YOUR_USERNAME/Saudi-Arabia-Regions-Cities-and-Districts.git

# Navigate to directory | الانتقال إلى المجلد
cd Saudi-Arabia-Regions-Cities-and-Districts

# Install dependencies | تثبيت المتطلبات
npm install
```

### Build Process | عملية البناء

The build process compiles TypeScript to JavaScript and creates both CommonJS and ES Module outputs.

```bash
npm run build
```

This will:
1. Compile TypeScript files from `src/` to `dist/`
2. Generate type definitions (.d.ts files)
3. Create both CJS and ESM bundles
4. Include JSON data in the bundle

**Output files:**
- `dist/index.js` - CommonJS full version
- `dist/index.mjs` - ES Module full version
- `dist/index.d.ts` - TypeScript definitions
- `dist/lite.js` - CommonJS lite version
- `dist/lite.mjs` - ES Module lite version
- `dist/lite.d.ts` - TypeScript definitions for lite version

### Project Structure | هيكل المشروع

```
Saudi-Arabia-Regions-Cities-and-Districts/
├── src/                    # Source TypeScript files
│   ├── index.ts           # Full version entry point
│   ├── lite.ts            # Lite version entry point
│   └── types.ts           # TypeScript type definitions
├── json/                  # Data files
│   ├── regions.json
│   ├── regions_lite.json
│   ├── cities.json
│   ├── cities_lite.json
│   ├── districts_lite.json
│   └── districts.json
├── geojson/              # GeoJSON files
│   ├── regions.geojson
│   ├── cities.geojson
│   └── districts.geojson
├── examples/             # Usage examples
│   ├── vue-example.vue
│   ├── react-example.jsx
│   └── react-native-example.jsx
├── docs/                 # Documentation
│   ├── API.md
│   └── PUBLISHING.md
├── dist/                 # Built files (generated)
├── package.json
├── tsconfig.json
├── rollup.config.js
└── README.md
```

### Development Workflow | سير العمل التطويري

#### 1. Make Changes | إجراء التغييرات

Edit files in the `src/` directory:
- `src/index.ts` - Full version with GeoJSON support
- `src/lite.ts` - Lite version without geographic data
- `src/types.ts` - TypeScript interfaces

#### 2. Build | البناء

```bash
npm run build
```

#### 3. Test Locally | الاختبار المحلي

Create a test project:

```bash
# Create test directory
mkdir test-project
cd test-project

# Initialize npm
npm init -y

# Install the local package
npm install ../Saudi-Arabia-Regions-Cities-and-Districts

# Create test file
echo "const { getAllRegions } = require('saudi-arabia-geodata'); console.log(getAllRegions());" > test.js

# Run test
node test.js
```

#### 4. Test with TypeScript | الاختبار مع TypeScript

```bash
# In test project
npm install typescript @types/node

# Create TypeScript test file
cat > test.ts << 'EOF'
import { getAllRegions, getRegionById } from 'saudi-arabia-geodata';

const regions = getAllRegions();
console.log(`Total regions: ${regions.length}`);

const riyadh = getRegionById(1);
console.log(`Riyadh: ${riyadh?.name_ar}`);
EOF

# Compile and run
npx tsc test.ts --esModuleInterop --module commonjs
node test.js
```

### Package Scripts | أوامر الحزمة

```json
{
  "scripts": {
    "build": "rollup -c",
    "prepublishOnly": "npm run build",
    "test": "echo \"Error: no test specified\" && exit 0"
  }
}
```

- **`npm run build`**: Builds the package
- **`npm run prepublishOnly`**: Automatically runs before publishing to npm

### Build Configuration | إعدادات البناء

#### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "lib": ["ES2018"],
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

#### Rollup Configuration (`rollup.config.js`)

The project uses Rollup for bundling with the following plugins:
- `@rollup/plugin-typescript` - TypeScript compilation
- `@rollup/plugin-json` - JSON import support

Two bundles are created:
1. **Full version** (`index.ts`) - Includes all geographic data
2. **Lite version** (`lite.ts`) - Excludes geographic coordinates

### Testing Different Versions | اختبار الإصدارات المختلفة

#### Test Full Version

```javascript
// test-full.js
const { 
  getAllRegions, 
  getCitiesByRegion,
  getRegionsGeoJSON 
} = require('saudi-arabia-geodata');

const regions = getAllRegions();
console.log('Regions:', regions.length);
console.log('First region center:', regions[0].center);

const geoJSON = getRegionsGeoJSON();
console.log('GeoJSON available:', geoJSON !== null);
```

#### Test Lite Version

```javascript
// test-lite.js
const { 
  getAllRegions, 
  getAllCities,
  getAllDistricts 
} = require('saudi-arabia-geodata/lite');

const regions = getAllRegions();
const cities = getAllCities();
const districts = getAllDistricts();

console.log('Regions:', regions.length);
console.log('Cities:', cities.length);
console.log('Districts:', districts.length);
console.log('Has center coordinates:', regions[0].center !== undefined); // false
```

### Performance Considerations | اعتبارات الأداء

#### Bundle Sizes

- **Full version**: ~45MB (includes boundaries and coordinates)
- **Lite version**: ~2MB (no geographic data)

#### Usage Recommendations

**Use Full Version when:**
- You need GeoJSON data for mapping
- You need center coordinates for cities/regions
- You're building a web application with map integration

**Use Lite Version when:**
- Building mobile applications (React Native)
- You only need names and IDs
- Bundle size is critical
- You don't need geographic visualization

### Troubleshooting | حل المشاكل

#### Build Errors

**Error: Cannot find module 'rollup'**
```bash
npm install
```

**Error: Type errors in TypeScript**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

#### Import Errors

**Error: Cannot find module 'saudi-arabia-geodata'**

Make sure:
1. Package is built: `npm run build`
2. Package is installed: `npm install`
3. Correct import path is used

**For Full Version:**
```javascript
import { getAllRegions } from 'saudi-arabia-geodata';
```

**For Lite Version:**
```javascript
import { getAllRegions } from 'saudi-arabia-geodata/lite';
```

#### Large Bundle Size

If your application bundle is too large:

1. Use the lite version
2. Use dynamic imports for GeoJSON data
3. Consider code splitting

```javascript
// Dynamic import example
async function loadGeoJSON() {
  const { getRegionsGeoJSON } = await import('saudi-arabia-geodata');
  return getRegionsGeoJSON();
}
```

### Continuous Integration | التكامل المستمر

#### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build and Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Test
      run: npm test
```

### Next Steps | الخطوات التالية

1. **Add Tests**: Create unit tests using Jest or Mocha
2. **Add Linting**: Setup ESLint for code quality
3. **Add Documentation**: Generate API docs with TypeDoc
4. **Publish**: Follow [PUBLISHING.md](./PUBLISHING.md) to publish to npm

### Support | الدعم

For build issues:
- Check [GitHub Issues](https://github.com/YOUR_USERNAME/Saudi-Arabia-Regions-Cities-and-Districts/issues)
- Review [API Documentation](./API.md)
- See [Examples](../examples)

---

Happy Building! 🚀

بناءً موفقاً! 🚀
