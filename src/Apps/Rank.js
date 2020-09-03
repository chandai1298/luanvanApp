import React, {useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import HeaderComponent from './HeaderComponent';
import {Style, ProfileStyle} from '../CommonStyles';
import {IN4_APP} from '../ConnectServer/In4App';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {ButtonGroup} from 'react-native-elements';

const Rank = ({title, icon, navigation, desComponent, route}) => {
  const {users} = route.params;
  const [ranks, setRank] = React.useState([]);
  const showData = () => {
    const getTopRank = IN4_APP.getTopRank;
    axios
      .get(getTopRank)
      .then(function (response) {
        setRank(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const t1 = ranks.shift();
  const t2 = ranks.shift();
  const t3 = ranks.shift();
  const top1 = t1 !== undefined ? t1 : '';
  const top2 = t2 !== undefined ? t2 : '';
  const top3 = t3 !== undefined ? t3 : '';
  const [index, UpdateIndex] = React.useState(1);
  const buttons = ['Bạn bè', 'Sever'];

  const TopView = ({top, topNum, borderColor}) => {
    return (
      <View
        style={[
          {
            width: '33%',
            alignItems: 'center',
            marginTop: 60,
          },
          topNum === 1 && Style.marginTop20,
        ]}>
        <View
          style={{
            alignItems: 'center',
            paddingLeft: 10,
            marginBottom: 10,
            height: 40,
            justifyContent: 'center',
          }}>
          <Text style={[Style.text18, {color: '#4b4b4b'}]}>{top.Name}</Text>
        </View>
        <View
          style={{
            width: '100%',
            // backgroundColor: 'red',
            height: 110,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{
                uri: top.Avatar,
              }}
              style={[Style.imageRank, {borderColor: borderColor}]}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#f9b648',
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              marginTop: -110,
              marginLeft: 10,
            }}>
            <Text style={[Style.text18, {color: '#fff'}]}>{topNum}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            // marginTop: 30,
          }}>
          <Text style={[Style.text18, {color: '#f9b648'}]}>
            {top.total_score} KN
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    showData();
    let id = setInterval(() => {
      showData();
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar hidden={true} />

      <HeaderComponent
        title={title}
        icon={icon}
        navigation={navigation}
        desComponent={desComponent}
      />

      {/* <View style={{marginTop: 20}}>
        <ButtonGroup
          onPress={(index) => UpdateIndex(index)}
          selectedIndex={index}
          buttons={buttons}
          containerStyle={{height: 50, borderRadius: 10, margin: 5}}
          textStyle={{fontWeight: 'bold', color: '#342985'}}
          selectedButtonStyle={{
            backgroundColor: '#1c1164',
          }}
        />
      </View> */}
      <View
        style={[
          {
            flexDirection: 'row',
            height: 250,
            justifyContent: 'space-between',
          },
        ]}>
        <TopView top={top2} topNum={2} borderColor="#1dd0f4" />
        <TopView top={top1} topNum={1} borderColor="#ff4e8e" />
        <TopView top={top3} topNum={3} borderColor="#814eff" />
      </View>

      <ScrollView style={{}}>
        {ranks.map((e, key) => (
          <View style={ProfileStyle.sectionThanhTich} key={key}>
            <View
              style={[
                ProfileStyle.flexRowIcon,
                Style.rowCenter,
                {paddingLeft: 15},
              ]}>
              <View
                style={{
                  marginRight: 15,
                }}>
                <Text style={[Style.text18, {color: '#464646'}]}>
                  {key + 4}
                </Text>
              </View>
              <Image
                source={{uri: e.Avatar}}
                style={[ProfileStyle.sectionLeftImgRank, {borderRadius: 70}]}
              />
              <View style={{marginLeft: 15}}>
                <Text style={[Style.text18, {color: '#4b4b4b'}]}>{e.Name}</Text>
              </View>
            </View>
            <View
              style={[
                ProfileStyle.SectionAvtRight,
                {justifyContent: 'center', paddingRight: 15},
              ]}>
              <Text style={[{color: '#ffc107'}, Style.text18]}>
                {e.total_score} KN
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Rank;
