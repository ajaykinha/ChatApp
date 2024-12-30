import { ActivityIndicator, View } from "react-native";
import styles from "../utils/Styles";
import { color } from "../utils/Constant";


const Loader = ({
  loaderColor = color.primary,
}) => {
  return(
    <View style={styles.loader}>
      <ActivityIndicator size={"large"} color={loaderColor} />
    </View>
  );
};

export default Loader;
