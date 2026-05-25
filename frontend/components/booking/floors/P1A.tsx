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

export default function P1A({ selectedSlot, onSelectSlot, slotStatuses }: FloorProps) {
  return (
    <View style={styles.parkingLayout}>
      <View style={styles.rowGroup}>
        
        {/* ========== LEFT SIDE COLUMN (SISI KIRI) ========== */}
        <View style={styles.sideColumn}>
          <View style={styles.groupDividerLeft} />
          
          {/* BLOK 1 KIRI: 3 Slot Hijau (A1, A2, A3) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L1" 
              status={resolveSlotStatus("L1", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L1", resolveSlotStatus("L1", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot 
              slot="L2" 
              status={resolveSlotStatus("L2", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L2", "online")} 
            />
            <ParkingSlot 
              slot="L3" 
              status={resolveSlotStatus("L3", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L3", "online")} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 2 KIRI: 2 Slot Hijau (L4, A5) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L4" 
              status={resolveSlotStatus("L4", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L4", resolveSlotStatus("L4", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L5" 
              status={resolveSlotStatus("L5", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L5", resolveSlotStatus("L5", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L6" 
              status={resolveSlotStatus("L6", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L6", resolveSlotStatus("L6", "available", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 3 KIRI: 3 Slot Hijau (A7, A8, A9) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L7" 
              status={resolveSlotStatus("L7", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L7", resolveSlotStatus("L7", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot 
              slot="L8" 
              status={resolveSlotStatus("L8", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L8", "online")} 
            />
            <ParkingSlot disabled={false}
              slot="L9" 
              status={resolveSlotStatus("L9", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L9", resolveSlotStatus("L9", "available", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4 KIRI: 3 Slot Hijau (A10, A11, A12) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L10" 
              status={resolveSlotStatus("L10", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L10", resolveSlotStatus("L10", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L11" 
              status={resolveSlotStatus("L11", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L11", resolveSlotStatus("L11", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L12" 
              status={resolveSlotStatus("L12", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L12", resolveSlotStatus("L12", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 5 KIRI: 3 Slot Hijau (A13, A14, A15) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L13" 
              status={resolveSlotStatus("L13", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L13", resolveSlotStatus("L13", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L14" 
              status={resolveSlotStatus("L14", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L14", resolveSlotStatus("L14", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L15" 
              status={resolveSlotStatus("L15", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L15", resolveSlotStatus("L15", "available", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 6 KIRI: 3 Slot Hijau (A16, A17, A18) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L16" 
              status={resolveSlotStatus("L16", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L16", resolveSlotStatus("L16", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L17" 
              status={resolveSlotStatus("L17", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L17", resolveSlotStatus("L17", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L18" 
              status={resolveSlotStatus("L18", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L18", resolveSlotStatus("L18", "available", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 7 KIRI: 3 Slot Hijau Paling Bawah (A19, A20, A21) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L19" 
              status={resolveSlotStatus("L19", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L19", resolveSlotStatus("L19", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L20" 
              status={resolveSlotStatus("L20", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L20", resolveSlotStatus("L20", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L21" 
              status={resolveSlotStatus("L21", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L21", resolveSlotStatus("L21", "available", slotStatuses, selectedSlot))} 
            />
          </View>

          <View style={styles.groupDividerLeft} />

          {/* BLOK 8 KIRI: 3 Slot Hijau (A22, A23, A24) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L22" 
              status={resolveSlotStatus("L22", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L22", resolveSlotStatus("L22", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L23" 
              status={resolveSlotStatus("L23", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L23", resolveSlotStatus("L23", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L24" 
              status={resolveSlotStatus("L24", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L24", resolveSlotStatus("L24", "available", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 9 KIRI: 3 Slot Hijau (A25, A26, A27) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L25" 
              status={resolveSlotStatus("L25", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L25", resolveSlotStatus("L23", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L26" 
              status={resolveSlotStatus("L26", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L26", resolveSlotStatus("L24", "available", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot 
              slot="L27" 
              status={resolveSlotStatus("L27", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L27", "online")} 
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
          <Text style={styles.floorText}>P1A</Text>

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
          <Text style={styles.floorText}>P1A</Text>

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
            <ParkingSlot disabled={false}
              slot="R1" 
              status={resolveSlotStatus("R1", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R1', resolveSlotStatus("R1", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R2" 
              status={resolveSlotStatus("R2", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R2', resolveSlotStatus("R2", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R3" 
              status={resolveSlotStatus("R3", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R3', resolveSlotStatus("R3", "available", slotStatuses, selectedSlot))}
            />
          </View>
          
          {/* Spacer Abu-Abu Horizontal & Label Teks Alur Atas Kanan */}
          <View style={styles.horizontalSmallDividerRight} />
          <View style={styles.routeLabelWrapper}>
            <Text style={styles.routeTextSmall}>P1A =› P2</Text>
          </View>

          <View style={styles.spacerSlot} />

          <View style={styles.routeLabelWrapper}>
            <Text style={styles.routeTextSmall}>P1A =› P1</Text>
          </View>
          <View style={styles.horizontalSmallDividerRight} />

          {/* BLOK 2 KANAN: 3 Slot Hijau (B4, B5, B6) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R4" 
              status={resolveSlotStatus("R4", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R4', resolveSlotStatus("R4", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R5" 
              status={resolveSlotStatus("R5", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R5', resolveSlotStatus("R5", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R6" 
              status={resolveSlotStatus("R6", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R6", resolveSlotStatus("R6", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 3 KANAN: 3 Slot Hijau (B7, B8, B9) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R7" 
              status={resolveSlotStatus("R7", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R7', resolveSlotStatus("R7", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R8" 
              status={resolveSlotStatus("R8", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R8', resolveSlotStatus("R8", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R9" 
              status={resolveSlotStatus("R9", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R9', resolveSlotStatus("R9", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 4 KANAN: 3 Slot Hijau (B10, B11, B12) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R10" 
              status={resolveSlotStatus("R10", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R10', resolveSlotStatus("R10", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot 
              slot="R11" 
              status={resolveSlotStatus("R11", "online", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R11", "online")} 
            />
            <ParkingSlot disabled={false}
              slot="R12" 
              status={resolveSlotStatus("R12", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R12', resolveSlotStatus("R12", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 5 KANAN: 3 Slot Hijau (B13, B14, B15) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R13" 
              status={resolveSlotStatus("R13", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R13', resolveSlotStatus("R13", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R14" 
              status={resolveSlotStatus("R14", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R14', resolveSlotStatus("R14", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R15" 
              status={resolveSlotStatus("R15", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R15', resolveSlotStatus("R15", "available", slotStatuses, selectedSlot))}
            />
          </View>

          <View style={styles.groupDividerRight} />

          {/* BLOK 6 KANAN: 3 Slot Hijau (B16, B17, B18) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R16" 
              status={resolveSlotStatus("R16", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R16', resolveSlotStatus("R16", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R17" 
              status={resolveSlotStatus("R17", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R17', resolveSlotStatus("R17", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot 
              slot="R18" 
              status={resolveSlotStatus("R18", "online", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R18", "online")} 
            />
          </View>

          <View style={styles.horizontalSmallDividerRight} />
          {/* BLOK 6 KANAN: 3 Slot Hijau Paling Bawah (B19, B20, B21) */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R19" 
              status={resolveSlotStatus("R19", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R19', resolveSlotStatus("R19", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R20" 
              status={resolveSlotStatus("R20", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R20', resolveSlotStatus("R20", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R21" 
              status={resolveSlotStatus("R21", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R21', resolveSlotStatus("R21", "available", slotStatuses, selectedSlot))}
            />
          </View>
          
          {/* Spacer Abu-Abu Horizontal & Label Teks Alur Bawah Kanan */}
          <View style={styles.horizontalSmallDividerRight} />
          <View style={styles.routeLabelWrapper}>
            <Text style={styles.routeTextSmall}>P1A ‹= P2</Text>
          </View>
          <View style={styles.spacerSlot} />
          <View style={styles.routeLabelWrapper}>
            <Text style={styles.routeTextSmall}>P1A ‹= P1</Text>
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