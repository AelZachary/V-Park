import ActivityHistoryCard from '@/components/activity/ActivityHistory';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import { useActivityHistoryVM } from '@/viewmodels/useActivityHistoryVM';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function ActivityHistoryScreen() {

  const { historyData } = useActivityHistoryVM();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* TITLE */}
        <Text style={styles.sectionTitle}>
          Riwayat Booking
        </Text>

        <Text style={styles.sectionDesc}>
          Daftar parkir yang sudah selesai.
        </Text>

        {historyData.map((item, index) => (

          <ActivityHistoryCard
            key={index}
            mall={item.mall}
            area={item.area}
            date={item.date} 
            checkIn={item.checkIn}   
            checkOut={item.checkOut} 
            duration={item.duration}
            total={item.total}
          />

        ))}

      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNavbar active="activity" />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF4FA',
  },

  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 15,
  },

  logo: {
    width: 57,
    height: 66,
    resizeMode: 'contain',
    position: 'absolute',
    left: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1565C0',
  },

  sectionTitle: {
    marginTop: 25,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },

  sectionDesc: {
    marginTop: 5,
    marginHorizontal: 20,
    color: '#2E8BEF',
    fontSize: 16,
    marginBottom: 15,
  },

});