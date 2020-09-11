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
import AudioPlayer from '../AudioPlayer';
import CountDown from 'react-native-countdown-component';

const EvaluationB1TestDetail = ({route, navigation}) => {
  const {
    count,
    totalLength,
    id_category,
    id_lession,
    id_part,
    idUser,
    currentPosition,
    delay,
    nameLession,
  } = route.params;
  const [loading, setLoading] = React.useState(true);
  const [lengthQuestion, setLengthQuestion] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const [answer2, setAnswer2] = React.useState('');
  const [answer3, setAnswer3] = React.useState('');
  const [answer4, setAnswer4] = React.useState('');
  const [answer5, setAnswer5] = React.useState('');
  const [correct, setCorrect] = React.useState(0);
  const [incorrect, setIncorrect] = React.useState(0);
  const [cur_score, setCur_score] = React.useState(0);
  const [cur_crown, setCur_crown] = React.useState(5);
  const [checkTime, setCheckTime] = React.useState(false);

  const [data, setData] = React.useState([
    {
      id: '',
      id_lession: '',
      id_part: '',
      question: '',
      dapanA: '',
      dapanB: '',
      dapanC: '',
      dapanD: '',
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

  const rank = ranks[0];

  useEffect(() => {
    TranslatorConfiguration.setConfig(
      ProviderTypes.Google,
      'AIzaSyDw8zJOc3u3rRPi5prSI8u4qmoA5vhlPAs',
      'vi',
      'en',
    );
    getData();
  }, []);

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
            {text: 'OK', onPress: () => navigation.navigate('testb1')},
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

  const empty = {
    id: '',
    id_lession: '',
    id_part: '',
    question: '',
    dapanA: '',
    dapanB: '',
    dapanC: '',
    dapanD: '',
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
  const MultiQuestion = ({item, item2, item3, item4, item5}) => {
    var promise = null;
    switch (item.id_part) {
      case 18:
        switch (countQuestionPart7()) {
          case 5:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>1/5</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item2.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>2/5</Text>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item3.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>3/5</Text>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item4.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD4 item4={question4} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>4/5</Text>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item5.question}</Text>
                  </View>

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
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>1/4</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item2.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>2/4</Text>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item3.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD3 item3={question3} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>3/4</Text>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item4.question}</Text>
                  </View>

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
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>1/3</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item2.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD2 item2={question2} />
                  </View>
                </View>
                <View style={Style.line} />
                <Text>2/3</Text>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item3.question}</Text>
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
          case 2:
            promise = (
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item.question}</Text>
                  </View>

                  <View>
                    <AnswerABCD item={question} />
                  </View>
                </View>
                <View style={Style.line}></View>
                <Text>1/2</Text>
                <View style={{marginBottom: 15, marginTop: 15}}>
                  <View style={{marginBottom: 10}}>
                    <Text style={Style.text20}>{item2.question}</Text>
                  </View>

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
  const sectionAnswer = () => {
    var promise = null;
    var space = ` `;
    switch (question.id_part) {
      case 12:
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
      case 13:
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
      case 14:
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
      case 15:
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
      case 16:
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
      case 17:
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
                Question {currentPosition}-{currentPosition + 2}/
                {lengthQuestion}:{space}
                {question.title_question}
              </Text>
            </View>
            <View style={{flex: 9, alignSelf: 'center'}}>
              {checkTime ? (
                <CountDown
                  until={delay == 90 ? delay * 3 : delay}
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
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 5,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#ebebeb',
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontSize: 20}}>{question.sound}</Text>
                </View>
              </ScrollView>
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
      case 18:
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
                Question {currentPosition}-
                {currentPosition + countQuestionPart7() - 1}/{lengthQuestion}:
                {space}
                {question.title_question}
              </Text>
            </View>
            <View style={{flex: 9, alignSelf: 'center'}}>
              {checkTime ? (
                <CountDown
                  until={delay == 90 ? delay * 2 : delay}
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
              <ScrollView
                style={{
                  width: DIMENSION.width,
                  padding: 5,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: '#ebebeb',
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontSize: 20}}>{question.sound}</Text>
                </View>
              </ScrollView>
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
                  item4={question4}
                  item5={question5}
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
  const nextQuestion = (nextElement, position) => {
    setCheckTime(false);
    if (data.length === totalLength + position) {
      updateScore();
    } else {
      navigation.navigate('partDetail2', {
        totalLength: totalLength + nextElement,
        count: count + 1,
        currentPosition: currentPosition + position,
        delay: 90 * position,
      });
    }
  };
  const writeLog = () => {
    const writeLog = IN4_APP.writeLog;
    axios
      .post(writeLog, {
        id_user: idUser,
        time: new Date().toLocaleString(),
        content:
          new Date().toLocaleString() +
          '\nLàm bài ' +
          nameLession +
          ' (Part ' +
          id_part +
          ')\nSố câu đúng: ' +
          correct +
          ', số câu sai: ' +
          incorrect +
          ', Tổng điểm: ' +
          cur_score,
        soCauDung: correct,
        soCauSai: incorrect,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const updateCorrect = (answer, question) => {
    if (answer === question.answer) {
      setCorrect((correct) => correct + 1);
      setCur_score((score) => score + 10);
    } else {
      setIncorrect((incorrect) => incorrect + 1);
      setCur_crown((crown) => crown - 1);
    }
  };
  const updateScore = () => {
    const cur_sc = cur_score;
    const cur_cr = cur_crown;
    navigation.replace('finishPart', {
      crown: cur_cr,
      score: cur_sc,
      type: 'TestB1',
    });
    const getDefinition = IN4_APP.UpdateScore;
    axios
      .put(getDefinition, {
        crown: cur_cr + rank.crown,
        current_score: cur_sc + rank.current_score,
        total_score: cur_sc + rank.total_score,
        id_user: idUser,
      })
      .then(function (response) {
        console.log(response.data);
        writeLog();
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const check = () => {
    switch (question.id_part) {
      case 14:
        updateCorrect(answer, question);
        updateCorrect(answer2, question2);
        updateCorrect(answer3, question3);
        nextQuestion(3, 3);
        setAnswer('');
        setAnswer2('');
        setAnswer3('');
        break;
      case 15:
        updateCorrect(answer, question);
        updateCorrect(answer2, question2);
        updateCorrect(answer3, question3);
        nextQuestion(3, 3);
        setAnswer('');
        setAnswer2('');
        setAnswer3('');
        break;
      case 17:
        updateCorrect(answer, question);
        updateCorrect(answer2, question2);
        updateCorrect(answer3, question3);
        nextQuestion(3, 3);
        setAnswer('');
        setAnswer2('');
        setAnswer3('');
        break;
      case 18:
        switch (countQuestionPart7()) {
          case 5:
            updateCorrect(answer, question);
            updateCorrect(answer2, question2);
            updateCorrect(answer3, question3);
            updateCorrect(answer4, question4);
            updateCorrect(answer5, question5);
            nextQuestion(5, 5);
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
            nextQuestion(4, 4);
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
            setAnswer4('');
            break;
          case 3:
            updateCorrect(answer, question);
            updateCorrect(answer2, question2);
            updateCorrect(answer3, question3);
            nextQuestion(3, 3);
            setAnswer('');
            setAnswer2('');
            setAnswer3('');
            break;
          case 2:
            updateCorrect(answer, question);
            updateCorrect(answer2, question2);
            nextQuestion(2, 2);
            setAnswer('');
            setAnswer2('');
            break;
          default:
            break;
        }
        break;
      default:
        updateCorrect(answer, question);
        nextQuestion(1, 1);
        setAnswer('');
        break;
    }
  };
  const validCheckStyle = () => {
    let promise = [];
    switch (question.id_part) {
      case 14:
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? ['#58cc02', '#58cc02']
            : ['#e5e5e5', '#e5e5e5'];
        break;
      case 15:
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? ['#58cc02', '#58cc02']
            : ['#e5e5e5', '#e5e5e5'];
        break;
      case 17:
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? ['#58cc02', '#58cc02']
            : ['#e5e5e5', '#e5e5e5'];
        break;
      case 18:
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
    switch (question.id_part) {
      case 14:
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? '#fff'
            : '#afafaf';
        break;
      case 15:
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? '#fff'
            : '#afafaf';
        break;
      case 17:
        promise =
          answer !== '' && answer3 !== '' && answer3 !== ''
            ? '#fff'
            : '#afafaf';
        break;
      case 18:
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
  const validCheck = () => {
    switch (question.id_part) {
      case 14:
        if (answer !== '' && answer2 !== '' && answer3 !== '') check();
        break;
      case 15:
        if (answer !== '' && answer2 !== '' && answer3 !== '') check();
        break;
      case 17:
        if (answer !== '' && answer2 !== '' && answer3 !== '') check();
        break;
      case 18:
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
            <TouchableOpacity onPress={() => navigation.navigate('testb1')}>
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
              onPress={() => setCheckTime(true)}
            />
          </View>
        </View>

        {sectionAnswer()}

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
            onPress={() => check()}
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
          onPress={() => navigation.navigate('testb1')}
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
export default EvaluationB1TestDetail;
