import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ParkingSlot from '../ParkingSlot';

type SlotStatus = 'available' | 'selected' | 'manual' | 'online' | 'occupied';

type GroundFloorProps = {
  selectedSlot?: string | null;
  onSelectSlot: (slotId: string, currentStatus: string) => void;
  slotStatuses?: Record<string, SlotStatus>;
  forceEnable?: boolean;
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

export default function GroundFloor({ selectedSlot, onSelectSlot, slotStatuses, forceEnable = false }: GroundFloorProps) {
  return (
    <View style={styles.parkingLayout}>
      <View style={styles.rowGroup}>
        
        {/* ========== LEFT SIDE COLUMN ========== */}
        <View style={styles.sideColumn}>
          {/* BLOK 1: R1, R2, spacer */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R1" status={resolveSlotStatus("R1", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R1", resolveSlotStatus("R1", "manual", slotStatuses, selectedSlot))} />
            <View style={styles.spacerSlot} />
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R2" status={resolveSlotStatus("R2", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R2", resolveSlotStatus("R2", "manual", slotStatuses, selectedSlot))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 2: R3, R4, R5 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R3" status={resolveSlotStatus("R3", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R3", resolveSlotStatus("R3", "manual", slotStatuses, selectedSlot))} />
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R4" status={resolveSlotStatus("R4", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R4", resolveSlotStatus("R4", "manual", slotStatuses, selectedSlot))} />
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R5" status={resolveSlotStatus("R5", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R5", resolveSlotStatus("R5", "manual", slotStatuses, selectedSlot))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 3: R6, R7, R8 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R6" status={resolveSlotStatus("R6", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R6", resolveSlotStatus("R6", "manual", slotStatuses, selectedSlot))} />
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R7" status={resolveSlotStatus("R7", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R7", resolveSlotStatus("R7", "manual", slotStatuses, selectedSlot))} />
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R8" status={resolveSlotStatus("R8", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R8", resolveSlotStatus("R8", "manual", slotStatuses, selectedSlot))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 4: R9, R10, R11 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R9" status={resolveSlotStatus("R9", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R9", resolveSlotStatus("R9", "manual", slotStatuses, selectedSlot))} />
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R10" status={resolveSlotStatus("R10", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R10", resolveSlotStatus("R10", "manual", slotStatuses, selectedSlot))} />
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R11" status={resolveSlotStatus("R11", "manual", slotStatuses, selectedSlot)} side="left" onPress={() => onSelectSlot("R11", resolveSlotStatus("R11", "manual", slotStatuses, selectedSlot))} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 5: spacer, GA - G, spacer */}
          <View style={styles.block3Rows}>
            <View style={styles.spacerSlot} />
            <Text style={styles.mallText}>GA - G</Text>
            <View style={styles.spacerSlot} />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 6: R12, R13, R14 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={forceEnable ? false : undefined} slot="R12" status={resolveSlotStatus("R12", "online", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot disabled={forceEnable ? false : undefined}
              slot="R13" 
              status={resolveSlotStatus("R13", "available", slotStatuses, selectedSlot)}
              side="left" 
              onPress={() => onSelectSlot('R13', resolveSlotStatus("R13", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={forceEnable ? false : undefined}
              slot="R14" 
              status={resolveSlotStatus("R14", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('R14', resolveSlotStatus("R14", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 7: R15, R16, R17 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={forceEnable ? false : undefined}
              slot="R15" 
              status={resolveSlotStatus("R15", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('R15', resolveSlotStatus("R15", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R16" 
              status={resolveSlotStatus("R16", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('R16', resolveSlotStatus("R16", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R17" 
              status={resolveSlotStatus("R17", "online", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R17", resolveSlotStatus("R17", "online", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 8: longDivider x3 */}
          <View style={styles.longDivider} />
          <View style={styles.longDivider} />
          <View style={styles.longDivider} />
          <View style={styles.groupDividerLeft} />

          {/* BLOK 9: R18, R19, R20 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R18" 
              status={resolveSlotStatus("R18", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('R18', resolveSlotStatus("R18", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R19" 
              status={resolveSlotStatus("R19", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R19", resolveSlotStatus("R19", "manual", slotStatuses, selectedSlot))}
            />
            {/* 🌟 FIKS: Jika R20 aslinya mau ikut sistem bolak-balik manual staff, buka gerbang onPress-nya juga */}
            <ParkingSlot disabled={false} 
              slot="R20" 
              status={resolveSlotStatus("R20", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R20", resolveSlotStatus("R20", "manual", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 10: R21, R22, R23 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false} 
              slot="R21" 
              status={resolveSlotStatus("R21", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R21", resolveSlotStatus("R21", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="R22" 
              status={resolveSlotStatus("R22", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R22", resolveSlotStatus("R22", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false} 
              slot="R23" 
              status={resolveSlotStatus("R23", "manual", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot("R23", resolveSlotStatus("R23", "manual", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerLeft} />

          {/* BLOK 11: R24, R25, R26 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="R24" 
              status={resolveSlotStatus("R24", "available", slotStatuses, selectedSlot)} 
              side="left" 
              onPress={() => onSelectSlot('R24', resolveSlotStatus("R24", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot slot="R25s" status={resolveSlotStatus("R25", "online", slotStatuses, selectedSlot)} side="left" />
            <ParkingSlot slot="R26" status={resolveSlotStatus("R26", "online", slotStatuses, selectedSlot)} side="left" />
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
          {/* BLOK 1: L1, L2, L3 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L1" 
              status={resolveSlotStatus("L1", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L1', resolveSlotStatus("L1", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L2" 
              status={resolveSlotStatus("L2", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L2", resolveSlotStatus("L2", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L3" 
              status={resolveSlotStatus("L3", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L3', resolveSlotStatus("L3", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 2: L4, L5, L6 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false} 
              slot="L4" 
              status={resolveSlotStatus("L4", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L4", resolveSlotStatus("L4", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L5" 
              status={resolveSlotStatus("L5", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L5", resolveSlotStatus("L5", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L6" 
              status={resolveSlotStatus("L6", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L6', resolveSlotStatus("L6", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 3: L7, L8, L9 (Manual) */}
          <View style={styles.block3Rows}>
            <ParkingSlot slot="L7" status={resolveSlotStatus("L7", "online", slotStatuses, selectedSlot)} side="right" />
            <ParkingSlot disabled={false}
              slot="L8" 
              status={resolveSlotStatus("L8", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L8', resolveSlotStatus("L8", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L9" 
              status={resolveSlotStatus("L9", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L9", resolveSlotStatus("L9", "manual", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 4: Teks Pintu Masuk Mall */}
          <View style={styles.block3Rows}>
            <Text style={styles.mallText}>Pintu</Text>
            <Text style={styles.mallText}>Masuk</Text>
            <Text style={styles.mallText}>Mall</Text>
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 5: spacer, spacer, L10 */}
          <View style={styles.block3Rows}>
            <View style={styles.spacerSlot} />
            <View style={styles.spacerSlot} />
            <ParkingSlot disabled={false}
              slot="L10" 
              status={resolveSlotStatus("L10", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L10", resolveSlotStatus("L10", "manual", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 6: L11, L12, L13 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L11" 
              status={resolveSlotStatus("L11", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L11', resolveSlotStatus("L11", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L12" 
              status={resolveSlotStatus("L12", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L12", resolveSlotStatus("L12", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L13" 
              status={resolveSlotStatus("L13", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L13', resolveSlotStatus("L13", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 7: L14, L15, L16 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L14" 
              status={resolveSlotStatus("L14", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L14', resolveSlotStatus("L14", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L15" 
              status={resolveSlotStatus("L15", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L15', resolveSlotStatus("L15", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L16" 
              status={resolveSlotStatus("L16", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L16", resolveSlotStatus("L16", "manual", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 8: L17, L18, L19 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L17" 
              status={resolveSlotStatus("L17", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L17', resolveSlotStatus("L17", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L18" 
              status={resolveSlotStatus("L18", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L18", resolveSlotStatus("L18", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false} 
              slot="L19" 
              status={resolveSlotStatus("L19", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L19", resolveSlotStatus("L19", "manual", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 9: L20, L21, L22 */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false}
              slot="L20" 
              status={resolveSlotStatus("L20", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L20', resolveSlotStatus("L20", "available", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false} 
              slot="L21" 
              status={resolveSlotStatus("L21", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L21", resolveSlotStatus("L21", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L22" 
              status={resolveSlotStatus("L22", "available", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot('L22', resolveSlotStatus("L22", "available", slotStatuses, selectedSlot))}
            />
          </View>
          <View style={styles.groupDividerRight} />

          {/* BLOK 10: L23, L24, spacer */}
          <View style={styles.block3Rows}>
            <ParkingSlot disabled={false} 
              slot="L23" 
              status={resolveSlotStatus("L23", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L23", resolveSlotStatus("L23", "manual", slotStatuses, selectedSlot))}
            />
            <ParkingSlot disabled={false}
              slot="L24" 
              status={resolveSlotStatus("L24", "manual", slotStatuses, selectedSlot)} 
              side="right" 
              onPress={() => onSelectSlot("L24", resolveSlotStatus("L24", "manual", slotStatuses, selectedSlot))}
            />
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
      alignItems: 'flex-start' 
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
      width: 140, 
      alignItems: 'center' 
    },
    topArrow: { 
      marginTop: 20, 
      marginBottom: 10 
    },
    intersectionWrapper: { 
      width: 80, 
      height: 90, 
      marginVertical: 10, 
      position: 'relative' 
    },
    mainVerticalLine: { 
      width: 6, 
      height: 90, 
      backgroundColor: '#fff', 
      position: 'absolute', 
      top: 0, 
      left: 45 
    },
    leftBranchLine: { 
      height: 6, 
      width: 35, 
      backgroundColor: '#fff', 
      position: 'absolute', 
      top: 40, 
      left: 15 
    },
    leftArrowHead: { 
      position: 'absolute', top: 31, left: 0 },
    bottomArrowHead: { 
      position: 'absolute', bottom: -10, left: 36 },
    bottomArrow: { 
      marginVertical: 20 
    },
    floorText: { 
      fontSize: 40, 
      fontWeight: '900', 
      color: '#fff', 
      marginVertical: 15, 
      textAlign: 'center' 
    },
    mallText: { 
      color: '#fff', 
      textAlign: 'center', 
      fontWeight: '600', 
      marginVertical: 3, 
      fontSize: 12 
    },
    block3Rows: { 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: 4, 
      marginVertical: 2 
    },
    groupDividerLeft: { 
      width: 15, 
      height: 15, 
      backgroundColor: '#D9D9D9', 
      borderRadius: 2, 
      alignSelf: 'flex-end', 
      marginVertical: 3 
    },
    groupDividerRight: { 
      width: 15, 
      height: 15, 
      backgroundColor: '#D9D9D9', 
      borderRadius: 2, 
      alignSelf: 'flex-start', 
      marginVertical: 3, 
      marginLeft: 20 
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
      alignItems: 'center' 
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
      marginLeft: 20 
    },
    spacerSlot: { 
      width: 52, 
      height: 27, 
      marginVertical: 3, 
      opacity: 0 
    }
});