import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  mall: string;
  area: string;
  date: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  total: string;
  slot?: string;
  plate?: string;
  status?: 'pending' | 'completed' | 'expired';
};

export default function ActivityHistoryCard({
  mall,
  area,
  date,
  checkIn,
  checkOut,
  duration,
  total,
  slot,
  plate,
  status = 'completed',
}: Props) {
  const isPending = status === 'pending';
  const badgeText = isPending ? 'Menunggu' : status === 'expired' ? 'Kedaluwarsa' : 'Selesai';

  return (
    <View style={styles.card}>

      {/* TOP */}
      <View style={styles.topRow}>

        <View style={styles.leftTop}>
          <View style={styles.iconBox}>
            <Ionicons
              name="car-outline"
              size={24}
              color="#111"
            />
          </View>

          <View>
            <Text style={styles.mallName}>{mall}</Text>
            <Text style={styles.areaText}>{area}</Text>
          </View>
        </View>

        <View style={[
          styles.statusBadge,
          isPending ? styles.pendingBadge : status === 'expired' ? styles.expiredBadge : styles.completedBadge,
        ]}>
          <Text style={[
            styles.statusText,
            isPending ? styles.pendingText : status === 'expired' ? styles.expiredText : styles.completedText,
          ]}>{badgeText}</Text>
        </View>

      </View>

      {/* DETAIL */}
      <View style={styles.detailRow}>

        {/* MASUK / MULAI */}
        <View style={styles.detailItem}>
          <View style={styles.detailTitleRow}>
            <Ionicons
              name="log-in-outline"
              size={20}
              color="#1565C0"
            />
            <Text style={styles.detailTitle}>{isPending ? 'Mulai' : 'Masuk'}</Text>
          </View>

          <Text style={styles.timeText}>{checkIn}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>

        <View style={styles.verticalLine} />

        {/* KELUAR / SISA WAKTU */}
        <View style={styles.detailItem}>
          <View style={styles.detailTitleRow}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#1565C0"
            />
            <Text style={styles.detailTitle}>{isPending ? 'Sisa Waktu' : 'Keluar'}</Text>
          </View>

          <Text style={styles.timeText}>{checkOut}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>

        <View style={styles.verticalLine} />

        {/* SLOT / DURASI */}
        <View style={styles.detailItem}>
          <View style={styles.detailTitleRow}>
            <Ionicons
              name="time-outline"
              size={20}
              color="#1565C0"
            />
            <Text style={styles.detailTitle}>{isPending ? 'Slot' : 'Durasi'}</Text>
          </View>

          <Text style={styles.durationText}>{isPending ? slot || duration : duration}</Text>
        </View>

      </View>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* PAYMENT */}
      <View style={styles.paymentRow}>
        <Text style={styles.paymentTitle}>
          {isPending ? 'Plat Kendaraan' : 'Total Pembayaran'}
        </Text>

        <Text style={styles.paymentValue}>
          {isPending ? plate || total : total}
        </Text>
      </View>

    </View>
  );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#9BC7FF',

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

  leftTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#DCEEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  mallName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1565C0',
    maxWidth: 200,
  },

  areaText: {
    marginTop: 2,
    color: '#222',
    fontSize: 14,
  },

  statusBadge: {
    backgroundColor: '#E5F5E4',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },

  completedBadge: {
    backgroundColor: '#E5F5E4',
  },

  pendingBadge: {
    backgroundColor: '#FFF4DB',
  },

  expiredBadge: {
    backgroundColor: '#FCEAEA',
  },

  statusText: {
    color: '#2ECC71',
    fontSize: 13,
    fontWeight: '700',
  },

  pendingText: {
    color: '#9E7116',
  },

  expiredText: {
    color: '#C62828',
  },

  /* DETAIL */
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },

  detailItem: {
    flex: 1,
  },

  detailTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
  },

  detailTitle: {
    color: '#1565C0',
    fontWeight: '700',
    fontSize: 14,
  },

  timeText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
  },

  dateText: {
    marginTop: 5,
    color: '#444',
    fontSize: 12,
  },

  durationText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    lineHeight: 22,
  },

  verticalLine: {
    width: 1,
    height: 85,
    backgroundColor: '#D8E9FF',
    marginHorizontal: 12,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 18,
  },

  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  paymentTitle: {
    color: '#1565C0',
    fontSize: 16,
    fontWeight: '800',
  },

  paymentValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },

});