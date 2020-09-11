import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {IN4_APP} from '../../../ConnectServer/In4App';
import {LearningStyle, Style, DIMENSION} from '../../../CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {Tooltip, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EvaluationB1Test = ({route, navigation}) => {
  const {nameLession, id_category, id_lession, idUser} = route.params;
  const idCategory = parseInt(JSON.stringify(id_category));
  const idLession = parseInt(JSON.stringify(id_lession));
  const [reads, setReads] = React.useState([
    {
      id: '',
      link: '',
      name: '',
      description: '',
    },
  ]);
  const [listening, setListening] = React.useState([
    {
      id: '',
      link: '',
      name: '',
      description: '',
    },
  ]);
  const getData = () => {
    const apiURL = IN4_APP.getPart;
    axios
      .all([
        axios.post(apiURL, {
          type: 'read2',
        }),
        axios.post(apiURL, {
          type: 'listening2',
        }),
      ])
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
      <View style={[Style.coverCenter, {flex: 1, flexDirection: 'row'}]}>
        <Text style={[Style.text30, {color: '#8f3311'}]}>{nameLession}</Text>
      </View>

      <View
        style={[LearningStyle.container, {alignContent: 'flex-end', flex: 4}]}>
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
            animation="pulse"
            duration={1000}
            iterationCount="infinite"
            source={{
              uri:
                'https://i.pinimg.com/564x/03/50/e1/0350e1f4c840bd36f24494670877ba3e.jpg',
            }}
            style={{width: '80%', height: '80%'}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'space-between',
            justifyContent: 'center',
          }}>
          {listening.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={[
                LearningStyle.tchLessionCover,
                Style.boxShadow,
                {marginTop: 7, elevation: 12},
              ]}
              onPress={() =>
                navigation.navigate(item.link, {
                  id_category: idCategory,
                  id_lession: idLession,
                  id_part: item.id,
                  idUser: idUser,
                  nameLession: nameLession,
                })
              }>
              <Text style={[Style.text20, {color: '#9a9a9a'}]}>
                {item.name}
              </Text>
              <Text style={Style.text16}>({item.description})</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={Style.line} />
      <View
        style={[
          LearningStyle.container,
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            justifyContent: 'center',
            flex: 3,
          },
        ]}>
        {reads.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={[
              LearningStyle.tchLessionCover,
              Style.boxShadow,
              {marginTop: 7, elevation: 12},
            ]}
            onPress={() =>
              navigation.navigate(item.link, {
                id_category: idCategory,
                id_lession: idLession,
                id_part: item.id,
                idUser: idUser,
                nameLession: nameLession,
              })
            }>
            <Text style={[Style.text20, {color: '#9a9a9a'}]}>{item.name}</Text>
            <Text style={Style.text16}>({item.description})</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          width: 70,
          height: 30,
          right: 15,
          paddingLeft: 17,
          borderRadius: 25,
          borderColor: '#58cc02',
          borderWidth: 1.5,
          justifyContent: 'center',
        }}>
        <Tooltip
          width={DIMENSION.width - 30}
          height={300}
          popover={
            <Image
              style={{width: '100%', height: '100%'}}
              resizeMode="stretch"
              source={{
                uri:
                  'https://tienganhmoingay.com/media/images/uploads/2019/08/27/cau_truc_de_thi_toeic-02.png',
              }}
            />
          }>
          <Text
            style={{
              fontSize: 16,
              color: '#58cc02',
            }}>
            Tips!
          </Text>
        </Tooltip>
      </View>
    </View>
  );
};
export default EvaluationB1Test;
