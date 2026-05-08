import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  active: 'home' | 'activity' | 'profile';
}

const { width } = Dimensions.get('window');

/* LEBAR TAB */
const TAB_WIDTH = (width - 40 - 12) / 3;

export default function BottomNavbar({ active }: Props) {

  const translateX = useRef(new Animated.Value(0)).current;

  const getPosition = () => {
    switch (active) {
      case 'home':
        return 0;

      case 'activity':
        return TAB_WIDTH;

      case 'profile':
        return TAB_WIDTH * 2;
      
      default:
        return 0;
    }
  }
  return (
    <View style={styles.bottomNav}>

      {/* ACTIVE BUBBLE */}
      <Animated.View
        style={[
          styles.activeBubble,
          {
            transform: [{ translateX: getPosition() }],
          },
        ]}
      />

      {/* HOME */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          if (active !== 'home') {
            router.push('/user/home');
          }
        }}
      >

        <Ionicons
          name="home-outline"
          size={24}
          color={active === 'home' ? '#fff' : '#1565C0'}
        />

        <Text
          style={
            active === 'home'
              ? styles.activeText
              : styles.inactiveText
          }
        >
          Home
        </Text>

      </TouchableOpacity>

      {/* ACTIVITY */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          if (active !== 'activity') {
            router.push('/user/activity');
          }
        }}
      >

        <Ionicons
          name="time-outline"
          size={24}
          color={active === 'activity' ? '#fff' : '#1565C0'}
        />

        <Text
          style={
            active === 'activity'
              ? styles.activeText
              : styles.inactiveText
          }
        >
          Activity
        </Text>

      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          if (active !== 'profile') {
            router.push('/user/profile');
          }
        }}
      >

        <Ionicons
          name="person-outline"
          size={24}
          color={active === 'profile' ? '#fff' : '#1565C0'}
        />

        <Text
          style={
            active === 'profile'
              ? styles.activeText
              : styles.inactiveText
          }
        >
          Profile
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,

    height: 72,

    flexDirection: 'row',
    backgroundColor: '#D9ECFF',
    borderRadius: 40,
    padding: 6,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,

    overflow: 'hidden',
  },

  /* BUBBLE */
  activeBubble: {
    position: 'absolute',

    width: TAB_WIDTH,
    height: 60,

    backgroundColor: '#1565C0',

    borderRadius: 32,

    top: 6,
    left: 6,
  },

  navItem: {
    flex: 1,
    height: 60,

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 2,
  },

  activeText: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 3,
  },

  inactiveText: {
    color: '#1565C0',
    fontWeight: '600',
    marginTop: 3,
  },

});