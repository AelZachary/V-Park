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
            <View style={styles.block3Rows}>
                        <Text style={styles.mallText}>P4A - P5</Text>
                        <Text style={styles.mallText}>  </Text>

                    </View>
            <View style={styles.groupDividerRightLongVertical} />
            <View style={styles.groupDividerRightLong} />

            
            <View style={styles.block3Rows}>
                <ParkingSlot slot="A1" status={selectedSlot === 'A1' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A1', 'available')} />
                <ParkingSlot slot="A2" status={selectedSlot === 'A2' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A2', 'available')} />
                <ParkingSlot slot="A3" status={selectedSlot === 'A3' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A3', 'available')} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A4" status={selectedSlot === 'A4' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A4', 'available')} />
                <ParkingSlot slot="A5" status={selectedSlot === 'A5' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A5', 'available')} />
                <ParkingSlot slot="A6" status={selectedSlot === 'A6' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A6', 'available')} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A7" status={selectedSlot === 'A7' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A7', 'available')} />
                <ParkingSlot slot="A8" status={selectedSlot === 'A8' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A8', 'available')} />
                <ParkingSlot slot="A9" status={selectedSlot === 'A9' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A9', 'available')} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A10" status={selectedSlot === 'A10' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A10', 'available')} />
                <ParkingSlot slot="A11" status={selectedSlot === 'A11' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A11', 'available')} />
                <ParkingSlot slot="A12" status={selectedSlot === 'A12' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A12', 'available')} />
            </View>           

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A13" status={selectedSlot === 'A13' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A13', 'available')} />
                <ParkingSlot slot="A14" status={selectedSlot === 'A14' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A14', 'available')} />
                <ParkingSlot slot="A15" status={selectedSlot === 'A15' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A15', 'available')} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A16" status={selectedSlot === 'A16' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A16', 'available')} />
                <ParkingSlot slot="A17" status={selectedSlot === 'A17' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A17', 'available')} />
                <ParkingSlot slot="A18" status={selectedSlot === 'A18' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A18', 'available')} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A19" status={selectedSlot === 'A19' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A19', 'available')} />
            </View>
            <View style={styles.groupDividerRightLong} />

            <View style={styles.block3Rows}>
                        <Text style={styles.mallText}>P4A - P5</Text>
                        <Text style={styles.mallText}>  </Text>

                    </View>
            
            <View style={styles.groupDividerRightLongVertical} />

            <View style={styles.groupDividerRightLong} />

            <View style={styles.block3Rows}>
                <ParkingSlot slot="A20" status={selectedSlot === 'A20' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A20', 'available')} />
                <ParkingSlot slot="A21" status={selectedSlot === 'A21' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A21', 'available')} />
                <ParkingSlot slot="A22" status={selectedSlot === 'A22' ? 'selected' : 'available'} side="left" onPress={() => onSelectSlot('A22', 'available')} />
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
          <Text style={styles.floorText}>P5</Text>
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <View style={styles.spacerSlot} />
          <Text style={styles.floorText}>P5</Text>
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
          <Ionicons name="caret-down" size={24} color="#fff" style={styles.bottomArrowHead3} />

          {/* PI ATAS*/  }
          <View style={styles.leftBranchLine} />
          <View style={styles.mainVerticalLine  } />
          <Ionicons name="caret-down" size={24} color="#fff" style={styles.rightArrowHead} />

          {/* PI BAWAH*/}
          <View style={styles.leftBranchLine3} />
          <View style={styles.mainVerticalLine2  } />
          <Ionicons name="caret-back" size={24} color="#fff" style={styles.topArrowHead2} />
          
        </View>

        {/* ========== RIGHT SIDE COLUMN ========== */}
        <View style={styles.sideColumn}>

        <View style={styles.block3Rows}>
            <ParkingSlot slot="B1" status={selectedSlot === 'B1' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B1', 'available')} />
            <ParkingSlot slot="B2" status={selectedSlot === 'B2' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B2', 'available')} />
          </View>
        
        <view style={styles.groupDividerRightLongBig} />
        <View style={styles.block3Rows}>
                    <Text style={styles.mallText}>Pintu</Text>
                    <Text style={styles.mallText}>Masuk</Text>
                    <Text style={styles.mallText}>Lift</Text>
                  </View>
        <View style={styles.groupDividerRightLongBig} />
        <view style={styles.spacerSlot} />

        <View style={styles.block3Rows}>
            <ParkingSlot slot="B3" status={selectedSlot === 'B3' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B3', 'available')} />
            <ParkingSlot slot="B4" status={selectedSlot === 'B4' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B4', 'available')} />
            <ParkingSlot slot="B5" status={selectedSlot === 'B5' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B5', 'available')} />
          </View>

        <View style={styles.block3Rows}>
            <ParkingSlot slot="B7" status={selectedSlot === 'B7' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B7', 'available')} />
            <ParkingSlot slot="B8" status={selectedSlot === 'B8' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B8', 'available')} />
            <ParkingSlot slot="B9" status={selectedSlot === 'B9' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B9', 'available')} />
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B10" status={selectedSlot === 'B10' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B10', 'available')} />
            <ParkingSlot slot="B11" status={selectedSlot === 'B11' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B11', 'available')} />
            <ParkingSlot slot="B12" status={selectedSlot === 'B12' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B12', 'available')} />
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B13" status={selectedSlot === 'B13' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B13', 'available')} />
            <ParkingSlot slot="B14" status={selectedSlot === 'B14' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B14', 'available')} />
            <ParkingSlot slot="B15" status={selectedSlot === 'B15' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B15', 'available')} />
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B16" status={selectedSlot === 'B16' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B16', 'available')} />
            <ParkingSlot slot="B17" status={selectedSlot === 'B17' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B17', 'available')} />
            <ParkingSlot slot="B18" status={selectedSlot === 'B18' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B18', 'available')} />
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B19" status={selectedSlot === 'B19' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B19', 'available')} />
            <ParkingSlot slot="B20" status={selectedSlot === 'B20' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B20', 'available')} />
            <ParkingSlot slot="B21" status={selectedSlot === 'B21' ? 'selected' : 'available'} side="right" onPress={() => onSelectSlot('B21', 'available')} />
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
    top: 14,
    left: 68  ,
  },
  mainVerticalLine2: {
    width: 6,
    height: 50,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 206,
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
    top: 14,
    left: 15,
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
    bottom: 206,
    left: 15,
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
    top: 115,
    left: 58.8,
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
    bottom: 195  ,
    left: 3,
  },
  bottomArrowHead2: {
    position: 'absolute',
    bottom: 120.5,
    right: 3,   
  },
  bottomArrowHead3: {
    position: 'absolute',
    bottom: 440   ,
    left: 58.9  ,
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
  groupDividerRightLongVertical: {
    width: 15,
    height: 55,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginVertical: -10 ,
    marginLeft: 44 ,
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
