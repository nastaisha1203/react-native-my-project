import { StyleSheet } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";

const Stack = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DefaultScreenPosts"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({});
