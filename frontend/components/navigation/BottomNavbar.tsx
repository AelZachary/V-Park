import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Props {
  active: 'home' | 'activity' | 'profile';
}

export default function BottomNavbar({ active }: Props) {

  return (
    <View style={styles.bottomNav}>

      {/* HOME */}
      <TouchableOpacity
        style={[
          styles.navItem,
          active === 'home' && styles.activeItem
        ]}
        onPress={() => router.push('/user/home')}
      >

        <Ionicons
          name="home-outline"
          size={22}
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
        style={[
          styles.navItem,
          active === 'activity' && styles.activeItem
        ]}
        onPress={() => router.push('/user/activity')}
      >

        <Ionicons
          name="time-outline"
          size={22}
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
        style={[
          styles.navItem,
          active === 'profile' && styles.activeItem
        ]}
        onPress={() => router.push('/user/profile')}
      >

        <Ionicons
          name="person-outline"
          size={22}
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

    flexDirection: 'row',
    backgroundColor: '#D9ECFF',
    borderRadius: 40,
    padding: 6,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 30,
  },

  activeItem: {
    backgroundColor: '#1565C0',
  },

  activeText: {
    color: '#fff',
    fontWeight: '700',
  },

  inactiveText: {
    color: '#1565C0',
    fontWeight: '600',
  },

});