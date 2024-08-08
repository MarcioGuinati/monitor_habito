import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 57 },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "orange",
        tabBarInactiveBackgroundColor: "orange",
        tabBarLabelStyle: { marginBottom: 5, marginTop: -5 },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"home-sharp"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Relatório',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"bar-chart-sharp"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configurations"
        options={{
          title: 'Configuração',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"cog"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
