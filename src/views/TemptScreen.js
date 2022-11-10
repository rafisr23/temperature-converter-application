import { View, Text } from "react-native";
import React, { Component } from "react";
// import CustomListView from "../components/CustomListView";
import CustomListView from "../components/CustomListView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";

const TemptScreen = () => {
  const getData = () => {
    return [
      {
        title: "Celcius",
        description: "The degree Celsius is the unit of temperature on the Celsius scale, one of 2 temperature scales used in the International System of Units, alongside the Kelvin scale. ",
        image_url: "https://www.flaticon.com/svg/static/icons/svg/1828/1828843.svg",
      },
      {
        title: "Fahrenheit",
        description: "The Fahrenheit scale is a temperature scale based on one proposed in 1724 by the physicist Daniel Gabriel Fahrenheit. It uses the degree Fahrenheit as the unit.",
        image_url: "https://www.flaticon.com/svg/static/icons/svg/1828/1828843.svg",
      },
      {
        title: "Kelvin",
        description: "The kelvin, symbol K, is the primary unit of temperature in the International System of Units, used alongside its prefixed forms and the degree Celsius.",
        image_url: "https://www.flaticon.com/svg/static/icons/svg/1828/1828843.svg",
      },
      {
        title: "Reamur",
        description: "The Réaumur scale, also known as the 'octogesimal division', is a temperature scale for which the melting and boiling points of water are defined as 0 and 80 degrees respectively.",
        image_url: "https://www.flaticon.com/svg/static/icons/svg/1828/1828843.svg",
      },
    ];
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomListView itemList={getData()} />
    </View>
    // <View>
    //   {/* <CustomListview itemList={this.getData()} /> */}
    // </View>
  );
};

export default TemptScreen;
