import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {IN4_APP} from '../../ConnectServer/In4App';
import {LearningStyle, Style, DIMENSION} from '../../CommonStyles';
import LessionComponent from './LessionComponent';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const Toeic = ({route, navigation}) => {
  const {id_category, idUser, rank} = route.params;
  const idCategory = parseInt(JSON.stringify(id_category));
  const [loading, setLoading] = React.useState(true);
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
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);
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
export default Toeic;
