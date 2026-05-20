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

export default function P3A({ selectedSlot, onSelectSlot, slotStatuses }: FloorProps) {
  return (
    <View style={styles.parkingLayout}>
      <View style={styles.rowGroup}>
        
        {/* ========== LEFT SIDE COLUMN (SISI KIRI) ========== */}
        <View style={styles.sideColumn}>
          <View style={styles.groupDividerLeft} />
          
          {/* BLOK 1 KIRI: 3 Slot Hijau (A1, A2, A3) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-A1" 
              status={resolveSlotStatus("P1A-A1", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A1", "online")} 
            />
            <ParkingSlot 
              slot="P1A-A2" 
              status={resolveSlotStatus("P1A-A2", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A2", "manual")} 
            />
            <ParkingSlot 
              slot="P1A-A3" 
              status={resolveSlotStatus("P1A-A3", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A3", "available")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 2 KIRI: 2 Slot Hijau (A4, A5) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-A4" 
              status={resolveSlotStatus("P1A-A4", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A4", "online")} 
            />
            <ParkingSlot 
              slot="P1A-A5" 
              status={resolveSlotStatus("P1A-A5", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A5", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A6" 
              status={resolveSlotStatus("P1A-A6", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A6", "available")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 3 KIRI: 3 Slot Hijau (A7, A8, A9) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-A7" 
              status={resolveSlotStatus("P1A-A7", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A7", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A8" 
              status={resolveSlotStatus("P1A-A8", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A8", "online")} 
            />
            <ParkingSlot 
              slot="P1A-A9" 
              status={resolveSlotStatus("P1A-A9", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A9", "available")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4 KIRI: 3 Slot Hijau (A10, A11, A12) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-A10" 
              status={resolveSlotStatus("P1A-A10", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A10", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A11" 
              status={resolveSlotStatus("P1A-A11", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A11", "manual")} 
            />
            <ParkingSlot 
              slot="P1A-A12" 
              status={resolveSlotStatus("P1A-A12", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A12", "available")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 5 KIRI: 3 Slot Hijau (A13, A14, A15) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-A13" 
              status={resolveSlotStatus("P1A-A13", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A13", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A14" 
              status={resolveSlotStatus("P1A-A14", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A14", "manual")} 
            />
            <ParkingSlot 
              slot="P1A-A15" 
              status={resolveSlotStatus("P1A-A15", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A15", "online")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 6 KIRI: 3 Slot Hijau (A16, A17, A18) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-A16" 
              status={resolveSlotStatus("P1A-A16", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A16", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A17" 
              status={resolveSlotStatus("P1A-A17", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A17", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A18" 
              status={resolveSlotStatus("P1A-A18", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A18", "available")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 7 KIRI: 3 Slot Hijau Paling Bawah (A19, A20, A21) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-A19" 
              status={resolveSlotStatus("P1A-A19", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A19", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A20" 
              status={resolveSlotStatus("P1A-A20", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A20", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A21" 
              status={resolveSlotStatus("P1A-A21", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A21", "available")} 
            />
          </View>

          <View style={styles.groupDividerLeft} />

          {/* BLOK 8 KIRI: 3 Slot Hijau (A22, A23, A24) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-A22" 
              status={resolveSlotStatus("P1A-A22", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A22", "online")} 
            />
            <ParkingSlot 
              slot="P1A-A23" 
              status={resolveSlotStatus("P1A-A23", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A23", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A24" 
              status={resolveSlotStatus("P1A-A24", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A24", "online")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 9 KIRI: 3 Slot Hijau (A25, A26, A27) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-A25" 
              status={resolveSlotStatus("P1A-A25", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A25", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A26" 
              status={resolveSlotStatus("P1A-A26", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A26", "available")} 
            />
            <ParkingSlot 
              slot="P1A-A27" 
              status={resolveSlotStatus("P1A-A27", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P1A-A27", "available")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />
        </View>

        {/* ========== CENTER ROAD SECTION (JALAN TENGAH) ========== */}
        <View style={styles.roadSection}>
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          {/* 1. Panah Cabang Dua Menghadap Atas */}
          <View style={styles.doubleIntersectionUpWrapper}>
            <View style={styles.verticalRoadLine} />
            <View style={styles.horizontalBranchTop} />
            <View style={styles.horizontalBranchBottom} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.arrowHeadUp} />
          </View>

          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />

          {/* Teks P1A Atas */}
          <Text style={styles.floorText}>P3A</Text>

          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />

          {/* Panah Lurus Menghadap ke Atas */}
          <View style={styles.arrowUpContainer}>
            <View style={styles.verticalRoadLineShort} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.arrowHeadUpShort} />
          </View>

          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />

          {/* Teks P1A Bawah */}
          <Text style={styles.floorText}>P3A</Text>

          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />

          {/* 2. Panah Siku Ganda Masuk Menghadap ke Atas */}
          <View style={styles.doubleInWrapper}>
            <View style={styles.verticalRoadLineIn} />
            <View style={styles.horizontalBranchInTop} />
            <View style={styles.horizontalBranchInBottom} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.arrowHeadUpIn} />
          </View>
        </View>

        {/* ========== RIGHT SIDE COLUMN (SISI KANAN) ========== */}
        <View style={styles.sideColumn}>
          <View style={styles.groupDividerRight} />

          {/* BLOK 1 KANAN: 3 Slot Hijau (B1, B2, B3) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-B1" 
              status={resolveSlotStatus("P1A-B1", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B1", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B2" 
              status={resolveSlotStatus("P1A-B2", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B2", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B3" 
              status={resolveSlotStatus("P1A-B3", "online", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B3", "online")} 
            />
          </View>
          
          {/* Spacer Abu-Abu Horizontal & Label Teks Alur Atas Kanan */}
          <View style={styles.horizontalSmallDividerRight} />
          <View style={styles.routeLabelWrapper}>
            <Text style={styles.routeTextSmall}>P3A =› P4</Text>
          </View>

          <View style={styles.spacerSlot} />

          <View style={styles.routeLabelWrapper}>
            <Text style={styles.routeTextSmall}>P3A =› P3</Text>
          </View>
          <View style={styles.horizontalSmallDividerRight} />

          {/* BLOK 2 KANAN: 3 Slot Hijau (B4, B5, B6) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-B4" 
              status={resolveSlotStatus("P1A-B4", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B4", "manual")} 
            />
            <ParkingSlot 
              slot="P1A-B5" 
              status={resolveSlotStatus("P1A-B5", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B5", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B6" 
              status={resolveSlotStatus("P1A-B6", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B6", "available")} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 3 KANAN: 3 Slot Hijau (B7, B8, B9) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-B7" 
              status={resolveSlotStatus("P1A-B7", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B7", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B8" 
              status={resolveSlotStatus("P1A-B8", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B8", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B9" 
              status={resolveSlotStatus("P1A-B9", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B9", "available")} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 4 KANAN: 3 Slot Hijau (B10, B11, B12) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-B10" 
              status={resolveSlotStatus("P1A-B10", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B10", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B11" 
              status={resolveSlotStatus("P1A-B11", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B11", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B12" 
              status={resolveSlotStatus("P1A-B12", "online", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B12", "online")} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 5 KANAN: 3 Slot Hijau (B13, B14, B15) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-B13" 
              status={resolveSlotStatus("P1A-B13", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B13", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B14" 
              status={resolveSlotStatus("P1A-B14", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B14", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B15" 
              status={resolveSlotStatus("P1A-B15", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B15", "available")} 
            />
          </View>

          <View style={styles.groupDividerRight} />

          {/* BLOK 6 KANAN: 3 Slot Hijau (B16, B17, B18) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-B16" 
              status={resolveSlotStatus("P1A-B16", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B16", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B17" 
              status={resolveSlotStatus("P1A-B17", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B17", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B18" 
              status={resolveSlotStatus("P1A-B18", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B18", "available")} 
            />
          </View>

          <View style={styles.horizontalSmallDividerRight} />
          {/* BLOK 6 KANAN: 3 Slot Hijau Paling Bawah (B19, B20, B21) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P1A-B19" 
              status={resolveSlotStatus("P1A-B19", "online", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B19", "online")} 
            />
            <ParkingSlot 
              slot="P1A-B20" 
              status={resolveSlotStatus("P1A-B20", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B20", "available")} 
            />
            <ParkingSlot 
              slot="P1A-B21" 
              status={resolveSlotStatus("P1A-B21", "online", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P1A-B21", "online")} 
            />
          </View>
          
          {/* Spacer Abu-Abu Horizontal & Label Teks Alur Bawah Kanan */}
          <View style={styles.horizontalSmallDividerRight} />
          <View style={styles.routeLabelWrapper}>
            <Text style={styles.routeTextSmall}>P3A ‹= P4</Text>
          </View>
          <View style={styles.spacerSlot} />
          <View style={styles.routeLabelWrapper}>
            <Text style={styles.routeTextSmall}>P3A ‹= P3</Text>
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

  /* ELEMEN STRUKTUR (PEMBATAS ABU-ABU) */
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
    height: 14,
    backgroundColor: '#A0A0A0',
    borderRadius: 4,
    marginVertical: 6,
  },
  horizontalSmallDividerRight: {
    width: 52,
    height: 14,
    backgroundColor: '#A0A0A0',
    borderRadius: 4,
    marginTop: 6,
    marginBottom: 4,
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

  /* TEKS LABELS & ROUTE */
  floorText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    marginVertical: 60,
    textAlign: 'center',
  },
  routeLabelWrapper: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeTextSmall: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 10,
    textAlign: 'center',
  },

  /* PANAH 1: PERTIGAAN GANDA ATAS (MENGHADAP ATAS) */
  doubleIntersectionUpWrapper: {
    width: 80,
    height: 110,
    position: 'relative',
    marginTop: 30,
  },
  verticalRoadLine: {
    width: 6,
    height: 110,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 15,
  },
  horizontalBranchTop: {
    height: 6,
    width: 35,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 35,
    left: 15,
  },
  horizontalBranchBottom: {
    height: 6,
    width: 35,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 75,
    left: 15,
  },
  arrowHeadUp: {
    position: 'absolute',
    top: -12,
    left: 6,
  },

  /* PANAH 2: PANAH LURUS TENGAH (MENGHADAP ATAS) */
  arrowUpContainer: {
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
  arrowHeadUpShort: {
    position: 'absolute',
    top: -12,
    left: 3,
  },

  /* PANAH 3: SIKU MASUK GANDA BAWAH (MENGHADAP ATAS) */
  doubleInWrapper: {
    width: 90,
    height: 120,
    position: 'relative',
  },
  verticalRoadLineIn: {
    width: 6,
    height: 120,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 20,
  },
  horizontalBranchInTop: {
    height: 6,
    width: 45,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 40,
    left: 20,
  },
  horizontalBranchInBottom: {
    height: 6,
    width: 45,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 85,
    left: 20,
  },
  arrowHeadUpIn: {
    position: 'absolute',
    top: -12,
    left: 11,
  },
  spacerSlot: {
    width: 45,
    height: 27,
    marginVertical: 3,
    opacity: 0,
  },
});