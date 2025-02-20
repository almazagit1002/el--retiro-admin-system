import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e5e5e5',
        },
        tabBarActiveTintColor: '#8B4513',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Usuarios',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}