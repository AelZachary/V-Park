import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

type DropdownButtonProps = {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

export default function DropdownButton({
  options,
  selectedValue,
  onValueChange,
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  
  // Menggunakan tipe <any> agar TypeScript tidak memunculkan garis merah pada .measure()
  const buttonRef = useRef<any>(null);

  const openDropdown = () => {
    buttonRef.current?.measure((fx: number, fy: number, width: number, height: number, px: number, py: number) => {
      setDropdownTop(py + height + 2); // Tepat berada di bawah tombol utama dengan jarak 2px
      setDropdownLeft(px);
      setDropdownWidth(width);
      setIsOpen(true);
    });
  };

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <View style={{ width: '100%' }}>
      {/* TOMBOL UTAMA DROPDOWN */}
      <TouchableOpacity
        ref={buttonRef}
        style={styles.dropdownButton}
        activeOpacity={0.8}
        onPress={openDropdown}
      >
        <Text style={styles.dropdownText}>
          {isOpen ? 'Area Parkir' : selectedValue}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color="#1565C0"
          style={[styles.arrowIcon, isOpen && styles.arrowIconActive]}
        />
      </TouchableOpacity>

      {/* MODAL LIST MENU MELAYANG (OVERLAY) */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.menuContainer,
                {
                  top: dropdownTop,
                  left: dropdownLeft,
                  width: dropdownWidth,
                },
              ]}
            >
              <ScrollView
                style={styles.scrollMenu}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {options.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.menuItem,
                      item === selectedValue && styles.menuItemSelected,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(item)}
                  >
                    <Text
                      style={[
                        styles.menuItemText,
                        item === selectedValue && styles.menuItemTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    marginTop: 8,
    height: 38,
    width: '100%',
    maxHeight: 38,
    borderWidth: 2,
    borderColor: '#1565C0',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    backgroundColor: '#FFF',
  },
  dropdownText: {
    color: '#1565C0',
    fontWeight: '700',
    fontSize: 13,
  },
  arrowIcon: {
    transform: [{ rotate: '0deg' }],
  },
  arrowIconActive: {
    transform: [{ rotate: '180deg' }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#1565C0',
    borderRadius: 14,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  scrollMenu: {
    maxHeight: 240,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FFF',
  },
  menuItemSelected: {
    backgroundColor: '#F3F8FD',
  },
  menuItemText: {
    fontSize: 14,
    color: '#1565C0',
    fontWeight: '700',
  },
  menuItemTextSelected: {
    fontWeight: '900',
  },
});