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

const DEFAULT_MALL_TITLES: Record<number, string> = {
  1: 'Ground Floor',
  2: 'Ground Floor - Area A',
  3: 'Lantai P1',
  4: 'Lantai P1 - Area A',
  5: 'Lantai P2',
  6: 'Lantai P2 - Area A',
  7: 'Lantai P3',
  8: 'Lantai P3 - Area A',
  9: 'Lantai P4',
  10: 'Lantai P4 - Area A',
  11: 'Lantai P5',
};

export default function HomeScreen() {
  const {
    search,
    setSearch,
    loading,
    error,
    filteredParking,
  } = useHomeVM();

  const getMallTitle = (item: { id: number; name: string }) => {
    return DEFAULT_MALL_TITLES[item.id] ?? item.name;
  };

  const getMallDescription = (item: { id: number; description: string }) => {
    if (item.id === 1) {
      return 'Ground floor, ground floor A';
    }
    return item.description;
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/V-Park.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Parking Location</Text>
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
      </View>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {loading && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Memuat data lokasi mall...</Text>
          </View>
        )}
        {error && !loading && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Terjadi kesalahan: {error}</Text>
          </View>
        )}
        {!loading && filteredParking.length === 0 && !error && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Tidak ada lokasi mall yang tersedia.</Text>
          </View>
        )}
        {filteredParking.map((item, index) => (
          <TouchableOpacity
            key={item.id ?? index}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => {
              router.push({
                pathname: '/user/selectParkingSpot',
                params: {
                  initialFloor: getMallTitle(item),
                  mallId: String(item.id),
                },
              });
            }}
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.mallName}>{getMallTitle(item)}</Text>
              <Text style={styles.address}>{getMallDescription(item)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    overflow: 'hidden',
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

  messageContainer: {
    marginTop: 24,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  messageText: {
    color: COLORS.subtext,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
  },

  distance: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.subtext,
  },
});