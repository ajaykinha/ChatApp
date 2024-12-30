import {Image, Pressable, Text, View} from 'react-native';
import styles from '../utils/Styles';
import { icon } from '../utils/Constant';


const Header = ({
  title,
  leftIcon,
  onLeftPress = ()=>{},
  rightIcon,
  onRightPress = ()=>{},
}) => {

  return(
    <View style={styles.header}>
      <Pressable style={styles.leftHeader} onPress={onLeftPress}>
        {onLeftPress && <Image source={leftIcon} style={styles.leftIcon} />}
      </Pressable>
      <View style={styles.centerHeader}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <Pressable style={styles.rightHeader} onPress={onRightPress}>
        {onLeftPress && <Image source={rightIcon} style={styles.rightIcon} />}
      </Pressable>
    </View>
  );
};

export default Header;
