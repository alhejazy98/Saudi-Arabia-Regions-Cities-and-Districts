<template>
  <div class="saudi-data-container">
    <h1>{{ title }}</h1>
    
    <!-- Region Selector -->
    <div class="selector-section">
      <label for="region-select">{{ labels.selectRegion }}</label>
      <select 
        id="region-select"
        v-model="selectedRegionId" 
        @change="loadCities"
        class="select-input"
      >
        <option value="">{{ labels.selectRegionPlaceholder }}</option>
        <option 
          v-for="region in regions" 
          :key="region.region_id" 
          :value="region.region_id"
        >
          {{ region.name_ar }} - {{ region.name_en }} ({{ region.population.toLocaleString() }})
        </option>
      </select>
    </div>

    <!-- Cities List -->
    <div v-if="cities.length > 0" class="data-section">
      <h2>{{ labels.cities }}</h2>
      <div class="data-grid">
        <div 
          v-for="city in cities" 
          :key="city.city_id"
          class="data-card"
          @click="selectCity(city)"
        >
          <h3>{{ city.name_ar }}</h3>
          <p>{{ city.name_en }}</p>
        </div>
      </div>
    </div>

    <!-- Search Section -->
    <div class="search-section">
      <h2>{{ labels.search }}</h2>
      <input 
        v-model="searchQuery" 
        @input="handleSearch"
        :placeholder="labels.searchPlaceholder"
        class="search-input"
      />
      
      <div class="search-options">
        <label>
          <input type="checkbox" v-model="searchOptions.searchInArabic" />
          {{ labels.searchInArabic }}
        </label>
        <label>
          <input type="checkbox" v-model="searchOptions.searchInEnglish" />
          {{ labels.searchInEnglish }}
        </label>
        <label>
          <input type="checkbox" v-model="searchOptions.exactMatch" />
          {{ labels.exactMatch }}
        </label>
      </div>
    </div>
    
    <!-- Search Results -->
    <div v-if="searchResults.length > 0" class="data-section">
      <h2>{{ labels.searchResults }} ({{ searchResults.length }})</h2>
      <div class="data-grid">
        <div 
          v-for="city in searchResults" 
          :key="city.city_id"
          class="data-card"
        >
          <h3>{{ city.name_ar }}</h3>
          <p>{{ city.name_en }}</p>
          <small>{{ getRegionName(city.region_id) }}</small>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="stats-section">
      <h2>{{ labels.statistics }}</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>{{ totalPopulation.toLocaleString() }}</h3>
          <p>{{ labels.totalPopulation }}</p>
        </div>
        <div class="stat-card">
          <h3>{{ regions.length }}</h3>
          <p>{{ labels.totalRegions }}</p>
        </div>
        <div class="stat-card">
          <h3>{{ allCities.length.toLocaleString() }}</h3>
          <p>{{ labels.totalCities }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getAllRegions, 
  getAllCities,
  getCitiesByRegion, 
  searchCities,
  getTotalPopulation,
  getRegionById
} from 'saudi-arabia-geodata';

export default {
  name: 'SaudiDataExample',
  
  data() {
    return {
      regions: [],
      allCities: [],
      cities: [],
      searchResults: [],
      selectedRegionId: '',
      searchQuery: '',
      searchOptions: {
        searchInArabic: true,
        searchInEnglish: true,
        exactMatch: false
      },
      title: 'مناطق ومدن المملكة العربية السعودية | Saudi Arabia Regions & Cities',
      labels: {
        selectRegion: 'اختر المنطقة | Select Region',
        selectRegionPlaceholder: 'اختر المنطقة | Select Region',
        cities: 'المدن | Cities',
        search: 'البحث | Search',
        searchPlaceholder: 'ابحث عن مدينة... | Search for a city...',
        searchInArabic: 'بحث بالعربية | Search in Arabic',
        searchInEnglish: 'بحث بالإنجليزية | Search in English',
        exactMatch: 'تطابق تام | Exact Match',
        searchResults: 'نتائج البحث | Search Results',
        statistics: 'الإحصائيات | Statistics',
        totalPopulation: 'إجمالي السكان | Total Population',
        totalRegions: 'عدد المناطق | Total Regions',
        totalCities: 'عدد المدن | Total Cities'
      }
    };
  },
  
  computed: {
    totalPopulation() {
      return getTotalPopulation();
    }
  },
  
  mounted() {
    // Load initial data
    this.regions = getAllRegions();
    this.allCities = getAllCities();
    console.log('Loaded regions:', this.regions.length);
    console.log('Loaded cities:', this.allCities.length);
  },
  
  methods: {
    loadCities() {
      if (this.selectedRegionId) {
        this.cities = getCitiesByRegion(Number(this.selectedRegionId));
        console.log(`Loaded ${this.cities.length} cities for region ${this.selectedRegionId}`);
      } else {
        this.cities = [];
      }
      // Clear search when selecting a region
      this.searchQuery = '';
      this.searchResults = [];
    },
    
    handleSearch() {
      if (this.searchQuery.length > 1) {
        this.searchResults = searchCities(this.searchQuery, this.searchOptions);
        console.log(`Found ${this.searchResults.length} results for "${this.searchQuery}"`);
      } else {
        this.searchResults = [];
      }
    },
    
    selectCity(city) {
      console.log('Selected city:', city);
      // You can add custom logic here, like showing details or navigating
      alert(`المدينة المختارة: ${city.name_ar}\nSelected city: ${city.name_en}`);
    },
    
    getRegionName(regionId) {
      const region = getRegionById(regionId);
      return region ? `${region.name_ar} - ${region.name_en}` : '';
    }
  }
};
</script>

<style scoped>
.saudi-data-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Cairo', sans-serif;
}

h1 {
  text-align: center;
  color: #1a5f3a;
  margin-bottom: 30px;
  font-size: 2rem;
}

h2 {
  color: #2c5f2d;
  margin: 20px 0 15px;
  font-size: 1.5rem;
}

h3 {
  margin: 0 0 5px;
  color: #333;
  font-size: 1.1rem;
}

.selector-section,
.search-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.select-input,
.search-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.select-input:focus,
.search-input:focus {
  outline: none;
  border-color: #1a5f3a;
}

.search-options {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.search-options label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: normal;
  cursor: pointer;
}

.search-options input[type="checkbox"] {
  cursor: pointer;
}

.data-section {
  margin: 30px 0;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.data-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.data-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.data-card p {
  margin: 5px 0 0;
  color: #666;
}

.data-card small {
  color: #999;
  font-size: 0.85rem;
}

.stats-section {
  margin: 40px 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.stats-section h2 {
  color: white;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-card h3 {
  color: white;
  font-size: 2rem;
  margin: 0 0 10px;
}

.stat-card p {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
  
  .data-grid {
    grid-template-columns: 1fr;
  }
  
  .search-options {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
