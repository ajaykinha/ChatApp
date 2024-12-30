import types from "../constant"

const initialState = {
  userData: null,
};

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case types.SET_USER_DATA:
      return {
        ...state,
        userData: action.data,
      };

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
