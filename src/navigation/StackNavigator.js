import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/auth/Splash";
import Login from "../screens/auth/Login";
import { Provider } from "react-redux";
import store from "../redux/store";
import ChatList from "../screens/chat/ChatList";
import ChatMessage from "../screens/chat/ChatMessage";


const Stack = createNativeStackNavigator();

const Navigator = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="ChatMessage" component={ChatMessage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const App = () => {
  return(
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}

export default App;
