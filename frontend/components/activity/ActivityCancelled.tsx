import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/* TYPE DATA */
type Props = {
  mall: string;
  area: string;
  date: string;
};

export default function ActivityCancelled({
  mall,
  area,
  date,
}: Props) {
  return (
    <View style={styles.card}>

      {/* TOP */}
      <View style={styles.topRow}>

        <View style={styles.leftRow}>

          <View style={styles.iconBox}>
            <Ionicons
              name="car-outline"
              size={24}
              color="#111"
            />
          </View>

          <View>
            <Text style={styles.mallName}>
              {mall}
            </Text>

            <Text style={styles.area}>
              {area}
            </Text>
          </View>

        </View>

      </View>

      {/* CANCEL INFO */}
      <View style={styles.cancelBox}>

        <View style={styles.cancelIcon}>
          <Ionicons
            name="close"
            size={22}
            color="#FF5C46"
          />
        </View>

        <View>
          <Text style={styles.cancelTitle}>
            Dibatalkan oleh Anda
          </Text>

          <Text style={styles.cancelDate}>
            {date}
          </Text>
        </View>

      </View>

    </View>
  );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 24,
    padding: 16,

    borderWidth: 1,
    borderColor: '#8BC2FF',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#DCEEFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  mallName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1565C0',
  },

  area: {
    marginTop: 2,
    fontSize: 14,
    color: '#222',
  },

  statusBadge: {
    backgroundColor: '#EAF7EA',
    borderWidth: 1,
    borderColor: '#B9E2BA',

    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: '#444',
    fontSize: 13,
    fontWeight: '600',
  },

  /* CANCEL BOX */
  cancelBox: {
    marginTop: 18,
    backgroundColor: '#FFE7E2',

    borderWidth: 1,
    borderColor: '#FF9E8D',

    borderRadius: 20,
    padding: 14,

    flexDirection: 'row',
    alignItems: 'center',
  },

  cancelIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,

    borderWidth: 2,
    borderColor: '#FF5C46',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,
  },

  cancelTitle: {
    color: '#FF5C46',
    fontWeight: '700',
    fontSize: 15,
  },

  cancelDate: {
    marginTop: 4,
    color: '#222',
    fontSize: 14,
  },

});