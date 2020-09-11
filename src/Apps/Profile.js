import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Style, ProfileStyle, DIMENSION} from '../CommonStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HeaderComponent from './HeaderComponent';
import Achievements from '../Components/ProfileComponent/Achievements';
import Friend from '../Components/ProfileComponent/Friend';
import AvatarProfile from '../Components/ProfileComponent/Avatar';
import {IN4_APP} from '../ConnectServer/In4App';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryLegend,
  // VictoryAxis,
  // VictoryLine,
  // VictoryScatter,
  // VictoryArea,
  // VictoryStack,
  // VictoryTooltip,
} from 'victory-native';
const dataChart = {
  planned: [
    {x: 'T2', y: 100},
    {x: 'T3', y: 100},
    {x: 'T4', y: 100},
    {x: 'T5', y: 100},
    {x: 'T6', y: 100},
    {x: 'T7', y: 100},
    {x: 'CN', y: 100},
  ],
  actual: [
    {x: 'T2', y: 500},
    {x: 'T3', y: 300},
    {x: 'T4', y: 30},
    {x: 'T5', y: 200},
    {x: 'T6', y: 180},
    {x: 'T7', y: 80},
    {x: 'CN', y: 0},
  ],
};
const Tab = createMaterialTopTabNavigator();
const Profile = ({title, navigation, icon, desComponent, route}) => {
  const {users} = route.params;
  const [loading, setLoading] = React.useState(true);
  const [ranks, setRank] = React.useState([
    {
      id: '',
      id_user: '',
      total_score: '',
      current_score: '',
      crown: '',
      streak: '',
      bestStreak: '',
      hint: '',
    },
  ]);
  const [datas, setData] = React.useState([
    {
      Id: '',
      Username: '',
      Name: '',
      Email: '',
      Avatar: '1',
      RoleId: '',
      IsActive: '',
    },
  ]);
  const [dataConfig, setDataConfig] = React.useState([
    {id: '', id_user: '', title: '', status: '', isActive: ''},
  ]);
  const [dataConfig2, setDataConfig2] = React.useState([
    {id: '', id_user: '', title: '', status: '', isActive: ''},
  ]);
  const showData = () => {
    const rankOfUser = IN4_APP.RankOfUser;
    const getUser = IN4_APP.getUser;
    const getConfig = IN4_APP.getConfig;
    axios
      .all([
        axios.post(rankOfUser, {
          id: users.Id,
        }),
        axios.post(getUser, {
          Id: users.Id,
        }),
        axios.post(getConfig, {
          id_user: users.Id,
          type: 1,
        }),
        axios.post(getConfig, {
          id_user: users.Id,
          type: 2,
        }),
      ])
      .then(
        axios.spread((...allData) => {
          setRank(allData[0].data);
          setData(allData[1].data);
          setDataConfig(allData[2].data);
          setDataConfig2(allData[3].data);
          setLoading(false);
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    showData();
    let id = setInterval(() => {
      showData();
    }, 5000);
    return () => clearInterval(id);
  }, []);
  const data = datas[0];

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfefc',
      }}>
      <Animatable.Image
        duration={1000}
        source={{
          uri:
            'https://i.pinimg.com/originals/45/bd/54/45bd545f9c6cb36a0875a6ea39fb4f61.gif',
        }}
        style={{width: '50%', height: '50%'}}
        resizeMode="contain"
      />
    </View>
  ) : (
    <View style={Style.container}>
      <StatusBar hidden={true} />

      <HeaderComponent
        title={title}
        icon={icon}
        navigation={navigation}
        desComponent={desComponent}
        data={data}
        cf1={dataConfig}
        cf2={dataConfig2}
      />
      <ScrollView>
        <AvatarProfile
          name={users.Name !== data.Name ? data.Name : users.Name}
          username={
            users.Username !== data.Username ? data.Username : users.Username
          }
          image={users.Avatar !== data.Avatar ? data.Avatar : users.Avatar}
          rankData={ranks[0]}
          id={users.Id}
        />
        <View
          style={{
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={[
                Style.text20,
                {
                  letterSpacing: 1,
                  color: '#4b4b4b',
                  textTransform: 'uppercase',
                },
              ]}>
              Thống kê
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={[
                {
                  height: 40,
                  width: '100%',
                  borderRadius: 15,
                  flexDirection: 'row',
                  backgroundColor: '#58cc02',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
              onPress={() => navigation.navigate('logs', {datas: data})}
              activeOpacity={0.5}>
              <Text style={[{letterSpacing: 2, color: '#fff', fontSize: 18}]}>
                Lịch sử
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={ProfileStyle.containerPadding15}>
          <VictoryChart>
            <VictoryGroup offset={10}>
              <VictoryBar
                data={dataChart.actual}
                style={{
                  data: {fill: '#1899d6'},
                }}
              />
              <VictoryBar
                data={dataChart.planned}
                style={{
                  data: {fill: 'orange'},
                }}
              />
            </VictoryGroup>
            <VictoryLegend
              x={10}
              orientation="horizontal"
              gutter={20}
              data={[
                {
                  name: 'Điểm hiện tại',
                  symbol: {
                    fill: '#1899d6',
                  },
                },
                {
                  name: 'Điểm tối thiểu',
                  symbol: {
                    fill: 'orange',
                  },
                },
              ]}
            />
          </VictoryChart>
        </View>
        <View>
          <View style={{padding: 15}}>
            <Text
              style={[
                Style.text20,
                {
                  letterSpacing: 1,
                  color: '#4b4b4b',
                  textTransform: 'uppercase',
                },
              ]}>
              Thành tích
            </Text>
          </View>
          <Achievements id={users.Id} navigation={navigation} />
        </View>

        <View>
          <View
            style={{
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={[
                  Style.text20,
                  {
                    letterSpacing: 1,
                    color: '#4b4b4b',
                    textTransform: 'uppercase',
                  },
                ]}>
                Bạn bè
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={[
                  {
                    height: 40,
                    width: '100%',
                    borderRadius: 15,
                    flexDirection: 'row',
                    backgroundColor: '#58cc02',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                onPress={() =>
                  navigation.navigate('findFriend', {id: users.Id})
                }
                activeOpacity={0.5}>
                <FontAwesome5Icon name="search" size={18} color="#fff" />
                <Text style={[{letterSpacing: 2, color: '#fff', fontSize: 18}]}>
                  Tìm bạn bè
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Friend id={users.Id} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};
export default Profile;
