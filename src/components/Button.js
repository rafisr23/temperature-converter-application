import React from "react";
import { TouchableOpacity, Text } from "react-native";
import COLORS from "../const/color";
const Button = ({ mb, mr, color, title, onPress = () => {} }) => {
  const backgroundColor = color || COLORS.blue;
  const marginRight = mr || 0;
  const marginBottom = mb || 20;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: backgroundColor,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: marginBottom,
        borderRadius: 10,
        marginRight: mr,
      }}
    >
      <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
