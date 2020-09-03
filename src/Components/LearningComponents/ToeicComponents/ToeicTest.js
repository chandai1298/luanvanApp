import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {IN4_APP} from '../../../ConnectServer/In4App';
import {LearningStyle, Style, DIMENSION} from '../../../CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {Tooltip, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ToeicTest = ({route, navigation}) => {
  const {nameLession, id_category, id_lession, idUser} = route.params;
  const idCategory = parseInt(JSON.stringify(id_category));
  const idLession = parseInt(JSON.stringify(id_lession));
  const [loading, setLoading] = React.useState(true);

  const [toeic, setToeic] = React.useState([
    {
      id: '',
      link: '',
      name: '',
      image: '1',
    },
  ]);
  const getData = () => {
    const apiURL = IN4_APP.getPart;
    axios
      .post(apiURL, {
        type: 'toeic',
      })
      .then(function (response) {
        setToeic(response.data);
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
      <View>
        <Text style={[Style.text30, {color: '#8f3311'}]}>{nameLession}</Text>
      </View>
      <View
        style={[
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 15,
          },
        ]}>
        {toeic.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={[
              Style.boxShadow,
              {
                width: '40%',
                height: 150,
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                margin: 15,
                backgroundColor: '#fff',
                elevation: 20,
              },
            ]}
            onPress={() =>
              navigation.navigate(item.link, {
                id_category: idCategory,
                id_lession: idLession,
                id_part: item.id,
                idUser: idUser,
              })
            }>
            <Image
              style={{alignSelf: 'center', width: 90, height: 90}}
              source={{
                uri: item.image,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 18,
                color: '#afafaf',
                fontWeight: 'bold',
                // marginTop: 5,
              }}>
              {item.name}
            </Text>
            <Text style={[Style.text16, {alignSelf: 'center'}]}>
              ({item.description})
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default ToeicTest;
