import { View, Text, TextInput, Pressable, Image } from "react-native";
import styles from "../../utils/Styles";
import { color, icon, matrix } from "../../utils/Constant";
import { useState } from "react";
import { callApi, showMessage } from "../../utils";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Button, Input } from "../../component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/action/userAction";


const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isLogin, setLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateInput = () => {
    if(username?.trim()?.length === 0){
      showMessage("Please enter username");
      return false;
    }

    if(password?.trim()?.length < 8){
      showMessage("Please enter min 8 char password");
      return false;
    }

    return true;
  };

  const login = async() => {
    // navigation.navigate("ChatList")
    if(validateInput()){
      try{
        setLoading(true);
        const payload = {
          "username": username,
          "password": password?.trim(),
        };

        const response = await callApi('users/login', 'POST', payload);
        if(response.success){
          onLoginSuccess(response);
        }else{
          showMessage(response?.message);
        }
      }
      catch(error){
        if(error.response?.data){
          showMessage(error.response?.data?.message);
        }else{
          showMessage("Something went wrong, try again later");
        }
      }
      setLoading(false);
    }
  };

  const onLoginSuccess = (response)=>{
    AsyncStorage.setItem('token', JSON.stringify(response.data));
    dispatch(setUserData(response.data));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'ChatList' },
        ],
      }),
    );
  };

  const signup = async() => {
    if(validateInput()){
      try{
        setLoading(true);
        const payload = {
          "username": username,
          "password": password?.trim(),
          "email": `${username}@gmail.com`,
        };

        const response = await callApi('users/register', 'POST', payload);
        if(response?.success){
          showMessage("User registered, You can login now", color.green);
          setUsername("");
          setPassword("");
          setLogin(true);
        }else{
          showMessage(response?.message);
        }
        setLoading(false);
      }
      catch(error){
        setLoading(false);
        if(error.response?.data){
          showMessage(error.response?.data?.message);
        }
      }
    }
  };

  return(
    <View style={styles.loginCover}>
      <View style={styles.optionView}>
          <Pressable 
            onPress={()=>setLogin(true)}
            style={[styles.optionBtn, {borderBottomWidth: isLogin ? 3 : 0}]}>
            <Text style={[styles.optionText, {color: isLogin ? color.primary : color.textColor}]}>Login</Text>
          </Pressable>
          <Pressable 
            onPress={()=>setLogin(false)}
            style={[styles.optionBtn, {borderBottomWidth: isLogin ? 0 : 3}]}>
            <Text style={[styles.optionText, {color: isLogin ? color.textColor : color.primary}]}>Sign Up</Text>
          </Pressable>
        </View>

        <View style={{height: matrix.responseWidth(60)}}>
          <Input
            source={icon.user}
            placeholder="username"
            placeholderColor={color.grayColor}
            onChangeText={(text) => setUsername(text.trim().toLowerCase())}
            value={username}
          />

          <Input
            source={icon.lock}
            placeholder="Password"
            placeholderColor={color.grayColor}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>

        <Button
          onPress={()=>{isLogin ? login() : signup()}}
          title={ isLogin? "Login" :"Sign up" } 
          isLoading={isLoading} 
        />
    </View>
  );
};

export default Login;
