import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import {
  PowerTranslator,
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory,
} from 'react-native-power-translator';
import {IN4_APP} from '../../../ConnectServer/In4App';
import {QuestionStyle, Style, DIMENSION} from '../../../CommonStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import Player from '../../SoundComponents/Player';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/native';
import Tts from 'react-native-tts';
import Tooltip from 'react-native-walkthrough-tooltip';
import {Button} from 'react-native-elements';

const ToeicTestDetail = ({route, navigation}) => {
  const {
    count,
    crown,
    score,
    totalLength,
    id_category,
    id_lession,
    id_part,
    idUser,
  } = route.params;
  const [loading, setLoading] = React.useState(true);
  const [hideDescription, setHideDescription] = React.useState(false);
  const [sequence, setSequence] = React.useState(0);
  const [help, setHelp] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const totalLength2 = parseInt(JSON.stringify(totalLength));
  const idCategory = parseInt(JSON.stringify(id_category));
  const idLession = parseInt(JSON.stringify(id_lession));
  const idPart = parseInt(JSON.stringify(id_part));
  const [data, setData] = React.useState([
    {
      id: '',
      id_lession: '',
      id_part: '',
      question: '',
      answer: '',
      image: '',
      isActive: '',
      sound: '',
      description: '',
    },
  ]);
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
  //header
  const [visible, setVisible] = React.useState(false);
  const [current_hint, setCurrentHint] = React.useState('');
  const updateHint = (hints) => {
    const count = hints - 1;
    setCurrentHint(count);
    setHelp(true);
    const UpdateHint = IN4_APP.UpdateHint;
    axios
      .put(UpdateHint, {
        hint: count,
        id_user: idUser,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setVisible(false);
  };
  const getData = () => {
    const getQuestionPart = IN4_APP.getQuestionPart;
    const RankOfUser = IN4_APP.RankOfUser;
    axios
      .all([
        axios.post(RankOfUser, {
          id: idUser,
        }),
        axios.post(getQuestionPart, {
          id: idCategory,
          id_part: idPart,
          id_lession: idLession,
        }),
      ])
      .then(
        axios.spread((...allData) => {
          setRank(allData[0].data);
          setData(allData[1].data);
          setLoading(false);
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };

  //record thu nhat duoc tim thay
  const rank = ranks[0];
  //so hint hien tai
  const tmp = '' !== current_hint ? current_hint : rank.hint;
  useEffect(() => {
    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      'AIzaSyBTXr7MqVz0OXJadyLXaKPkLIf2ik3hukk',
      'vi',
      'en',
    );
    getData();
  }, []);
  const empty = {
    id: '',
    id_lession: '',
    id_part: '',
    question: '',
    answer: '',
    image: '',
    isActive: '',
    sound: '',
    description: '',
  };
  const question =
    data[totalLength2] !== undefined ? data[totalLength2] : empty;

  const questionView = () => {
    var promise = null;
    switch (1) {
      case 1:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
              // backgroundColor: 'red',
            }}>
            <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
              <Text style={Style.text20}>
                Question 1: Đọc to đoạn văn bản bên dưới.
              </Text>
            </View>
            <View style={{flex: 3}}>
              <Text>{question.question}</Text>
            </View>
            <View style={{flex: 5, padding: 15}}>
              <Text>tra loi</Text>
            </View>
          </View>
        );
        break;
      default:
        break;
    }
    return promise;
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={[
          QuestionStyle.headerQuestion,
          {
            position: 'absolute',
            top: 10,
            width: '100%',
            height: 50,
            paddingLeft: 10,
            paddingRight: 10,
          },
        ]}>
        <View style={[QuestionStyle.iconHeader, Style.coverCenter]}>
          <TouchableOpacity onPress={() => navigation.navigate('toeic')}>
            <FontAwesome5
              name="times"
              size={DIMENSION.sizeIcon2}
              color="#ababab"
            />
          </TouchableOpacity>
        </View>

        <View style={QuestionStyle.progressHeader}>
          <Progress.Bar
            animationType="timing"
            progress={count * 0.2}
            width={300}
            color="#5579f1"
          />
        </View>
        <View
          style={[
            QuestionStyle.iconHeader,
            {flexDirection: 'row', justifyContent: 'center'},
          ]}>
          <Tooltip
            contentStyle={{width: 200, height: 120}}
            isVisible={visible}
            content={
              tmp > 0 ? (
                <View
                  style={{
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <Text
                    style={[
                      {
                        marginLeft: 3,
                        fontSize: 20,
                        color: '#464646',
                      },
                    ]}>
                    Mất 1 tim để nhân trợ giúp?
                  </Text>
                  <Button
                    containerStyle={{
                      width: '75%',
                      alignSelf: 'center',
                      borderRadius: 25,
                    }}
                    buttonStyle={{backgroundColor: '#5579f1'}}
                    titleStyle={{
                      letterSpacing: 3,
                    }}
                    title="Ok"
                    onPress={() => {
                      updateHint(tmp);
                    }}
                  />
                </View>
              ) : (
                <Text> Bạn đã hết trợ giúp!</Text>
              )
            }
            placement="left"
            onClose={() => setVisible(false)}>
            <FontAwesome5
              onPress={() => setVisible(true)}
              name="heartbeat"
              size={DIMENSION.sizeIcon}
              color="#f44336"
            />
          </Tooltip>

          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
            }}>
            <Text style={[Style.text20, {marginLeft: 3, color: '#f44336'}]}>
              {tmp}
            </Text>
          </View>
        </View>
      </View>
      
      {questionView()}

      <View
        style={{
          height: 50,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 15,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <TouchableOpacity
          style={[Style.boxShadow, {height: 50, borderRadius: 30}]}
          onPress={() => check()}
          activeOpacity={0.5}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#c1c8fe', '#5579f1']}
            style={[Style.coverCenter, QuestionStyle.btnSubmit]}>
            <Text style={[Style.text18, {letterSpacing: 3, color: '#fff'}]}>
              KIỂM TRA
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ToeicTestDetail;
