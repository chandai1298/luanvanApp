import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {IN4_APP} from '../../ConnectServer/In4App';
import {LearningStyle, Style, DIMENSION} from '../../CommonStyles';
import LessionComponent from './LessionComponent';
import axios from 'axios';

const OnB1 = ({route, navigation}) => {
  const {id_category, idUser, rank} = route.params;
  const idCategory = parseInt(JSON.stringify(id_category));
  const [data, setData] = React.useState([
    {
      id: '',
      id_category: '',
      link: '',
      name: '',
      image: '1',
      imageCheck: '1',
    },
  ]);
  const getData = () => {
    const apiURL = IN4_APP.getLession;

    axios
      .post(apiURL, {
        id: idCategory,
      })
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={Style.coverCenter}>
      <LessionComponent
        data={data}
        idUser={idUser}
        rank={rank}
        navigation={navigation}
      />
    </View>
  );
};
export default OnB1;
