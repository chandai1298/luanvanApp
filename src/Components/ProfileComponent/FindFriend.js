import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Style, ProfileStyle, DIMENSION} from '../../CommonStyles';
import * as Progress from 'react-native-progress';
import {SearchBar} from 'react-native-elements';
import {IN4_APP} from '../../ConnectServer/In4App';
import axios from 'axios';
import {LinearTextGradient} from 'react-native-text-gradient';

const FindFriend = ({route, navigation}) => {
  const {id} = route.params;
  const [data, setData] = React.useState([]);
  const [input, onChangeInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const find = (input) => {
    const searchFriend = IN4_APP.searchFriend;
    axios
      .post(searchFriend, {
        name: `%${input}%`,
        id: id,
      })
      .then(function (response) {
        setData(response.data);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const addFriends = (id_friend) => {
    const addFriend = IN4_APP.addFriend;
    axios
      .post(addFriend, {
        id_user: id,
        id_friend: id_friend,
      })
      .then(function (response) {
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return (
    <View style={{flex: 1}}>
      <SearchBar
        containerStyle={[
          Style.boxShadow,
          {
            borderRadius: 50,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            margin: 15,
            marginTop: 20,
            elevation: 20,
            backgroundColor: '#fff',
          },
        ]}
        searchIcon={{size: 25}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#fff'}}
        round={true}
        underlineColorAndroid="transparent"
        placeholder="Email, tên, hoặc tên đăng nhập"
        value={input}
        onChangeText={(text) => onChangeInput(text)}
        onEndEditing={() => {
          find(input.trim().toLowerCase());
          onChangeInput('');
        }}
      />
      {data.length > 0 ? (
        <View
          style={[
            {
              borderRadius: 15,
              borderColor: '#e5e5e5',
              borderWidth: 1.5,
              margin: 10,
            },
          ]}>
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
                  <TouchableOpacity
                    style={[
                      {
                        height: 40,
                        width: 100,
                        borderRadius: 15,
                        flexDirection: 'row',
                        backgroundColor: '#58cc02',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}
                    onPress={() => addFriends(e.Id)}
                    activeOpacity={0.5}>
                    <Text
                      style={[
                        {
                          letterSpacing: 0.5,
                          color: '#fff',
                          fontSize: 16,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        },
                      ]}>
                      kết bạn
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : loading ? (
        <View style={Style.coverCenter}>
          <Text style={[Style.text20, {marginTop: 100}]}>
            Không tìm thấy người dùng!!
          </Text>
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
    </View>
  );
};
export default FindFriend;
