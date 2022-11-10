import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, SafeAreaView, ScrollView, Keyboard, Alert } from "react-native";
import React from "react";
import COLORS from "../const/color";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError("Min password length of 8", "password");
      isValid = false;
    } else if (inputs.password != inputs.confirmPassword) {
      handleError("Your password do not match", "confirmPassword");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));
        Alert.alert("Information", "Registration Succesful");
        navigation.navigate("LoginScreen");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
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
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>REGISTER</Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Enter Your Details..</Text>
        <View style={{ marginVertical: 20 }}>
          <Input placeholder="Enter your fullname" iconName="card-account-details" label="Fullname" onChangeText={(text) => handleOnchange(text, "fullname")} onFocus={() => handleError(null, "fullname")} error={errors.fullname} />
          <Input placeholder="Enter your email address" iconName="email" label="Email" onChangeText={(text) => handleOnchange(text, "email")} onFocus={() => handleError(null, "email")} error={errors.email} />
          <Input keyboardType="numeric" placeholder="Enter your phone number" iconName="phone" label="Phone Number" onChangeText={(text) => handleOnchange(text, "phone")} onFocus={() => handleError(null, "phone")} error={errors.phone} />
          <Input placeholder="Enter your password" iconName="lock" label="Password" onChangeText={(text) => handleOnchange(text, "password")} onFocus={() => handleError(null, "password")} error={errors.password} password />
          <Input placeholder="Re-Enter your password" iconName="lock" label="Confirm Password" onChangeText={(text) => handleOnchange(text, "confirmPassword")} onFocus={() => handleError(null, "confirmPassword")} error={errors.confirmPassword} password />
          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              color: COLORS.black,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Alreade have account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
