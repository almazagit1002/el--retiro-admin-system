import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSegments, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // If we have a session and we're not in the (tabs) group, redirect to home
      if (session && segments[0] !== '(tabs)') {
        router.replace('/(tabs)');
      } else if (!session && segments[0] !== '(auth)') {
        // If we don't have a session and we're not in the auth group, redirect to login
        router.replace('/');
      }
    });

    supabase.auth.onAuthStateChange((event, session) => {
      if (session && segments[0] !== '(tabs)') {
        router.replace('/(tabs)');
      } else if (!session && segments[0] !== '(auth)') {
        router.replace('/');
      }
    });
  }, [segments]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}