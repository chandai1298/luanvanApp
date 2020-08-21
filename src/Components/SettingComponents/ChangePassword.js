import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Style, SettingStyle, DIMENSION} from '../../CommonStyles';
import HeaderComponent from '../../Apps/HeaderComponent';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

const ChangePassword = ({route, navigation}) => {
  const {idUser} = route.params;

  const [data, setData] = React.useState({
    password_old: '',
    password_new: '',
    passwordConfirm: '',
    secureTextEntry: true,
    secureTextEntry2: true,
    secureTextEntry3: true,
    isValidOldPassword: true,
    isValidNewPassword: true,
    isConfirmPassword: true,
  });
  const handleOldPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password_old: val,
        isValidOldPassword: true,
      });
    } else {
      setData({
        ...data,
        password_old: val,
        isValidOldPassword: false,
      });
    }
  };
  const handleNewPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password_new: val,
        isValidNewPassword: true,
      });
    } else {
      setData({
        ...data,
        password_new: val,
        isValidNewPassword: false,
      });
    }
  };
  const handleConfirmPasswordChange = (val) => {
    if (val.trim() === data.password_new) {
      setData({
        ...data,
        passwordConfirm: val,
        isConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        passwordConfirm: val,
        isConfirmPassword: false,
      });
    }
  };

  const updateSecureTextEntryOld = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateSecureTextEntryNew = () => {
    setData({
      ...data,
      secureTextEntry2: !data.secureTextEntry2,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry3: !data.secureTextEntry3,
    });
  };
  return (
    <View>
      <HeaderComponent
        title="Đổi mật khẩu"
        icon="check"
        navigation={navigation}
        desComponent="Setting"
        pass1={data.password_old}
        pass2={data.password_new}
        idUser={idUser}
      />
      <View style={SettingStyle.sectionIn4}>
        <Text style={[Style.text18, Style.textColor754ea6, {color: '#9a9a9a'}]}>
          Mật khẩu cũ
        </Text>
        <View style={styles.action}>
          <TextInput
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleOldPasswordChange(val)}
            style={[Style.input]}
          />
        </View>
        {data.isValidOldPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Mật khẩu phải dài hơn 8 ký tự!</Text>
          </Animatable.View>
        )}

        <Text style={[Style.text18, Style.textColor754ea6, {color: '#9a9a9a'}]}>
          Mật khẩu mới
        </Text>
        <View style={styles.action}>
          <TextInput
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleNewPasswordChange(val)}
            style={[Style.input]}
          />
        </View>
        {data.isValidNewPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Mật khẩu phải dài hơn 8 ký tự!</Text>
          </Animatable.View>
        )}

        <Text style={[Style.text18, Style.textColor754ea6, {color: '#9a9a9a'}]}>
          Xác nhận mật khẩu
        </Text>
        <View style={styles.action}>
          <TextInput
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
            style={[Style.input]}
          />
        </View>
        {data.isConfirmPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Mật khẩu không khớp!</Text>
          </Animatable.View>
        )}

        <View style={SettingStyle.viewChangPassword}>
          <TouchableOpacity
            style={[SettingStyle.btnSettings, Style.boxShadow]}
            onPress={() => navigation.navigate('Setting')}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#c1c8fe', '#5579f1']}
              style={[SettingStyle.btnSettings, Style.boxShadow]}>
              <Text
                style={[
                  Style.text20,
                  Style.textColore6e6f6,
                  {letterSpacing: 2},
                ]}>
                Hủy
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
const styles = StyleSheet.create({
  errorMsg: {
    color: '#f44336',
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
  },
});
