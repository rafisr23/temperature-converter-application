import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import COLORS from "../const/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = ({ label, iconName, error, password, multiline, numberOfLine, mb, iconMr, onFocus = () => {}, ...props }) => {
  const [isFocused, setFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  const marginBottom = mb || 20;
  const iconMarginRight = iconMr || 10;

  return (
    <View style={{ marginBottom: marginBottom }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? COLORS.red : COLORS.darkBlue,
          },
        ]}
      >
        <Icon name={iconName} style={{ fontSize: 22, color: COLORS.darkBlue, marginRight: iconMarginRight }} />
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          style={{ color: COLORS.darkBlue, flex: 1 }}
          {...props}
        />
        {password && <Icon onPress={() => setHidePassword(!hidePassword)} style={{ fontSize: 22, color: COLORS.darkBlue }} name={hidePassword ? "eye-outline" : "eye-off-outline"} />}
      </View>
      {error && <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}>{error}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    color: COLORS.black,
    fontSize: 14,
  },

  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.blue,
    alignItems: "center",
    borderRadius: 10,
  },
});

export default Input;
