import { COLORS, FONT_SIZE, SPACING } from '@/constants/theme';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function HeaderActivity() {
  return (
    <View style={styles.header}>
      
      {/* LOGO */}
      <Image
        source={require('@/assets/images/V-Park.png')}
        style={styles.logo}
      />

      {/* TITLE */}
      <Text style={styles.title}>
        Activity
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  header: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      marginBottom: SPACING.sm,
      marginTop: 50,
      backgroundColor: COLORS.background,
    },
  
    logo: {
      width: 57,
      height: 66,
      resizeMode: 'contain',
      position: 'absolute',
      left: SPACING.lg,
    },
  
    title: {
      fontSize: FONT_SIZE.xl,
      fontWeight: '700',
      color: COLORS.primary,
    },
});