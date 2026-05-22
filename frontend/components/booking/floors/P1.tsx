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
          <View style={styles.blueLongBlock} />
          
          <Text style={styles.routeTextSmall}>GA =› P1</Text>
          <View style={styles.spacerSlot} />
          <Text style={styles.routeTextSmall}>P1A =› P1</Text>

          {/* Slot Abu-Abu Horizontal Kecil */}
          <View style={styles.horizontalSmallDivider} />

          {/* BLOK 1: 3 Mobil Merah (R1, R2, R3) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R1" 
              status={resolveSlotStatus("R1", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R1", resolveSlotStatus("R1", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R2" 
              status={resolveSlotStatus("R2", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R2", resolveSlotStatus("R2", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R3" 
              status={resolveSlotStatus("R3", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R3", resolveSlotStatus("R3", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 2: 3 Mobil Merah (R4, R5, R6) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R4" 
              status={resolveSlotStatus("R4", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R4", resolveSlotStatus("R4", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R5" 
              status={resolveSlotStatus("R5", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R5", resolveSlotStatus("R5", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R6" 
              status={resolveSlotStatus("R6", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R6", resolveSlotStatus("R6", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 3: 3 Mobil Merah (R7, R8, R9) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R7" 
              status={resolveSlotStatus("R7", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R7", resolveSlotStatus("R7", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R8" 
              status={resolveSlotStatus("R8", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R8", resolveSlotStatus("R8", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R9" 
              status={resolveSlotStatus("R9", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R9", resolveSlotStatus("R9", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4: 3 Mobil Merah (R10, R11, R12) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R10" 
              status={resolveSlotStatus("R10", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R10", resolveSlotStatus("R10", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R11" 
              status={resolveSlotStatus("R11", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R11", resolveSlotStatus("R11", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R12" 
              status={resolveSlotStatus("R12", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R12", resolveSlotStatus("R12", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 5: 3 Mobil Merah (R13, R14, R15) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R13" 
              status={resolveSlotStatus("R13", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R13", resolveSlotStatus("R13", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R14" 
              status={resolveSlotStatus("R14", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R14", resolveSlotStatus("R14", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R15" 
              status={resolveSlotStatus("R15", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R15", resolveSlotStatus("R15", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 6: 3 Slot Dinamis / Available (R16, R17, R18) -> (Fiks: Terkoneksi Penuh) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R16" 
              status={resolveSlotStatus("R16", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R16", resolveSlotStatus("R16", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R17" 
              status={resolveSlotStatus("R17", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R17", resolveSlotStatus("R17", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R18" 
              status={resolveSlotStatus("R18", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R18", resolveSlotStatus("R18", "available", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* Label Alur Jalan Bawah Kiri */}
          <Text style={styles.routeTextSmall}>GA ‹= P1</Text>
          <View style={styles.spacerSlot} />
          <Text style={styles.routeTextSmall}>P1A ‹= P1</Text>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 7: 3 Slot Dinamis Paling Bawah Kiri (R19, R20, R21) -> (Fiks: Terkoneksi Penuh) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R19" 
              status={resolveSlotStatus("R19", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R19", resolveSlotStatus("R19", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R20" 
              status={resolveSlotStatus("R20", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R20", resolveSlotStatus("R20", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R21" 
              status={resolveSlotStatus("R21", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R21", resolveSlotStatus("R21", "available", slotStatuses, selectedSlot))} 
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

          {/* BLOK 1 KANAN: 3 Mobil Merah (L1, L2, L3) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L1" 
              status={resolveSlotStatus("L1", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L1", resolveSlotStatus("L1", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L2" 
              status={resolveSlotStatus("L2", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L2", resolveSlotStatus("L2", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L3" 
              status={resolveSlotStatus("L3", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L3", resolveSlotStatus("L3", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 2 KANAN: 3 Mobil Merah (L4, L5, L6) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L4" 
              status={resolveSlotStatus("L4", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L4", resolveSlotStatus("L4", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L5" 
              status={resolveSlotStatus("L5", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L5", resolveSlotStatus("L5", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L6" 
              status={resolveSlotStatus("L6", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L6", resolveSlotStatus("L6", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 3 KANAN: 3 Mobil Merah (L7, L8, L9) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L7" 
              status={resolveSlotStatus("L7", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L7", resolveSlotStatus("L7", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L8" 
              status={resolveSlotStatus("L8", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L8", resolveSlotStatus("L8", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L9" 
              status={resolveSlotStatus("L9", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L9", resolveSlotStatus("L9", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 4 KANAN: 3 Mobil Merah (L10, L11, L12) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L10" 
              status={resolveSlotStatus("L10", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L10", resolveSlotStatus("L10", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L11" 
              status={resolveSlotStatus("L11", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L11", resolveSlotStatus("L11", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L12" 
              status={resolveSlotStatus("L12", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L12", resolveSlotStatus("L12", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 5 KANAN: 3 Mobil Merah (L13, L14, L15) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L13" 
              status={resolveSlotStatus("L13", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L13", resolveSlotStatus("L13", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L14" 
              status={resolveSlotStatus("L14", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L14", resolveSlotStatus("L14", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L15" 
              status={resolveSlotStatus("L15", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L15", resolveSlotStatus("L15", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 6 KANAN: 3 Slot Dinamis Paling Bawah Kanan (L16, L17, L18) -> (Fiks: ID P1-P17 dirapikan jadi L17) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L16" 
              status={resolveSlotStatus("L16", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L16", resolveSlotStatus("L16", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L17" 
              status={resolveSlotStatus("L17", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L17", resolveSlotStatus("L17", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L18" 
              status={resolveSlotStatus("L18", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L18", resolveSlotStatus("L18", "available", slotStatuses, selectedSlot))} 
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