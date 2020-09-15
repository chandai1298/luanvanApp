import React, {useEffect} from 'react';
import {Text, View, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import {Style, DIMENSION} from '../CommonStyles';
import HeaderHome from '../Components/HomeComponents/HeaderHome';
import HomeItem from '../Components/HomeComponents/HomeItem';
import {IN4_APP} from '../ConnectServer/In4App';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {fcmService} from '../Notification/FCMService';
import {localNotificationService} from '../Notification/LocalNotificationService';
import {SearchBar} from 'react-native-elements';
import {Button, Overlay} from 'react-native-elements';

// import {
//   PlaySound,
//   StopSound,
//   PlaySoundRepeat,
//   PlaySoundMusicVolume,
// } from 'react-native-play-sound';

const datas = [
  {
    id: 1,
    name: 'Tra từ điển',
    image:
      'https://th.bing.com/th/id/OIP.HCyblSAzehzRaumVeRqTIAHaHa?pid=Api&rs=1',
    link: 'dictionary',
    isActive: 1,
  },
  {
    id: 2,
    name: 'Dịch văn bản',
    image:
      'https://firebasestorage.googleapis.com/v0/b/fir-rn-785e2.appspot.com/o/category%2FGoogle_Translate_Icon.png?alt=media&token=bc88f0be-3c85-4fa5-9998-82f3324d7914',
    link: 'translator',
    isActive: 1,
  },
  {
    id: 3,
    name: 'Luyện TOEIC',
    image: 'https://www.smartcom.vn/wp-content/uploads/2016/08/toeic.jpg',
    link: 'onTOEIC',
    isActive: 1,
  },
  {
    id: 4,
    name: 'Luyện B1',
    image:
      'https://firebasestorage.googleapis.com/v0/b/fir-rn-785e2.appspot.com/o/category%2FLogo_HCMUAF.png?alt=media&token=a4e14afc-5c99-4bfb-ab87-fed7dfc39ece',
    link: 'onB1',
    isActive: 1,
  },
  {
    id: 5,
    name: 'Kiểm tra',
    image: 'https://image.flaticon.com/icons/png/512/825/825590.png',
    link: 'testEvaluation',
    isActive: 1,
  },
];
const Home = ({icon1, icon2, icon3, icon4, navigation, route}) => {
  const {users} = route.params;
  const [visible2, setVisible2] = React.useState(false);

  const [checkDiemdanh, setDiemdanh] = React.useState(false);
  const [input, onChangeInput] = React.useState('');
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
  const diemdanh = () => {
    const diemDanh = IN4_APP.diemDanh;
    axios
      .put(diemDanh, {
        Id: users.Id,
      })
      .then(function (response) {
        setDiemdanh(true);
        toggleOverlay2();

        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const toggleOverlay2 = () => {
    setVisible2(!visible2);
  };
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister: ', token);

      const UpdateTokenNotification = IN4_APP.UpdateTokenNotification;
      axios
        .put(UpdateTokenNotification, {
          token: token,
          id_user: users.Id,
        })
        .then(function (response) {
          console.log('token ' + response.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ');
      const options = {
        soundName: 'plucky',
        playSound: true, //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      alert('Open Notification: ' + notify.body);
    }
    showData();
    let id = setInterval(() => {
      showData();
    }, 10000);

    return () => {
      clearInterval(id);
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);
  return (
    <View style={[{flex: 1, backgroundColor: '#fcfefc'}]}>
      <StatusBar barStyle="light-content" hidden={true} />
      <HeaderHome
        icon1={icon1}
        icon2={icon2}
        icon3={icon3}
        icon4={icon4}
        rank={ranks[0]}
      />
      <SearchBar
        containerStyle={[
          Style.boxShadow,
          {
            borderRadius: 50,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            margin: 15,
            marginTop: 20,
            elevation: 20,
            backgroundColor: '#fff',
          },
        ]}
        searchIcon={{size: 25}}
        inputContainerStyle={{borderRadius: 50, backgroundColor: '#fff'}}
        round={true}
        underlineColorAndroid="transparent"
        placeholder="Dịch nghĩa Anh-Việt..."
        value={input}
        onChangeText={(text) => onChangeInput(text)}
        onEndEditing={() => {
          navigation.navigate('dictionary', {word: input.trim().toLowerCase()});
          onChangeInput('');
        }}
      />
      <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
        <Animatable.Image
          animation="slideInRight"
          duration={1000}
          source={{
            uri:
              'https://i.pinimg.com/originals/5a/f9/e9/5af9e91a0d463e0f82c62e8510167042.gif',
          }}
          style={{width: 200, height: 200}}
          resizeMode="stretch"
        />
      </View>
      <View
        style={[
          {
            flex: 3,
            marginTop: 20,
            paddingLeft: 10,
            paddingRight: 10,
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
        ]}>
        {datas.map((item, key) => (
          <TouchableOpacity
            key={key}
            activeOpacity={0.5}
            style={[
              Style.boxShadow,
              {
                marginBottom: 20,
                backgroundColor: '#fff',
                borderRadius: 20,
                margin: 5,
                width: '30%',
                height: 100,
                justifyContent: 'center',
                elevation: 12,
              },
            ]}
            onPress={() => {
              navigation.navigate(item.link, {
                id_category: item.id,
                idUser: users.Id,
                rank: ranks[0],
              });
              // PlaySound('plucky');
            }}>
            <Animatable.Image
              animation="flipInX"
              style={{
                width: 64,
                height: 64,
                alignSelf: 'center',
                borderRadius: 30,
              }}
              resizeMode={'contain'}
              source={{
                uri: item.image,
              }}
            />
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{fontSize: 16, color: '#afafaf', fontWeight: 'bold'}}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <Overlay
          isVisible={visible2}
          onBackdropPress={toggleOverlay2}
          overlayStyle={{
            padding: 0,
            borderRadius: 10,
            height: 300,
            width: 300,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignContent: 'center',
              padding: 12,
              borderRadius: 15,
              backgroundColor: '#fff',
              alignItems: 'center',
            }}>
            <Animatable.Image
              animation="zoomInDown"
              duration={1000}
              source={{
                uri:
                  'https://media1.tenor.com/images/2aaf0fe4f6c39303000cd7abf9050548/tenor.gif?itemid=12224219',
              }}
              style={{width: 200, height: 200}}
              resizeMode="stretch"
            />
            <Text style={{color: '#9a2f12', fontSize: 18, alignSelf: 'center'}}>
              Điểm danh thành công!
            </Text>

            <Button
              containerStyle={{
                marginTop: 15,
                height: 40,
                borderRadius: 10,
              }}
              buttonStyle={{backgroundColor: '#58cc02'}}
              titleStyle={{
                letterSpacing: 3,
              }}
              title="OK"
              onPress={toggleOverlay2}
            />
          </View>
        </Overlay>
        {ranks[0].diemdanh === 1 || checkDiemdanh ? (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              Style.boxShadow,
              {
                marginBottom: 20,
                backgroundColor: '#f2f2f2',
                borderRadius: 20,
                margin: 5,
                width: '30%',
                height: 100,
                justifyContent: 'center',
                elevation: 12,
                opacity: 0.8,
              },
            ]}>
            <Animatable.Image
              animation="flipInX"
              style={{
                width: 64,
                height: 64,
                alignSelf: 'center',
                borderRadius: 30,
              }}
              resizeMode={'contain'}
              source={{
                uri:
                  'https://img.cdn.schooljotter2.com/sampled/11297017/512/512/nocrop/',
              }}
            />
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{fontSize: 16, color: '#afafaf', fontWeight: 'bold'}}>
                Điểm danh
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              Style.boxShadow,
              {
                marginBottom: 20,
                backgroundColor: '#fff',
                borderRadius: 20,
                margin: 5,
                width: '30%',
                height: 100,
                justifyContent: 'center',
                elevation: 12,
              },
            ]}
            onPress={() => {
              diemdanh();
            }}>
            <Animatable.Image
              animation="flipInX"
              style={{
                width: 64,
                height: 64,
                alignSelf: 'center',
                borderRadius: 30,
              }}
              resizeMode={'contain'}
              source={{
                uri:
                  'https://img.cdn.schooljotter2.com/sampled/11297017/512/512/nocrop/',
              }}
            />
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{fontSize: 16, color: '#afafaf', fontWeight: 'bold'}}>
                Điểm danh
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default Home;
