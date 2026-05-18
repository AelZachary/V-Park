import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type LegendItemProps = {
  color?: string;       
  label: string;
  isTextMode?: boolean; 
  textColor?: string;   
};

export default function LegendItem({ 
  color, 
  label, 
  isTextMode = false, 
  textColor 
}: LegendItemProps) {
  return (
    <View style={styles.container}>
      
      {!isTextMode && (
        <View style={[styles.dot, { backgroundColor: color }]} />
      )}
      
      {/* Tampilkan teks label */}
      <Text style={[
        styles.label, 
        isTextMode && { color: textColor || '#7BC67B', fontWeight: '700' }
      ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // Jarak antara dot/tulisan dengan item sebelah jika berjejer
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  label: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
});