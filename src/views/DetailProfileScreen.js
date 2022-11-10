import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import COLORS from "../const/color";

const DetailProfileScreen = ({ route }) => {
  const [userDetails, setUserDetails] = React.useState();
  const navigation = useNavigation();
  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login");
  //     })
  //     .catch((error) => alert(error.message));
  // };
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  const logout = () => {
    AsyncStorage.setItem("userData", JSON.stringify({ ...userDetails, loggedIn: false }));
    navigation.navigate("LoginScreen");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 50,
        paddingHorizontal: 20,
        height: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 40,
          marginBottom: 20,
        }}
      >
        <Card.Cover source={{ uri: route.params.image }} style={{ margin: 20, width: 200, height: 200 }} />
        <Text style={styles.teks}>Name : {route.params.fullname}</Text>
        <Text style={styles.teks}>Gender : {route.params.gender}</Text>
        <Text style={styles.teks}>Email : {userDetails?.email}</Text>
        <Text style={styles.teks}>Address : {route.params.address}</Text>
        <Text style={styles.teks}>Major : {route.params.major}</Text>
        <Text style={styles.teks}>Batch : {route.params.batch}</Text>
        {/* <TouchableOpacity onPress={handleSignOut} style={[styles.button, { width: 100, marginTop: 20, backgroundColor: "red" }]}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity> */}
        <Button title="Logout" onPress={logout} color={COLORS.red} />
      </View>
    </ScrollView>
  );
};

export default DetailProfileScreen;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
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
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  teks: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
  },
});
