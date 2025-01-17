import React, {useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import HeaderComponent from './HeaderComponent';
import SettingComponent from '../Components/SettingComponents/SettingComponent';
import In4Component from '../Components/SettingComponents/In4Component';
import {AuthContext} from '../LoginScreen/context';
import {SettingStyle, Style} from '../CommonStyles';
import LinearGradient from 'react-native-linear-gradient';

const Setting = ({navigation, route}) => {
  const {in4User, dataConfig1, dataConfig2} = route.params;
  const dataUser = in4User;

  const {signOut} = React.useContext(AuthContext);

  useEffect(() => {
    // setData(dataUser);
  }, []);

  return (
    <View>
      <HeaderComponent
        title="Cài đặt"
        icon="check"
        navigation={navigation}
        desComponent="Home"
      /> 
      <ScrollView horizontal={false}>
        <In4Component
          userData={dataUser}
          navigation={navigation}
          desNav="changePassword"
        />
        <View style={{padding: 15}}>
          <TouchableOpacity
            style={[SettingStyle.btnSettings, Style.boxShadow]}
            onPress={() => signOut()}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#58cc02', '#78c800']}
              style={[SettingStyle.btnSettings, Style.boxShadow]}>
              <Text
                style={[
                  Style.text20,
                  Style.textColore6e6f6,
                  {letterSpacing: 2},
                ]}>
                Đăng xuất
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <SettingComponent
          style={[SettingStyle.sectionIn4]}
          dataConfig={dataConfig1}
          id={dataUser.Id}
          title="Tổng quan"
        />
        <SettingComponent
          style={[SettingStyle.sectionIn4, {paddingBottom: 100}]}
          dataConfig={dataConfig2}
          id={dataUser.Id}
          title="Thông báo"
        />
      </ScrollView>
    </View>
  );
};
export default Setting;
