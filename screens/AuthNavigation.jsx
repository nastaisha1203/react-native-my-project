import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          headerShown: false,
          title: "Registration",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, title: "LogIn" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
