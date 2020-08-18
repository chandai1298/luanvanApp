import React, {useEffect} from 'react';
import {Text, View, StatusBar, TouchableOpacity} from 'react-native';
import {Style, DIMENSION} from '../CommonStyles';
import HeaderHome from '../Components/HomeComponents/HeaderHome';
import HomeItem from '../Components/HomeComponents/HomeItem';
import {IN4_APP} from '../ConnectServer/In4App';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

// colors={['#7ee2dc', '#55bbb8']}
const datas = [
  {
    id: 1,
    name: 'Từ điển',
    color2: '#7ee2dc',
    color1: '#55bbb8',
    image:
      'https://firebasestorage.googleapis.com/v0/b/fir-rn-785e2.appspot.com/o/category%2Fdic.png?alt=media&token=1f2776d1-a3ce-4209-a287-dace24c3313e',
    link: 'dictionary',
    isActive: 1,
  },
  {
    id: 2,
    name: 'Dịch văn bản',
    color2: '#7ee2dc',
    color1: '#55bbb8',
    image:
      'https://firebasestorage.googleapis.com/v0/b/fir-rn-785e2.appspot.com/o/category%2Ftranslate.png?alt=media&token=a554dd43-7333-4434-89e7-6613b66e56da',
    link: 'translator',
    isActive: 1,
  },
  {
    id: 3,
    name: 'Ôn luyện TOEIC',
    color2: '#7ee2dc',
    color1: '#55bbb8',
    image:
      'https://firebasestorage.googleapis.com/v0/b/fir-rn-785e2.appspot.com/o/category%2Ftoeic.png?alt=media&token=4a7dd9a4-3a78-42a5-afb6-2d59dd9e02dd',
    link: 'onTOEIC',
    isActive: 1,
  },
  {
    id: 4,
    name: 'Ôn thi B1',
    color2: '#7ee2dc',
    color1: '#55bbb8',
    image:
      'https://firebasestorage.googleapis.com/v0/b/fir-rn-785e2.appspot.com/o/category%2Fb1.png?alt=media&token=0c2e4736-ef6a-4b78-8cd6-4f6fe88651dd',
    link: 'onB1',
    isActive: 1,
  },
  {
    id: 5,
    name: 'Kiểm tra đánh giá',
    color2: '#7ee2dc',
    color1: '#55bbb8',
    image:
      'https://firebasestorage.googleapis.com/v0/b/fir-rn-785e2.appspot.com/o/category%2Faaa.png?alt=media&token=3fe4d336-ec71-4263-9451-63d9ba8f6452',
    link: 'testEvaluation',
    isActive: 1,
  },
];
const Home = ({icon1, icon2, icon3, icon4, navigation, route}) => {
  const {users} = route.params;

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
  const showData = () => {
    const getDefinition = IN4_APP.RankOfUser;
    axios
      .post(getDefinition, {
        id: users.Id,
      })
      .then(function (response) {
        setRank(response.data);
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
    <View style={[{flex: 1, backgroundColor: '#e7f8f8'}]}>
      <StatusBar barStyle="light-content" hidden={true} />
      <HeaderHome
        icon1={icon1}
        icon2={icon2}
        icon3={icon3}
        icon4={icon4}
        rank={ranks[0]}
      />
      <View
        style={{flex: 3, justifyContent: 'flex-end', alignItems: 'flex-start'}}>
        <Animatable.Image
          animation="slideInLeft"
          duraton="1500"
          source={{
            uri:
              'https://pic.funnygifsbox.com/uploads/2019/02/funnygifsbox.com-2019-02-13-04-26-52-27.gif',
          }}
          style={{width: 200, height: 200}}
          resizeMode="stretch"
        />
      </View>
      <View
        style={[
          // Style.coverCenter,
          {
            flex: 2,
            marginTop: 20,
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
          },
        ]}>
        {datas.map((item, key) => (
          <Animatable.View
            key={key}
            animation="pulse"
            iterationCount="infinite"
            direction="alternate"
            style={[
              {
                marginBottom: 20,
                // borderColor: 'red',
                // borderWidth: 1,
                width: '33%',
                height: 100,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={
                (Style.coverCenter,
                {
                  width: '100%',
                  height: 75,
                })
              }
              onPress={() =>
                navigation.navigate(item.link, {
                  id_category: item.id,
                  idUser: users.Id,
                  rank: ranks[0],
                })
              }>
              <Animatable.Image
                animation="slideInRight"
                style={{width: '100%', height: '100%'}}
                resizeMode={'contain'}
                source={{
                  uri: item.image,
                }}
              />
              <View style={{alignSelf: 'center'}}>
                <Text style={{fontSize: 20}}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    </View>
  );
};
export default Home;
