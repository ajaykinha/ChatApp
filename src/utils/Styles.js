import { StyleSheet } from "react-native";
import { color, fontSize, matrix } from "./Constant";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.smokeWhite,
  },



  //Splash
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.smokeWhite,
  },
  welcomeText: {
    fontSize: fontSize.font26,
    marginBottom: matrix.responseHeight(3),
  },


  //Login
  loginCover: {
    flex: 1,
    backgroundColor: color.smokeWhite,
  },
  inputView: {
    flexDirection: 'row',
    marginHorizontal: matrix.responseWidth(3),
    paddingHorizontal: matrix.responseWidth(1),
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: matrix.responseHeight(2),
    borderColor: color.primary,
  },
  mobile: {
    height: matrix.responseWidth(6),
    width: undefined,
    aspectRatio: 1 / 1,
    tintColor: color.primary,
  },
  mobile1: {
    height: matrix.responseWidth(6),
    width: undefined,
    aspectRatio: 1 / 1,
    tintColor: color.primary,
  },
  input: {
    height: matrix.responseWidth(12),
    paddingHorizontal: '2%',
    color: color.primary,
    fontSize: fontSize.font18,
    flex: 1,
  },
  optionView: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    marginVertical: matrix.responseHeight(10),
  },
  optionBtn: {
    flex: 1,
    alignItems: 'center',
    height: matrix.responseWidth(10),
    width: matrix.responseWidth(30),
    borderColor: color.primary,
  },
  optionText: {
    fontSize: fontSize.font18,
    fontWeight: 'bold',
    // fontFamily: Constant.typeSemiBold,
    color: color.white,
  },
  mainBtn: {
    flexDirection: "row",
    backgroundColor: color.primary,
    marginHorizontal: "3%",
    marginVertical: matrix.responseWidth(6),
    alignItems: "center",
    justifyContent: "center",
    height: matrix.responseWidth(12),
    borderRadius: 6,
  },
  btnText: {
    fontSize: fontSize.font16,
    marginHorizontal: '5%',
    color: color.white,
    fontWeight: '500',
  },

  //Loader
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: matrix.responseWidth,
  },



  //Empty List
  emptyListView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: matrix.responseWidth(35),
  },
  noDataText: {
    color: color.primary,
    fontSize: fontSize.font18,
    textAlign: 'center',
    fontWeight: '600',
  },

  //Header
  header: {
    flexDirection: 'row',
    height: matrix.responseWidth(14),
    backgroundColor: color.primary,
  },
  leftHeader: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  centerHeader: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  rightHeader: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontSize.font20,
    fontWeight: "700",
    color: color.white,
  },
  leftIcon: {
    height: matrix.responseWidth(8),
    width: matrix.responseWidth(8),
    alignSelf: "flex-start",
    marginLeft: matrix.responseWidth(2),
  },
  rightIcon: {
    height: matrix.responseWidth(8),
    width: matrix.responseWidth(8),
    alignSelf: "flex-end",
    marginRight: matrix.responseWidth(2),
  },



  //Chat List
  chatListCard: {
    flexDirection: 'row',
    marginHorizontal: matrix.responseWidth(2),
    paddingVertical: matrix.responseWidth(3),
    borderBottomWidth: 0.8,
    borderColor: color.grayColor,
  },
  userDPView: {
    height: matrix.responseWidth(14),
    width: matrix.responseWidth(14),
    marginHorizontal: matrix.responseWidth(2),
    borderRadius: matrix.responseWidth(7),
    borderWidth: 1.2,
    borderColor: color.primary,
  },
  userDP: {
    height: "100%",
    width: "100%",
    borderRadius: matrix.responseWidth(7)
  },
  subCard: {

  },
  username: {
    fontSize: fontSize.font16,
    fontWeight: "700",
    color: color.lightBlack,
  },
  lastMessage: {
    fontSize: fontSize.font14,
    color: color.grayColor,
  },
  availableUserList: {
    position: 'absolute',
    backgroundColor: '#00000055',
    bottom: 0,
    height: matrix.responseHeight(30),
    width: matrix.screenWidth,
    borderTopLeftRadius: matrix.responseWidth(5),
    borderTopRightRadius: matrix.responseWidth(5),
  },
  popupHeader: {
    height: matrix.responseWidth(10),
    backgroundColor: color.primary,
    borderTopLeftRadius: matrix.responseWidth(5),
    borderTopRightRadius: matrix.responseWidth(5),
    justifyContent: "center",
  },
  closeIcon: {
    height: matrix.responseWidth(8),
    width: matrix.responseWidth(8),
    marginRight: matrix.responseWidth(2),
    alignSelf: "flex-end"
  },



  //Chat Message
  rightMsgView: {
    backgroundColor: color.primary,
    paddingHorizontal: matrix.responseWidth(2.5),
    paddingVertical: matrix.responseWidth(1.5),
    alignSelf: "flex-end",
    maxWidth: matrix.responseWidth(65),
    borderRadius: matrix.responseWidth(2.5),
    borderBottomRightRadius: 0,
    marginRight: matrix.responseWidth(2)
  },
  leftMsgView: {
    backgroundColor: color.grayColor,
    paddingHorizontal: matrix.responseWidth(2.5),
    paddingVertical: matrix.responseWidth(1.5),
    alignSelf: "flex-start",
    maxWidth: matrix.responseWidth(65),
    borderRadius: matrix.responseWidth(2.5),
    borderBottomLeftRadius: 0,
    marginLeft: matrix.responseWidth(2)
  },
  rightMsgText: {
    fontSize: fontSize.font16,
    color: color.white,
  },
  leftMsgText: {
    fontSize: fontSize.font16,
    color: color.white,
  },
  separator: {
    height: matrix.responseWidth(3),
  },
  msgInput: {
    borderRadius: matrix.responseWidth(5),
    paddingHorizontal: matrix.responseWidth(2.5),
  },
});

export default styles;
