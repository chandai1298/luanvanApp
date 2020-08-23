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
import {SearchBar} from 'react-native-elements';

const datas = [
  {
    id: 1,
    name: 'Từ điển',
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
    name: 'Ôn TOEIC',
    image: 'https://www.smartcom.vn/wp-content/uploads/2016/08/toeic.jpg',
    link: 'onTOEIC',
    isActive: 1,
  },
  {
    id: 4,
    name: 'Ôn B1',
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
  {
    id: 6,
    name: 'Điểm danh',
    image: 'https://img.cdn.schooljotter2.com/sampled/11297017/512/512/nocrop/',
    link: 'testEvaluation',
    isActive: 1,
  },
];
const Home = ({icon1, icon2, icon3, icon4, navigation, route}) => {
  const {users} = route.params;

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

  useEffect(() => {
    showData();
    let id = setInterval(() => {
      showData();
    }, 10000);
    return () => clearInterval(id);
  }, []);
  // searchData(text) {
  //   const newData = this.arrayholder.filter((item) => {
  //     const itemData = item.title.toUpperCase();
  //     const textData = text.toUpperCase();
  //     return itemData.indexOf(textData) > -1;
  //   });

  //   this.setState({
  //     data: newData,
  //     text: text,
  //   });
  // }
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
            backgroundColor: '#f1f1f1',
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
            onPress={() =>
              navigation.navigate(item.link, {
                id_category: item.id,
                idUser: users.Id,
                rank: ranks[0],
              })
            }>
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
                style={{fontSize: 16, color: '#9a9a9a', fontWeight: 'bold'}}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default Home;
