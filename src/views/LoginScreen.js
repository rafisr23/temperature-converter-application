import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, SafeAreaView, ScrollView, Alert, Keyboard } from "react-native";
import React from "react";
import COLORS from "../const/color";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (inputs.email == userData.email && inputs.password == userData.password) {
          AsyncStorage.setItem("userData", JSON.stringify({ ...userData, loggedIn: true }));
          navigation.navigate("AppStack");
        } else {
          Alert.alert("Error", "Invalid Details");
        }
      } else {
        Alert.alert("Error", "User does not exist");
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>Login</Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Enter Your Details to Login</Text>
        <View style={{ marginVertical: 20 }}>
          <Input placeholder="Enter your email address" iconName="email" label="Email" onChangeText={(text) => handleOnchange(text, "email")} onFocus={() => handleError(null, "email")} error={errors.email} />
          <Input placeholder="Enter your passwordd" iconName="lock" label="Password" onChangeText={(text) => handleOnchange(text, "password")} onFocus={() => handleError(null, "password")} error={errors.password} password />
          <Button title="Login" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("RegistrationScreen")}
            style={{
              color: COLORS.black,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Don't have an account? Register here!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
