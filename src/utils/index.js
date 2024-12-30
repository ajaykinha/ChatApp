import { BASE_URL } from "@env"
import axios from "axios";
import store from "../redux/store";
import Snackbar from "react-native-snackbar";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import types from "../redux/constant";

const refreshToken = async () => {
  const state = store.getState();
  console.log("refreshToken", state.user.userData?.refreshToken)
  const config = {
    url: "users/refresh-token",
    method: "POST",
    baseURL: BASE_URL,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.user.userData?.refreshToken}`,

    },
  };

  try {
    const response = await axios(config);
    if (response.status < 400) {
      // Update the token in the state/store
      store.dispatch({
        type: types.SET_USER_DATA,
        data: {...state.user.userData, accessToken: response.data.accessToken},
      });
      AsyncStorage.setItem(
        "token",
        JSON.stringify({
          ...state.user.userData,
          accessToken: response.data.accessToken,
          refreshToken: response.data.accessToken,
        })
      );
      return response.data.accessToken;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    // console.error("Error refreshing token:", error);
    throw error;
  }
};


const callApi = (url, method, payload) => {
  const state = store.getState();
  return new Promise(async (resolve, reject) => {
    let accessToken = state.user.userData?.accessToken;
    const config = {
      url: url,
      method: method,
      baseURL: BASE_URL,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: payload,
    };

    if (method === 'GET') delete config.data;

    try {
      const response = await axios(config);
      if (response.status < 400) {
        resolve(response.data);
      }else{
        reject(response.data);
      }
    }
    catch (error) {
      if(error.response.data.statusCode === 401){
        try {
          accessToken = await refreshToken();
          // Retry the API call with the new access token
          config.headers.Authorization = `Bearer ${accessToken}`;
          const retryResponse = await axios(config);

          if (retryResponse.status < 400) {
            resolve(retryResponse.data);
          } else {
            reject(retryResponse.data);
          }
        } catch (refreshError) {
          // console.error("Token refresh failed:", refreshError);
          reject(refreshError);
        }
      }else{
        reject(error);
      }
    }
  });
};

const callApiWithFormdata = (url, method, payload) => {
  const state = store.getState();

  return new Promise(async (resolve, reject) => {
    const config = {
      url: url,
      method: method,
      baseURL: BASE_URL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + state.homeData.userData.token,
      },
      data: payload,
    };

    if (method === 'GET') delete config.data;

    try {
      const response = await axios(config);
      // console.log("response==>", response)
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response.data);
      }
    } catch (error) {
      console.log('axios error', error.response.data);
      reject(error);
    }
  });
};

const showMessage = (msg, color) => {
  // Alert.alert('Wait..', msg);
  Snackbar.show({
    text: msg,
    backgroundColor: color ? color : 'red',
    duration: Snackbar.LENGTH_SHORT,
  });
};

const socket = io('https://api.freeapi.app/', {
  transports: ["websocket"],
  forceNew: false,
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 3000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});

const formatedChatList= (chatList)=>{
  const state = store.getState();

  return chatList.flatMap(chat =>
    chat.participants
    .filter(participant => participant._id !== state.user.userData.user._id)
    .map(participant => ({
      ...participant,
      chatId: chat._id,
      lastMessage: participant?.lastMessage ? participant?.lastMessage : "No message yet"
    }))
  );
};

const updatedChatList = (data)=> {
  const state = store.getState();
  const chatIndex = state.chat.chatList.findIndex((item) => item?.chatId === data?.chat);

    if (chatIndex !== -1) {
      return state.chat.chatList.map((item, index) => {
        if (index === chatIndex) {
          return {
            ...item,
            lastMessage: data.content,
          };
        }
        return item;
      });

    }else{
      return state.chat.chatList;
    }

}

export {
  callApi,
  callApiWithFormdata,
  showMessage,
  socket,
  formatedChatList,
  updatedChatList,
};
