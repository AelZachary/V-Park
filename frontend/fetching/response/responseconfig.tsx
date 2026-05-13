import { Platform } from 'react-native';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  Platform.select({
    android: 'http://10.0.2.2:8080',
    ios: 'http://localhost:8080',
    default: 'http://localhost:8080',
  }) ?? 'http://localhost:8080';