/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type { Node } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import {createNativeStackNavigator} from '@react-navigation/native-stack/src';
import LoginScreen from "./src/views/LoginScreen";
import RegistrationScreen from "./src/views/RegistrationScreen";
import HomeScreen from "./src/views/HomeScreen";
import ProfileScreen from "./src/views/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./src/components/Loader";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import StackNav from "./src/navigation/StackNav";
import BottomTab from "./src/navigation/BottomTab";

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("HomeScreen");
        } else {
          setInitialRouteName("LoginScreen");
        }
      } else {
        setInitialRouteName("RegistrationScreen");
      }
    } catch (error) {
      setInitialRouteName("RegistrationScreen");
    }
  };

  return (
    <NavigationContainer>
      <StackNav routeName={initialRouteName} />
      {/* <BottomTab /> */}
    </NavigationContainer>
  );
};

export default App;
