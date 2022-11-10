import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Celcius from "../views/Temperature/Celcius";
import Fahrenheit from "../views/Temperature/Fahrenheit";
import Kelvin from "../views/Temperature/Kelvin";
import Reamur from "../views/Temperature/Reamur";

const Stack = createNativeStackNavigator();

const TemptStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Celcius" component={Celcius} />
      <Stack.Screen options={{ headerShown: false }} name="Fahrenheit" component={Fahrenheit} />
      <Stack.Screen options={{ headerShown: false }} name="Kelvin" component={Kelvin} />
      <Stack.Screen options={{ headerShown: false }} name="Reamur" component={Reamur} />
    </Stack.Navigator>
  );
};

export default TemptStack;

const styles = StyleSheet.create({});
