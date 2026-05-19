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
    search,
    setSearch,

    filteredParking,
  } = useHomeVM();

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
            placeholder="Cari lokasi tempat parkir"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* SECTION */}
      <Text style={styles.sectionTitle}>
        Rekomendasi Terdekat
      </Text>

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {filteredParking.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              if (item.name === 'Ground Floor') {
                router.push('/user/payment');
              }
            }}
          >

            <Image source={item.image} style={styles.cardImage} />

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.mallName}>{item.name}</Text>
              <Text style={styles.address}>{item.description}</Text>
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

  distance: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.subtext,
  },
});