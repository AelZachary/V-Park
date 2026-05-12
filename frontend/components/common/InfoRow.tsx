import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PencilEditIcon } from '../icons/ParkingDetailIcons';

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueComponent?: React.ReactNode;
  showDivider?: boolean;
  onEdit?: () => void;
}

export default function InfoRow({
  icon,
  label,
  value,
  valueComponent,
  showDivider = true,
  onEdit,
}: InfoRowProps) {
  return (
    <>
      {showDivider && <View style={styles.divider} />}
      <View style={styles.infoRow}>
        <View style={styles.iconBadge}>{icon}</View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoLabel}>{label}</Text>
          {valueComponent ?? <Text style={styles.infoValue}>{value}</Text>}
        </View>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <PencilEditIcon />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#CCE9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  infoValue: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    color: '#000',
    lineHeight: 19,
    letterSpacing: 0.12,
  },
  editButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginLeft: 38,
  },
});
