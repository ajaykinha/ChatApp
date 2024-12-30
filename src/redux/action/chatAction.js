import types from "../constant"

const getChatList = () => {
  return {
    type: types.GET_CHAT_LIST_REQUEST,
  };
};

const updateChatList = (data) => {
  return {
    type: types.GET_CHAT_LIST_SUCCESS,
    data,
  };
};

const getAvailableUser = () => {
  return {
    type: types.GET_AVAILABLE_USER_REQUEST,
  };
};

const createNewChat = (data) => {
  return {
    type: types.CREATE_NEW_CHAT_REQUEST,
    data,
  };
};

const getMessage = (data) => {
  return {
    type: types.GET_MESSAGE_REQUEST,
    data,
  };
};

const sendMessage = (data) => {
  return {
    type: types.SEND_MESSAGE_REQUEST,
    data,
  };
};

const receiveMessage = (data) => {
  return {
    type: types.NEW_MESSAGE_RECEIVED,
    data,
  };
};

const newChatEvent = (data) => {
  return {
    type: types.NEW_CHAT_EVENT,
    data,
  };
};

export {
  getChatList,
  updateChatList,
  getAvailableUser,
  createNewChat,
  getMessage,
  sendMessage,
  newChatEvent,
  receiveMessage,
};
