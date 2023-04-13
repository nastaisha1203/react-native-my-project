import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./mainScreen/PostsScreen";
import CreatePostsScreen from "./mainScreen/CreatePostsScreen";
import ProfileScreen from "./mainScreen/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <MainTab.Navigator screenOptions={{ showLabel: false }}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
          headerRight: ({ focused, size, color }) => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 10 }}
            />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: 500,
          },
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="plus" size={size} color={color} />
          ),
          headerTitleAlign: "center",
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerTitleAlign: "center",
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainNavigation;
