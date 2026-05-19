import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ParkingSlot from '../ParkingSlot';

type SlotStatus = 'available' | 'selected' | 'manual' | 'online' | 'occupied';

type FloorProps = {
  selectedSlot?: string | null;
  onSelectSlot: (slotId: string, currentStatus: string) => void;
  slotStatuses?: Record<string, SlotStatus>;
};

const resolveSlotStatus = (
  slot: string,
  baseStatus: SlotStatus,
  slotStatuses?: Record<string, SlotStatus>,
  selectedSlot?: string | null
) => {
  if (slotStatuses && slot in slotStatuses) {
    return slotStatuses[slot];
  }

  if (selectedSlot === slot) {
    return 'selected';
  }

  return baseStatus;
};

export default function P2({ selectedSlot, onSelectSlot, slotStatuses }: FloorProps) {
  return (
    <View style={styles.parkingLayout}>
      <View style={styles.rowGroup}>
        <View style={styles.sideColumn}>
          <ParkingSlot
            slot="C1"
            status={resolveSlotStatus('C1', 'available', slotStatuses, selectedSlot)}
            side="left"
            onPress={() => onSelectSlot('C1', resolveSlotStatus('C1', 'available', slotStatuses, selectedSlot))}
          />
          <ParkingSlot
            slot="C2"
            status={resolveSlotStatus('C2', 'available', slotStatuses, selectedSlot)}
            side="left"
            onPress={() => onSelectSlot('C2', resolveSlotStatus('C2', 'available', slotStatuses, selectedSlot))}
          />
          <ParkingSlot
            slot="C3"
            status={resolveSlotStatus('C3', 'online', slotStatuses, selectedSlot)}
            side="left"
          />
        </View>

        <View style={styles.roadSection}>
          <Ionicons name="arrow-down" size={42} color="#fff" style={styles.arrowIcon} />
          <Text style={styles.floorText}>P2</Text>
          <Ionicons name="arrow-down" size={42} color="#fff" style={styles.arrowIcon} />
        </View>

        <View style={styles.sideColumn}>
          <ParkingSlot
            slot="D1"
            status={resolveSlotStatus('D1', 'available', slotStatuses, selectedSlot)}
            side="right"
            onPress={() => onSelectSlot('D1', resolveSlotStatus('D1', 'available', slotStatuses, selectedSlot))}
          />
          <ParkingSlot
            slot="D2"
            status={resolveSlotStatus('D2', 'manual', slotStatuses, selectedSlot)}
            side="right"
            onPress={() => onSelectSlot('D2', resolveSlotStatus('D2', 'manual', slotStatuses, selectedSlot))}
          />
          <ParkingSlot
            slot="D3"
            status={resolveSlotStatus('D3', 'available', slotStatuses, selectedSlot)}
            side="right"
            onPress={() => onSelectSlot('D3', resolveSlotStatus('D3', 'available', slotStatuses, selectedSlot))}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parkingLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  roadSection: {
    width: 120,
    alignItems: 'center',
  },
  arrowIcon: {
    marginVertical: 8,
  },
  floorText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
});