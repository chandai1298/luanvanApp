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
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();
import storage from '@react-native-firebase/storage';
import AudioPlayer from '../AudioPlayer';
import CountDown from 'react-native-countdown-component';
import email from 'react-native-email';

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
    delay,
    currentPosition,
  } = route.params;
  const [lengthQuestion, setLengthQuestion] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [incorrect, setIncorrect] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [hidePlayer, setHidePlayer] = React.useState(false);
  const [hideRecord, setHideRecord] = React.useState(false);
  const [checkTime, setCheckTime] = React.useState(false);
  const [ignore, setIgnore] = React.useState(false);
  const [help, setHelp] = React.useState(false);
  const [answer, setAnswer] = React.useState('');
  const [answer2, setAnswer2] = React.useState('');
  const [answer3, setAnswer3] = React.useState('');
  const [answer4, setAnswer4] = React.useState('');
  const [answer5, setAnswer5] = React.useState('');

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

  const getData = () => {
    const getQuestionPart = IN4_APP.getQuestionPart;
    const RankOfUser = IN4_APP.RankOfUser;
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
          setLengthQuestion(allData[1].data.length);
          setLoading(false);
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };

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
      setAnswer(a);
    } catch (e) {
      console.error(e);
    }
  };

  const rank = ranks[0];

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
  const question2 =
    data[totalLength + 1] !== undefined ? data[totalLength + 1] : empty;
  const question3 =
    data[totalLength + 2] !== undefined ? data[totalLength + 2] : empty;
  const question4 =
    data[totalLength + 3] !== undefined ? data[totalLength + 3] : empty;
  const question5 =
    data[totalLength + 4] !== undefined ? data[totalLength + 4] : empty;
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
  const onEnd = () => {
    check();
  };

  const AnswerABCD = ({item}) => {
    var promise = null;
    const arr = [
      {dapan: item.dapanA, id: 1},
      {dapan: item.dapanB, id: 2},
      {dapan: item.dapanC, id: 3},
      {dapan: item.dapanD, id: 4},
    ];
    const arr2 = [
      {dapan: 'A', dapan2: item.dapanA, id: 1},
      {dapan: 'B', dapan2: item.dapanB, id: 2},
      {dapan: 'C', dapan2: item.dapanC, id: 3},
      {dapan: 'D', dapan2: item.dapanD, id: 4},
    ];
    switch (item.description) {
      case 'part1':
        promise = (
          <View>
            {arr2.map((e) => (
              <TouchableOpacity
                key={e.id}
                style={[
                  QuestionStyle.tchAnswer2,
                  answer === e.dapan2 && Style.btnActive,
                  Style.boxShadow,
                ]}
                onPress={() => setAnswer(e.dapan2)}>
                <Text
                  style={[
                    Style.textAnswer,
                    answer === e.dapan2 && Style.txtActive,
                  ]}>
                  Options {e.dapan}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
        break;
      default:
        promise = (
          <View>
            {arr.map((e) => (
              <TouchableOpacity
                key={e.id}
                style={[
                  QuestionStyle.tchAnswer2,
                  answer === e.dapan && Style.btnActive,
                  Style.boxShadow,
                ]}
                onPress={() => setAnswer(e.dapan)}>
                <Text
                  style={[
                    Style.textAnswer,
                    answer === e.dapan && Style.txtActive,
                  ]}>
                  {e.dapan}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
        break;
    }
    return promise;
  };
  const AnswerABCD2 = ({item2}) => {
    const arr = [
      {dapan: item2.dapanA, id: 1},
      {dapan: item2.dapanB, id: 2},
      {dapan: item2.dapanC, id: 3},
      {dapan: item2.dapanD, id: 4},
    ];
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer2 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer2(e.dapan)}>
            <Text
              style={[
                Style.textAnswer,
                answer2 === e.dapan && Style.txtActive,
              ]}>
              {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const AnswerABCD3 = ({item3}) => {
    const arr = [
      {dapan: item3.dapanA, id: 1},
      {dapan: item3.dapanB, id: 2},
      {dapan: item3.dapanC, id: 3},
      {dapan: item3.dapanD, id: 4},
    ];
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer3 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer3(e.dapan)}>
            <Text
              style={[
                Style.textAnswer,
                answer3 === e.dapan && Style.txtActive,
              ]}>
              {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const AnswerABCD4 = ({item4}) => {
    const arr = [
      {dapan: item4.dapanA, id: 1},
      {dapan: item4.dapanB, id: 2},
      {dapan: item4.dapanC, id: 3},
      {dapan: item4.dapanD, id: 4},
    ];
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer4 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer4(e.dapan)}>
            <Text
              style={[
                Style.textAnswer,
                answer4 === e.dapan && Style.txtActive,
              ]}>
              {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const AnswerABCD5 = ({item5}) => {
    const arr = [
      {dapan: item5.dapanA, id: 1},
      {dapan: item5.dapanB, id: 2},
      {dapan: item5.dapanC, id: 3},
      {dapan: item5.dapanD, id: 4},
    ];
    return (
      <View>
        {arr.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer5 === e.dapan && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer5(e.dapan)}>
            <Text
              style={[
                Style.textAnswer,
                answer5 === e.dapan && Style.txtActive,
              ]}>
              {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const AnswerABC = ({question}) => {
    const arr2 = [
      {dapan: 'A', dapan2: question.dapanA, id: 1},
      {dapan: 'B', dapan2: question.dapanB, id: 2},
      {dapan: 'C', dapan2: question.dapanC, id: 3},
    ];
    return (
      <View>
        {arr2.map((e) => (
          <TouchableOpacity
            key={e.id}
            style={[
              QuestionStyle.tchAnswer2,
              answer === e.dapan2 && Style.btnActive,
              Style.boxShadow,
            ]}
            onPress={() => setAnswer(e.dapan2)}>
            <Text
              style={[
                Style.textAnswer,
                answer === e.dapan2 && Style.txtActive,
              ]}>
              Options {e.dapan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const MultiQuestion = ({item, item2, item3, item4, item5}) => {
    var promise = null;
    switch (item.id_part) {
      case 7:
        switch (countQuestionPart7()) {
          case 5:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item.description}
                      </Text>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>1/5</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item2.description}
                      </Text>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>2/5</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item3.description}
                      </Text>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>3/5</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item4.description}
                      </Text>
                      <Text style={Style.text20}>{item4.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item4.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD4 item4={question4} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>4/5</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item5.description}
                      </Text>
                      <Text style={Style.text20}>{item5.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item5.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD5 item5={question5} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text style={{marginBottom: 10}}>5/5</Text>
              </View>
            );
            break;
          case 4:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item.description}
                      </Text>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>1/4</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item2.description}
                      </Text>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>2/4</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item3.description}
                      </Text>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>3/4</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item4.description}
                      </Text>
                      <Text style={Style.text20}>{item4.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item4.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD4 item4={question4} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text style={{marginBottom: 10}}>4/4</Text>
              </View>
            );
            break;
          case 3:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item.description}
                      </Text>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>1/3</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item2.description}
                      </Text>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>2/3</Text>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item3.description}
                      </Text>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item3.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text style={{marginBottom: 10}}>3/3</Text>
              </View>
            );
            break;
          case 2:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item.description}
                      </Text>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line}></View>
                <Text>1/2</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  {help ? (
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                        {item2.description}
                      </Text>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  ) : (
                    <View style={{marginBottom: 10}}>
                      <Text style={Style.text20}>{item2.question}</Text>
                    </View>
                  )}
                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text style={{marginBottom: 10}}>2/2</Text>
              </View>
            );
            break;
          default:
            break;
        }
        break;
      default:
        promise = (
          <View style={{paddingLeft: 5, paddingRight: 5}}>
            <View style={{marginBottom: 15, marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={[Style.text20]}>{item.question}</Text>
              </View>
              <View>
                <AnswerABCD item={question} />
              </View>
            </View>
            <View style={Style.line}></View>
            <Text>1/3</Text>
            <View style={{marginBottom: 15, marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={[Style.text20]}>{item2.question}</Text>
              </View>
              <View>
                <AnswerABCD2 item2={question2} />
              </View>
            </View>
            <View style={Style.line} />
            <Text>2/3</Text>
            <View>
              <View style={{marginBottom: 10, marginTop: 15}}>
                <Text style={[Style.text20]}>{item3.question}</Text>
              </View>
              <View>
                <AnswerABCD3 item3={question3} />
              </View>
            </View>
            <View style={Style.line} />
            <Text style={{marginBottom: 10}}>3/3</Text>
          </View>
        );
        break;
    }
    return promise;
  };
  const questionView = () => {
    var promise = null;
    switch (question.id_part) {
      case 8:
        promise = questionListening();
        break;
      case 9:
        promise = questionSpeaking();
        break;
      case 10:
        promise = questionReading();
        break;
      case 11:
        promise = questionWriting();
        break;
      default:
        break;
    }
    return promise;
  };
  const questionReading = () => {
    var promise = null;
    var space = ` `;
    switch (question.description) {
      case 'part5':
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
              <Text style={Style.text20}>
                Question {currentPosition}/{lengthQuestion}:{space}
                {question.title_question}
              </Text>
            </View>

            <View style={[Style.coverCenter]}>
              <View style={{alignItems: 'center'}}>
                {checkTime ? (
                  <CountDown
                    until={delay}
                    size={30}
                    onFinish={() => check()}
                    digitStyle={{backgroundColor: '#FFF'}}
                    digitTxtStyle={{color: '#1CC625'}}
                    timeToShow={['M', 'S']}
                    timeLabels={{m: '', s: ''}}
                  />
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View
              style={{
                flex: 3,
                paddingLeft: 15,
                paddingRight: 15,
              }}>
              <Text style={[Style.text20]}>{question.question}</Text>
            </View>
            <View style={{flex: 4, padding: 15}}>
              <AnswerABCD item={question} />
            </View>
          </View>
        );
        break;
      case 'part6':
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
              style={[
                Style.coverCenter,
                {flex: 2, paddingLeft: 15, paddingRight: 15},
              ]}>
              <Text style={Style.text20}>
                Question {currentPosition}/{lengthQuestion}:{space}
                {question.title_question}
              </Text>
            </View>
            <View style={{flex: 3}}>
              <View style={[Style.coverCenter]}>
                <View style={{alignItems: 'center'}}>
                  <AudioPlayer
                    track={question.sound}
                    onEnd={onEnd}
                    delay={5}
                    pause={false}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 5, padding: 15}}>
              <AnswerABC question={question} />
            </View>
          </View>
        );
        break;
      case 'part7':
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
              <Text style={Style.text20}>
                Question {currentPosition}-{currentPosition + 2}/
                {lengthQuestion}:{space}
                {question.title_question}
              </Text>

              <View style={Style.coverCenter}>
                <View style={{alignItems: 'center'}}>
                  <AudioPlayer
                    track={question.sound}
                    onEnd={onEnd}
                    delay={5}
                    pause={false}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 8, alignSelf: 'center'}}>
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 15,
                  paddingTop: 5,
                  marginBottom: 10,
                }}>
                <MultiQuestion
                  item={question}
                  item2={question2}
                  item3={question3}
                />
              </ScrollView>
            </View>
          </View>
        );
        break;
      default:
        break;
    }
    return promise;
  };
  const questionListening = () => {
    var promise = null;
    var space = ` `;
    switch (question.description) {
      case 'part1':
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
              style={[
                Style.coverCenter,
                {flex: 2, paddingLeft: 15, paddingRight: 15},
              ]}>
              <Text style={Style.text20}>
                Question {currentPosition}/{lengthQuestion}:{space}
                {question.title_question}
              </Text>
              <View style={[Style.coverCenter]}>
                <View style={{alignItems: 'center'}}>
                  <AudioPlayer
                    track={question.sound}
                    onEnd={onEnd}
                    delay={5}
                    pause={false}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 3}}>
              <Animatable.Image
                resizeMode="contain"
                animation="bounceInLeft"
                style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
                source={{uri: question.image}}
              />
            </View>
            <View style={{flex: 5, padding: 15}}>
              <AnswerABCD item={question} />
            </View>
          </View>
        );
        break;
      case 'part2':
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
              style={[
                Style.coverCenter,
                {flex: 2, paddingLeft: 15, paddingRight: 15},
              ]}>
              <Text style={Style.text20}>
                Question {currentPosition}/{lengthQuestion}:{space}
                {question.title_question}
              </Text>
            </View>
            <View style={{flex: 3}}>
              <View style={[Style.coverCenter]}>
                <View style={{alignItems: 'center'}}>
                  <AudioPlayer
                    track={question.sound}
                    onEnd={onEnd}
                    delay={5}
                    pause={false}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 5, padding: 15}}>
              <AnswerABC question={question} />
            </View>
          </View>
        );
        break;
      case 'part3':
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
              <Text style={Style.text20}>
                Question {currentPosition}-{currentPosition + 2}/
                {lengthQuestion}:{space}
                {question.title_question}
              </Text>

              <View style={Style.coverCenter}>
                <View style={{alignItems: 'center'}}>
                  <AudioPlayer
                    track={question.sound}
                    onEnd={onEnd}
                    delay={5}
                    pause={false}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 8, alignSelf: 'center'}}>
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 15,
                  paddingTop: 5,
                  marginBottom: 10,
                }}>
                <MultiQuestion
                  item={question}
                  item2={question2}
                  item3={question3}
                />
              </ScrollView>
            </View>
          </View>
        );
        break;
      case 'part4':
        promise = (
          <View
            style={{
              flex: 10,
              position: 'absolute',
              top: 60,
              width: '100%',
              height: DIMENSION.height - 130,
            }}>
            <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
              <Text style={Style.text20}>
                Question {currentPosition}-{currentPosition + 2}/
                {lengthQuestion}:{space}
                {question.title_question}
              </Text>

              <View style={Style.coverCenter}>
                <View style={{alignItems: 'center'}}>
                  <AudioPlayer
                    track={question.sound}
                    onEnd={onEnd}
                    delay={5}
                    pause={false}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 8, alignSelf: 'center'}}>
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 15,
                  paddingTop: 5,
                  marginBottom: 10,
                }}>
                <MultiQuestion
                  item={question}
                  item2={question2}
                  item3={question3}
                />
              </ScrollView>
            </View>
          </View>
        );
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
                      backgroundColor: '#c0e4f6',
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
                  backgroundColor: '#c0e4f6',
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
                      backgroundColor: '#c0e4f6',
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
                      backgroundColor: '#c0e4f6',
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
                      backgroundColor: '#58cc02',
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
                  <View style={[Style.coverCenter, {}]}>
                    <Text
                      style={[
                        Style.text16,
                        {letterSpacing: 2, color: 'tomato'},
                      ]}>
                      Recording...
                    </Text>
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
                  backgroundColor: '#c0e4f6',
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
                      backgroundColor: '#c0e4f6',
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
                      backgroundColor: '#58cc02',
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
  const updateScore = (bonus) => {
    const cur_sc = score + bonus;
    navigation.replace('finishPart', {
      crown: crown,
      score: cur_sc,
      type: 'Toeic',
    });
    const getDefinition = IN4_APP.UpdateScore;
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
  };
  const nextQuestion = (bonus, position, nextElement) => {
    setHidePlayer(false);
    setHideRecord(false);
    setCheckTime(false);
    if (data.length === totalLength + position) {
      updateScore(bonus);
    } else {
      navigation.navigate('toeicDetail', {
        totalLength: totalLength + nextElement,
        count: count + 1,
        score: score + bonus,
        crown: crown,
        currentPosition: currentPosition + position,
        delay: 90 * position,
      });
    }
  };
  const updateCorrect = (answer, question) => {
    if (answer === question.answer) {
      setCorrect((correct) => correct + 1);
    } else {
      setIncorrect((incorrect) => incorrect + 1);
    }
  };
  const check = async () => {
    switch (question.id_part) {
      case 8:
        switch (question.description) {
          case 'part3':
            updateCorrect(answer, question);
            updateCorrect(answer2, question2);
            updateCorrect(answer3, question3);
            nextQuestion(30, 3, 3);
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
            break;
          case 'part4':
            updateCorrect(answer, question);
            updateCorrect(answer2, question2);
            updateCorrect(answer3, question3);
            nextQuestion(30, 3, 3);
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
            break;
          default:
            updateCorrect(answer, question);
            nextQuestion(10, 1, 1);
            setAnswer('');
            break;
        }
        break;
      case 9:
        setHidePlayer(false);
        setHideRecord(false);
        handleEmail(answer);
        if (data.length - 1 == totalLength) {
          updateScore(10);
        } else {
          navigation.navigate('toeicDetail', {
            totalLength: totalLength + 1,
            count: count + 1,
            score: score + 10,
            crown: crown,
          });
        }
        setAnswer('');
        break;
      case 10:
        switch (question.description) {
          case 'part6':
            updateCorrect(answer, question);
            updateCorrect(answer2, question2);
            updateCorrect(answer3, question3);
            nextQuestion(30, 3, 3);
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
            break;
          case 'part7':
            switch (countQuestionPart7()) {
              case 5:
                updateCorrect(answer, question);
                updateCorrect(answer2, question2);
                updateCorrect(answer3, question3);
                updateCorrect(answer4, question4);
                updateCorrect(answer5, question5);
                nextQuestion(50, 5, 5);
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
                setAnswer5('');
                break;
              case 4:
                updateCorrect(answer, question);
                updateCorrect(answer2, question2);
                updateCorrect(answer3, question3);
                updateCorrect(answer4, question4);
                nextQuestion(40, 4, 4);
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
                break;
              case 3:
                updateCorrect(answer, question);
                updateCorrect(answer2, question2);
                updateCorrect(answer3, question3);
                nextQuestion(30, 3, 3);
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                break;
              case 2:
                updateCorrect(answer, question);
                updateCorrect(answer2, question2);
                nextQuestion(20, 2, 2);
                setAnswer('');
                setAnswer2('');
                break;
              default:
                break;
            }
            break;
          default:
            updateCorrect(answer, question);
            nextQuestion(10, 1, 1);
            setAnswer('');
            break;
        }
        break;
      case 11:
        setHidePlayer(false);
        setHideRecord(false);
        handleEmail(answer);
        if (data.length - 1 == totalLength) {
          updateScore(10);
        } else {
          navigation.navigate('toeicDetail', {
            totalLength: totalLength + 1,
            count: count + 1,
            score: score + 10,
            crown: crown,
          });
        }
        setAnswer('');
        break;
      default:
        break;
    }
  };
  const check2 = async () => {
    switch (question.id_part) {
      case 8:
        switch (question.description) {
          case 'part3':
            updateCorrect(answer, question);
            updateCorrect(answer2, question2);
            updateCorrect(answer3, question3);
            nextQuestion(30, 3, 3);
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
            break;
          case 'part4':
            updateCorrect(answer, question);
            updateCorrect(answer2, question2);
            updateCorrect(answer3, question3);
            nextQuestion(30, 3, 3);
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
            break;
          default:
            updateCorrect(answer, question);
            nextQuestion(10, 1, 1);
            setAnswer('');
            break;
        }
        break;
      case 9:
        setHidePlayer(false);
        setHideRecord(false);
        if (data.length - 1 == totalLength) {
          updateScore(10);
        } else {
          navigation.navigate('toeicDetail', {
            totalLength: totalLength + 1,
            count: count + 1,
            score: score,
            crown: crown,
          });
        }
        setAnswer('');
        break;
      case 10:
        switch (question.description) {
          case 'part6':
            updateCorrect(answer, question);
            updateCorrect(answer2, question2);
            updateCorrect(answer3, question3);
            nextQuestion(30, 3, 3);
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
            break;
          case 'part7':
            switch (countQuestionPart7()) {
              case 5:
                updateCorrect(answer, question);
                updateCorrect(answer2, question2);
                updateCorrect(answer3, question3);
                updateCorrect(answer4, question4);
                updateCorrect(answer5, question5);
                nextQuestion(50, 5, 5);
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
                setAnswer5('');
                break;
              case 4:
                updateCorrect(answer, question);
                updateCorrect(answer2, question2);
                updateCorrect(answer3, question3);
                updateCorrect(answer4, question4);
                nextQuestion(40, 4, 4);
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
                break;
              case 3:
                updateCorrect(answer, question);
                updateCorrect(answer2, question2);
                updateCorrect(answer3, question3);
                nextQuestion(30, 3, 3);
                setAnswer('');
                setAnswer2('');
                setAnswer3('');
                break;
              case 2:
                updateCorrect(answer, question);
                updateCorrect(answer2, question2);
                nextQuestion(20, 2, 2);
                setAnswer('');
                setAnswer2('');
                break;
              default:
                break;
            }
            break;
          default:
            updateCorrect(answer, question);
            nextQuestion(10, 1, 1);
            setAnswer('');
            break;
        }
        break;
      case 11:
        setHidePlayer(false);
        setHideRecord(false);
        if (data.length - 1 == totalLength) {
          updateScore(10);
        } else {
          navigation.navigate('toeicDetail', {
            totalLength: totalLength + 1,
            count: count + 1,
            score: score,
            crown: crown,
          });
        }
        setAnswer('');
        break;
      default:
        break;
    }
  };
  const countQuestionPart7 = () => {
    var count = 0;
    data.some((item) => {
      if (item.sound === question.sound && item.sound === question5.sound) {
        count = 5;
      } else if (
        item.sound === question.sound &&
        item.sound === question4.sound
      ) {
        count = 4;
      } else if (
        item.sound === question.sound &&
        item.sound === question3.sound
      ) {
        count = 3;
      } else if (
        item.sound === question.sound &&
        item.sound === question2.sound
      ) {
        count = 2;
      }
    });
    return count;
  };
  const validCheck = () => {
    switch (question.description) {
      case 'part3':
        if (answer !== '' && answer2 !== '' && answer3 !== '') check();
        break;
      case 'part4':
        if (answer !== '' && answer2 !== '' && answer3 !== '') check();
        break;
      case 'part7':
        switch (countQuestionPart7()) {
          case 5:
            if (
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== '' &&
              answer5 !== ''
            )
              check();
            break;
          case 4:
            if (
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== ''
            )
              check();
            break;
          case 3:
            if (answer !== '' && answer2 !== '' && answer3 !== '') check();
            break;
          case 2:
            if (answer !== '' && answer2 !== '') check();
            break;
          default:
            break;
        }
        break;
      default:
        if (answer !== '') check();
        break;
    }
  };
  const validCheckStyle = () => {
    let promise = [];
    switch (question.description) {
      case 'part3':
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? ['#58cc02', '#58cc02']
            : ['#e5e5e5', '#e5e5e5'];
        break;
      case 'part4':
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? ['#58cc02', '#58cc02']
            : ['#e5e5e5', '#e5e5e5'];
        break;
      case 'part7':
        switch (countQuestionPart7()) {
          case 5:
            promise =
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== '' &&
              answer5 !== ''
                ? ['#58cc02', '#58cc02']
                : ['#e5e5e5', '#e5e5e5'];
            break;
          case 4:
            promise =
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== ''
                ? ['#58cc02', '#58cc02']
                : ['#e5e5e5', '#e5e5e5'];
            break;
          case 3:
            promise =
              answer !== '' && answer2 !== '' && answer3 !== ''
                ? ['#58cc02', '#58cc02']
                : ['#e5e5e5', '#e5e5e5'];
            break;
          case 2:
            promise =
              answer !== '' && answer2 !== ''
                ? ['#58cc02', '#58cc02']
                : ['#e5e5e5', '#e5e5e5'];
            break;
          default:
            break;
        }
        break;
      default:
        promise =
          answer !== '' ? ['#58cc02', '#58cc02'] : ['#e5e5e5', '#e5e5e5'];
        break;
    }
    return promise;
  };
  const validCheckTextStyle = () => {
    let promise = [];
    switch (question.description) {
      case 'part3':
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? '#fff'
            : '#afafaf';
        break;
      case 'part4':
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? '#fff'
            : '#afafaf';
        break;
      case 'part7':
        switch (countQuestionPart7()) {
          case 5:
            promise =
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== '' &&
              answer5 !== ''
                ? '#fff'
                : '#afafaf';
            break;
          case 4:
            promise =
              answer !== '' &&
              answer2 !== '' &&
              answer3 !== '' &&
              answer4 !== ''
                ? '#fff'
                : '#afafaf';
            break;
          case 3:
            promise =
              answer !== '' && answer2 !== '' && answer3 !== ''
                ? '#fff'
                : '#afafaf';
            break;
          case 2:
            promise = answer !== '' && answer2 !== '' ? '#fff' : '#afafaf';
            break;
          default:
            break;
        }
        break;
      default:
        promise = answer !== '' ? '#fff' : '#afafaf';
        break;
    }
    return promise;
  };
  const handleEmail = (bodyText) => {
    const to = ['lihogiti@gmail.com']; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: null, // string or array of email addresses
      bcc: null, // string or array of email addresses
      subject: 'Giải đáp',
      body: bodyText,
    }).catch(console.error);
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
              <FontAwesome5 name="times" size={30} color="#afafaf" />
            </TouchableOpacity>
          </View>

          <View
            style={[
              QuestionStyle.progressHeader,
              {
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Text style={[Style.text18, {color: '#58cc02'}]}>
              Đúng: {correct} /
            </Text>
            <Text style={[Style.text18, {color: '#f44336'}]}>
              {` `}Sai: {incorrect}
            </Text>
          </View>

          <View
            style={[
              {
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'row',
                width: 40,
              },
            ]}>
            {checkTime ? (
              <FontAwesome5
                name="check"
                size={20}
                color="#4caf50"
                style={{alignSelf: 'center', marginRight: 2}}
              />
            ) : null}
            <FontAwesome5
              name="clock"
              size={30}
              color="#f44336"
              onPress={() => setCheckTime((checkTime) => !checkTime)}
            />
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
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={[
              Style.boxShadow,
              {height: 50, borderRadius: 30, width: '48%'},
            ]}
            onPress={() => validCheck()}
            activeOpacity={0.5}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={validCheckStyle()}
              style={[Style.coverCenter, QuestionStyle.btnSubmit]}>
              <Text
                style={[
                  Style.text18,
                  {letterSpacing: 3, color: validCheckTextStyle()},
                ]}>
                KIỂM TRA
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Style.boxShadow,
              {height: 50, borderRadius: 30, width: '48%'},
            ]}
            onPress={() => check2()}
            activeOpacity={0.5}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#f44336', '#f44336']}
              style={[Style.coverCenter, QuestionStyle.btnSubmit]}>
              <Text style={[Style.text18, {letterSpacing: 3, color: '#fff'}]}>
                BỎ QUA
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
