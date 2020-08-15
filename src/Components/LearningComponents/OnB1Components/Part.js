import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {IN4_APP} from '../../../ConnectServer/In4App';
import {LearningStyle, Style, DIMENSION} from '../../../CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {LinearTextGradient} from 'react-native-text-gradient';

const Part = ({route, navigation}) => {
  const {nameLession, id_category, id_lession, idUser} = route.params;
  const idCategory = parseInt(JSON.stringify(id_category));
  const idLession = parseInt(JSON.stringify(id_lession));
  const [reads, setReads] = React.useState([
    {
      id: '',
      link: '',
      name: '',
    },
  ]);
  const [listening, setListening] = React.useState([
    {
      id: '',
      link: '',
      name: '',
    },
  ]);
  const getData = () => {
    const apiURL = IN4_APP.getPartRead;
    const apiURL2 = IN4_APP.getPartListening;
    axios
      .all([axios.get(apiURL), axios.get(apiURL2)])
      .then(
        axios.spread((...allData) => {
          setReads(allData[0].data);
          setListening(allData[1].data);
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={[Style.coverCenter, {flex: 1}]}>
        <LinearTextGradient
          locations={[0, 1]}
          colors={['#091048', '#754ea6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={Style.text30}>{nameLession}</Text>
        </LinearTextGradient>
      </View>

      <View style={[LearningStyle.container, {alignContent: 'flex-end'}]}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            paddingLeft: '25%',
            paddingTop: 100,
          }}>
          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={{
              uri:
                'https://pic.funnygifsbox.com/uploads/2019/02/funnygifsbox.com-2019-02-13-04-28-15-43.gif',
            }}
            style={{width: '80%', height: '80%'}}
            resizeMode="contain"
          />
        </View>
        {listening.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={[
              LearningStyle.tchLessionCover,
              Style.boxShadow,
              {marginTop: 7},
            ]}
            onPress={() =>
              navigation.navigate(item.link, {
                id_category: idCategory,
                id_lession: idLession,
                id_part: item.id,
                idUser: idUser,
              })
            }>
            <LinearGradient
              style={LearningStyle.tchLession}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#687ae4', '#754ea6']}>
              <Text style={[Style.text20, Style.textColore6e6f6]}>
                {item.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
      <View style={Style.line} />
      <View style={LearningStyle.container}>
        {reads.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={[
              LearningStyle.tchLessionCover,
              Style.boxShadow,
              {marginBottom: 7},
            ]}
            onPress={() =>
              navigation.navigate(item.link, {
                id_category: idCategory,
                id_lession: idLession,
                id_part: item.id,
                idUser: idUser,
              })
            }>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={LearningStyle.tchLession}
              colors={['#687ae4', '#754ea6']}>
              <Text style={[Style.text20, Style.textColore6e6f6]}>
                {item.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default Part;
