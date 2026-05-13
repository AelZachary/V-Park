import ActivityCancelled from '@/components/activity/ActivityCancelled';
import BottomNavbar from '@/components/navigation/BottomNavbar';
import { useActivityCancelledVM } from '@/viewmodels/useActivityCancelledVM';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

export default function ActivityCancelledScreen() {

  const { cancelledData } = useActivityCancelledVM();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >

        {cancelledData.map((item, index) => (

          <ActivityCancelled
            key={index}
            mall={item.mall}
            area={item.area}
            date={item.date}
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    left: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1565C0',
  },

});