import React from 'react';
import {  Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Location Weather',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="home" size={size} color={color} />
            )
          },
        }}
      />
    </Tabs>
  );
}
