import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
};

export default function ButtonPrimary({
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1565C0',
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
  },
});