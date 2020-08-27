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
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const BanBe = ({route}) => {
  const {id} = route.params;
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
    let id = setInterval(() => {
      showData();
    }, 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={[
          Style.coverCenter,
          {
            height: 40,
            borderRadius: 15,
            width: '45%',
            marginLeft: 15,
            flexDirection: 'row',
            backgroundColor: '#5579f1',
          },
        ]}
        onPress={() => alert('helo')}
        activeOpacity={0.5}>
        <FontAwesome5Icon
          name="search"
          size={18}
          color="#fff"
          // style={[Style.coverCenter, {borderRadius: 15}]}
          // onPress={() => onPressHandle()}
        />

        <Text style={[{letterSpacing: 2, color: '#fff', fontSize: 18}]}>
          Tìm bạn bè
        </Text>
      </TouchableOpacity>

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
                <Text style={[Style.text18, {color: '#464646'}]}>{e.Name}</Text>
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
  );
};
export default BanBe;
