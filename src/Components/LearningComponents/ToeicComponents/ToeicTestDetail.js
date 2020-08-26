import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
  BackHandler,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/native';
import Tts from 'react-native-tts';
import Tooltip from 'react-native-walkthrough-tooltip';
import {Button} from 'react-native-elements';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();
import storage from '@react-native-firebase/storage';

const path = Platform.select({
  ios: 'hello.m4a',
  android: 'sdcard/hello.mp4',
});

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
  const [hidePlayer, setHidePlayer] = React.useState(false);
  const [hideRecord, setHideRecord] = React.useState(false);
  const [help, setHelp] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  // const [timeRecorder, setTimeRecorder] = React.useState(0);

  const [data, setData] = React.useState([
    {
      id: '',
      id_lession: '',
      id_part: '',
      title_question: '',
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
    console.log(id_category + ' ' + id_part + ' ' + id_lession);
    axios
      .all([
        axios.post(RankOfUser, {
          id: idUser,
        }),
        axios.post(getQuestionPart, {
          id: id_category,
          id_part: id_part,
          id_lession: id_lession,
        }),
      ])
      .then(
        axios.spread((...allData) => {
          setRank(allData[0].data);
          setData(allData[1].data);
          setLoading(false);
          console.log(allData[1].data.length);
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };
  // function pad(n, width, z = 0) {
  //   n = n + '';
  //   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  // }

  // const minutesAndSeconds = (position) => [
  //   pad(Math.floor(position / 60), 2),
  //   pad(position % 60, 2),
  // ];
  //ghi am
  const [audio, setAudio] = React.useState('1');

  const onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    // setTimeout( () => {
    //    setTimeRecorder(timeRecorder + 1);
    // }, 1000);
    setHidePlayer(false);
    setHideRecord(true);
    const result = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    setHideRecord(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    setTimeout(() => {
      setHidePlayer(true);
    }, 1000);
    const uri = 'file:///sdcard/hello.mp4';
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(`img/${filename}`).putFile(uploadUri);

    try {
      await task;
      var ref = storage().ref(`img/${filename}`);
      const a = await ref.getDownloadURL();
      setAudio(a);
    } catch (e) {
      console.error(e);
    }
  };

  const rank = ranks[0];
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
    title_question: '',
    question: '',
    answer: '',
    image: '',
    isActive: '',
    sound: '',
    description: '',
  };
  const question = data[totalLength] !== undefined ? data[totalLength] : empty;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Thông báo',
          'Bạn chắc chắn muốn quay lại?',
          [
            {
              text: 'Hủy',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.navigate('toeic')},
          ],
          {cancelable: false},
        );

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const questionView = () => {
    var promise = null;
    switch (question.id_part) {
      case 8:
        break;

      case 9:
        promise = questionSpeaking();
        break;
      case 10:
        promise = (
          <View>
            <Text>part 10</Text>
          </View>
        );
        break;

      case 11:
        promise = questionWriting();
        break;

      default:
        break;
    }
    return promise;
  };
  const questionWriting = () => {
    var promise = null;
    var space = ` `;
    switch (question.image) {
      case 'noimg':
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View
              style={[Style.coverCenter, {paddingLeft: 15, paddingRight: 15}]}>
              <Text style={Style.text20}>
                Question {totalLength + 1}/{data.length}:{space}
                {question.title_question}
              </Text>
            </View>
            <View style={{flex: 6}}>
              <ScrollView>
                <Text
                  style={[
                    Style.text20,
                    {
                      fontWeight: 'normal',
                      backgroundColor: '#dee2ff',
                      padding: 15,
                    },
                  ]}>
                  {question.question}
                </Text>
              </ScrollView>
            </View>
            <View style={{flex: 3, padding: 15}}>
              <View style={{flexDirection: 'row-reverse'}}>
                <FontAwesome5
                  name="times"
                  size={DIMENSION.sizeIcon}
                  color="#9a9a9a"
                  onPress={() => setAnswer('')}
                  style={{marginBottom: -20}}
                />
              </View>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 18,
                  marginRight: 20,
                }}
                placeholder="Hãy nhập gì đó..."
                underlineColorAndroid="transparent"
                onChangeText={(inputText) => setAnswer(inputText)}
                value={answer}
                multiline={true}
              />
            </View>
          </View>
        );
        break;
      default:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View
              style={[Style.coverCenter, {paddingLeft: 15, paddingRight: 15}]}>
              <Text style={Style.text20}>
                Question {totalLength + 1}/{data.length}:{space}
                {question.title_question}
              </Text>
            </View>
            <View style={{flex: 6}}>
              <ScrollView
                style={{
                  backgroundColor: '#dee2ff',
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: '100%', height: 300}}
                  source={{
                    uri: question.image,
                  }}
                />
                <Text
                  style={[
                    Style.text20,
                    {
                      fontWeight: 'normal',
                      backgroundColor: '#dee2ff',
                      padding: 15,
                      alignSelf: 'center',
                    },
                  ]}>
                  {question.question}
                </Text>
              </ScrollView>
            </View>
            <View style={{flex: 3, padding: 15}}>
              <View style={{flexDirection: 'row-reverse'}}>
                <FontAwesome5
                  name="times"
                  size={DIMENSION.sizeIcon}
                  color="#9a9a9a"
                  onPress={() => setAnswer('')}
                  style={{marginBottom: -20}}
                />
              </View>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 18,
                  marginRight: 20,
                }}
                placeholder="Hãy nhập gì đó..."
                underlineColorAndroid="transparent"
                onChangeText={(inputText) => setAnswer(inputText)}
                value={answer}
                multiline={true}
              />
            </View>
          </View>
        );
        break;
    }
    return promise;
  };
  const questionSpeaking = () => {
    var promise = null;
    var space = ` `;
    // const elapsed = minutesAndSeconds(timeRecorder);
    switch (question.image) {
      case 'noimg':
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View
              style={[Style.coverCenter, {paddingLeft: 15, paddingRight: 15}]}>
              <Text style={Style.text20}>
                Question {totalLength + 1}/{data.length}:{space}
                {question.title_question}
              </Text>
            </View>
            <View style={{flex: 7}}>
              <ScrollView>
                <Text
                  style={[
                    Style.text20,
                    {
                      fontWeight: 'normal',
                      backgroundColor: '#dee2ff',
                      padding: 15,
                    },
                  ]}>
                  {question.question}
                </Text>
              </ScrollView>
            </View>
            <View style={{flex: 2, padding: 15}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[
                    Style.boxShadow,
                    {
                      margin: 10,
                      flexDirection: 'row',
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: '#5579f1',
                      // elevation: 15,
                    },
                    Style.coverCenter,
                  ]}
                  onPress={() => onStartRecord()}>
                  <MaterialCommunityIcons
                    size={30}
                    name="microphone-outline"
                    color="#fff"
                  />
                  <Text style={[Style.text18, {color: '#fff'}]}>Ghi âm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    Style.boxShadow,
                    {
                      margin: 10,
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: '#ff5722',
                      // elevation: 15,
                    },
                    Style.coverCenter,
                  ]}
                  onPress={() => onStopRecord()}>
                  <Text style={[Style.text18, {color: '#fff'}]}>Dừng</Text>
                </TouchableOpacity>
              </View>
              <View style={Style.coverCenter}>
                {hideRecord ? (
                  <View style={[Style.coverCenter, {backgroundColor: 'red'}]}>
                    <Text style={Style.text16}>recording...</Text>
                  </View>
                ) : (
                  <></>
                )}
                {hidePlayer ? <Player tracks={audio} /> : <></>}
              </View>
            </View>
          </View>
        );
        break;
      default:
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View
              style={[Style.coverCenter, {paddingLeft: 15, paddingRight: 15}]}>
              <Text style={Style.text20}>
                Question {totalLength + 1}/{data.length}:{space}
                {question.title_question}
              </Text>
            </View>
            <View style={{flex: 7}}>
              <ScrollView
                style={{
                  backgroundColor: '#dee2ff',
                }}>
                <Image
                  resizeMode="contain"
                  style={{width: '100%', height: 300}}
                  source={{
                    uri: question.image,
                  }}
                />
                <Text
                  style={[
                    Style.text20,
                    {
                      fontWeight: 'normal',
                      backgroundColor: '#dee2ff',
                      padding: 15,
                    },
                  ]}>
                  {question.question}
                </Text>
              </ScrollView>
            </View>
            <View style={{flex: 2, padding: 15}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[
                    Style.boxShadow,
                    {
                      margin: 10,
                      flexDirection: 'row',
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: '#5579f1',
                      elevation: 15,
                    },
                    Style.coverCenter,
                  ]}
                  onPress={() => onStartRecord()}>
                  <MaterialCommunityIcons
                    size={30}
                    name="microphone-outline"
                    color="#fff"
                  />
                  <Text style={[Style.text18, {color: '#fff'}]}>Ghi âm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    Style.boxShadow,
                    {
                      margin: 10,
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: '#ff5722',
                      elevation: 15,
                    },
                    Style.coverCenter,
                  ]}
                  onPress={() => onStopRecord()}>
                  <Text style={[Style.text18, {color: '#fff'}]}>Dừng</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 15}}>
                {hideRecord ? (
                  <Image
                    resizeMode="cover"
                    style={{width: '100%', height: 80}}
                    source={{
                      uri:
                        'https://media.giphy.com/media/5wMi0z8sKAGaI/giphy.gif',
                    }}
                  />
                ) : (
                  <></>
                )}
                {hidePlayer ? <Player tracks={audio} /> : <></>}
              </View>
            </View>
          </View>
        );
        break;
    }
    return promise;
  };
  const check = () => {
    setHidePlayer(false);
    setHideRecord(false);
    if (data.length - 1 == totalLength) {
      const getDefinition = IN4_APP.UpdateScore;
      const cur_sc = score + 10;
      navigation.navigate('finishPart', {
        crown: crown,
        score: cur_sc,
        type: 'Toeic',
      });
      axios
        .put(getDefinition, {
          crown: crown + rank.crown,
          current_score: cur_sc + rank.current_score,
          total_score: cur_sc + rank.total_score,
          id_user: idUser,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else {
      navigation.navigate('toeicDetail', {
        totalLength: totalLength + 1,
        count: count + 1,
        score: score + 10,
        crown: crown,
      });
    }

    setAnswer('');
  };
  return data.length > 0 ? (
    loading ? (
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
              progress={count * 0.09}
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
    )
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffdcd8c4',
      }}>
      <Animatable.Text
        style={{
          fontSize: 30,
          fontStyle: 'italic',
          marginBottom: -100,
          letterSpacing: 3,
        }}
        animation="pulse"
        iterationCount="infinite"
        direction="alternate">
        Updating...
      </Animatable.Text>

      <Animatable.Image
        // animation="bounceIn"
        duraton="1500"
        source={{
          uri:
            'https://pic.funnygifsbox.com/uploads/2019/02/funnygifsbox.com-2019-02-13-04-28-19-22.gif',
        }}
        style={{width: '50%', height: '50%'}}
        resizeMode="contain"
      />
      <Animatable.View
        style={{fontSize: 30, fontStyle: 'italic', marginBottom: -100}}
        animation="jello"
        iterationCount="infinite"
        direction="alternate">
        <TouchableOpacity
          style={[Style.boxShadow, {height: 50, borderRadius: 30}]}
          onPress={() => navigation.navigate('toeic')}
          activeOpacity={0.5}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#ffc600', '#ffc600']}
            style={[Style.coverCenter, QuestionStyle.btnSubmit]}>
            <Text
              style={[
                Style.text20,
                {
                  letterSpacing: 3,
                  color: '#fff',
                  marginLeft: 15,
                  marginRight: 15,
                },
              ]}>
              Quay lại bài học nào...
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};
export default ToeicTestDetail;
