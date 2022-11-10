import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SafeAreaView, Text, View, Alert, ScrollView, StyleSheet, TextInput } from "react-native";
import Button from "../components/Button";
import Loader from "../components/Loader";
import COLORS from "../const/color";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DropDownPicker from "react-native-dropdown-picker";
import Input from "../components/Input";

const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem("userData", JSON.stringify({ ...userDetails, loggedIn: false }));
    navigation.navigate("LoginScreen");
  };

  const [temp1, setTemp1] = React.useState([
    { label: "Celcius", value: "Celcius" },
    { label: "Reamur", value: "Reamur" },
    { label: "Kelvin", value: "Kelvin" },
    { label: "Fahrenheit", value: "Fahrenheit" },
  ]);

  const [temp2, setTemp2] = React.useState([
    { label: "Celcius", value: "Celcius" },
    { label: "Reamur", value: "Reamur" },
    { label: "Kelvin", value: "Kelvin" },
    { label: "Fahrenheit", value: "Fahrenheit" },
  ]);

  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [value2, setValue2] = React.useState(null);
  const [inputTemp, setInputTemp] = React.useState("");

  const [result, setResult] = React.useState("");
  const convert = () => {
    setResult("");
    if (value == "Celcius" && value2 == "Celcius") {
      setResult(inputTemp);
    } else if (value == "Celcius" && value2 == "Reamur") {
      setResult((4 / 5) * inputTemp);
    } else if (value == "Celcius" && value2 == "Kelvin") {
      setResult(Number(inputTemp) + 273.15);
    } else if (value == "Celcius" && value2 == "Fahrenheit") {
      setResult((9 / 5) * inputTemp + 32);
    } else if (value == "Reamur" && value2 == "Celcius") {
      setResult((5 / 4) * inputTemp);
    } else if (value == "Reamur" && value2 == "Reamur") {
      setResult(inputTemp);
    } else if (value == "Reamur" && value2 == "Kelvin") {
      setResult((5 / 4) * inputTemp + 273.15);
    } else if (value == "Reamur" && value2 == "Fahrenheit") {
      setResult((9 / 4) * inputTemp + 32);
    } else if (value == "Kelvin" && value2 == "Celcius") {
      setResult(inputTemp - 273.15);
    } else if (value == "Kelvin" && value2 == "Reamur") {
      setResult((4 / 5) * (inputTemp - 273.15));
    } else if (value == "Kelvin" && value2 == "Kelvin") {
      setResult(inputTemp);
    } else if (value == "Kelvin" && value2 == "Fahrenheit") {
      setResult((9 / 5) * (inputTemp - 273.15) + 32);
    } else if (value == "Fahrenheit" && value2 == "Celcius") {
      setResult((5 / 9) * (inputTemp - 32));
    } else if (value == "Fahrenheit" && value2 == "Reamur") {
      setResult((4 / 9) * (inputTemp - 32));
    } else if (value == "Fahrenheit" && value2 == "Kelvin") {
      setResult((5 / 9) * (inputTemp - 32) + 273.15);
    } else if (value == "Fahrenheit" && value2 == "Fahrenheit") {
      setResult(inputTemp);
    }
  };

  const flipConvert = () => {
    setValue2(value);
    setValue(value2);
    setInputTemp(result);
    this.convert();
  };

  const handleChangeInput = (value) => {
    console.log(value);
    // setResult("");
    setInputTemp(value);
    convert();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
        paddingHorizontal: 40,
        height: "100%",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>Welcome {userDetails?.fullname}</Text>
      <Input placeholder="Enter the number" onChangeText={(text) => setInputTemp(text)} mb={5} iconMr={0} keyboardType="numeric" style={{ fontSize: 20 }} />
      <DropDownPicker open={open} value={value} items={temp1} setOpen={setOpen} setValue={setValue} setItems={setTemp1} style={styles.input} placeholder="From.." zIndex={3000} zIndexInverse={1000} onChangeValue={convert} />
      <DropDownPicker open={open2} value={value2} items={temp2} setOpen={setOpen2} setValue={setValue2} setItems={setTemp2} style={styles.input} placeholder="To.." zIndex={2000} zIndexInverse={2000} onChangeValue={convert} />
      {/* <TextInput placeholder="Enter the temperature" value={inputTemp} onChangeText={(text) => setInputTemp(text)} style={styles.input} /> */}

      <Button title={"Submit"} onPress={convert} mb={1} />
      {/* <Button title={"Flip"} onPress={flipConvert} mb={10} /> */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>Result: {result}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.light,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 20,
    borderColor: "lightgray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
