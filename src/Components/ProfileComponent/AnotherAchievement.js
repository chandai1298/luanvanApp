import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Style, ProfileStyle, DIMENSION} from '../../CommonStyles';
import * as Progress from 'react-native-progress';

const AnotherAchievements = ({route, navigation}) => {
  const {datas} = route.params;

  return (
    <View
      style={[
        {
          borderRadius: 15,
          borderColor: '#e5e5e5',
          borderWidth: 1.5,
          margin: 10,
        },
      ]}>
      <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
        {datas.map((item, key) => (
          <View style={ProfileStyle.sectionThanhTich} key={key}>
            <View style={ProfileStyle.sectionLeft}>
              <Image
                source={{uri: item.thumbnailUrl}}
                style={ProfileStyle.sectionLeftImg}
              />
            </View>

            <View
              style={[ProfileStyle.sectionLeft, {marginLeft: 15, height: 70}]}>
              <View
                style={{height: 30, justifyContent: 'center', paddingTop: 5}}>
                <Text style={[Style.text20, {color: '#464646'}]}>
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  height: 30,
                  justifyContent: 'center',
                  paddingTop: 10,
                }}>
                <Text style={{fontSize: 18, color: '#848484'}}>
                  {item.description}
                </Text>
              </View>
              <View style={{height: 30, justifyContent: 'flex-end'}}>
                <Progress.Bar
                  progress={parseInt(item.current_num) / parseInt(item.max_num)}
                  color="#58cc02"
                  height={10}
                  style={{borderRadius: 30}}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default AnotherAchievements;
