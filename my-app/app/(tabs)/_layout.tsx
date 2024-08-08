import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import HomeScreen from '@/src/pages/home/home';
import TabTwoScreen from '@/src/pages/report/report';
import ConfigScreen from '@/src/pages/configurations/configurations';

const Tabs = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tabs.Navigator
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
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"home-sharp"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        component={TabTwoScreen}
        options={{
          title: 'Relatório',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"bar-chart-sharp"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configurations"
        component={ConfigScreen}
        options={{
          title: 'Configuração',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"cog"} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
