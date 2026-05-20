import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ParkingSlot from '../ParkingSlot'; // Sesuaikan path jika berbeda

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

export default function GroundFloor({ selectedSlot, onSelectSlot, slotStatuses }: FloorProps) {
  return (
    <View style={styles.parkingLayout}>
      <View style={styles.rowGroup}>
        
        {/* ========== LEFT SIDE COLUMN ========== */}
        <View style={styles.sideColumn}>
          {/* BLOK 1: A1, A2, spacer */} 
          <View style={styles.groupDividerLeft} />
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A1" status={resolveSlotStatus("A1", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A1", resolveSlotStatus("A1", "manual", slotStatuses))} />
            <ParkingSlot slot="A2" status={resolveSlotStatus("A2", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A2", resolveSlotStatus("A2", "manual", slotStatuses))} />
            <ParkingSlot slot="A3" status={resolveSlotStatus("A3", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A3", resolveSlotStatus("A3", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerLeftLong} />

          <View style={styles.block3Rows}>  
            <Text style={styles.mallText}>P3A - P4</Text>
            <View style={styles.spacerSlot} />
            <Text style={styles.mallText}>P4A - P4</Text>

          </View>

          <View style={styles.groupDividerLeftLong} />
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A4" status={resolveSlotStatus("A4", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A4", resolveSlotStatus("A4", "manual", slotStatuses))} />
            <ParkingSlot slot="A5" status={resolveSlotStatus("A5", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A5", resolveSlotStatus("A5", "manual", slotStatuses))} />
            <ParkingSlot slot="A6" status={resolveSlotStatus("A6", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A6", resolveSlotStatus("A6", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 3: A6, A7, A8 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P4-A7" status={resolveSlotStatus("P4-A7", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A7", "available")} />
            <ParkingSlot slot="P4-A8" status={resolveSlotStatus("P4-A8", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A8", "available")} />
            <ParkingSlot slot="P4-A9" status={resolveSlotStatus("P4-A9", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A9", "available")} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4: A9, A10, A11 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P4-A10" status={resolveSlotStatus("P4-A10", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A10", "available")} />
            <ParkingSlot slot="P4-A11" status={resolveSlotStatus("P4-A11", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A11", "available")} />
            <ParkingSlot slot="P4-A12" status={resolveSlotStatus("P4-A12", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A12", "available")} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4: A9, A10, A11 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P4-A13" status={resolveSlotStatus("P4-A13", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A13", "available")} />
          
          <View style={styles.block3Rows}><ParkingSlot slot="P4-A14" status={resolveSlotStatus("P4-A14", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A14", "available")}/></View>

            <ParkingSlot slot="P4-A15" status={resolveSlotStatus("P4-A15", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A15", "available")} />
          </View>
          <View style={styles.groupDividerLeft} />

          <View style={styles.block3Rows}>
            <ParkingSlot slot="P4-A16" status={resolveSlotStatus("P4-A16", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A16", "available")} />
            <ParkingSlot slot="P4-A17" status={resolveSlotStatus("P4-A17", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A17", "available")} />
            <ParkingSlot slot="A18" status={resolveSlotStatus("A18", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A18", resolveSlotStatus("A18", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerLeft} />

          <View style={styles.block3Rows}>
            <ParkingSlot slot="P4-A19" status={resolveSlotStatus("P4-A19", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A19", "available")} />
            <ParkingSlot slot="A20" status={resolveSlotStatus("A20", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A20", resolveSlotStatus("A20", "manual", slotStatuses))} />
            <ParkingSlot slot="A21" status={resolveSlotStatus("A21", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A21", resolveSlotStatus("A21", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerLeft} />

          <View style={styles.block3Rows}>
            <Text style={styles.mallText}>P3A - P4</Text>
            <View style={styles.spacerSlot} />
            <Text style={styles.mallText}>P4A - P4</Text>
          </View>

          <View style={styles.groupDividerLeft} />

          {/* BLOK 9: A18 (Dinamis), A19 (Manual), A20 (Online) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P4-A18" 
              status={resolveSlotStatus("P4-A18", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("P4-A18", "available")}
            />
            <ParkingSlot slot="P4-A19" status={resolveSlotStatus("P4-A19", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A19", "available")} />
            <ParkingSlot slot="P4-A20" status={resolveSlotStatus("P4-A20", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4-A20", "available")} />
          </View>
        </View>

        {/* ========== CENTER ROAD SECTION ========== */}
        <View style={styles.roadSection}>
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <Text style={styles.floorText}>P4</Text>
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <Text style={styles.floorText}>P4</Text>
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          
          <View style={styles.mainVerticalLine3} />
          <Ionicons name="caret-down" size={24} color="#fff" style={styles.bottomArrowHead3} />

          {/* PI ATAS*/  }
          <View style={styles.leftBranchLine} />
          <View style={styles.leftBranchLine2} />
          <View style={styles.mainVerticalLine  } />
          <Ionicons name="caret-up" size={24} color="#fff" style={styles.topArrowHead} />
          <Ionicons name="caret-down" size={24} color="#fff" style={styles.bottomArrowHead} />

          {/* PI BAWAH*/}
          <View style={styles.leftBranchLine3} />
          <View style={styles.leftBranchLine4} />
          <View style={styles.mainVerticalLine2  } />
          <Ionicons name="caret-back" size={24} color="#fff" style={styles.topArrowHead2} />
          <Ionicons name="caret-back" size={24} color="#fff" style={styles.topArrowHead3} />
          <Ionicons name="caret-down" size={24} color="#fff" style={styles.bottomArrowHead2} />
          
        </View>

        {/* ========== RIGHT SIDE COLUMN ========== */}
        <View style={styles.sideColumn}>
          <View style={styles.groupDividerRight} />

          {/* BLOK 1: B1 (Dinamis), B2 (Manual), B3 (Dinamis) */}
          <View style={styles.block3Rows}>
            <ParkingSlot
              slot="B1" 
              status={resolveSlotStatus("P4-B1", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B1", "available")}
            />
            <ParkingSlot slot="B2" status={resolveSlotStatus("B2", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B2", resolveSlotStatus("B2", "manual", slotStatuses))} />
            <ParkingSlot 
              slot="B3" 
              status={resolveSlotStatus("P4-B3", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B3", "available")}
            />
          </View>
          <View style={styles.groupDividerRightLong} />

          {/* BLOK 2: B4 (Online), B5 (Manual), B6 (Dinamis) */}
          <View style={styles.block3Rows}>
    
            <ParkingSlot slot="B4" status={resolveSlotStatus("B4", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B4", resolveSlotStatus("B4", "manual", slotStatuses))} />
            <ParkingSlot 
              slot="B5" 
              status={resolveSlotStatus("P4-B5", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B5", "available")}
            />
          </View>
          <View style={styles.groupDividerRightLongBig} />
          {/* BLOK 4: Teks Pintu Masuk Mall */}
          <View style={styles.block3Rows}>
            <Text style={styles.mallText}>Pintu</Text>
            <Text style={styles.mallText}>Masuk</Text>
            <Text style={styles.mallText}>Mall</Text>
          </View>
          <View style={styles.groupDividerRightLongBigger} />

          {/* BLOK 5: spacer, spacer, B10 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="B6" status={resolveSlotStatus("B6", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B6", resolveSlotStatus("B6", "manual", slotStatuses))} />
            <ParkingSlot slot="B7" status={resolveSlotStatus("B7", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B7", resolveSlotStatus("B7", "manual", slotStatuses))} />
            <ParkingSlot slot="P4-B8" status={resolveSlotStatus("P4-B8", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4-B8", "available")} />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 6: B11 (Dinamis), B12 (Manual), B13 (Dinamis) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B9" 
              status={resolveSlotStatus("P4-B9", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B9", "available")}
            />
            <ParkingSlot slot="P4-B10" status={resolveSlotStatus("P4-B10", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4-B10", "available")} />
            <ParkingSlot 
              slot="P4-B11" 
              status={resolveSlotStatus("P4-B11", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B11", "available")} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 7: B14 (Dinamis), B15 (Dinamis), B16 (Manual) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B12" 
              status={resolveSlotStatus("P4-B12", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B12", "available")}
            />
            <ParkingSlot 
              slot="B13" 
              status={resolveSlotStatus("P4-B13", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B13", "available")}
            />
            <ParkingSlot slot="P4-B14" status={resolveSlotStatus("P4-B14", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4-B14", "available")} />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 8: B17 (Dinamis), B18 (Manual), B19 (Online) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B15" 
              status={resolveSlotStatus("P4-B15", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B15", "available")}
            />
            <ParkingSlot slot="P4-B16" status={resolveSlotStatus("P4-B16", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4-B16", "available")} />
            <ParkingSlot slot="P4-B17" status={resolveSlotStatus("P4-B17", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4-B17", "available")} />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 9: B20 (Dinamis), B21 (Online), B22 (Dinamis) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="P4-A18" 
              status={resolveSlotStatus("P4-B18", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B18", "available")}
            />
            <ParkingSlot slot="P4-B19" status={resolveSlotStatus("P4-B19", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4-B19", "available")} />
            <ParkingSlot 
              slot="B20" 
              status={resolveSlotStatus("P4-B20", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("P4-B20", "available")}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 10: B23 (Online), B24 (Manual), spacer */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="P4-B21" status={resolveSlotStatus("P4-B21", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4-B21", "available")} />
            <ParkingSlot slot="P4-B22" status={resolveSlotStatus("P4-B22", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4-B22", "available")} />
            <ParkingSlot slot="P4-B23" status={resolveSlotStatus("P4-B23", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4-B23", "available")} />
          </View>
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
    width: 140,
    alignItems: 'center',
  },
  topArrow: {
    marginTop: 20,
    marginBottom: 10,
  },
  intersectionWrapper: {
    width: 80,
    height: 90,
    marginVertical: 10,
    position: 'relative',
  },
  mainVerticalLine: {
    width: 6,
    height: 110,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 33,
    left: 68  ,
  },
  mainVerticalLine2: {
    width: 6,
    height: 110,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 12,
    left: 68  ,
  },
  mainVerticalLine3: {
    width: 6,
    height: 110,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 540,
    left: 68  ,
  },
  leftBranchLine: {
    height: 6,
    width: 54,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 52,
    left: 15,
  },
  leftBranchLine2: {
    height: 6,
    width: 54,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 115,
    left: 15,
  },
  leftBranchLine3: {
    height: 6,
    width: 54,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 92.5,
    left: 15,
  },
  leftBranchLine4: {
    height: 6,
    width: 54,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 30  ,
    left: 15,
  },
  leftArrowHead: {
    position: 'absolute',
    top: 31,
    left: 0,
  },
  topArrowHead: {
    position: 'absolute',
    top: 20,
    left: 58.8,
  },
  bottomArrowHead: {
    position: 'absolute',
    top: 130  ,
    left: 58.8,
  },
  topArrowHead2: {
    position: 'absolute',
    bottom: 82.5,
    left: 5,
  },
  topArrowHead3: {
    position: 'absolute',
    bottom: 20,
    left: 5,
  },
  bottomArrowHead2: {
    position: 'absolute',
    bottom: -6  ,
    left: 58.8,
  },
  bottomArrowHead3: {
    position: 'absolute',
    top: 640  ,
    left: 58.8,
  },
  bottomArrow: {
    marginVertical: 20,
  },
  floorText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff',
    marginVertical: 15,
    textAlign: 'center',
  },
  mallText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: 3,
    fontSize: 12,
  },
  block3Rows: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginVertical: 2,
  },
  groupDividerLeft: {
    width: 15,
    height: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginVertical: 3,
  },
  groupDividerLeftLong: {
    width: 55,
    height: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginVertical: 3,  
  },
  groupDividerRight: {
    width: 15,
    height: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginVertical: 3,
    marginLeft: 4,
  },
  groupDividerRightLong: {
    width: 55,
    height: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginVertical: 3,
    marginLeft: 4  ,
  },
  groupDividerRightLongBig: {
    width: 55,
    height: 65,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginVertical: 3,
    marginLeft: 5 ,
  },
  groupDividerRightLongBigger: {
    width: 55,
    height: 130,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginVertical: 3,
    marginLeft: 6 ,
  },
  longDivider: {
    width: 15,
    height: 27,
    backgroundColor: '#7A7A7A',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    marginVertical: 3,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  longDivider2: {
    width: 52,
    height: 135,
    backgroundColor: '#7A7A7A',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginVertical: 3,
    marginLeft: 20,
  },
  spacerSlot: {
    width: 52,
    height: 27,
    marginVertical: 3,
    opacity: 0,
  },
});


