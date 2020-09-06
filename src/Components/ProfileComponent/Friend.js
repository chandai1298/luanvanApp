import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  Style,
  ProfileStyle,
  DIMENSION,
  QuestionStyle,
} from '../../CommonStyles';
import * as Progress from 'react-native-progress';
import {LinearTextGradient} from 'react-native-text-gradient';
import {IN4_APP} from '../../ConnectServer/In4App';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Friend = ({id, navigation}) => {
  const [data, setData] = React.useState([]);
  const showData = () => {
    const getScoreFriend = IN4_APP.getScoreFriend;
    axios
      .post(getScoreFriend, {
        Id: id,
      })
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  useEffect(() => {
    showData();
  }, []);
  return (
    <View
      style={{
        borderRadius: 15,
        height: 400,
        borderColor: '#e5e5e5',
        borderWidth: 1.5,
        margin: 10,
      }}>
      {data.length > 0 ? (
        <View style={{height: 340}}>
          <ScrollView>
            {data.map((e, key) => (
              <View style={ProfileStyle.sectionThanhTich} key={key}>
                <View
                  style={[
                    ProfileStyle.flexRowIcon,
                    Style.rowCenter,
                    {paddingLeft: 15},
                  ]}>
                  <Image
                    source={{uri: e.Avatar}}
                    style={[ProfileStyle.sectionLeftImg, {borderRadius: 70}]}
                  />
                  <View style={{marginLeft: 15}}>
                    <Text style={[Style.text18, {color: '#464646'}]}>
                      {e.Name}
                    </Text>
                    <Text style={{fontSize: 18, color: '#b1b1b1'}}>
                      {e.Username}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    ProfileStyle.SectionAvtRight,
                    {justifyContent: 'center', paddingRight: 15},
                  ]}>
                  <Text style={{fontSize: 18, color: '#ffc107'}}>
                    {e.total_score} KN
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={[Style.coverCenter, {flex: 2}]}>
            <Image
              resizeMode="contain"
              style={{width: '100%', height: '90%'}}
              source={{
                uri:
                  'https://www.kindpng.com/picc/m/121-1217416_animation-cartoon-drawing-clip-art-people-cartoon-png.png',
              }}
            />
          </View>
          <View style={[{flex: 1, alignItems: 'center'}]}>
            <LinearTextGradient
              locations={[0, 1]}
              colors={['#58cc02', '#58cc02']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text
                style={[
                  {letterSpacing: 0.5, fontSize: 18, fontWeight: 'bold'},
                ]}>
                Kết nối bạn bè giúp học vui và hiệu quả hơn.
              </Text>
            </LinearTextGradient>
          </View>
        </View>
      )}
      <View
        style={{
          flex: 1,
          paddingLeft: 15,
          paddingRight: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('anotherFriend', {datas: data})}>
          <Text style={[Style.text20, {color: '#afafaf'}]}>
            {`${data.length - 3} `}Bạn bè khác
          </Text>
        </TouchableOpacity>
        <View style={{alignContents: 'flex-end'}}>
          <FontAwesome5Icon
            onPress={() => navigation.navigate('anotherFriend', {datas: data})}
            name="arrow-right"
            size={25}
            color="#58cc02"
          />
        </View>
      </View>
    </View>
  );
};
export default Friend;
