import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ParkingSlot from '../ParkingSlot';

type SlotStatus = 'available' | 'selected' | 'manual' | 'online' | 'occupied';

type GroundFloorProps = {
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
  if (slotStatuses && slotStatuses[slot] === 'selected') {
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

export default function GroundFloorA({ selectedSlot, onSelectSlot, slotStatuses }: GroundFloorProps) {
  return (
    <View style={styles.parkingLayout}>
      <View style={styles.rowGroup}>
        
        {/* ========== LEFT (Kiri - Area L) ========== */}
        <View style={styles.sideColumn}>
          <View style={styles.block3Rows}>
            <ParkingSlot slot="L1" status={resolveSlotStatus("L1", "online", slotStatuses, selectedSlot)} side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 2: L2, L3, L4 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L2" 
              status={resolveSlotStatus("L2", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L2", resolveSlotStatus("L2", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot slot="L3" status={resolveSlotStatus("L3", "online", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot disabled={false}
              slot="L4" 
              status={resolveSlotStatus("L4", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L4', resolveSlotStatus("L4", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 3: L5, L6, L7 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L5" 
              status={resolveSlotStatus("L5", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L5', resolveSlotStatus("L5", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L6" 
              status={resolveSlotStatus("L6", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L6', resolveSlotStatus("L6", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot slot="L7" status={resolveSlotStatus("L7", "online", slotStatuses, selectedSlot)} side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4: L8, L9, L10 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L8" 
              status={resolveSlotStatus("L8", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L8", resolveSlotStatus("L8", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L9" 
              status={resolveSlotStatus("L9", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L9', resolveSlotStatus("L9", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot slot="L10" status={resolveSlotStatus("L10", "online", slotStatuses, selectedSlot)} side="left" />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 5: L11, L12, L13 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="L11" status={resolveSlotStatus("L11", "online", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot disabled={false}
              slot="L12" 
              status={resolveSlotStatus("L12", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L12", resolveSlotStatus("L12", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L13" 
              status={resolveSlotStatus("L13", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L13', resolveSlotStatus("L13", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 6: L14, L15, L16 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="L14" status={resolveSlotStatus("L14", "online", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot disabled={false}
              slot="L15" 
              status={resolveSlotStatus("L15", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("L15", resolveSlotStatus("L15", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="L16" 
              status={resolveSlotStatus("L16", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L16', resolveSlotStatus("L16", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 7: L17, L18, L19 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="L17" status={resolveSlotStatus("L17", "online", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot disabled={false}
              slot="L18" 
              status={resolveSlotStatus("L18", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L18', resolveSlotStatus("L18", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L19" 
              status={resolveSlotStatus("L19", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L19', resolveSlotStatus("L19", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 8: Route Text */}
          <View style={styles.block3Rows}>
            <View style={styles.spacerSlot} />
            <Text style={styles.sideRouteText}>G =› GA</Text>
            <View style={styles.spacerSlot} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 9: Label Text */}
          <View style={styles.block3Rows}>
            <View style={styles.spacerSlot} />
            <Text style={styles.arrowLabelText}>OUT ‹= P1</Text>
            <View style={styles.spacerSlot} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 10: L20, L21, L22 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="L20" status={resolveSlotStatus("L20", "online", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot disabled={false}
              slot="L21" 
              status={resolveSlotStatus("L21", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L21', resolveSlotStatus("L21", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L22" 
              status={resolveSlotStatus("L22", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('L22', resolveSlotStatus("L22", "available", slotStatuses, selectedSlot))}
            />
          </View>

          <View style={styles.grayRampBlock} />
        </View>

        {/* ========== CENTER ROAD SECTION ========== */}
        <View style={styles.roadSection}>
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
          <View style={styles.midRoadRow}>
            <View style={styles.roadDotsRow}>
              <View style={styles.roadDotItem} />
              <View style={styles.roadDotItem} />
              <View style={styles.roadDotItem} />
              <View style={styles.roadDotItem} />
            </View>
          </View>
          <View style={styles.turnOutLeftWrapper}>
            <View style={styles.outBaseHorizontalLine} />
            <View style={styles.outVerticalLine} />
            <View style={styles.outTopHorizontalLine} />
            <Ionicons name="caret-back" size={24} color="#fff" style={styles.outLeftArrowHead} />
          </View>
          <View style={styles.spacerSlot} />
          <Text style={styles.floorText}>GA</Text>
          <View style={styles.longArrowUpWrapper}>
            <View style={styles.longArrowLine} />
            <Ionicons name="caret-up" size={24} color="#fff" style={styles.longArrowHead} />
          </View>
        </View>

        {/* ========== RIGHT (Kanan - Area R) ========== */}
        <View style={styles.sideColumn}>
          {/* BLOK 1: R1 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R1" 
              status={resolveSlotStatus("R1", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R1", resolveSlotStatus("R1", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 2: R2, R3, R4 */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="R2" status={resolveSlotStatus("R2", "online", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot disabled={false}
              slot="R3" 
              status={resolveSlotStatus("R3", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R3", resolveSlotStatus("R3", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R4" 
              status={resolveSlotStatus("R4", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R4", resolveSlotStatus("R4", "manual", slotStatuses, selectedSlot))} 
            />
          </View>

          <View style={styles.horizontalLongDivider} />
          <Text style={styles.arrowLabelText}>GA =› P1</Text>
          <View style={styles.lShapeGrayWall} />

          {/* BLOK 4: R5, R6, R7 */}
          <View style={styles.block3Rows}>
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
            <ParkingSlot disabled={false}
              slot="R7" 
              status={resolveSlotStatus("R7", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R7", resolveSlotStatus("R7", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 5: R8, R9, R10 */}
          <View style={styles.block3Rows}>
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
            <ParkingSlot disabled={false}
              slot="R10" 
              status={resolveSlotStatus("R10", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R10", resolveSlotStatus("R10", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 6: R11, R12, R13 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R11" 
              status={resolveSlotStatus("R11", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R11', resolveSlotStatus("R11", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R12" 
              status={resolveSlotStatus("R12", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R12", resolveSlotStatus("R12", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R13" 
              status={resolveSlotStatus("R13", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R13', resolveSlotStatus("R13", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          <View style={styles.block3Rows}>
            <ParkingSlot slot="R14" status={resolveSlotStatus("R14", "online", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot disabled={false}
              slot="R15" 
              status={resolveSlotStatus("R15", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R15", resolveSlotStatus("R15", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R16" 
              status={resolveSlotStatus("R16", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R16", resolveSlotStatus("R16", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 8: R17, R18, R19 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R17" 
              status={resolveSlotStatus("R17", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R17', resolveSlotStatus("R17", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R18" 
              status={resolveSlotStatus("R18", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R18", resolveSlotStatus("R18", "manual", slotStatuses, selectedSlot))} 
            />
            <ParkingSlot disabled={false}
              slot="R19" 
              status={resolveSlotStatus("R19", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('R19', resolveSlotStatus("R19", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.horizontalLongDivider} />

          {/* BLOK 9: R20, R21, R22 */}
          <View style={styles.block3Rows}>
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
            <ParkingSlot disabled={false}
              slot="R22" 
              status={resolveSlotStatus("R22", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("R22", resolveSlotStatus("R22", "manual", slotStatuses, selectedSlot))} 
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 10: Teks GA <= P1 */}
          <View style={styles.block3Rows}>
            <Text style={styles.arrowLabelText}>GA ‹= P1</Text>
            <View style={styles.spacerSlot} />
            <View style={styles.spacerSlot} />
          </View>
          
          <View style={styles.grayRampBlock} />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parkingLayout: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', alignItems: 'flex-start' 
  },
  rowGroup: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  sideColumn: { 
    justifyContent: 'flex-start', 
    alignItems: 'center' 
  },
  roadSection: { 
    width: 130, 
    alignItems: 'center', 
    justifyContent: 'flex-start' 
  },
  block3Rows: { 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 5, 
    marginVertical: 2 
  },
  spacerSlot: { 
    width: 52, 
    height: 27, 
    marginVertical: 3, 
    opacity: 0 
  },
  groupDividerLeft: { 
    width: 15, 
    height: 15, 
    backgroundColor: '#D9D9D9', 
    borderRadius: 2, 
    alignSelf: 'flex-end', 
    marginRight: 25, 
    marginVertical: 5 
  },
  groupDividerRight: { 
    width: 15, 
    height: 15, 
    backgroundColor: '#D9D9D9', 
    borderRadius: 2, 
    alignSelf: 'flex-start', 
    marginVertical: 5, 
    marginLeft: 25 
  },
  horizontalLongDivider: { 
    width: 52, 
    height: 12, 
    backgroundColor: '#D9D9D9', 
    borderRadius: 2, 
    marginVertical: 4, 
    alignSelf: 'center' 
  },
  lShapeGrayWall: { 
    width: 52, 
    height: 90, 
    borderLeftWidth: 10, 
    borderBottomWidth: 10, 
    borderColor: '#D9D9D9', 
    marginTop: 4, 
    alignSelf: 'flex-start', 
    marginLeft: 25 
  },
  grayRampBlock: { 
    width: 55, 
    height: 120, 
    backgroundColor: '#7A7A7A', 
    borderWidth: 2, 
    borderColor: '#333', 
    borderRadius: 10, 
    marginTop: 15 
  },
  floorText: { 
    fontSize: 35, 
    fontWeight: '900', 
    color: '#fff', 
    marginVertical: 40, 
    textAlign: 'center' 
  },
  midRoadRow: { 
    flexDirection: 'row', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 40 
  },
  roadDotsRow: { 
    flexDirection: 'row', 
    gap: 6, 
    marginVertical: 15 
  },
  roadDotItem: { 
    width: 18, 
    height: 8, 
    backgroundColor: '#424242', 
    borderRadius: 4, 
    borderWidth: 1.5, 
    borderColor: '#222' 
  },
  turnOutLeftWrapper: { 
    width: 90, 
    height: 80, 
    position: 'relative', 
    marginTop: 5 
  },
  outBaseHorizontalLine: { 
    height: 6, 
    width: 50, 
    backgroundColor: '#fff', 
    position: 'absolute', 
    bottom: -35, 
    left: 50 
  },
  outVerticalLine: { 
    width: 6, 
    height: 100, 
    backgroundColor: '#fff', 
    position: 'absolute', 
    bottom: -35, 
    left: 45 
  },
  outTopHorizontalLine: { 
    height: 6, 
    width: 40, 
    backgroundColor: '#fff', 
    position: 'absolute', 
    top: 15, 
    left: 8 
  },
  outLeftArrowHead: { 
    position: 'absolute', 
    top: 6, 
    left: -8 
  },
  arrowLabelText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 14, 
    textAlign: 'center', 
    width: 100, 
    marginVertical: 12 
  },
  sideRouteText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 11,
    width: 65, 
    textAlign: 'left' 
  },
  longArrowUpWrapper: { 
    width: 30, 
    height: 35, 
    position: 'relative', 
    marginVertical: 4, 
    alignItems: 'center' 
  },
  longArrowLine: { 
    width: 6, 
    height: 35, 
    backgroundColor: '#fff' 
  },
  longArrowHead: { 
    position: 'absolute', 
    top: -12 
  },
  intersectionRightWrapper: { 
    width: 70, 
    height: 75, 
    position: 'relative', 
    marginVertical: 5 
  },
  mainVerticalLine: { 
    width: 6, 
    height: 75, 
    backgroundColor: '#fff', 
    position: 'absolute', 
    left: 20 
  },
  rightBranchLine: { 
    height: 6, 
    width: 35, 
    backgroundColor: '#fff', 
    position: 'absolute', 
    top: 35, 
    left: 20 
  },
  topArrowHead: { 
    position: 'absolute', 
    top: -12, 
    left: 11 
  },
  rightArrowHead: { 
    position: 'absolute', 
    top: 26, 
    right: -2 
  },
  turnUpWrapper: { 
    width: 50, 
    height: 60, 
    position: 'relative', 
    marginVertical: 10, 
    alignSelf: 'flex-start', 
    marginLeft: 15 
  },
  turnVerticalLine: { 
    width: 6, 
    height: 35, 
    backgroundColor: '#fff', 
    position: 'absolute', 
    bottom: 0, 
    left: 30 
  },
  turnHorizontalLine: { 
    height: 6, 
    width: 35, 
    backgroundColor: '#fff', 
    position: 'absolute', 
    bottom: 0, 
    left: 0 
  },
  turnUpArrowHead: { 
    position: 'absolute', 
    top: 15, 
    left: 21 
  },
});