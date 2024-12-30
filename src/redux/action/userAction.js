import types from "../constant"

const setUserData = (data) => {
  return {
    type: types.SET_USER_DATA,
    data,
  };
};

export {
  setUserData,
};
