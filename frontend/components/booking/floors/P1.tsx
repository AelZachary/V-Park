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
  if (selectedSlot === slot) {
    return 'selected';
  }
  if (slotStatuses && slot in slotStatuses) {
    return slotStatuses[slot];
  }
  return baseStatus;
};

export default function P1({ selectedSlot, onSelectSlot, slotStatuses }: FloorProps) {
  return (
    <View style={styles.parkingLayout}>
      <View style={styles.rowGroup}>
        
        {/* ========== LEFT SIDE COLUMN (SISI KIRI) ========== */}
        <View style={styles.sideColumn}>
          {/* 1. Kotak Biru Panjang Atas Kiri */}
          <View style={styles.blueLongBlock} />
          
          <Text style={styles.routeTextSmall}>GA =› P1</Text>
          <View style={styles.spacerSlot} />
          <Text style={styles.routeTextSmall}>P1A =› P1</Text>

          {/* Slot Abu-Abu Horizontal Kecil */}
          <View style={styles.horizontalSmallDivider} />

          {/* BLOK 1: 3 Mobil Merah (A1, A2, A3) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-A1" status={resolveSlotStatus("P1-A1", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A2" status={resolveSlotStatus("P1-A2", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A3" status={resolveSlotStatus("P1-A3", "manual", slotStatuses, selectedSlot)} side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 2: 3 Mobil Merah (A4, A5, A6) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-A4" status={resolveSlotStatus("P1-A4", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A5" status={resolveSlotStatus("P1-A5", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A6" status={resolveSlotStatus("P1-A6", "manual", slotStatuses, selectedSlot)} side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 3: 3 Mobil Merah (A7, A8, A9) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-A7" status={resolveSlotStatus("P1-A7", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A8" status={resolveSlotStatus("P1-A8", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A9" status={resolveSlotStatus("P1-A9", "manual", slotStatuses, selectedSlot)} side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4: 3 Mobil Merah (A10, A11, A12) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-A10" status={resolveSlotStatus("P1-A10", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A11" status={resolveSlotStatus("P1-A11", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A12" status={resolveSlotStatus("P1-A12", "manual", slotStatuses, selectedSlot)} side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 5: 3 Mobil Merah (A13, A14, A15) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-A13" status={resolveSlotStatus("P1-A13", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A14" status={resolveSlotStatus("P1-A14", "manual", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="P1-A15" status={resolveSlotStatus("P1-A15", "manual", slotStatuses, selectedSlot)} side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 6: 3 Slot Hijau Dinamis / Available (A16, A17, A18) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1-A16" 
              status={resolveSlotStatus("P1-A16", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1-A16", "available")} 
            />
            <ParkingSlot 
              slot="P1-A17" 
              status={resolveSlotStatus("P1-A17", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1-A17", "available")} 
            />
            <ParkingSlot 
              slot="P1-A18" 
              status={resolveSlotStatus("P1-A18", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1-A18", "available")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* Label Alur Jalan Bawah Kiri */}
          <Text style={styles.routeTextSmall}>GA ‹= P1</Text>
          <View style={styles.spacerSlot} />
          <Text style={styles.routeTextSmall}>P1A ‹= P1</Text>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 7: 3 Slot Hijau Dinamis Paling Bawah Kiri (A19, A20, A21) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1-A19" 
              status={resolveSlotStatus("P1-A19", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1-A19", "available")} 
            />
            <ParkingSlot 
              slot="P1-A20" 
              status={resolveSlotStatus("P1-A20", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1-A20", "available")} 
            />
            <ParkingSlot 
              slot="P1-A21" 
              status={resolveSlotStatus("P1-A21", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1-A21", "available")} 
            />
          </View>
        </View>

        {/* ========== CENTER ROAD SECTION (JALAN TENGAH) ========== */}
        <View style={styles.roadSection}>
            <View style={styles.spacerSlot} />
            <View style={styles.spacerSlot} />
            <View style={styles.spacerSlot} />
          
          {/* Panah Pertigaan Ganda Menghadap ke Bawah */}
          <View style={styles.doubleIntersectionWrapper}>
            <View style={styles.verticalRoadLine} />
            <View style={styles.horizontalBranchTop} />
            <View style={styles.horizontalBranchBottom} />
            <Ionicons name="caret-down" size={24} color="#fff" style={styles.arrowHeadDown} />
          </View>

          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />

          {/* Teks P1 Pertama */}
          <Text style={styles.floorText}>P1</Text>

          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />

          {/* Panah Lurus ke Bawah */}
          <View style={styles.arrowDownContainer}>
            <View style={styles.verticalRoadLineShort} />
            <Ionicons name="caret-down" size={24} color="#fff" style={styles.arrowHeadDownShort} />
          </View>

          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />

          {/* Teks P1 Kedua */}
          <Text style={styles.floorText}>P1</Text>

          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />

          <View style={styles.spacerSlot2} />

          {/* Panah Siku Ganda Keluar ke Kiri Menghadap ke Bawah */}
          <View style={styles.doubleOutWrapper}>
            <View style={styles.verticalRoadLineOut} />
            <View style={styles.horizontalBranchOutTop} />
            <View style={styles.horizontalBranchOutBottom} />
            <Ionicons name="caret-back" size={24} color="#fff" style={styles.arrowHeadLeftTop} />
            <Ionicons name="caret-back" size={24} color="#fff" style={styles.arrowHeadLeftBottom} />
            <Ionicons name="caret-down" size={24} color="#fff" style={styles.arrowHeadDownOut} />
          </View>
        </View>

        {/* ========== RIGHT SIDE COLUMN (SISI KANAN) ========== */}
        <View style={styles.sideColumn}>
          {/* 1. Kotak Biru Panjang Atas Kanan */}
          <View style={styles.blueLongBlock2} />

          {/* Area Teks Pintu Masuk Mall */}
          <View style={styles.mallEntranceSpace}>
            <Text style={styles.mallEntranceText}>Pintu Masuk</Text>
            <Text style={styles.mallEntranceText}>Mall</Text>
          </View>

          {/* Dinding Abu-Abu Tebal Tengah Kanan */}
          <View style={styles.grayLongWall} />

          {/* BLOK 1 KANAN: 3 Mobil Merah (B1, B2, B3) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-B1" status={resolveSlotStatus("P1-B1", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B2" status={resolveSlotStatus("P1-B2", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B3" status={resolveSlotStatus("P1-B3", "manual", slotStatuses, selectedSlot)} side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 2 KANAN: 3 Mobil Merah (B4, B5, B6) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-B4" status={resolveSlotStatus("P1-B4", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B5" status={resolveSlotStatus("P1-B5", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B6" status={resolveSlotStatus("P1-B6", "manual", slotStatuses, selectedSlot)} side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 3 KANAN: 3 Mobil Merah (B7, B8, B9) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-B7" status={resolveSlotStatus("P1-B7", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B8" status={resolveSlotStatus("P1-B8", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B9" status={resolveSlotStatus("P1-B9", "manual", slotStatuses, selectedSlot)} side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 4 KANAN: 3 Mobil Merah (B10, B11, B12) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-B10" status={resolveSlotStatus("P1-B10", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B11" status={resolveSlotStatus("P1-B11", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B12" status={resolveSlotStatus("P1-B12", "manual", slotStatuses, selectedSlot)} side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 5 KANAN: 3 Mobil Merah (B13, B14, B15) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P1-B13" status={resolveSlotStatus("P1-B13", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B14" status={resolveSlotStatus("P1-B14", "manual", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot slot="P1-B15" status={resolveSlotStatus("P1-B15", "manual", slotStatuses, selectedSlot)} side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 6 KANAN: 3 Slot Hijau Dinamis Paling Bawah Kanan (B16, B17, B18) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1-B16" 
              status={resolveSlotStatus("P1-B16", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1-B16", "available")} 
            />
            <ParkingSlot 
              slot="P1-B17" 
              status={resolveSlotStatus("P1-P17", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1-P17", "available")} 
            />
            <ParkingSlot 
              slot="P1-B18" 
              status={resolveSlotStatus("P1-B18", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1-B18", "available")} 
            />
          </View>
        </View>

      </View>

      {/* Pondasi Beton Abu-Abu Panjang Paling Dasar Map */}
      <View style={styles.bottomBaseWall} />
    </View>
  );
}

const styles = StyleSheet.create({
  /* LAYOUT DASAR */
  parkingLayout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sideColumn: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  roadSection: {
    width: 140,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  block3Rows: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginVertical: 2,
  },

  /* ELEMEN STRUKTUR (DINDING & PEMBATAS) */
  blueLongBlock: {
    width: 52,
    height: 140,
    backgroundColor: '#729CEF',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#4A74C4',
    marginBottom: 10,
  },

  blueLongBlock2: {
    width: 52,
    height: 248,
    backgroundColor: '#729CEF',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#4A74C4',
    marginBottom: 10,
  },
  grayLongWall: {
    width: 52,
    height: 130,
    backgroundColor: '#A0A0A0',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#7A7A7A',
    marginVertical: 12,
  },
  bottomBaseWall: {
    width: 250,
    height: 15,
    backgroundColor: '#A0A0A0',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#7A7A7A',
    marginTop: 15,
  },
  horizontalSmallDivider: {
    width: 52,
    height: 12,
    backgroundColor: '#A0A0A0',
    borderRadius: 2,
    marginVertical: 6,
  },
  groupDividerLeft: {
    width: 15,
    height: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  groupDividerRight: {
    width: 15,
    height: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginLeft: 15,
  },

  /* TEKS & INFO LABEL */
  floorText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    marginVertical: 65,
    textAlign: 'center',
  },
  routeTextSmall: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 11,
    width: 52,
    textAlign: 'center',
    marginVertical: 4,
  },
  mallEntranceSpace: {
    height: 98,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mallEntranceText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },

  /* PANAH JALAN 1: PERTIGAAN GANDA ATAS */
  doubleIntersectionWrapper: {
    width: 80,
    height: 110,
    position: 'relative',
    marginTop: 40,
  },
  verticalRoadLine: {
    width: 6,
    height: 110,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 37,
  },
  horizontalBranchTop: {
    height: 6,
    width: 35,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 25,
    left: 2,
  },
  horizontalBranchBottom: {
    height: 6,
    width: 35,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 65,
    left: 2,
  },
  arrowHeadDown: {
    position: 'absolute',
    bottom: -12,
    left: 28,
  },

  /* PANAH JALAN 2: PANAH LURUS TENGAH */
  arrowDownContainer: {
    width: 30,
    height: 60,
    position: 'relative',
  },
  verticalRoadLineShort: {
    width: 6,
    height: 60,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  arrowHeadDownShort: {
    position: 'absolute',
    bottom: -12,
    left: 3,
  },

  /* PANAH JALAN 3: SIKU KELUAR GANDA BAWAH */
  doubleOutWrapper: {
    width: 90,
    height: 140,
    position: 'relative',
  },
  verticalRoadLineOut: {
    width: 6,
    height: 140,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 55,
  },
  horizontalBranchOutTop: {
    height: 6,
    width: 45,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 35,
    left: 10,
  },
  horizontalBranchOutBottom: {
    height: 6,
    width: 45,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 85,
    left: 10,
  },
  arrowHeadLeftTop: {
    position: 'absolute',
    top: 26,
    left: 0,
  },
  arrowHeadLeftBottom: {
    position: 'absolute',
    top: 76,
    left: 0,
  },
  arrowHeadDownOut: {
    position: 'absolute',
    bottom: -12,
    left: 46,
  },

  spacerSlot: {
    width: 52,
    height: 27,
    marginVertical: 3,
    opacity: 0,
  },

  spacerSlot2: {
    width: 1,
    height: 27,
    marginVertical: -8,
    opacity: 0,
  },
});