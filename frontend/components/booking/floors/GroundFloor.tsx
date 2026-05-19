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
  if (slotStatuses && slot in slotStatuses) {
    return slotStatuses[slot];
  }

  if (selectedSlot === slot) {
    return 'selected';
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
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A1" status={resolveSlotStatus("A1", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A1", resolveSlotStatus("A1", "manual", slotStatuses))} />
            <View style={styles.spacerSlot} />
            <ParkingSlot slot="A2" status={resolveSlotStatus("A2", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A2", resolveSlotStatus("A2", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 2: A3, A4, A5 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A3" status={resolveSlotStatus("A3", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A3", resolveSlotStatus("A3", "manual", slotStatuses))} />
            <ParkingSlot slot="A4" status={resolveSlotStatus("A4", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A4", resolveSlotStatus("A4", "manual", slotStatuses))} />
            <ParkingSlot slot="A5" status={resolveSlotStatus("A5", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A5", resolveSlotStatus("A5", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 3: A6, A7, A8 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A6" status={resolveSlotStatus("A6", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A6", resolveSlotStatus("A6", "manual", slotStatuses))} />
            <ParkingSlot slot="A7" status={resolveSlotStatus("A7", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A7", resolveSlotStatus("A7", "manual", slotStatuses))} />
            <ParkingSlot slot="A8" status={resolveSlotStatus("A8", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A8", resolveSlotStatus("A8", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4: A9, A10, A11 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A9" status={resolveSlotStatus("A9", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A9", resolveSlotStatus("A9", "manual", slotStatuses))} />
            <ParkingSlot slot="A10" status={resolveSlotStatus("A10", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A10", resolveSlotStatus("A10", "manual", slotStatuses))} />
            <ParkingSlot slot="A11" status={resolveSlotStatus("A11", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A11", resolveSlotStatus("A11", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 5: spacer, GA - G, spacer */}
          <View style={styles.block3Rows}>
            <View style={styles.spacerSlot} />
            <Text style={styles.mallText}>GA - G</Text>
            <View style={styles.spacerSlot} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 6: A12 (Online), A13 (Dinamis), A14 (Dinamis) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A12" status="online" side="left" />
            <ParkingSlot 
              slot="A13" 
              status={resolveSlotStatus('A13', 'available', slotStatuses)} 
              side="left" 
              onPress={() => onSelectSlot('A13', resolveSlotStatus('A13', 'available', slotStatuses))}
            />
            <ParkingSlot 
              slot="A14" 
              status={resolveSlotStatus('A14', 'available', slotStatuses)} 
              side="left" 
              onPress={() => onSelectSlot('A14', resolveSlotStatus('A14', 'available', slotStatuses))}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 7: A15 (Dinamis), A16 (Dinamis), A17 (Manual) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="A15" 
              status={resolveSlotStatus('A15', 'available', slotStatuses)} 
              side="left" 
              onPress={() => onSelectSlot('A15', resolveSlotStatus('A15', 'available', slotStatuses))}
            />
            <ParkingSlot 
              slot="A16" 
              status={resolveSlotStatus('A16', 'available', slotStatuses)} 
              side="left" 
              onPress={() => onSelectSlot('A16', resolveSlotStatus('A16', 'available', slotStatuses))}
            />
              <ParkingSlot slot="A17" status={resolveSlotStatus("A17", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A17", resolveSlotStatus("A17", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 8: longDivider x3 */}
          <View style={styles.longDivider} />
          <View style={styles.longDivider} />
          <View style={styles.longDivider} />
          <View style={styles.groupDividerLeft} />

          {/* BLOK 9: A18 (Dinamis), A19 (Manual), A20 (Online) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="A18" 
              status={resolveSlotStatus('A18', 'available', slotStatuses)} 
              side="left" 
              onPress={() => onSelectSlot('A18', resolveSlotStatus('A18', 'available', slotStatuses))}
            />
            <ParkingSlot slot="A19" status={resolveSlotStatus("A19", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A19", resolveSlotStatus("A19", "manual", slotStatuses))} />
            <ParkingSlot slot="A20" status="online" side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 10: A21 (Online), A22 (Manual), A23 (Online) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="A21" status="online" side="left" />
            <ParkingSlot slot="A22" status={resolveSlotStatus("A22", "manual", slotStatuses)} side="left" onPress={() => onSelectSlot("A22", resolveSlotStatus("A22", "manual", slotStatuses))} />
            <ParkingSlot slot="A23" status="online" side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 11: A24 (Dinamis), A25 (Dinamis), A26 (Online) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="A24" 
              status={resolveSlotStatus('A24', 'available', slotStatuses)} 
              side="left" 
              onPress={() => onSelectSlot('A24', resolveSlotStatus('A24', 'available', slotStatuses))}
            />
            <ParkingSlot 
              slot="A25" 
              status={resolveSlotStatus('A25', 'available', slotStatuses)} 
              side="left" 
              onPress={() => onSelectSlot('A25', resolveSlotStatus('A25', 'available', slotStatuses))}
            />
            <ParkingSlot slot="A26" status="online" side="left" />
          </View>
          <View style={styles.groupDividerLeft} />
        </View>

        {/* ========== CENTER ROAD SECTION ========== */}
        <View style={styles.roadSection}>
          <Ionicons name="arrow-down" size={55} color="#fff" style={styles.topArrow} />
          <Text style={styles.floorText}>G</Text>

          <Ionicons name="arrow-down" size={55} color="#fff" style={styles.topArrow} />
          <Text style={styles.floorText}>G</Text>
          
          <Ionicons name="arrow-down" size={55} color="#fff" style={styles.topArrow} />
          <Text style={styles.floorText}>G</Text>
          
          {/* PERTIGAAN JALAN CUSTOM ABSOLUTE */}
          <View style={styles.intersectionWrapper}>
            <View style={styles.mainVerticalLine} />
            <View style={styles.leftBranchLine} />
            <Ionicons name="caret-back" size={24} color="#fff" style={styles.leftArrowHead} />
            <Ionicons name="caret-down" size={24} color="#fff" style={styles.bottomArrowHead} />
          </View>

          <Text style={styles.floorText}>G</Text>
          <Ionicons name="arrow-down" size={55} color="#fff" style={styles.bottomArrow} />

          <Text style={styles.floorText}>G</Text>
          <Ionicons name="arrow-down" size={55} color="#fff" style={styles.bottomArrow} />

          <Text style={styles.floorText}>G</Text>
          <Ionicons name="arrow-down" size={55} color="#fff" style={styles.bottomArrow} />

          <Text style={styles.floorText}>G</Text>
          <Ionicons name="arrow-down" size={55} color="#fff" style={styles.bottomArrow} />
          
          <Text style={styles.floorText}>G</Text>
        </View>

        {/* ========== RIGHT SIDE COLUMN ========== */}
        <View style={styles.sideColumn}>
          {/* BLOK 1: B1 (Dinamis), B2 (Manual), B3 (Dinamis) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B1" 
              status={resolveSlotStatus('B1', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B1', resolveSlotStatus('B1', 'available', slotStatuses))}
            />
            <ParkingSlot slot="B2" status={resolveSlotStatus("B2", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B2", resolveSlotStatus("B2", "manual", slotStatuses))} />
            <ParkingSlot 
              slot="B3" 
              status={resolveSlotStatus('B3', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B3', resolveSlotStatus('B3', 'available', slotStatuses))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 2: B4 (Online), B5 (Manual), B6 (Dinamis) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="B4" status="online" side="right" />
            <ParkingSlot slot="B5" status={resolveSlotStatus("B5", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B5", resolveSlotStatus("B5", "manual", slotStatuses))} />
            <ParkingSlot 
              slot="B6" 
              status={resolveSlotStatus('B6', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B6', resolveSlotStatus('B6', 'available', slotStatuses))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 3: B7 (Online), B8 (Dinamis), B9 (Manual) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="B7" status="online" side="right" />
            <ParkingSlot 
              slot="B8" 
              status={resolveSlotStatus('B8', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B8', resolveSlotStatus('B8', 'available', slotStatuses))}
            />
            <ParkingSlot slot="B9" status={resolveSlotStatus("B9", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B9", resolveSlotStatus("B9", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 4: Teks Pintu Masuk Mall */}
          <View style={styles.block3Rows}>
            <Text style={styles.mallText}>Pintu</Text>
            <Text style={styles.mallText}>Masuk</Text>
            <Text style={styles.mallText}>Mall</Text>
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 5: spacer, spacer, B10 */}
          <View style={styles.block3Rows}>
            <View style={styles.spacerSlot} />
            <View style={styles.spacerSlot} />
            <ParkingSlot slot="B10" status={resolveSlotStatus("B10", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B10", resolveSlotStatus("B10", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 6: B11 (Dinamis), B12 (Manual), B13 (Dinamis) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B11" 
              status={resolveSlotStatus('B11', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B11', resolveSlotStatus('B11', 'available', slotStatuses))}
            />
            <ParkingSlot slot="B12" status={resolveSlotStatus("B12", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B12", resolveSlotStatus("B12", "manual", slotStatuses))} />
            <ParkingSlot 
              slot="B13" 
              status={resolveSlotStatus("B13", "available", slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot("B13", resolveSlotStatus("B13", "available", slotStatuses))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 7: B14 (Dinamis), B15 (Dinamis), B16 (Manual) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B14" 
              status={resolveSlotStatus('B14', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B14', resolveSlotStatus('B14', 'available', slotStatuses))}
            />
            <ParkingSlot 
              slot="B15" 
              status={resolveSlotStatus('B15', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B15', resolveSlotStatus('B15', 'available', slotStatuses))}
            />
            <ParkingSlot slot="B16" status={resolveSlotStatus("B16", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B16", resolveSlotStatus("B16", "manual", slotStatuses))} />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 8: B17 (Dinamis), B18 (Manual), B19 (Online) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B17" 
              status={resolveSlotStatus('B17', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B17', resolveSlotStatus('B17', 'available', slotStatuses))}
            />
            <ParkingSlot slot="B18" status={resolveSlotStatus("B18", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B18", resolveSlotStatus("B18", "manual", slotStatuses))} />
            <ParkingSlot slot="B19" status="online" side="right" />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 9: B20 (Dinamis), B21 (Online), B22 (Dinamis) */}
          <View style={styles.block3Rows}>
            <ParkingSlot 
              slot="B20" 
              status={resolveSlotStatus('B20', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B20', resolveSlotStatus('B20', 'available', slotStatuses))}
            />
            <ParkingSlot slot="B21" status="online" side="right" />
            <ParkingSlot 
              slot="B22" 
              status={resolveSlotStatus('B22', 'available', slotStatuses)} 
              side="right" 
              onPress={() => onSelectSlot('B22', resolveSlotStatus('B22', 'available', slotStatuses))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 10: B23 (Online), B24 (Manual), spacer */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="B23" status="online" side="right" />
            <ParkingSlot slot="B24" status={resolveSlotStatus("B24", "manual", slotStatuses)} side="right" onPress={() => onSelectSlot("B24", resolveSlotStatus("B24", "manual", slotStatuses))} />
            <View style={styles.spacerSlot} />
          </View>

          <View style={styles.groupDividerRight} />
          <View style={styles.longDivider2} />
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
    height: 90,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 45,
  },
  leftBranchLine: {
    height: 6,
    width: 35,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 40,
    left: 15,
  },
  leftArrowHead: {
    position: 'absolute',
    top: 31,
    left: 0,
  },
  bottomArrowHead: {
    position: 'absolute',
    bottom: -10,
    left: 36,
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
  groupDividerRight: {
    width: 15,
    height: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginVertical: 3,
    marginLeft: 20,
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