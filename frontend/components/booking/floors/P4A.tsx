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

export default function P4A({ selectedSlot, onSelectSlot, slotStatuses }: FloorProps) {
  return (
    <View style={styles.parkingLayout}>
      <View style={styles.rowGroup}>
        
        {/* ========== LEFT SIDE COLUMN ========== */}
        <View style={styles.sideColumn}>
            <View style={styles.block3Rows}>
              <ParkingSlot disabled={false}
                slot="L1" 
                status={resolveSlotStatus("L1", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L1", resolveSlotStatus("L1", "available", slotStatuses, selectedSlot))} 
              />
              <ParkingSlot disabled={false}
                slot="L2" 
                status={resolveSlotStatus("L2", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L2", resolveSlotStatus("L2", "available", slotStatuses, selectedSlot))} 
              />
              <ParkingSlot disabled={false}
                slot="L3" 
                status={resolveSlotStatus("L3", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L3", resolveSlotStatus("L3", "available", slotStatuses, selectedSlot))} 
              />
            </View>

            <View style={styles.block3Rows}>
              <ParkingSlot disabled={false}
                slot="L4" 
                status={resolveSlotStatus("L4", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L4", resolveSlotStatus("L4", "available", slotStatuses, selectedSlot))} 
              />
              <ParkingSlot disabled={false}
                slot="L5" 
                status={resolveSlotStatus("L5", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L5", resolveSlotStatus("L5", "available", slotStatuses, selectedSlot))} 
              />
              <ParkingSlot disabled={false}
                slot="L6" 
                status={resolveSlotStatus("L6", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L6", resolveSlotStatus("L6", "available", slotStatuses, selectedSlot))} 
              />
            </View>

            <View style={styles.block3Rows}>
              <ParkingSlot disabled={false}
                slot="L7" 
                status={resolveSlotStatus("L7", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L7", resolveSlotStatus("L7", "available", slotStatuses, selectedSlot))} 
              />
              <ParkingSlot disabled={false}
                slot="L8" 
                status={resolveSlotStatus("L8", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L8", resolveSlotStatus("L8", "available", slotStatuses, selectedSlot))} 
              />
              <ParkingSlot disabled={false}
                slot="L9" 
                status={resolveSlotStatus("L9", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L9", resolveSlotStatus("L9", "available", slotStatuses, selectedSlot))} 
              />
            </View>

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
                status={resolveSlotStatus("L12", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L12", resolveSlotStatus("L12", "available", slotStatuses, selectedSlot))} 
              />
            </View>           

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

            <View style={styles.block3Rows}>
              <ParkingSlot disabled={false}
                slot="L25" 
                status={resolveSlotStatus("L25", "available", slotStatuses, selectedSlot)} 
                side="left" 
                onPress={() => onSelectSlot("L25", resolveSlotStatus("L25", "available", slotStatuses, selectedSlot))} 
              />
            </View>

            <View style={styles.spacerSlot} />
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

            <View style={styles.groupDividerRightLong} />

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
              status={resolveSlotStatus("R6", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R6', resolveSlotStatus("R6", "available", slotStatuses, selectedSlot))}
            />
          </View>

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

          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R10" 
              status={resolveSlotStatus("R10", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R10', resolveSlotStatus("R10", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R11" 
              status={resolveSlotStatus("R11", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R11', resolveSlotStatus("R11", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R12" 
              status={resolveSlotStatus("R12", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R12', resolveSlotStatus("R12", "available", slotStatuses, selectedSlot))}
            />
          </View>

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
            <ParkingSlot disabled={false}
              slot="R18" 
              status={resolveSlotStatus("R18", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R18', resolveSlotStatus("R18", "available", slotStatuses, selectedSlot))}
            />
          </View>

          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R19" 
              status={resolveSlotStatus("R19", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R19', resolveSlotStatus("R19", "available", slotStatuses, selectedSlot))}
            />
          </View>

          <View style={styles.groupDividerRightLong} />

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
