import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Style, SettingStyle, DIMENSION} from '../../CommonStyles';
import * as Animatable from 'react-native-animatable';
import {LinearTextGradient} from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';

const FinishPart = ({route, navigation}) => {
  const {crown, score} = route.params;
  return (
    <View style={[Style.coverCenter, {flex: 5, backgroundColor: '#fcfefc'}]}>
      <Animatable.Image
        animation="bounceIn"
        duraton="1500"
        source={{
          uri:
            'https://i.pinimg.com/originals/f2/d1/68/f2d168efa75cb2b07472b005e560e337.gif',
        }}
        style={{
          width: '50%',
          height: '50%',
          marginBottom: -50,
        }}
        resizeMode="contain"
      />
      {crown > 3 ? (
        <View style={{flex: 3}}>
          <View style={{alignSelf: 'center'}}>
            <Text style={[Style.text30, {color: '#8f3311'}]}>
              Bạn giỏi quá!
            </Text>
          </View>

          <LinearTextGradient
            style={{alignSelf: 'center'}}
            locations={[0, 1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={{fontSize: 22}}>Bạn nhận được! </Text>
            <Text style={{fontSize: 22, color: '#ffc107', fontWeight: 'bold'}}>
              +{score} KN
            </Text>
          </LinearTextGradient>
          <LinearTextGradient
            locations={[0, 1]}
            style={{alignSelf: 'center'}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={{fontSize: 22}}>Vương miện! </Text>
            <Text style={{fontSize: 22, color: '#ff9800', fontWeight: 'bold'}}>
              +{crown}
            </Text>
          </LinearTextGradient>
        </View>
      ) : crown > 0 && crown <= 3 ? (
        <View style={{flex: 3}}>
          <LinearTextGradient
            style={{alignSelf: 'center'}}
            locations={[0, 1]}
            colors={['#091048', '#754ea6']}
            start={{x: 1, y: 1}}
            end={{x: 1, y: 0}}>
            <Text style={[Style.text30]}>Rất tốt!</Text>
          </LinearTextGradient>
          <LinearTextGradient
            style={{alignSelf: 'center'}}
            locations={[0, 1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={{fontSize: 22}}>Bạn nhận được! </Text>
            <Text style={{fontSize: 22, color: '#ffc107', fontWeight: 'bold'}}>
              +{score} KN
            </Text>
          </LinearTextGradient>
          <LinearTextGradient
            locations={[0, 1]}
            style={{alignSelf: 'center'}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={{fontSize: 22}}>Vương miện! </Text>
            <Text style={{fontSize: 22, color: '#ff9800', fontWeight: 'bold'}}>
              +{crown}
            </Text>
          </LinearTextGradient>
        </View>
      ) : (
        <View style={{flex: 3}}>
          <LinearTextGradient
            style={{alignSelf: 'center'}}
            locations={[0, 1]}
            colors={['#091048', '#754ea6']}
            start={{x: 1, y: 1}}
            end={{x: 1, y: 0}}>
            <Text style={[Style.text30]}>Hoàn thành!</Text>
          </LinearTextGradient>
          <LinearTextGradient
            style={{alignSelf: 'center'}}
            locations={[0, 1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={{fontSize: 22}}>Bạn nhận được! </Text>
            <Text style={{fontSize: 22, color: '#ffc107', fontWeight: 'bold'}}>
              +{score} KN
            </Text>
          </LinearTextGradient>
        </View>
      )}
      <View style={{padding: 15, width: '100%'}}>
        <TouchableOpacity
          style={[SettingStyle.btnSettings, Style.boxShadow]}
          onPress={() => navigation.navigate('part')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#c1c8fe', '#5579f1']}
            style={[SettingStyle.btnSettings, Style.boxShadow]}>
            <Text style={[Style.text20, Style.textColore6e6f6]}>Tiếp tục</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FinishPart;
