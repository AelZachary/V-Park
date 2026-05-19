import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ParkingSlot from '../ParkingSlot';

type GroundFloorProps = {
  selectedSlot: string | null;
  onSelectSlot: (slotId: string, currentStatus: string) => void;
};

export default function GroundFloorA({ selectedSlot, onSelectSlot }: GroundFloorProps) {
  return (
    <View style={styles.parkingLayout}>
      <View style={styles.rowGroup}>
        
        {/* ========== LEFT SIDE COLUMN (MURNI PUNYA KAMU, TIDAK DIUBAH) ========== */}
        <View style={styles.sideColumn}>
          {/* BLOK 1: A1 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A1" status="online" side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 2: A2, A3, A4 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A2" status="manual" side="left" />
            <ParkingSlot slot="A3" status="online" side="left" />
            <ParkingSlot 
              slot="A4" 
              status={selectedSlot === 'A4' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A4', 'available')}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 3: A5, A6, A7 */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="A5" 
              status={selectedSlot === 'A5' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A5', 'available')}
            />
            <ParkingSlot 
              slot="A6" 
              status={selectedSlot === 'A6' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A6', 'available')}
            />
            <ParkingSlot slot="A7" status="online" side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4: A8, A9, A10 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A8" status="manual" side="left" />
            <ParkingSlot 
              slot="A9" 
              status={selectedSlot === 'A9' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A9', 'available')}
            />
            <ParkingSlot slot="A10" status="online" side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 5: A11, A12, A13 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A11" status="online" side="left" />
            <ParkingSlot slot="A12" status="manual" side="left" />
            <ParkingSlot 
              slot="A13" 
              status={selectedSlot === 'A13' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A13', 'available')}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 6: A14, A15, A16 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A14" status="online" side="left" />
            <ParkingSlot slot="A15" status="manual" side="left" />
            <ParkingSlot 
              slot="A16" 
              status={selectedSlot === 'A16' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A16', 'available')}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 7: A17, A18, A19 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A17" status="online" side="left" />
            <ParkingSlot 
              slot="A18" 
              status={selectedSlot === 'A18' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A18', 'available')}
            />
            <ParkingSlot 
              slot="A19" 
              status={selectedSlot === 'A19' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A19', 'available')}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 8: spacer, GA - G, spacer */}
          <View style={styles.block3Rows}>
            <View style={styles.spacerSlot} />
            <Text style={styles.sideRouteText}>G =› GA</Text>
            <View style={styles.spacerSlot} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 9: spacer, GA - G, spacer */}
          <View style={styles.block3Rows}>
            <View style={styles.spacerSlot} />
            <Text style={styles.arrowLabelText}>OUT ‹= P1</Text>
            <View style={styles.spacerSlot} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 10: A20 (Online), A21 (Dinamis), A22 (Dinamis) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A20" status="online" side="left" />
            <ParkingSlot 
              slot="A21" 
              status={selectedSlot === 'A21' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A21', 'available')}
            />
            <ParkingSlot 
              slot="A22" 
              status={selectedSlot === 'A22' ? 'selected' : 'available'} 
              side="left" 
              onPress={() => onSelectSlot('A22', 'available')}
            />
          </View>

          <View style={styles.grayRampBlock} />
        </View>

        {/* ========== CENTER ROAD SECTION (MURNI PUNYA KAMU, TIDAK DIUBAH) ========== */}
        <View style={styles.roadSection}>

          <View style={styles.longArrowUpWrapper}>
            <View style={styles.longArrowLine} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.longArrowHead} />
          </View>

          <Text style={styles.floorText}>GA</Text>

          <View style={styles.intersectionRightWrapper}>
            <View style={styles.mainVerticalLine} />
            <View style={styles.rightBranchLine} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.topArrowHead} />
            <Ionicons name="caret-forward" size={24} color="#fff" style={styles.rightArrowHead} />
          </View>

          <Text style={styles.floorText}>GA</Text>

          <View style={styles.longArrowUpWrapper}>
            <View style={styles.longArrowLine} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.longArrowHead} />
          </View>

          <Text style={styles.floorText}>GA</Text>

          <View style={styles.longArrowUpWrapper}>
            <View style={styles.longArrowLine} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.longArrowHead} />
          </View>

          <Text style={styles.floorText}>GA</Text>
          
          <View style={styles.longArrowUpWrapper}>
            <View style={styles.longArrowLine} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.longArrowHead} />
          </View>

          <Text style={styles.floorText}>GA</Text>

          <View style={styles.turnUpWrapper}>
            <View style={styles.turnVerticalLine} />
            <View style={styles.turnHorizontalLine} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.turnUpArrowHead} />
          </View>

          {/* === AREA BAWAH === */}
          {/* Pembatas Jalan Oval */}
          <View style={styles.midRoadRow}>
            <View style={styles.roadDotsRow}>
              <View style={styles.roadDotItem} />
              <View style={styles.roadDotItem} />
              <View style={styles.roadDotItem} />
              <View style={styles.roadDotItem} />
            </View>
          </View>

          {/* 👇 PANAH BARU: Siku Double (Z-Shape) Keluar ke Kiri */}
          <View style={styles.turnOutLeftWrapper}>
            <View style={styles.outBaseHorizontalLine} />
            <View style={styles.outVerticalLine} />
            <View style={styles.outTopHorizontalLine} />
            <Ionicons name="caret-back" size={24} color="#fff" style={styles.outLeftArrowHead} />
          </View>

          <Text style={styles.floorText}>GA</Text>
          
          <View style={styles.longArrowUpWrapper}>
            <View style={styles.longArrowLine} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.longArrowHead} />
          </View>

          <Text style={styles.floorText}>GA</Text>
        </View>

        {/* ========== RIGHT SIDE COLUMN ========== */}
        <View style={styles.sideColumn}>
          {/* BLOK 1: B1 */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B1" 
              status={selectedSlot === 'B1' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B1', 'available')}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 2: Merah (B4), Teks Akses GA => P1, Spacer */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="B2" status="online" side="right" />
            <ParkingSlot slot="B3" status="manual" side="right" />
            <ParkingSlot slot="B4" status="manual" side="right" />
          </View>

          {/* BLOK 3: Fiksasi Teks & Huruf L Pembatas Kanan Atas */}
          <View style={styles.horizontalLongDivider} />
          {/* 👇 PERBAIKAN: Menggunakan style label text yang benar agar layout L tidak hancur */}
          <Text style={styles.arrowLabelText}>GA =› P1</Text>
          <View style={styles.lShapeGrayWall} />

          {/* BLOK 4: B5, B6, B7 */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B5" 
              status={selectedSlot === 'B5' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B5', 'available')}
            />
            <ParkingSlot 
              slot="B6" 
              status={selectedSlot === 'B6' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B6', 'available')}
            />
            <ParkingSlot slot="B7" status="manual" side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 5: B8, B9, B10 */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B8" 
              status={selectedSlot === 'B8' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B8', 'available')}
            />
            <ParkingSlot 
              slot="B9" 
              status={selectedSlot === 'B9' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B9', 'available')}
            />
            <ParkingSlot slot="B10" status="manual" side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 6: B11, B12, B13 */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B11" 
              status={selectedSlot === 'B11' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B11', 'available')}
            />
            <ParkingSlot slot="B12" status="manual" side="right" />
            <ParkingSlot 
              slot="B13" 
              status={selectedSlot === 'B13' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B13', 'available')}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 7: B14, B15, B16 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="B14" status="online" side="right" />
            <ParkingSlot slot="B15" status="manual" side="right" />
            <ParkingSlot slot="B16" status="manual" side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 8: B17, B18, B19 */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B17" 
              status={selectedSlot === 'B17' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B17', 'available')}
            />
            <ParkingSlot slot="B18" status="manual" side="right" />
            <ParkingSlot 
              slot="B19" 
              status={selectedSlot === 'B19' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B19', 'available')}
            />
          </View>
          <View style={styles.horizontalLongDivider} />

          {/* BLOK 9: B20, B21, B22 */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B20" 
              status={selectedSlot === 'B20' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B20', 'available')}
            />
            <ParkingSlot 
              slot="B21" 
              status={selectedSlot === 'B21' ? 'selected' : 'available'} 
              side="right" 
              onPress={() => onSelectSlot('B21', 'available')}
            />
            <ParkingSlot slot="B22" status="manual" side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 10: Teks GA <= P1 & Pembatas Tiang Bawah */}
          <View style={styles.block3Rows}>
            <Text style={styles.arrowLabelText}>GA ‹= P1</Text>
            <View style={styles.spacerSlot} />
            <View style={styles.spacerSlot} />
          </View>
          
          {/* Pondasi Abu-Abu Kanan Bawah */}
          <View style={styles.grayRampBlock} />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parkingLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideColumn: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  roadSection: {
    width: 130,
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
  spacerSlot: {
    width: 52,
    height: 27,
    marginVertical: 3,
    opacity: 0,
  },
  groupDividerLeft: {
    width: 15,
    height: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginRight: 25, 
    marginVertical: 5,
  },
  groupDividerRight: {
    width: 15,
    height: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginLeft: 25,
  },
  horizontalLongDivider: {
    width: 52,
    height: 12,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    marginVertical: 4,
    alignSelf: 'center',
  },
  lShapeGrayWall: {
    width: 52,
    height: 90,
    borderLeftWidth: 10,
    borderBottomWidth: 10,
    borderColor: '#D9D9D9',
    marginTop: 4,
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  grayRampBlock: {
    width: 55,
    height: 120,
    backgroundColor: '#7A7A7A',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 10,
    marginTop: 15,
  },

 // Teks Jalan & Route
  floorText: {
    fontSize: 35,
    fontWeight: '900',
    color: '#fff',
    marginVertical: 40, 
    textAlign: 'center',
  },
  bottomGText: {
    fontSize: 45,
    fontWeight: '900',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  mallText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: 3,
    fontSize: 12,
  },
  arrowLabelText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    width: 100,
    marginVertical: 12,
  },
  sideRouteText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 11,
    width: 65,
    textAlign: 'left',
  },

  // Komponen Marka & Panah Jalan 
  longArrowUpWrapper: {
    width: 30,
    height: 35,
    position: 'relative',
    marginVertical: 4,
    alignItems: 'center',
  },
  longArrowLine: {
    width: 6,
    height: 35,
    backgroundColor: '#fff',
  },
  longArrowHead: {
    position: 'absolute',
    top: -12,
  },

  // Panah Pertigaan Kanan
  intersectionRightWrapper: {
    width: 70,
    height: 75,
    position: 'relative',
    marginVertical: 5,
  },
  mainVerticalLine: {
    width: 6,
    height: 75,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 20,
  },
  rightBranchLine: {
    height: 6,
    width: 35,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 35,
    left: 20,
  },
  topArrowHead: {
    position: 'absolute',
    top: -12,
    left: 11,
  },
  rightArrowHead: {
    position: 'absolute',
    top: 26,
    right: -2,
  },

  // Panah Belok Siku Naik
  turnUpWrapper: {
    width: 50,
    height: 60,
    position: 'relative',
    marginVertical: 10,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  turnVerticalLine: {
    width: 6,
    height: 35,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 30,
  },
  turnHorizontalLine: {
    height: 6,
    width: 35,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  turnUpArrowHead: {
    position: 'absolute',
    top: 15,
    left: 21,
  },

  // Pembatas Jalan (4 Kotak)
  midRoadRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  roadDotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 15,
  },
  roadDotItem: {
    width: 18,
    height: 8,
    backgroundColor: '#424242',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#222',
  },

  // Panah Keluar
  outRoadRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  turnOutLeftWrapper: {
    width: 90,
    height: 80,
    position: 'relative',
    marginTop: 5,
  },
  outBaseHorizontalLine: {
    height: 6,
    width: 50,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -35,
    left: 50, 
  },
  outVerticalLine: {
    width: 6,
    height: 100,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -35,
    left: 45,
  },
  outTopHorizontalLine: {
    height: 6,
    width: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 15,
    left: 8,
  },
  outLeftArrowHead: {
    position: 'absolute',
    top: 6,
    left: -8,
  },

  centerDownArrow: {
    marginVertical: 25,
  },
});