import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from './context';
import {IN4_USER} from '../ConnectServer/In4User';
import axios from 'axios';
import {IN4_APP} from '../ConnectServer/In4App';

const SignInScreen = ({navigation}) => {
  const {signUp} = React.useContext(AuthContext);
  const [errorExist, setErrorExist] = React.useState('');
  const [checkExist, setCheckExist] = React.useState(false);

  const [data, setData] = React.useState({
    username: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isConfirmPassword: true,
  });

  const textUserNameChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        isValidUser: true,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        isValidUser: false,
        check_textInputChange: false,
      });
      setErrorExist('Tên đăng nhập quá ngắn.');
    }
  };

  const textPwdChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const textConfirmPwdChange = (val) => {
    if (val.trim() === data.password) {
      setData({
        ...data,
        confirm_password: val,
        isConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isConfirmPassword: false,
      });
    }
  };

  const hideShowPwd = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const hideShowConfirmPwd = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleValidUserName = (val) => {
    const apiURL = IN4_APP.getUsername;
    axios
      .get(apiURL)
      .then(function (response) {
        const foundUser = response.data.filter((item) => {
          return val == item.Username;
        });

        if (foundUser.length > 0) {
          setData({
            ...data,
            isValidUser: false,
            check_textInputChange: false,
          });
          setCheckExist(true);
          setErrorExist('Tên đăng nhập đã tồn tại!');
          console.log(foundUser);
          return;
        } else {
          setCheckExist(false);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const signUpHandle = (userName, password) => {
    console.log(checkExist);
    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert('Lỗi!', 'Tài khoản và mật khẩu không được trống.', [
        {text: 'Okay'},
      ]);
      return;
    } else {
      const apiURL = IN4_APP.signup;
      axios
        .post(apiURL, {
          Username: userName,
          Password: password,
        })
        .then(function (response) {
          alert(response.data);
          navigation.goBack();
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}
        colors={['#58cc02', '#78c800']}>
        <StatusBar backgroundColor="#54ce04" barStyle="light-content" />
        <Animatable.View
          animation="slideInRight"
          iterationCount="infinite"
          direction="alternate"
          style={styles.header}>
          <Text style={styles.text_header}>Đăng ký!</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text style={styles.text_footer}>Tên đăng nhập</Text>
            <View style={styles.action}>
              <FontAwesome name="user" color="#58cc02" size={20} />
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => textUserNameChange(val)}
                onEndEditing={(e) => handleValidUserName(e.nativeEvent.text)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="#58cc02" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{errorExist}</Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}>
              Mật khẩu
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#58cc02" size={20} />
              <TextInput
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => textPwdChange(val)}
              />
              <TouchableOpacity onPress={hideShowPwd}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="#58cc02" size={20} />
                ) : (
                  <Feather name="eye" color="#58cc02" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Mật khẩu phải dài hơn 8 ký tự!
                </Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}>
              Xác nhận mật khẩu
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#58cc02" size={20} />
              <TextInput
                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => textConfirmPwdChange(val)}
              />
              <TouchableOpacity onPress={hideShowConfirmPwd}>
                {data.confirm_secureTextEntry ? (
                  <Feather name="eye-off" color="#58cc02" size={20} />
                ) : (
                  <Feather name="eye" color="#58cc02" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {data.isConfirmPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Mật khẩu chưa trùng khớp!</Text>
              </Animatable.View>
            )}
            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với
              </Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {' '}
                Điều khoản
              </Text>
              <Text style={styles.color_textPrivate}> và</Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                Chính sách
              </Text>
              <Text style={styles.color_textPrivate}> của chúng tôi.</Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() =>
                  checkExist
                    ? alert('Thông tin chưa đúng')
                    : signUpHandle(data.username, data.password)
                }>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#58cc02', '#78c800']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                        letterSpacing: 3,
                      },
                    ]}>
                    Đăng ký
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[
                  styles.signIn,
                  {
                    borderColor: '#78c800',
                    borderWidth: 1.5,
                    marginTop: 15,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#58cc02',
                      letterSpacing: 3,
                    },
                  ]}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  errorMsg: {
    color: '#f44336',
    fontSize: 16,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    letterSpacing: 3,
  },
  text_footer: {
    color: '#58cc02',
    fontSize: 18,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
