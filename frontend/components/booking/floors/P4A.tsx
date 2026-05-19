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
            <View style={styles.block3Rows}>
                <ParkingSlot slot="A1" status={resolveSlotStatus("A1", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A1", resolveSlotStatus("A1", "available", slotStatuses))} />
                <ParkingSlot slot="A2" status={resolveSlotStatus("A2", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A2", resolveSlotStatus("A2", "available", slotStatuses))} />
                <ParkingSlot slot="A3" status={resolveSlotStatus("A3", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A3", resolveSlotStatus("A3", "available", slotStatuses))} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A4" status={resolveSlotStatus("A4", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A4", resolveSlotStatus("A4", "available", slotStatuses))} />
                <ParkingSlot slot="A5" status={resolveSlotStatus("A5", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A5", resolveSlotStatus("A5", "available", slotStatuses))} />
                <ParkingSlot slot="A6" status={resolveSlotStatus("A6", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A6", resolveSlotStatus("A6", "available", slotStatuses))} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A7" status={resolveSlotStatus("A7", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A7", resolveSlotStatus("A7", "available", slotStatuses))} />
                <ParkingSlot slot="A8" status={resolveSlotStatus("A8", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A8", resolveSlotStatus("A8", "available", slotStatuses))} />
                <ParkingSlot slot="A9" status={resolveSlotStatus("A9", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A9", resolveSlotStatus("A9", "available", slotStatuses))} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A10" status={resolveSlotStatus("A10", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A10", resolveSlotStatus("A10", "available", slotStatuses))} />
                <ParkingSlot slot="A11" status={resolveSlotStatus("A11", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A11", resolveSlotStatus("A11", "available", slotStatuses))} />
                <ParkingSlot slot="A12" status={resolveSlotStatus("A12", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A12", resolveSlotStatus("A12", "available", slotStatuses))} />
            </View>           

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A13" status={resolveSlotStatus("A13", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A13", resolveSlotStatus("A13", "available", slotStatuses))} />
                <ParkingSlot slot="A14" status={resolveSlotStatus("A14", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A14", resolveSlotStatus("A14", "available", slotStatuses))} />
                <ParkingSlot slot="A15" status={resolveSlotStatus("A15", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A15", resolveSlotStatus("A15", "available", slotStatuses))} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A16" status={resolveSlotStatus("A16", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A16", resolveSlotStatus("A16", "available", slotStatuses))} />
                <ParkingSlot slot="A17" status={resolveSlotStatus("A17", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A17", resolveSlotStatus("A17", "available", slotStatuses))} />
                <ParkingSlot slot="A18" status={resolveSlotStatus("A18", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A18", resolveSlotStatus("A18", "available", slotStatuses))} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A19" status={resolveSlotStatus("A19", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A19", resolveSlotStatus("A19", "available", slotStatuses))} />
                <ParkingSlot slot="A20" status={resolveSlotStatus("A20", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A20", resolveSlotStatus("A20", "available", slotStatuses))} />
                <ParkingSlot slot="A21" status={resolveSlotStatus("A21", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A21", resolveSlotStatus("A21", "available", slotStatuses))} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A22" status={resolveSlotStatus("A22", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A22", resolveSlotStatus("A22", "available", slotStatuses))} />
                <ParkingSlot slot="A23" status={resolveSlotStatus("A23", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A23", resolveSlotStatus("A23", "available", slotStatuses))} />
                <ParkingSlot slot="A24" status={resolveSlotStatus("A24", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A24", resolveSlotStatus("A24 ", "available", slotStatuses))} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A25" status={resolveSlotStatus("A25", "available", slotStatuses)} side="left" onPress={() => onSelectSlot("A25", resolveSlotStatus("A25", "available", slotStatuses))} />
            </View>

            <view style={styles.spacerSlot} />
            <View style={styles.groupDividerRightLongBig} />
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
          <Text style={styles.floorText}>P4A</Text>
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <Text style={styles.floorText}>P4A</Text>
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          
          <View style={styles.mainVerticalLine3} />
          <Ionicons name="caret-up" size={24} color="#fff" style={styles.bottomArrowHead3} />

          {/* PI ATAS*/  }
          <View style={styles.leftBranchLine} />
          <View style={styles.leftBranchLine2} />
          <View style={styles.mainVerticalLine  } />
          <Ionicons name="caret-forward" size={24} color="#fff" style={styles.rightArrowHead} />
          <Ionicons name="caret-forward" size={24} color="#fff" style={styles.rightArrowHead2} />


          {/* PI BAWAH*/}
          <View style={styles.leftBranchLine3} />
          <View style={styles.leftBranchLine4} />
          <View style={styles.mainVerticalLine2  } />
          <Ionicons name="caret-forward" size={24} color="#fff" style={styles.topArrowHead2} />
          <Ionicons name="caret-forward" size={24} color="#fff" style={styles.bottomArrowHead2} />
          
        </View>

        {/* ========== RIGHT SIDE COLUMN ========== */}
        <View style={styles.sideColumn}>

            <View style={styles.block3Rows}>
                        <Text style={styles.mallText}>P4A - P5</Text>
                        <View style={styles.spacerSlot} />
                        <Text style={styles.mallText}>P4A - P4</Text>
                    </View>

            <view style={styles.groupDividerRightLong} />

        <View style={styles.block3Rows}>
        <ParkingSlot slot="B1" status={resolveSlotStatus("B1", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B1", resolveSlotStatus("B1", "available", slotStatuses))} />
            <ParkingSlot slot="B2" status={resolveSlotStatus("B2", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B2", resolveSlotStatus("B2", "available", slotStatuses))} />
            <ParkingSlot slot="B3" status={resolveSlotStatus("B3", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B3", resolveSlotStatus("B3", "available", slotStatuses))} />
          </View>

        <View style={styles.block3Rows}>
            <ParkingSlot slot="B4" status={resolveSlotStatus("B4", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B4", resolveSlotStatus("B4", "available", slotStatuses))} />
            <ParkingSlot slot="B5" status={resolveSlotStatus("B5", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B5", resolveSlotStatus("B5", "available", slotStatuses))} />
            <ParkingSlot slot="B6" status={resolveSlotStatus("B6", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B6", resolveSlotStatus("B6", "available", slotStatuses))} />
          </View>

        <View style={styles.block3Rows}>
            <ParkingSlot slot="B7" status={resolveSlotStatus("B7", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B7", resolveSlotStatus("B7", "available", slotStatuses))} />
            <ParkingSlot slot="B8" status={resolveSlotStatus("B8", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B8", resolveSlotStatus("B8", "available", slotStatuses))} />
            <ParkingSlot slot="B9" status={resolveSlotStatus("B9", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B9", resolveSlotStatus("B9", "available", slotStatuses))} />
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B10" status={resolveSlotStatus("B10", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B10", resolveSlotStatus("B10", "available", slotStatuses))} />
            <ParkingSlot slot="B11" status={resolveSlotStatus("B11", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B11", resolveSlotStatus("B11", "available", slotStatuses))} />
            <ParkingSlot slot="B12" status={resolveSlotStatus("B12", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B12", resolveSlotStatus("B12", "available", slotStatuses))} />
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B13" status={resolveSlotStatus("B13", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B13", resolveSlotStatus("B13", "available", slotStatuses))} />
            <ParkingSlot slot="B14" status={resolveSlotStatus("B14", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B14", resolveSlotStatus("B14", "available", slotStatuses))} />
            <ParkingSlot slot="B15" status={resolveSlotStatus("B15", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B15", resolveSlotStatus("B15", "available", slotStatuses))} />
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B16" status={resolveSlotStatus("B16", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B16", resolveSlotStatus("B16", "available", slotStatuses))} />
            <ParkingSlot slot="B17" status={resolveSlotStatus("B17", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B17", resolveSlotStatus("B17", "available", slotStatuses))} />
            <ParkingSlot slot="B18" status={resolveSlotStatus("B18", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B18", resolveSlotStatus("B18", "available", slotStatuses))} />
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B19" status={resolveSlotStatus("B19", "available", slotStatuses)} side="right" onPress={() => onSelectSlot("B19", resolveSlotStatus("B19", "available", slotStatuses))} />
          </View>

          <view style={styles.groupDividerRightLong} />

          <View style={styles.block3Rows}>
                        <Text style={styles.mallText}>P4A - P5</Text>
                        <View style={styles.spacerSlot} />
                        <Text style={styles.mallText}>P4A - P4</Text>
                    </View>
            <View style={styles.spacerSlot} />
            <View style={styles.spacerSlot} />
            <View style={styles.spacerSlot} />
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
    top: 34,
    left: 68  ,
  },
  mainVerticalLine2: {
    width: 6,
    height: 110,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 132,
    left: 68  ,
  },
  mainVerticalLine3: {
    width: 6,
    height: 110,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 490,
    left: 68  ,
  },
  leftBranchLine: {
    height: 6,
    width: 54,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 34,
    right: 15,
  },
  leftBranchLine2: {
    height: 6,
    width: 54,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 98,
    right: 15,
  },
  leftBranchLine3: {
    height: 6,
    width: 54,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 195,
    right: 15,
  },
  leftBranchLine4: {
    height: 6,
    width: 54,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 132 ,
    right: 15,
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
  rightArrowHead: {
    position: 'absolute',
    top: 24.5,
    right: 3,
  },
  rightArrowHead2: {
    position: 'absolute',
    top: 88,
    right: 3,
  },
  bottomArrowHead: {
    position: 'absolute',
    top: 130  ,
    left: 58.8,
  },
  topArrowHead2: {
    position: 'absolute',
    bottom: 184.5,
    right: 3,
  },
  bottomArrowHead2: {
    position: 'absolute',
    bottom: 120.5,
    right: 3,   
  },
  bottomArrowHead3: {
    position: 'absolute',
    top: 473  ,
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
