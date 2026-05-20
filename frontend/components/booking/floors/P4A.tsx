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
                <ParkingSlot slot="P4A-A1" status={resolveSlotStatus("P4A-A1", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A1", "available")} />
                <ParkingSlot slot="P4A-A2" status={resolveSlotStatus("P4A-A2", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A2", "available")} />
                <ParkingSlot slot="P4A-A3" status={resolveSlotStatus("P4A-A3", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A3", "available")} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="P4A-A4" status={resolveSlotStatus("P4A-A4", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A4", "available")} />
                <ParkingSlot slot="P4A-A5" status={resolveSlotStatus("P4A-A5", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A5", "available")} />
                <ParkingSlot slot="P4A-A6" status={resolveSlotStatus("P4A-A6", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A6", "available")} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="P4A-A7" status={resolveSlotStatus("P4A-A7", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A7", "available")} />
                <ParkingSlot slot="P4A-A8" status={resolveSlotStatus("P4A-A8", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A8", "available")} />
                <ParkingSlot slot="P4A-A9" status={resolveSlotStatus("P4A-A9", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A9", "available")} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="P4A-A10" status={resolveSlotStatus("P4A-A10", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A10", "available")} />
                <ParkingSlot slot="P4A-A11" status={resolveSlotStatus("P4A-A11", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A11", "available")} />
                <ParkingSlot slot="P4A-A12" status={resolveSlotStatus("P4A-A12", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A12", "available")} />
            </View>           

            <View style={styles.block3Rows}>
                <ParkingSlot slot="P4A-A13" status={resolveSlotStatus("P4A-A13", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A13", "available")} />
                <ParkingSlot slot="P4A-A14" status={resolveSlotStatus("P4A-A14", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A14", "available")} />
                <ParkingSlot slot="P4A-A15" status={resolveSlotStatus("P4A-A15", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A15", "available")} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="P4A-A16" status={resolveSlotStatus("P4A-A16", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A16", "available")} />
                <ParkingSlot slot="P4A-A17" status={resolveSlotStatus("P4A-A17", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A17", "available")} />
                <ParkingSlot slot="P4A-A18" status={resolveSlotStatus("P4A-A18", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A18", "available")} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="P4A-A19" status={resolveSlotStatus("P4A-A19", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A19", "available")} />
                <ParkingSlot slot="P4A-A20" status={resolveSlotStatus("P4A-A20", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A20", "available")} />
                <ParkingSlot slot="P4A-A21" status={resolveSlotStatus("P4A-A21", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A21", "available")} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="P4A-A22" status={resolveSlotStatus("P4A-A22", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A22", "available")} />
                <ParkingSlot slot="P4A-A23" status={resolveSlotStatus("P4A-A23", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A23", "available")} />
                <ParkingSlot slot="P4A-A24" status={resolveSlotStatus("P4A-A24", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A24", "available")} />
            </View>

            <View style={styles.block3Rows}>
                <ParkingSlot slot="P4A-A25" status={resolveSlotStatus("P4A-A25", "available", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("P4A-A25", "available")} />
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
            <ParkingSlot slot="B1" status={resolveSlotStatus("P4A-B1", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B1", "available")}/>
            <ParkingSlot slot="B2" status={resolveSlotStatus("P4A-B2", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B2", "available")}/>
            <ParkingSlot slot="B3" status={resolveSlotStatus("P4A-B3", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B3", "available")}/>
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B4" status={resolveSlotStatus("P4A-B4", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B4", "available")}/>
            <ParkingSlot slot="B5" status={resolveSlotStatus("P4A-B5", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B5", "available")}/>
            <ParkingSlot slot="B6" status={resolveSlotStatus("P4A-B6", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B6", "available")}/>
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B7" status={resolveSlotStatus("P4A-B7", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B7", "available")}/>
            <ParkingSlot slot="B8" status={resolveSlotStatus("P4A-B8", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B8", "available")}/>
            <ParkingSlot slot="B9" status={resolveSlotStatus("P4A-B9", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B9", "available")}/>
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B10" status={resolveSlotStatus("P4A-B10", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B10", "available")}/>
            <ParkingSlot slot="B11" status={resolveSlotStatus("P4A-B11", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B11", "available")}/>
            <ParkingSlot slot="B12" status={resolveSlotStatus("P4A-B12", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B12", "available")}/>
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B13" status={resolveSlotStatus("P4A-B13", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B13", "available")}/>
            <ParkingSlot slot="B14" status={resolveSlotStatus("P4A-B14", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B14", "available")}/>
            <ParkingSlot slot="B15" status={resolveSlotStatus("P4A-B15", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B15", "available")}/>
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B16" status={resolveSlotStatus("P4A-B16", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B16", "available")}/>
            <ParkingSlot slot="B17" status={resolveSlotStatus("P4A-B17", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B17", "available")}/>
            <ParkingSlot slot="B18" status={resolveSlotStatus("P4A-B18", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B18", "available")}/>
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot slot="B19" status={resolveSlotStatus("P4A-B19", "available", slotStatuses, selectedSlot)} side="right" onPress={() => onSelectSlot("P4A-B19", "available")}/>
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
