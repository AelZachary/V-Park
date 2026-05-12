import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function ButtonSecondary({
  title,
  onPress,
  style,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.85}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#1565C0',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1565C0',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
  },
});
