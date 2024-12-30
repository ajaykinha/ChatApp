import { FlatList, Image, Pressable, Text, View } from "react-native";
import styles from "../../utils/Styles";
import { EmptyList, Header, Loader } from "../../component";
import { useEffect, useState } from "react";
import { icon, matrix } from "../../utils/Constant";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat, getAvailableUser, getChatList, newChatEvent } from "../../redux/action/chatAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatedChatList, socket } from "../../utils";


const ChatList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const isChatListLoading = useSelector((state) => state.chat.isChatListLoading);
  const chatList = useSelector((state) => state.chat.chatList);
  const isAvailableUserLoading = useSelector((state) => state.chat.isAvailableUserLoading);
  const availableUser = useSelector((state) => state.chat.availableUser);
  const creatingChat = useSelector((state) => state.chat.creatingChat);

  // const [userList, setUserList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    dispatch(getChatList());
    dispatch(getAvailableUser());
  }, []);

  // useEffect(()=>{
  //   if(chatList?.length > 0){
  //     const users = chatList.flatMap(chat =>
  //       chat.participants
  //       .filter(participant => participant._id !== userData.user._id)
  //       .map(participant => ({
  //         ...participant,
  //         chatId: chat._id,
  //         lastMessage: participant?.lastMessage ? participant?.lastMessage : "No message yet"
  //       }))
  //     );

  //     setUserList(users);
  //   }
  // }, [chatList, userData.user._id]);

  useEffect(()=>{
    if(!socket.connected){
      socket.connect();
    }

    socket.on("newChat", handleNewChatEvent);

    return () => {
      socket.disconnect();
      socket.off("newChat", handleNewChatEvent);
    };
  }, []);

  const handleNewChatEvent = (data)=>{
    // console.log("newChatEEvent", userData.user.username, JSON.stringify(data), userData);
    const formatedChat = formatedChatList([data]);
    dispatch(newChatEvent(formatedChat));
  };

  const openChat = (data) => {
    navigation.navigate("ChatMessage", {data, newChat: false});
  };

  const createChat = (receiver)=>{
    dispatch(createNewChat(receiver._id));
    setShowPopup(false);
    // navigation.navigate("ChatMessage", {data: receiver, newChat: true});
  };

  const logout = ()=>{
    AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Login' },
        ],
      }),
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <Pressable style={styles.chatListCard} onPress={()=>openChat(item)}>
        <View style={styles.userDPView}>
          <Image source={{uri: item.avatar.url}} style={styles.userDP} />
        </View>
        <View style={styles.subCard}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.lastMessage}>{item?.lastMessage}</Text>
        </View>
      </Pressable>
    );
  };

  const renderAvailableUser = ({item, index})=>{
    return(
      <Pressable style={styles.chatListCard} onPress={()=>createChat(item)}>
        <View style={styles.subCard}>
          <Text style={styles.username}>{index+1}. {item.username}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Header 
        title="Chats"
        leftIcon={icon.add}
        onLeftPress={()=>setShowPopup(true)}
        rightIcon={icon.logout}
        onRightPress={logout}
      />
      {isChatListLoading || isAvailableUserLoading
        ? <Loader />
        : <FlatList
            data={chatList}
            ListEmptyComponent={()=> <EmptyList />}
            renderItem={renderItem}
            keyExtractor={(item) => item?._id}
          />
      }
      { showPopup &&
        <View style={styles.availableUserList}>
          <Pressable style={styles.popupHeader} onPress={()=>setShowPopup(false)}>
            <Image source={icon.close} style={styles.closeIcon} />
          </Pressable>
          <FlatList
            data={availableUser}
            ListEmptyComponent={()=> <EmptyList />}
            renderItem={renderAvailableUser}
            keyExtractor={(item) => item?._id}
          />
        </View>
      }
    </View>
  );
};

export default ChatList;
