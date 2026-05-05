// app/auth/login.tsx

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

import ButtonPrimary from '@/components/common/ButtonPrimary';
import InputField from '@/components/common/InputField';
import { useAuthVM } from '@/viewmodels/useAuthVM';

export default function LoginScreen() {
  const {
    name,
    password,
    setName,
    setPassword,
    login,
  } = useAuthVM();

  return (
    <ImageBackground
      source={require('../../assets/images/bg-login.png')}
      style={styles.container}
      resizeMode="cover">

      {/* Overlay */}
      <View style={styles.overlay}>

        <KeyboardAvoidingView
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
          style={styles.wrapper}>

          {/* Floating Card */}
          <View style={styles.card}>

            {/* Logo */}
            <Image
              source={require('../../assets/images/V-Park.png')}
              style={styles.logo}
            />

            <Text style={styles.brand}>
              Log In
            </Text>

            <Text style={styles.subtitle}>
              Sign in to your account
            </Text>

            {/* Input Name */}
            <InputField
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            {/* Input Password */}
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Forgot */}
            <TouchableOpacity>
              <Text style={styles.forgot}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Button */}
            <ButtonPrimary
              title="Log In"
              onPress={login}
            />

            {/* Signup */}
            <TouchableOpacity
              onPress={() =>
                router.push('/auth/signup')
              }>
              <Text style={styles.bottomText}>
                Don’t have an account?{' '}
                <Text style={styles.link}>
                  Sign Up
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
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 8,
  },

  brand: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1565C0',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
    marginBottom: 24,
    fontSize: 13,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 18,
  },

  forgot: {
    textAlign: 'right',
    color: '#1565C0',
    marginBottom: 18,
    fontSize: 13,
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