import React from "react";
import type { Node } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../views/LoginScreen";
import RegistrationScreen from "../views/RegistrationScreen";
import ProfileScreen from "../views/ProfileScreen";
import HomeScreen from "../views/HomeScreen";
import Loader from "../components/Loader";
import Home from "../routes/Home";
import BottomTab from "./BottomTab";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

const StackNav = ({ routeName }) => {
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
    // <NavigationContainer>
    //   {!initialRouteName ? (
    //       <Loader visible={true} />
    //     ) : (

    //     )}
    // </NavigationContainer>
    <Stack.Navigator initialRouteName={routeName} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppStack" component={AppStack} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} screenOptions={{ headerShown: false }} />
      {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
};

export default StackNav;
