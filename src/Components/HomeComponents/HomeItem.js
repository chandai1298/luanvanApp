import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Style, HomeStyle, DIMENSION} from '../../CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const HomeItem = ({
  navigation,
  title,
  desComponent,
  id_category,
  color1,
  id_User,
  rank,
  color2,
  image,
}) => {
  return (
    <Animatable.View
      animation="pulse"
      iterationCount="infinite"
      direction="alternate"
      style={[Style.coverCenter, HomeStyle.headerFlexIcon, {marginBottom: 20}]}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          width: '60%',
          height: 65,
          marginRight: -90,
        }}
        onPress={() =>
          navigation.navigate(desComponent, {
            id_category: id_category,
            idUser: id_User,
            rank: rank,
          })
        }>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[`${color1}`, `${color2}`]}
          style={[HomeStyle.category, Style.boxShadow]}>
          <Text style={[Style.text20, Style.textColore6e6f6]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Animatable.View
        animation="zoomInDown"
        style={{
          width: '40%',
          height: 100,
          marginRight: -50,
        }}>
        <Animatable.Image
          animation="slideInRight"
          style={{width: '100%', height: '100%'}}
          resizeMode={'contain'}
          source={{
            uri: image,
          }}
        />
      </Animatable.View>
    </Animatable.View>
  );
};
export default HomeItem;
