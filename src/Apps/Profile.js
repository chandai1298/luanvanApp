import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {Style, ProfileStyle, DIMENSION} from '../CommonStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HeaderComponent from './HeaderComponent';
import ThanhTich from '../Components/ProfileComponent/ThanhTich';
import BanBe from '../Components/ProfileComponent/BanBe';
import AvatarProfile from '../Components/ProfileComponent/Avatar';
import {IN4_APP} from '../ConnectServer/In4App';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryLegend,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
  VictoryArea,
  VictoryStack,
  VictoryTooltip,
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
    }, 1500);
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
      <AvatarProfile
        name={users.Name !== data.Name ? data.Name : users.Name}
        username={
          users.Username !== data.Username ? data.Username : users.Username
        }
        image={users.Avatar !== data.Avatar ? data.Avatar : users.Avatar}
        rankData={ranks[0]}
        id={users.Id}
      />

      <View style={ProfileStyle.containerPadding15}>
        <VictoryChart>
          {/* {console.log(new Date().getDay())} */}
          <VictoryGroup offset={10}>
            <VictoryBar
              data={dataChart.actual}
              style={{
                data: {fill: 'blue'},
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
            x={DIMENSION.width / 2 - 100}
            orientation="horizontal"
            gutter={20}
            data={[
              {
                name: 'Actual',
                symbol: {
                  fill: 'blue',
                },
              },
              {
                name: 'Planned',
                symbol: {
                  fill: 'orange',
                },
              },
            ]}
          />
        </VictoryChart>

        {/* <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#464646',
            labelStyle: [Style.text18],
            showIcon: true,
          }}>
          <Tab.Screen
            name="ThanhTich"
            component={ThanhTich}
            options={{
              tabBarLabel: 'Thành tích',
            }}
          />
          <Tab.Screen
            name="Banbe"
            component={BanBe}
            options={{
              tabBarLabel: 'Bạn bè',
            }}
            initialParams={{id: users.Id}}
          />
        </Tab.Navigator> */}
      </View>
    </View>
  );
};
export default Profile;
