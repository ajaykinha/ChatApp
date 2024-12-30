import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { color } from "../utils/Constant";
import styles from "../utils/Styles";


const Button = ({
    title,
    onPress,
    isLoading,
    btnExtStyle,
    txtExtStyle,
  })=>{
  return(
    <Pressable style={[styles.mainBtn, btnExtStyle]} onPress={onPress}>
      <ActivityIndicator animating={isLoading} color={color.white} size="small" />
      <Text style={[styles.btnText, txtExtStyle]}>{title}</Text>
      <ActivityIndicator animating={false} />
    </Pressable>
  )
}

export default Button;
