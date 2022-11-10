import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, SafeAreaView, ScrollView, Keyboard, Alert, StyleSheet, TextInput, StatusBar, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import { Card, RadioButton } from "react-native-paper";
import COLORS from "../const/color";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";

const ProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Informatics", value: "Informatics" },
    { label: "Information System", value: "Information System" },
    { label: "Chemical Engineering", value: "Chemical Engineering" },
    { label: "Architecture", value: "Architecture" },
    { label: "Interior Design", value: "Interior Design" },
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
    { label: "2019", value: "2019" },
    { label: "2018", value: "2018" },
  ]);
  const [checked, setChecked] = useState("");

  // const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSave = () => {
    if (fullName !== "" && address !== "" && value !== "" && value2 !== "" && checked !== "") {
      // alert('Saved!, ' + fullName + ', ' + address + ', ' + value + ', ' + value2);
      // console.warn("Saved!");
      // console.log("Full Name:", fullName);
      // console.log("Gender:", checked);
      // console.log("Address:", address);
      // console.log("Major:", value);
      // console.log("Batch:", value2);
      navigation.navigate("Detail", {
        fullname: fullName,
        gender: checked,
        address: address,
        major: value,
        batch: value2,
        image: image,
      });
    } else {
      Alert.alert("Alert", "Please fill all the fields.");
    }
  };

  const [userDetails, setUserDetails] = useState();
  const logout = () => {
    AsyncStorage.setItem("userData", JSON.stringify({ ...userDetails, loggedIn: false }));
    navigation.navigate("LoginScreen");
  };

  return (
    <ScrollView style={{ backgroundColor: "f2f2f2" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
        {/* <Text style={[styles.title, { fontWeight: "bold" }]}>Welcome {auth.currentUser?.email}</Text> */}
        <Text style={styles.title}>Enter your details</Text>
        <View style={styles.inputContainer}>
          {/* <TextInput placeholder="Full Name" value={fullName} onChangeText={(text) => setFullName(text)} style={styles.input} /> */}
          <Input placeholder="Enter your full fame" iconName="card-account-details" label="Full Name" onChangeText={(text) => setFullName(text)} mb={5} />
          <View style={{ width: 300, height: 50, marginTop: 10, flexDirection: "row" }}>
            <View style={{ width: 150, height: 50, marginRight: 10, flexDirection: "row" }}>
              <RadioButton value="Male" status={checked === "Male" ? "checked" : "unchecked"} onPress={() => setChecked("Male")} />
              <Text style={{ marginTop: 8 }}>Male</Text>
            </View>
            <View style={{ width: 150, height: 50, marginRight: 10, flexDirection: "row" }}>
              <RadioButton value="Female" status={checked === "Female" ? "checked" : "unchecked"} onPress={() => setChecked("Female")} />
              <Text style={{ marginTop: 8 }}>Female</Text>
            </View>
          </View>
          {/* <TextInput placeholder="Address" value={address} onChangeText={(text) => setAddress(text)} style={styles.input} /> */}
          <Input placeholder="Enter your address" iconName="home" label="Address" onChangeText={(text) => setAddress(text)} mb={5} />
          <DropDownPicker open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems} style={styles.input} placeholder="Major" zIndex={3000} zIndexInverse={1000} />
          <DropDownPicker open={open2} value={value2} items={items2} setOpen={setOpen2} setValue={setValue2} setItems={setItems2} style={[styles.input]} dropDownDirection="BOTTOM" placeholder="Batch" zIndex={2000} zIndexInverse={2000} />
          {image != null ? (
            <></>
          ) : (
            <>
              <StatusBar hidden={true} />
              <Button title={"Select Image"} onPress={pickImage} />
              <StatusBar style="auto" />
            </>
          )}
        </View>
        {image && (
          <View style={[styles.inputContainer, { alignItems: "center" }]}>
            <Card.Cover source={{ uri: image }} style={{ margin: 20, width: 200, height: 200 }} />
            <Button title={"Change Image"} onPress={pickImage} />
            <View style={styles.buttonContainer}></View>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Button title={"Save"} onPress={handleSave} mr={10} />
          <Button title={"Logout"} onPress={logout} color={COLORS.red} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: COLORS.light,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    borderColor: COLORS.blue,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    // zIndex: 1000,
    // zIndexInverse: 1000,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonimage: {
    backgroundColor: "#0782F9",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "lightgray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    // fontFamily: 'sans-serif-bold',
  },
});
