import BottomNavbar from '@/components/navigation/BottomNavbar';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';
import { useHomeVM } from '@/viewmodels/useHomeVM';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {

  const {
    showFilter,
    setShowFilter,

    selectedCity,
    setSelectedCity,

    search,
    setSearch,

    filteredMall,
  } = useHomeVM();

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/V-Park.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Mall Location</Text>
      </View>

      {/* SEARCH + FILTER */}
      <View style={styles.searchRow}>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#666" />
          <TextInput
            placeholder="Cari mall atau lokasi"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilter(true)}
        >
          <Ionicons name="options-outline" size={18} color="#fff" />
          <Text style={styles.filterText}>{selectedCity}</Text>
        </TouchableOpacity>

      </View>

      {/* SECTION */}
      <Text style={styles.sectionTitle}>
        Rekomendasi Terdekat
      </Text>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {filteredMall.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              if (item.name === 'Trans Studio Mall') {
                router.push('./detailLocation');
              } else if (item.name === 'Phinisi Point Mall') {
                router.push('./paymentSuccessful');
              } else if (item.name === 'Manado Town Square') {
                router.push('./paymentProcessing');
              }
            }}
          >

            <Image source={item.image} style={styles.cardImage} />

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.mallName}>{item.name}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>

            <View style={styles.rightInfo}>
              <Text style={styles.rating}>⭐ 4.6</Text>
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* FILTER DROPDOWN */}
      {showFilter && (
        <View style={styles.dropdown}>
          {['All City', 'Makassar', 'Manado', 'Palu', 'Kendari', 'Gorontalo', 'Palopo'].map(city => (
            <TouchableOpacity
              key={city}
              style={[
                styles.dropdownItem,
                selectedCity === city && styles.activeDropdown
              ]}
              onPress={() => {
                setSelectedCity(city);
                setShowFilter(false);
              }}
            >
              <Text
                style={[
                  styles.dropdownText,
                  selectedCity === city && styles.activeDropdownText
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* BOTTOM NAV */}
      <BottomNavbar active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },

  /* HEADER */
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: SPACING.sm,
  },

  logo: {
    width: 57,
    height: 66,
    resizeMode: 'contain',
    position: 'absolute',
    left: SPACING.lg,
  },

  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },

  /* SEARCH */
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },

  searchBox: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    height: 45,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 6,
  },

  filterBtn: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    height: 45,
  },

  filterText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  
  dropdown: {
    position: 'absolute',
    top: 175, 
    right: 20,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    width: 170,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  dropdownItem: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },

  dropdownText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
  },

  activeDropdown: {
    backgroundColor: COLORS.info,
  },

  activeDropdownText: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  /* SECTION */
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    marginTop: SPACING.md,
    marginLeft: SPACING.lg,
    fontWeight: '700',
    color: COLORS.primary,
  },

  /* CARD */
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  cardImage: {
    width: 90,
    height: 70,
    borderRadius: RADIUS.sm,
    marginRight: SPACING.sm,
  },

  mallName: {
    fontWeight: '700',
    color: COLORS.primary,
  },

  address: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.subtext,
    marginTop: 3,
    flexWrap: 'wrap',
    maxWidth: '100%',
  },

  /* RIGHT SIDE */
  rightInfo: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 60,
  },

  rating: {
    backgroundColor: COLORS.info,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: '600',
  },

  distance: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.subtext,
  },

  /* BOTTOM NAV */
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.info,
    borderRadius: RADIUS.full,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: 6,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
});