import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Style, SettingStyle, DIMENSION} from '../../CommonStyles';
import * as Animatable from 'react-native-animatable';
import {LinearTextGradient} from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';

const Corrects = ({route, navigation}) => {
  const {totalLength, count, crown, score, sequence} = route.params;
  const loikhen = () => {
    var promise = null;
    switch (sequence) {
      case 2:
        promise = (
          <View
            style={{
              flex: 3,
              justifyContent: 'flex-end',
              marginBottom: -100,
            }}>
            <Image
              resizeMode="stretch"
              source={{
                uri: 'http://clipartmag.com/images/cartoon-word-bubbles-24.png',
              }}
              style={{width: 180, height: 100, marginBottom: -80}}
            />
            <View
              style={{
                alignSelf: 'center',
                marginTop: 0,
                paddingBottom: 50,
              }}>
              <Text style={{fontSize: 20, color: '#000'}}>Ấn tượng đấy...</Text>
            </View>
          </View>
        );
        break;

      case 4:
        promise = (
          <View
            style={{
              flex: 3,
              justifyContent: 'flex-end',
              marginBottom: -100,
            }}>
            <Image
              resizeMode="stretch"
              source={{
                uri: 'http://clipartmag.com/images/cartoon-word-bubbles-24.png',
              }}
              style={{width: 180, height: 100, marginBottom: -80}}
            />
            <View
              style={{
                alignSelf: 'center',
                marginTop: 0,
                paddingBottom: 50,
              }}>
              <Text style={{fontSize: 20, color: '#000'}}>
                Xuất sắc luôn...
              </Text>
            </View>
          </View>
        );
        break;

      default:
        break;
    }
    return promise;
  };
  return (
    <View style={[Style.coverCenter, {flex: 5}]}>
      {loikhen()}

      <Animatable.Image
        animation="bounceIn"
        duraton="1500"
        source={{
          uri:
            sequence === 2
              ? 'https://pic.funnygifsbox.com/uploads/2019/02/funnygifsbox.com-2019-02-13-04-26-56-75.gif'
              : 'https://pic.funnygifsbox.com/uploads/2019/02/funnygifsbox.com-2019-02-13-04-28-18-95.gif',
        }}
        style={{
          width: '50%',
          height: '50%',
        }}
        resizeMode="contain"
      />

      <View style={{padding: 15, width: '100%'}}>
        <TouchableOpacity
          style={[SettingStyle.btnSettings, Style.boxShadow]}
          onPress={() =>
            navigation.navigate('partDetail', {
              totalLength: totalLength,
              count: count,
              score: score,
              crown: crown,
            })
          }>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#687ae4', '#754ea6']}
            style={[SettingStyle.btnSettings, Style.boxShadow]}>
            <Text style={[Style.text20, Style.textColore6e6f6]}>Tiếp tục</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Corrects;
