import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import CustomRowView from "./CustomRowView";

const CustomListView = ({ itemList }) => {
  return (
    <View style={styles.container}>
      <FlatList data={itemList} renderItem={({ item }) => <CustomRowView title={item.title} description={item.description} image_url={item.image_url} />} />
    </View>
  );
};

export default CustomListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
