import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert
} from 'react-native';
import { 
  getAllRegions, 
  getAllCities,
  getCitiesByRegion, 
  getDistrictsByCity,
  searchCities,
  searchDistricts,
  getTotalPopulation,
  getRegionById
} from 'saudi-arabia-geodata/lite'; // Use lite version for better performance on mobile

/**
 * Saudi Arabia Geodata React Native Example
 * مثال على استخدام المكتبة في React Native
 */

function SaudiDataApp() {
  // State management
  const [regions, setRegions] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('cities'); // 'cities' or 'districts'
  const [searchInArabic, setSearchInArabic] = useState(true);
  const [searchInEnglish, setSearchInEnglish] = useState(true);
  const [showRegions, setShowRegions] = useState(true);

  // Load initial data
  useEffect(() => {
    const regionsData = getAllRegions();
    const citiesData = getAllCities();
    setRegions(regionsData);
    setAllCities(citiesData);
    console.log(`Loaded ${regionsData.length} regions and ${citiesData.length} cities`);
  }, []);

  // Handle region selection
  const handleRegionPress = (region) => {
    setSelectedRegion(region);
    setSelectedCity(null);
    const regionCities = getCitiesByRegion(region.region_id);
    setCities(regionCities);
    setDistricts([]);
    setShowRegions(false);
    setSearchQuery('');
    setSearchResults([]);
    console.log(`Selected region: ${region.name_ar}, found ${regionCities.length} cities`);
  };

  // Handle city selection
  const handleCityPress = (city) => {
    setSelectedCity(city);
    const cityDistricts = getDistrictsByCity(city.city_id);
    setDistricts(cityDistricts);
    console.log(`Selected city: ${city.name_ar}, found ${cityDistricts.length} districts`);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const options = {
        searchInArabic,
        searchInEnglish,
        exactMatch: false
      };
      
      if (searchType === 'cities') {
        const results = searchCities(query, options);
        setSearchResults(results);
        console.log(`Found ${results.length} cities for "${query}"`);
      } else {
        const results = searchDistricts(query, options);
        setSearchResults(results);
        console.log(`Found ${results.length} districts for "${query}"`);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Go back to regions list
  const goBackToRegions = () => {
    setShowRegions(true);
    setSelectedRegion(null);
    setSelectedCity(null);
    setCities([]);
    setDistricts([]);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Go back to cities list
  const goBackToCities = () => {
    setSelectedCity(null);
    setDistricts([]);
  };

  // Get region name by ID
  const getRegionName = (regionId) => {
    const region = getRegionById(regionId);
    return region ? region.name_ar : '';
  };

  // Render region item
  const renderRegionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleRegionPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.cardTitleAr}>{item.name_ar}</Text>
      <Text style={styles.cardSubtitle}>{item.name_en}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardInfo}>الرمز: {item.code}</Text>
        <Text style={styles.cardInfo}>السكان: {item.population.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render city item
  const renderCityItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cityCard}
      onPress={() => handleCityPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.cityTitleAr}>{item.name_ar}</Text>
      <Text style={styles.citySubtitle}>{item.name_en}</Text>
    </TouchableOpacity>
  );

  // Render district item
  const renderDistrictItem = ({ item }) => (
    <View style={styles.districtCard}>
      <Text style={styles.districtTitleAr}>{item.name_ar}</Text>
      <Text style={styles.districtSubtitle}>{item.name_en}</Text>
    </View>
  );

  // Render search result item
  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.searchCard}
      onPress={() => {
        if (searchType === 'cities') {
          handleCityPress(item);
        } else {
          Alert.alert(
            item.name_ar,
            `${item.name_en}\nالمنطقة: ${getRegionName(item.region_id)}`
          );
        }
        setSearchQuery('');
        setSearchResults([]);
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.searchTitleAr}>{item.name_ar}</Text>
      <Text style={styles.searchSubtitle}>{item.name_en}</Text>
      <Text style={styles.searchInfo}>{getRegionName(item.region_id)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5f3a" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>مناطق ومدن المملكة</Text>
        <Text style={styles.headerSubtitle}>Saudi Regions & Cities</Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder={searchType === 'cities' ? 'ابحث عن مدينة... | Search city' : 'ابحث عن حي... | Search district'}
          placeholderTextColor="#999"
        />
        
        <View style={styles.searchOptions}>
          <TouchableOpacity 
            style={[styles.tabButton, searchType === 'cities' && styles.tabButtonActive]}
            onPress={() => {
              setSearchType('cities');
              setSearchResults([]);
            }}
          >
            <Text style={[styles.tabButtonText, searchType === 'cities' && styles.tabButtonTextActive]}>
              المدن | Cities
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, searchType === 'districts' && styles.tabButtonActive]}
            onPress={() => {
              setSearchType('districts');
              setSearchResults([]);
            }}
          >
            <Text style={[styles.tabButtonText, searchType === 'districts' && styles.tabButtonTextActive]}>
              الأحياء | Districts
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>عربي | Arabic</Text>
            <Switch
              value={searchInArabic}
              onValueChange={setSearchInArabic}
              trackColor={{ false: '#ccc', true: '#1a5f3a' }}
            />
          </View>
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>English | إنجليزي</Text>
            <Switch
              value={searchInEnglish}
              onValueChange={setSearchInEnglish}
              trackColor={{ false: '#ccc', true: '#1a5f3a' }}
            />
          </View>
        </View>
      </View>

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>
            نتائج البحث ({searchResults.length}) | Search Results
          </Text>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => 
              searchType === 'cities' 
                ? item.city_id.toString() 
                : item.district_id.toString()
            }
            renderItem={renderSearchResultItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.content}>
          {/* Districts View */}
          {selectedCity && districts.length > 0 ? (
            <>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={goBackToCities}
              >
                <Text style={styles.backButtonText}>← رجوع | Back</Text>
              </TouchableOpacity>
              
              <Text style={styles.sectionTitle}>
                أحياء {selectedCity.name_ar} ({districts.length})
              </Text>
              <FlatList
                data={districts}
                keyExtractor={(item) => item.district_id.toString()}
                renderItem={renderDistrictItem}
                showsVerticalScrollIndicator={false}
              />
            </>
          ) : selectedRegion && cities.length > 0 ? (
            /* Cities View */
            <>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={goBackToRegions}
              >
                <Text style={styles.backButtonText}>← رجوع | Back</Text>
              </TouchableOpacity>
              
              <Text style={styles.sectionTitle}>
                مدن {selectedRegion.name_ar} ({cities.length})
              </Text>
              <FlatList
                data={cities}
                keyExtractor={(item) => item.city_id.toString()}
                renderItem={renderCityItem}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={styles.cityRow}
              />
            </>
          ) : (
            /* Regions View */
            <>
              {/* Statistics */}
              <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{getTotalPopulation().toLocaleString()}</Text>
                  <Text style={styles.statLabel}>إجمالي السكان</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{regions.length}</Text>
                  <Text style={styles.statLabel}>المناطق</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{allCities.length.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>المدن</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>المناطق | Regions</Text>
              <FlatList
                data={regions}
                keyExtractor={(item) => item.region_id.toString()}
                renderItem={renderRegionItem}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a5f3a',
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
  },
  searchSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  searchOptions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#1a5f3a',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#fff',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a5f3a',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#1a5f3a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitleAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cardInfo: {
    fontSize: 12,
    color: '#999',
  },
  cityRow: {
    justifyContent: 'space-between',
  },
  cityCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cityTitleAr: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  citySubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  districtCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#1a5f3a',
  },
  districtTitleAr: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  districtSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  searchCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchTitleAr: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a5f3a',
    textAlign: 'right',
  },
  searchSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  searchInfo: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
});

export default SaudiDataApp;
