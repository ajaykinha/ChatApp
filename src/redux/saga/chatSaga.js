import { call, put, takeLatest } from "redux-saga/effects";
import types from "../constant";
import { callApi, formatedChatList, showMessage, updatedChatList } from "../../utils";

function* getChatListAction(action){
  try {
    const response = yield call(callApi, 'chat-app/chats', 'GET', null);

    if (response.success) {

      yield put({type: types.GET_CHAT_LIST_SUCCESS, data: formatedChatList(response.data)});
    } else {
      yield put({type: types.GET_CHAT_LIST_FAILED});
      showMessage(response.message);
    }
  } catch (error) {
      yield put({type: types.GET_CHAT_LIST_FAILED});
      if(error.response?.data){
        showMessage(error.response?.data?.message);
      }else{
        showMessage('Something went wrong, try again later');
      }
  }
}

export function* watchGetChatListAction(){
  yield takeLatest(types.GET_CHAT_LIST_REQUEST, getChatListAction);
}

function* getAvailableUserAction(action){
  try {
    const response = yield call(callApi, 'chat-app/chats/users', 'GET', null);
    // console.log("response", response);
    if (response.success) {
      yield put({type: types.GET_AVAILABLE_USER_SUCCESS, data: response.data});
    } else {
      yield put({type: types.GET_AVAILABLE_USER_FAILED});
      showMessage(response.message);
    }
  } catch (error) {
      yield put({type: types.GET_AVAILABLE_USER_FAILED});
      if(error.response?.data){
        showMessage(error.response?.data?.message);
      }else{
        showMessage('Something went wrong, try again later');
      }
  }
}

export function* watchGetAvailableUserAction(){
  yield takeLatest(types.GET_AVAILABLE_USER_REQUEST, getAvailableUserAction);
}

function* createNewChatAction(action){
  try {
    const body = {
      receiverId: action.data,
    };
    const response = yield call(callApi, `chat-app/chats/c/${action.data}`, 'POST', body);
    if (response.success) {
      yield put({type: types.CREATE_NEW_CHAT_SUCCESS, data: formatedChatList([response.data])});
    } else {
      showMessage(response.message);
    }
  } catch (error) {
      if(error.response?.data){
        showMessage(error.response?.data?.message);
      }else{
        showMessage('Something went wrong, try again later');
      }
  }
}

export function* watchCreateNewChatAction(){
  yield takeLatest(types.CREATE_NEW_CHAT_REQUEST, createNewChatAction);
}

function* getMessageAction(action){
  try {
    const body = {
      chatId: action.data,
    };
    const response = yield call(callApi, `chat-app/messages/${action.data}`, 'GET', body);
    console.log("getMessageAction", JSON.stringify(response));
    if (response.success) {
      yield put({type: types.GET_MESSAGE_SUCCESS, data: response.data});
    } else {
      yield put({type: types.GET_MESSAGE_FAILED});
      showMessage(response.message);
    }
  } catch (error) {
    yield put({type: types.GET_MESSAGE_FAILED});
      if(error.response?.data){
        showMessage(error.response?.data?.message);
      }else{
        showMessage('Something went wrong, try again later');
      }
  }
}

export function* watchGetMessageAction(){
  yield takeLatest(types.GET_MESSAGE_REQUEST, getMessageAction);
}

function* sendMessageAction(action){
  try {
    const body = {
      chatId: action.data.chatId,
      content: action.data.content
    };
    const response = yield call(callApi, `chat-app/messages/${action.data.chatId}`, 'POST', body);

    if (response.success) {

      yield put({type: types.SEND_MESSAGE_SUCCESS, data: response.data});
      yield put({type: types.GET_CHAT_LIST_SUCCESS, data: updatedChatList(response.data)});
    } else {
      showMessage(response.message);
    }
  } catch (error) {
      if(error.response?.data){
        showMessage(error.response?.data?.message);
      }else{
        showMessage('Something went wrong, try again later');
      }
  }
}

export function* watchSendMessageAction(){
  yield takeLatest(types.SEND_MESSAGE_REQUEST, sendMessageAction);
}
