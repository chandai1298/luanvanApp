import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Style} from '../CommonStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {IN4_APP} from '../ConnectServer/In4App';

const HeaderComponent = ({
  title,
  navigation,
  icon,
  desComponent,
  data,
  cf1,
  cf2,
  pass1,
  pass2,
  idUser,
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
      case 'Đổi mật khẩu':
        const updatePassWord = IN4_APP.UpdatePassWord;
        axios
          .put(updatePassWord, {
            PasswordN: pass2,
            Id: idUser,
            Password: pass1,
          })
          .then(function (response) {
            ToastAndroid.showWithGravity(
              response.data,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            console.log(response.data);
          })
          .catch(function (error) {
            ToastAndroid.showWithGravity(
              'Thất bại!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          });
        navigation.navigate(desComponent);
        break;

      default:
        break;
    }
  };
  return (
    <View style={Style.headerContainer}>
      <View style={Style.headerIcon} />
      <Text style={[Style.text20, {color: '#afafaf'}]}>{title}</Text>
      <TouchableOpacity>
        <FontAwesome5
          name={icon}
          size={25}
          color="#58cc02"
          style={Style.headerIcon}
          onPress={() => onPressHandle()}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderComponent;
