import {View, Text, ActivityIndicator} from "react-native"
import { color, matrix } from "../../utils/Constant";
import styles from "../../utils/Styles";
import { useEffect } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/action/userAction";


const Splash = ()=>{
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(()=>{
    getLocalData();
  }, []);

  const getLocalData = () => {
    AsyncStorage.getItem('token').then(value => {
      if (value) {
        dispatch(setUserData(JSON.parse(value)));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {name: 'ChatList'},
            ],
          }),
        );
      }else{
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {name: 'Login'},
            ],
          }),
        );
      }
    })
    .catch((error)=>{
      console.log("error", error)
    })
  };

  return(
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to chat app</Text>
      <ActivityIndicator size="large" color={color.primary} />
    </View>
  );
};

export default Splash;
