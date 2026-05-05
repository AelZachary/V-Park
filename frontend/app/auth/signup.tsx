// app/auth/signup.tsx

import ButtonPrimary from '@/components/common/ButtonPrimary';
import InputField from '@/components/common/InputField';
import { useAuthVM } from '@/viewmodels/useAuthVM';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SignupScreen() {
  const {
    registerName,
    phone,
    registerPassword,
    confirmPassword,

    setRegisterName,
    setPhone,
    setRegisterPassword,
    setConfirmPassword,

    register,
  } = useAuthVM();

  return (
    <ImageBackground
      source={require('../../assets/images/bg-login.png')}
      style={styles.container}
      resizeMode="cover">

      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
          style={styles.wrapper}>

          <View style={styles.card}>

            {/* Logo */}
            <Image
              source={require('../../assets/images/V-Park.png')}
              style={styles.logo}
            />

            {/* Title */}
            <Text style={styles.title}>
              Registration
            </Text>

            {/* Description */}
            <Text style={styles.description}>
              Enter your basic information to sign up V-Park
            </Text>

            {/* Name */}
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={registerName}
              onChangeText={setRegisterName}
            />

            {/* Phone */}
            <InputField
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
            />

            {/* Password */}
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={registerPassword}
              onChangeText={setRegisterPassword}
              secureTextEntry
            />

            {/* Confirm Password */}
            <InputField
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {/* Button */}
            <ButtonPrimary
              title="Create Account"
              onPress={register}
            />

            {/* Login */}
            <TouchableOpacity
              onPress={() =>
                router.push('/auth/login')
              }>
              <Text style={styles.bottomText}>
                Already have an account?{' '}
                <Text style={styles.link}>
                  Log In
                </Text>
              </Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.25)',
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor:
      'rgba(255,255,255,0.96)',
    borderRadius: 28,
    padding: 24,
    paddingBottom: 30,
  },

  logo: {
    width: 78,
    height: 78,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 18,
    lineHeight: 18,
  },

  bottomText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },

  link: {
    color: '#1565C0',
    fontWeight: '700',
  },
});