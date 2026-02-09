import React, { useState, useEffect } from 'react';
import { 
  getAllRegions, 
  getAllCities,
  getCitiesByRegion, 
  searchCities,
  getTotalPopulation,
  getRegionById
} from 'saudi-arabia-geodata';

/**
 * Saudi Arabia Geodata React Example
 * مثال على استخدام المكتبة في React
 */

function SaudiDataApp() {
  // State management
  const [regions, setRegions] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState({
    searchInArabic: true,
    searchInEnglish: true,
    exactMatch: false
  });

  // Load initial data
  useEffect(() => {
    setRegions(getAllRegions());
    setAllCities(getAllCities());
  }, []);

  // Handle region selection
  const handleRegionChange = (regionId) => {
    setSelectedRegionId(regionId);
    if (regionId) {
      setCities(getCitiesByRegion(Number(regionId)));
    } else {
      setCities([]);
    }
    // Clear search when selecting a region
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 1) {
      setSearchResults(searchCities(query, searchOptions));
    } else {
      setSearchResults([]);
    }
  };

  // Handle city selection
  const handleCityClick = (city) => {
    console.log('Selected city:', city);
    alert(`المدينة المختارة: ${city.name_ar}\nSelected city: ${city.name_en}`);
  };

  // Get region name by ID
  const getRegionName = (regionId) => {
    const region = getRegionById(regionId);
    return region ? `${region.name_ar} - ${region.name_en}` : '';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        مناطق ومدن المملكة العربية السعودية
        <br />
        Saudi Arabia Regions & Cities
      </h1>
      
      {/* Region Selector */}
      <div style={styles.selectorSection}>
        <label style={styles.label}>اختر المنطقة | Select Region</label>
        <select 
          value={selectedRegionId} 
          onChange={(e) => handleRegionChange(e.target.value)}
          style={styles.select}
        >
          <option value="">اختر المنطقة | Select Region</option>
          {regions.map(region => (
            <option key={region.region_id} value={region.region_id}>
              {region.name_ar} - {region.name_en} ({region.population.toLocaleString()})
            </option>
          ))}
        </select>
      </div>

      {/* Cities List */}
      {cities.length > 0 && (
        <div style={styles.dataSection}>
          <h2 style={styles.subtitle}>المدن | Cities</h2>
          <div style={styles.dataGrid}>
            {cities.map(city => (
              <div 
                key={city.city_id}
                style={styles.dataCard}
                onClick={() => handleCityClick(city)}
              >
                <h3 style={styles.cardTitle}>{city.name_ar}</h3>
                <p style={styles.cardSubtitle}>{city.name_en}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Section */}
      <div style={styles.searchSection}>
        <h2 style={styles.subtitle}>البحث | Search</h2>
        <input 
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="ابحث عن مدينة... | Search for a city..."
          style={styles.searchInput}
        />
        
        <div style={styles.searchOptions}>
          <label style={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={searchOptions.searchInArabic}
              onChange={(e) => setSearchOptions({...searchOptions, searchInArabic: e.target.checked})}
            />
            بحث بالعربية | Search in Arabic
          </label>
          <label style={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={searchOptions.searchInEnglish}
              onChange={(e) => setSearchOptions({...searchOptions, searchInEnglish: e.target.checked})}
            />
            بحث بالإنجليزية | Search in English
          </label>
          <label style={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={searchOptions.exactMatch}
              onChange={(e) => setSearchOptions({...searchOptions, exactMatch: e.target.checked})}
            />
            تطابق تام | Exact Match
          </label>
        </div>
      </div>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <div style={styles.dataSection}>
          <h2 style={styles.subtitle}>نتائج البحث | Search Results ({searchResults.length})</h2>
          <div style={styles.dataGrid}>
            {searchResults.map(city => (
              <div 
                key={city.city_id}
                style={styles.dataCard}
                onClick={() => handleCityClick(city)}
              >
                <h3 style={styles.cardTitle}>{city.name_ar}</h3>
                <p style={styles.cardSubtitle}>{city.name_en}</p>
                <small style={styles.cardInfo}>{getRegionName(city.region_id)}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      <div style={styles.statsSection}>
        <h2 style={styles.statsTitle}>الإحصائيات | Statistics</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{getTotalPopulation().toLocaleString()}</h3>
            <p style={styles.statLabel}>إجمالي السكان | Total Population</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{regions.length}</h3>
            <p style={styles.statLabel}>عدد المناطق | Total Regions</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{allCities.length.toLocaleString()}</h3>
            <p style={styles.statLabel}>عدد المدن | Total Cities</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Cairo", sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#1a5f3a',
    marginBottom: '30px',
    fontSize: '2rem',
  },
  subtitle: {
    color: '#2c5f2d',
    margin: '20px 0 15px',
    fontSize: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#555',
  },
  selectorSection: {
    marginBottom: '30px',
  },
  searchSection: {
    marginBottom: '30px',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  },
  searchInput: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  },
  searchOptions: {
    display: 'flex',
    gap: '20px',
    marginTop: '10px',
    flexWrap: 'wrap',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
  },
  dataSection: {
    margin: '30px 0',
  },
  dataGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '15px',
  },
  dataCard: {
    background: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardTitle: {
    margin: '0 0 5px',
    color: '#333',
    fontSize: '1.1rem',
  },
  cardSubtitle: {
    margin: '5px 0 0',
    color: '#666',
  },
  cardInfo: {
    color: '#999',
    fontSize: '0.85rem',
  },
  statsSection: {
    margin: '40px 0',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    color: 'white',
  },
  statsTitle: {
    color: 'white',
    textAlign: 'center',
    margin: '0 0 20px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
  },
  statNumber: {
    color: 'white',
    fontSize: '2rem',
    margin: '0 0 10px',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0',
    fontSize: '0.95rem',
  },
};

export default SaudiDataApp;
