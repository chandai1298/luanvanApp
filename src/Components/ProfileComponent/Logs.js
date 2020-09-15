import React, {useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Style, ProfileStyle, DIMENSION} from '../../CommonStyles';
import * as Progress from 'react-native-progress';
import {IN4_APP} from '../../ConnectServer/In4App';
import axios from 'axios';

const Logs = ({route, navigation}) => {
  const {datas} = route.params;
  const [data, setData] = React.useState([]);

  const showData = () => {
    console.log(datas.Id);
    const showLogs = IN4_APP.showLogs;
    axios
      .post(showLogs, {
        id_user: datas.Id,
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
        {data.map((item, key) => (
          <View style={ProfileStyle.sectionThanhTich} key={key}>
            <Text style={{fontSize: 18, color: '#848484'}}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Logs;
