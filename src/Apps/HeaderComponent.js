import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Style} from '../CommonStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HeaderComponent = ({
  title,
  navigation,
  icon,
  desComponent,
  data,
  cf1,
  cf2,
}) => {
  const onPressHandle = () => {
    switch (title) {
      case 'Hồ sơ':
        navigation.navigate(desComponent, {
          in4User: data,
          dataConfig1: cf1,
          dataConfig2: cf2,
        });
        break;
      case 'Cài đặt':
        navigation.navigate(desComponent);
        break;

      default:
        break;
    }
  };
  return (
    <View style={Style.headerContainer}>
      <View style={Style.headerIcon} />
      <Text style={[Style.text20, {color: '#9a9a9a'}]}>{title}</Text>
      <TouchableOpacity>
        <FontAwesome5
          name={icon}
          size={25}
          color="#687ae4"
          style={Style.headerIcon}
          onPress={() => onPressHandle()}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderComponent;
