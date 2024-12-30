import types from "../constant"

const initialState = {
  chatList: [],
  isChatListLoading: false,
  availableUser: [],
  isAvailableUserLoading: false,
  messageData: [],
  isMessageLoading: false,
  newChat: null,
  creatingChat: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CHAT_LIST_REQUEST:
      return {
        ...state,
        isChatListLoading: true,
      };

    case types.GET_CHAT_LIST_SUCCESS:
      return {
        ...state,
        isChatListLoading: false,
        chatList: action.data,
      };

    case types.GET_CHAT_LIST_FAILED:
      return {
        ...state,
        isChatListLoading: false,
      };

    case types.NEW_CHAT_EVENT:
      return {
        ...state,
        chatList: [...action.data, ...state.chatList],
      };

    case types.GET_AVAILABLE_USER_REQUEST:
      return {
        ...state,
        isAvailableUserLoading: true,
      };

    case types.GET_AVAILABLE_USER_SUCCESS:
      return {
        ...state,
        isAvailableUserLoading: false,
        availableUser: action.data,
      };

    case types.GET_AVAILABLE_USER_FAILED:
      return {
        ...state,
        isAvailableUserLoading: false,
      };

    case types.CREATE_NEW_CHAT_REQUEST:
      return {
        ...state,
        isChatListLoading: true,
      };

    case types.CREATE_NEW_CHAT_SUCCESS:
      return {
        ...state,
        isChatListLoading: false,
        chatList: [...action.data, ...state.chatList],
      };

    case types.NEW_MESSAGE_RECEIVED:
      return {
        ...state,
        messageData: state.messageData ? [action.data, ...state.messageData] : null,
      };

    case types.GET_MESSAGE_REQUEST:
      return {
        ...state,
        isMessageLoading: true,
      };

    case types.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        isMessageLoading: false,
        messageData: action.data,
      };

    case types.GET_MESSAGE_FAILED:
      return {
        ...state,
        isMessageLoading: false,
      };

    case types.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messageData: [action.data, ...state.messageData],
      };

    default:
      return {
        ...state,
      };
  }
};

export default chatReducer;
