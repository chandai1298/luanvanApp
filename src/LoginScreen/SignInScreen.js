import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {Button, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useTheme} from 'react-native-paper';
import {AuthContext} from './context';
import {IN4_USER} from '../ConnectServer/In4User';
import axios from 'axios';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const {colors} = useTheme();
  const {signIn} = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
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

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    const apiURL = IN4_USER.getData;
    axios
      .get(apiURL)
      .then(function (response) {
        const foundUser = response.data.filter((item) => {
          return userName == item.Username && password == item.Password;
        });

        if (data.username.length == 0 || data.password.length == 0) {
          // Alert.alert('Lỗi!', 'Tài khoản và mật khẩu không được trống.', [
          //   {text: 'Okay'},
          // ]);
          toggleOverlay();
          return;
        }

        if (foundUser.length == 0) {
          // Alert.alert('Invalid User!', 'Username or password is incorrect.', [
          //   {text: 'Okay'},
          // ]);
          toggleOverlay2();
          return;
        }
        signIn(foundUser);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleOverlay2 = () => {
    setVisible2(!visible2);
  };
  return (
    <LinearGradient
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#58cc02', '#78c800']}>
      <StatusBar backgroundColor="#54ce04" barStyle="light-content" />

      <Animatable.View
        animation="slideInRight"
        iterationCount="infinite"
        direction="alternate"
        style={styles.header}>
        <Text style={styles.text_header}>Đăng nhập!</Text>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              letterSpacing: 2,
            },
          ]}>
          Tên đăng nhập
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user" color="#58cc02" size={20} />
          <TextInput
            placeholder="Your username"
            style={[
              styles.textInput,
              {
                fontSize: 16,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="#58cc02" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Tên đăng nhập quá ngắn.</Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
              letterSpacing: 2,
            },
          ]}>
          Mật khẩu
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#58cc02" size={20} />
          <TextInput
            placeholder="Your password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                fontSize: 16,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#58cc02" size={20} />
            ) : (
              <Feather name="eye" color="#58cc02" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Mật khẩu phải dài hơn 8 ký tự!</Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text
            style={{
              color: '#58cc02',
              marginTop: 15,
              fontSize: 16,
              fontStyle: 'italic',
              letterSpacing: 1,
              fontWeight: 'bold',
            }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}>
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
                Đăng nhập
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={{
              padding: 0,
              borderRadius: 10,
              height: 100,
              width: 350,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignContent: 'center',
                padding: 12,
                borderRadius: 10,
                backgroundColor: '#f1f1f1',
              }}>
              <Text
                style={{color: '#9a2f12', fontSize: 18, alignSelf: 'center'}}>
                Bạn chưa nhập tài khoản và mật khẩu!
              </Text>

              <Button
                containerStyle={{
                  marginTop: 15,
                  height: 40,
                  borderRadius: 15,
                }}
                buttonStyle={{backgroundColor: '#58cc02'}}
                titleStyle={{
                  letterSpacing: 3,
                }}
                // icon={<Icon name="arrow-right" size={15} color="white" />}
                title="OK"
                onPress={toggleOverlay}
                iconRight
              />
            </View>
          </Overlay>
          <Overlay
            isVisible={visible2}
            onBackdropPress={toggleOverlay2}
            overlayStyle={{
              padding: 0,
              borderRadius: 10,
              height: 100,
              width: 300,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignContent: 'center',
                padding: 12,
                borderRadius: 15,
                backgroundColor: '#f1f1f1',
              }}>
              <Text
                style={{color: '#9a2f12', fontSize: 18, alignSelf: 'center'}}>
                Sai thông tin!
              </Text>

              <Button
                containerStyle={{
                  marginTop: 15,
                  height: 40,
                  borderRadius: 10,
                }}
                buttonStyle={{backgroundColor: '#58cc02'}}
                titleStyle={{
                  letterSpacing: 3,
                }}
                title="OK"
                onPress={toggleOverlay2}
              />
            </View>
          </Overlay>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
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
                  // colors={['#7ee2dc', '#55bbb8']} colors={['#58cc02', '#78c800']}
                },
              ]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
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
    fontSize: 18,
    color: '#58cc02',
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#f44336',
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

    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
