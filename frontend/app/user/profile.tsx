import BottomNavbar from '@/components/navigation/BottomNavbar';
import { useProfileVM } from '@/viewmodels/useProfileVM';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProfileScreen() {

    const {
        showLogout,
        setShowLogout,
        profile,
        logout,
    } = useProfileVM();
        

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/V-Park.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Profile</Text>
      </View>

      {/* PROFILE */}
      <View style={styles.profileSection}>

        <Image
          source={require('../../assets/images/ProfileKucing.jpg')}
          style={styles.profileImage}
        />

        <Text style={styles.name}>
          {profile.name}
        </Text>

        <Text style={styles.phone}>
          {profile.phone}
        </Text>

      </View>

      {/* STATS */}
      <View style={styles.statsRow}>

        {/* Booking */}
        <View style={styles.statCard}>
          <Ionicons
            name="folder-open-outline"
            size={34}
            color="#111"
          />

          <Text style={styles.statTitle}>
            Total Booking
          </Text>

          <Text style={styles.statValue}>
            {profile.totalBooking} <Text style={styles.small}>Kali</Text>
          </Text>
        </View>

        {/* Expenses */}
        <View style={styles.statCard}>
          <Ionicons
            name="wallet-outline"
            size={34}
            color="#111"
          />

          <Text style={styles.statTitle}>
            Total Expenses
          </Text>

          <Text style={styles.expenseText}>
            {profile.totalExpenses}
          </Text>
        </View>

      </View>

      {/* VEHICLE */}
      <Text style={styles.vehicleTitle}>
        Kendaraan Saya
      </Text>

      <View style={styles.vehicleCard}>

        <Image
          source={require('../../assets/images/FotoKendaraan.png')}
          style={styles.carImage}
        />

        <View>
          <Text style={styles.carName}>
            {profile.vehicle}
          </Text>

          <Text style={styles.plate}>
            {profile.plate}
          </Text>
        </View>

      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => setShowLogout(true)}
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color="#fff"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

      {/* LOGOUT MODAL */}
      <Modal
        visible={showLogout}
        transparent
        animationType="fade"
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>
              Are you sure you{"\n"}
              want to log out?
            </Text>

            <View style={styles.modalButtonRow}>

              {/* YES */}
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={logout}
              >
                <Text style={styles.modalBtnText}>
                  Yes
                </Text>
              </TouchableOpacity>

              {/* NO */}
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setShowLogout(false)}
              >
                <Text style={styles.modalBtnText}>
                  No
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>
      </Modal>

      {/* BOTTOM NAV */}
      <BottomNavbar active="profile" />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F8FD',
    paddingTop: 50,
  },

  /* HEADER */
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  logo: {
    width: 57,
    height: 66,
    resizeMode: 'contain',
    position: 'absolute',
    left: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1565C0',
  },

  /* PROFILE */
  profileSection: {
    alignItems: 'center',
    marginTop: 25,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  name: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 12,
    color: '#111',
  },

  phone: {
    color: '#444',
    marginTop: 2,
    fontSize: 15,
  },

  /* STATS */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 30,
  },

  statCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },

  statTitle: {
    color: '#1565C0',
    fontWeight: '700',
    marginTop: 10,
    fontSize: 16,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },

  small: {
    fontSize: 14,
    fontWeight: '400',
  },

  expenseText: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },

  /* VEHICLE */
  vehicleTitle: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 18,
    fontWeight: '800',
    color: '#1565C0',
  },

  vehicleCard: {
    backgroundColor: '#fff',
    marginHorizontal: 25,
    marginTop: 18,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 3,
  },

  carImage: {
    width: 120,
    height: 70,
    resizeMode: 'contain',
    marginRight: 15,
  },

  carName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1565C0',
  },

  plate: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 5,
    color: '#111',
  },

  /* LOGOUT */
  logoutBtn: {
    marginHorizontal: 35,
    marginTop: 40,
    backgroundColor: '#FF5C46',
    borderRadius: 30,
    height: 60,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  logoutText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    backgroundColor: '#fff',
    width: '70%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111',
    lineHeight: 28,
  },

  modalButtonRow: {
    flexDirection: 'row',
    marginTop: 25,
    gap: 15,
  },

  modalBtn: {
    backgroundColor: '#2E8BEF',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
  },

  modalBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  /* BOTTOM NAV */
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#D9ECFF',
    borderRadius: 40,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 'auto',
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