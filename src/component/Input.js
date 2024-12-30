import React from "react";
import { View, Image, TextInput, Pressable } from "react-native";
import styles from "../utils/Styles";


const Input = ({
  placeholder,
  source,
  onChangeText,
  placeholderColor,
  extViewStyle,
  extIcon,
  extStyle,
  editable,
  maxLength,
  keyboardType,
  value,
  rightIcon,
  onRightPress,
})=>{
  return(
    <View style={[styles.inputView, extViewStyle]}>
      {source && <Image source={source} style={[styles.mobile1, extIcon]} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        style={[styles.input, extStyle]}
        editable={editable}
        maxLength={maxLength}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
      />
      {rightIcon && 
        <Pressable onPress={onRightPress}>
          <Image source={rightIcon} style={[styles.mobile1, extIcon]} />
        </Pressable>
      }
    </View>
  );
};

export default Input;
