import React, {useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Style, ProfileStyle, DIMENSION} from '../../CommonStyles';
import * as Progress from 'react-native-progress';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {IN4_APP} from '../../ConnectServer/In4App';
import axios from 'axios';

const Achievements = ({id, navigation}) => {
  const [data, setData] = React.useState([]);
  const showData = () => {
    const getThanhTich = IN4_APP.getThanhTich;
    axios
      .post(getThanhTich, {
        id: id,
      })
      .then(function (response) {
        setData(response.data[0]);
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
      style={[
        {
          borderRadius: 15,
          height: 400,
          // width: '100%',
          borderColor: '#e5e5e5',
          borderWidth: 1.5,
          margin: 10,
        },
      ]}>
      <View style={{height: 340}}>
        <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
          {data.map((item, key) => (
            <View style={ProfileStyle.sectionThanhTich} key={key}>
              <View style={ProfileStyle.sectionLeft}>
                <Image
                  source={{uri: '1'}}
                  style={ProfileStyle.sectionLeftImg}
                />
              </View>

              <View
                style={[
                  ProfileStyle.sectionLeft,
                  {marginLeft: 15, height: 70},
                ]}>
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
                <View
                  style={{
                    height: 30,
                    // marginTop: 10,
                    width: 250,
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Progress.Bar
                    progress={
                      parseInt(item.current_num) / parseInt(item.max_num)
                    }
                    color="#58cc02"
                    height={10}
                    style={{borderRadius: 30}}
                  />
                  <Text style={{fontSize: 16, color: '#4a4a4a'}}>
                    {item.current_num}/{item.max_num}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
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
          onPress={() =>
            navigation.navigate('anotherAchievement', {datas: DATA})
          }>
          <Text style={[Style.text20, {color: '#afafaf'}]}>
            {`${data.length - 3} `}Thành tích khác
          </Text>
        </TouchableOpacity>
        <View style={{alignContents: 'flex-end'}}>
          <FontAwesome5Icon
            onPress={() =>
              navigation.navigate('anotherAchievement', {datas: data})
            }
            name="arrow-right"
            size={25}
            color="#58cc02"
          />
        </View>
      </View>
    </View>
  );
};
export default Achievements;
