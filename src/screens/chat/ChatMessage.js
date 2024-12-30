import { FlatList, Text, View } from "react-native";
import styles from "../../utils/Styles";
import { Header, Input, Loader } from "../../component";
import { useEffect, useState } from "react";
import { color, icon } from "../../utils/Constant";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, receiveMessage, sendMessage, updateChatList } from "../../redux/action/chatAction";
import { socket } from "../../utils";
import types from "../../redux/constant";


const ChatMessage = (props) => {
  const { data, newChat } = props.route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state)=> state.user.userData);
  const messageData = useSelector((state)=> state.chat.messageData);
  const isMessageLoading = useSelector((state)=> state.chat.isMessageLoading);
  const chatList = useSelector((state) => state.chat.chatList);

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    if(!newChat){
      dispatch(getMessage(data?.chatId));
    }
  }, []);

  useEffect(()=>{
    if(!socket.connected){
      socket.connect();
    }

    socket.on('connect', (data)=>{
      console.log("connected", data.id);
    })

    socket.emit("joinChat", data?.chatId);
    socket.on("messageReceived", handleMessageReceived);

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.disconnect();
      socket.off("messageReceived", handleMessageReceived);
    };
  }, []);

  useEffect(()=>{
    if(messageData?.length > 0){
      setMessages(messageData);
    }
  }, [messageData]);

  // const handleMessageReceived = (data)=>{
  //   console.log("msgReceived", JSON.stringify(data));

  //   // setMessages((prev) => [data, ...prev]);
  //   dispatch(receiveMessage(data));
  //   const chatListData = [...chatList];
  //   const chatIndex = chatListData.findIndex((item) => item?.chatId === data?.chat);
  //   console.log("chatIndex", chatIndex);
  //   if(chatIndex !== -1){
  //     console.log("last message", chatListData[chatIndex].lastMessage, data.content)
  //     chatListData[chatIndex].lastMessage = data.content;
  //   }
  //   console.log("chatListData", chatListData);
  //   dispatch(updateChatList(chatListData));

  // };
  const handleMessageReceived = (data) => {
    dispatch(receiveMessage(data));
    const chatIndex = chatList.findIndex((item) => item?.chatId === data?.chat);

    if (chatIndex !== -1) {
      const updatedChatList = chatList.map((item, index) => {
        if (index === chatIndex) {
          return {
            ...item,
            lastMessage: data.content,
          };
        }
        return item;
      });

      dispatch(updateChatList(updatedChatList));
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onSendMessage = () => {
    dispatch(sendMessage({chatId: data?.chatId, content: content}));
    setContent("")
    
  };

  const renderItem = ({item, index}) => {
    return(
      <View style={userData?.user?._id===item?.sender?._id ? styles.rightMsgView : styles.leftMsgView}>
        <Text style={userData?.user?._id===item?.sender?._id ? styles.rightMsgText : styles.leftMsgText}>{item.content}</Text>
      </View>
    );
  };

  const separator = () => {
    return(
      <View style={styles.separator} />
    );
  };

  return(
    <View style={styles.mainContainer}>
      <Header 
        title={data?.username}
        leftIcon={icon.back}
        onLeftPress={goBack}
      />
      <View style={{flex: 1}}>
        {isMessageLoading ? <Loader /> :
          <FlatList
            inverted={true}
            data={messages}
            ItemSeparatorComponent={separator}
            renderItem={renderItem}
            keyExtractor={(item, index) => item?._id}
          />
        }
      </View>
      <Input
        rightIcon={icon.send}
        placeholder="Type here..."
        placeholderColor={color.grayColor}
        extViewStyle={styles.msgInput}
        onRightPress={onSendMessage}
        onChangeText={(text) => setContent(text)}
        value={content}
      />
    </View>
  );
};

export default ChatMessage;
