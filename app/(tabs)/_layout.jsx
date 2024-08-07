import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color, textAlign: "center" }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ff0000",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#f6f6f6",
            borderTopWidth: 1,
            borderTopColor: "#fff",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="medicine"
          options={{
            title: "Medicine",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.medicine}
                color={color}
                name="Medicine"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="yearly"
          options={{
            title: "Yearly Check-Up",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.yearly}
                color={color}
                name="Annual Check-Up"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="premium"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.premium}
                color={focused ? "#FFD700" : "#888"}
                name="Premium"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="insurance"
          options={{
            title: "Insurance",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.insurance}
                color={color}
                name="Insurance"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
