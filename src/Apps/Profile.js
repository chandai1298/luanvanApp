import React, {useEffect} from 'react';
import {View, StatusBar, Text, ActivityIndicator} from 'react-native';
import {Style, ProfileStyle, DIMENSION} from '../CommonStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HeaderComponent from './HeaderComponent';
import ThanhTich from '../Components/ProfileComponent/ThanhTich';
import BanBe from '../Components/ProfileComponent/BanBe';
import Avatar from '../Components/ProfileComponent/Avatar';
import {IN4_APP} from '../ConnectServer/In4App';
import axios from 'axios';

function ThanhTichComponent() {
  return <ThanhTich />;
}
function BanBeComponent() {
  return <BanBe />;
}

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
    {id: '', id_user: '', title: '', status: '', status2: '', isActive: ''},
  ]);
  const [dataConfig2, setDataConfig2] = React.useState([
    {id: '', id_user: '', title: '', status: '', status2: '', isActive: ''},
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#754ea6" />
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
      <Avatar
        name={users.Name !== data.Name ? data.Name : users.Name}
        username={
          users.Username !== data.Username ? data.Username : users.Username
        }
        image={users.Avatar !== data.Avatar ? data.Avatar : users.Avatar}
        rankData={ranks[0]}
        id={users.Id}
      />

      <View style={ProfileStyle.containerPadding15}>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: [Style.text18, {color: '#9a9a9a'}],
          }}>
          <Tab.Screen
            name="ThanhTich"
            component={ThanhTichComponent}
            options={{
              tabBarLabel: 'Thành tích',
            }}
          />
          <Tab.Screen
            name="Banbe"
            component={BanBeComponent}
            options={{
              tabBarLabel: 'Bạn bè',
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};
export default Profile;
