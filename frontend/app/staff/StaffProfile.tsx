import { useStaffProfileVM } from '@/viewmodels/useStaffProfileVM';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function StaffProfileScreen() {

  const {
    showLogout,
    setShowLogout,
    profile,
    logout,
    updateProfile,
  } = useStaffProfileVM();

  

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#1565C0"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Profile
        </Text>

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

        <Text style={styles.role}>
          {profile.role}
        </Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            Aktif
          </Text>
        </View>

      </View>

      {/* INFO CARD */}
      <View style={styles.infoCard}>

        {/* ID PETUGAS */}
        <View style={styles.infoRow}>

          <View style={styles.leftSection}>

            <View style={styles.iconBox}>
              <Ionicons
                name="id-card-outline"
                size={22}
                color="#333"
              />
            </View>

            <View>
              <Text style={styles.label}>
                ID Petugas
              </Text>

              <Text style={styles.value}>
                {profile.staffId}
              </Text>
            </View>

          </View>

          

        </View>

        {/* AREA */}
        <View style={styles.infoRow}>

          <View style={styles.leftSection}>

            <View style={styles.iconBox}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color="#333"
              />
            </View>

            <View>
              <Text style={styles.label}>
                Area Tugas
              </Text>

              <Text style={styles.value}>
                {profile.area}
              </Text>
            </View>

          </View>

        </View>

        {/* SHIFT */}
        <View style={styles.infoRow}>

          <View style={styles.leftSection}>

            <View style={styles.iconBox}>
              <Ionicons
                name="car-outline"
                size={22}
                color="#333"
              />
            </View>

            <View>
              <Text style={styles.label}>
                Shift
              </Text>

              <Text style={styles.value}>
                {profile.shift}
              </Text>
            </View>

          </View>

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

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F8FD',
    paddingTop: 50,
  },

  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  backBtn: {
    position: 'absolute',
    left: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1565C0',
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 30,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  name: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
  },

  role: {
    marginTop: 5,
    fontSize: 16,
    color: '#444',
  },

  statusBadge: {
    marginTop: 12,
    backgroundColor: '#84C67B',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    color: '#fff',
    fontWeight: '700',
  },

  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 25,
    marginTop: 30,
    borderRadius: 20,
    padding: 18,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#DCEEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  label: {
    color: '#1565C0',
    fontWeight: '700',
    fontSize: 16,
  },

  value: {
    marginTop: 4,
    fontSize: 16,
    color: '#222',
  },

  logoutBtn: {
    marginHorizontal: 35,
    marginTop: 45,
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

  editBox: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 20,
    padding: 25,
  },

  editTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 15,
    textAlign: 'center',
  },

  editInput: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
  },

});