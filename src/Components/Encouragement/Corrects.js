import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Style, SettingStyle, DIMENSION} from '../../CommonStyles';
import * as Animatable from 'react-native-animatable';
import {LinearTextGradient} from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';

const Corrects = ({route, navigation}) => {
  const {
    totalLength,
    count,
    crown,
    score,
    sequence,
    currentPosition,
  } = route.params;
  return (
    <View style={[Style.coverCenter, {flex: 5}]}>
      <View
        style={{
          flex: 3,
          justifyContent: 'flex-end',
          marginBottom: -100,
        }}>
        <View
          style={{
            paddingLeft: 18,
            // borderColor: '#8f3311',
            // borderWidth: 1,
            borderRadius: 20,
            alignContent: 'center',
            justifyContent: 'center',
            width: 180,
            height: 40,
          }}>
          <Text style={{fontSize: 20, color: '#8f3311', letterSpacing: 1}}>
            {sequence === 2
              ? 'Ấn tượng đấy...'
              : sequence == 4
              ? 'Xuất sắc luôn...'
              : ''}
          </Text>
        </View>
      </View>

      <Animatable.Image
        animation="bounceIn"
        duraton="1500"
        source={{
          uri:
            sequence === 2
              ? 'https://66.media.tumblr.com/acaff1396603cebbe5da197ed83c4401/tumblr_inline_om6enz4EGx1ugyfqu_500.gif'
              : 'https://i.pinimg.com/originals/fd/2c/84/fd2c8479ddb92b11dec9b245874e4c64.gif',
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
              currentPosition: currentPosition,
            })
          }>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#58cc02', '#58cc02']}
            style={[
              SettingStyle.btnSettings,
              Style.boxShadow,
              {elevation: 15},
            ]}>
            <Text
              style={[Style.text20, Style.textColore6e6f6, {letterSpacing: 2}]}>
              Tiếp tục
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Corrects;
