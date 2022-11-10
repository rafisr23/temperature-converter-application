import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../views/ProfileScreen";
import DetailProfileScreen from "../views/DetailProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Detail" component={DetailProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
