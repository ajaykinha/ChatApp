import { Dimensions } from "react-native";

const matrix = {
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
  screenAverage: (Dimensions.get('screen').height + Dimensions.get('screen').width) / 2,
  responseWidth: (val) => Dimensions.get('screen').width * val / 100,
  responseHeight: (val) => Dimensions.get('screen').height * val / 100,
};

const fontSize = {
  font8: matrix.responseWidth(2.05),
  font10: matrix.responseWidth(2.55),
  font12: matrix.responseWidth(3.05),
  font14: matrix.responseWidth(3.55),
  font16: matrix.responseWidth(4.05),
  font18: matrix.responseWidth(4.60),
  font20: matrix.responseWidth(5.10),
  font22: matrix.responseWidth(5.60),
  font24: matrix.responseWidth(6.10),
  font26: matrix.responseWidth(6.60),
  font28: matrix.responseWidth(7.15),
  font30: matrix.responseWidth(7.65),
};

const color = {
  primary: '#3f8cff',
  white: '#ffffff',
  smokeWhite: '#f1f1f1',
  black: '#000000',
  lightBlack: '#333333',
  textColor: '#445474',
  grayColor: '#808080',
  green: '#248f24',
};

const icon = {
  mobile: require('../assets/icon/mobile.png'),
  user: require('../assets/icon/user.png'),
  lock: require('../assets/icon/lock.png'),
  send: require('../assets/icon/send.png'),
  back: require('../assets/icon/back.png'),
  add: require('../assets/icon/add.png'),
  logout: require('../assets/icon/logout.png'),
  close: require('../assets/icon/close.png'),
};

export {color, matrix, fontSize, icon};
