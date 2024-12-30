import { all } from "redux-saga/effects";
import { watchCreateNewChatAction, watchGetAvailableUserAction, watchGetChatListAction, watchGetMessageAction, watchSendMessageAction } from "./chatSaga";

function* rootSaga() {
  yield all([
    watchGetChatListAction(),
    watchGetAvailableUserAction(),
    watchCreateNewChatAction(),
    watchGetMessageAction(),
    watchSendMessageAction(),
  ]);
};

export default rootSaga;
